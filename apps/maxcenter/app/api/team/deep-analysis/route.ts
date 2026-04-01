import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic()

function buildPrompt(insightsRows: any[]): string {
  const insightsJson = JSON.stringify(insightsRows, null, 2)

  const meetingNotes = [
    { date: "2026-03-15", summary: "讨论了 AI 工具在团队中的使用情况，大家对自动化工作流很感兴趣" },
    { date: "2026-03-22", summary: "分享了各成员使用 Claude Code 的经验，friction point 是主要话题" },
    { date: "2026-03-29", summary: "确定了 Team Insights 功能的需求，同意先用 Vercel Postgres 存储" }
  ]

  const feishuStats = {
    total_messages: 3637,
    active_members: 7,
    groups: ["product-dev", "design", "general"],
    weekly_active: 5
  }

  return `你是团队 AI 使用分析专家。基于以下数据，为团队提供深度洞察：

【团队成员洞察数据】
${insightsJson}

【最近会议纪要】
${meetingNotes.map(m => `- ${m.date}: ${m.summary}`).join("\n")}}

【飞书群数据】
- 总消息数: ${feishuStats.total_messages}
- 活跃成员: ${feishuStats.active_members}
- 群组: ${feishuStats.groups.join(", ")}
- 周活跃: ${feishuStats.weekly_active}

请分析：
1. 团队 AI 使用的整体模式和趋势
2. 成员间的协作效率
3. 识别主要的 friction point 和改进机会
4. 推荐下一步行动

请用中文回复，输出格式化的 Markdown。`
}

async function getLatestInsights(): Promise<any[]> {
  const allKeys = await kv.keys('insights:*')
  const memberLatest: Record<string, any> = {}

  for (const key of allKeys) {
    if (key.includes(':latest')) continue
    const data = await kv.get(key)
    if (data) {
      const insight = typeof data === 'string' ? JSON.parse(data) : data
      const mid = insight.member_id
      if (!memberLatest[mid] || new Date(insight.created_at) > new Date(memberLatest[mid].created_at)) {
        memberLatest[mid] = insight
      }
    }
  }

  return Object.values(memberLatest)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { trigger_analysis } = body

  let insightsRows: any[] = []

  try {
    insightsRows = await getLatestInsights()
  } catch (dbErr: any) {
    console.warn('[team/deep-analysis] Redis unavailable:', dbErr.message)
    const prompt = buildPrompt([])
    return NextResponse.json({
      success: false,
      fallback: true,
      prompt,
      message: 'Redis unavailable - returning prompt only'
    }, { status: 200 })
  }

  const prompt = buildPrompt(insightsRows)

  if (!trigger_analysis) {
    return NextResponse.json({ success: true, prompt })
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
      stream: true
    })

    let fullResponse = ""
    for await (const event of response) {
      if (event.type === "content_block_delta" && "text" in event.delta) {
        fullResponse += event.delta.text
      }
    }

    // Store result in Redis
    try {
      const analysisKey = `deep_analysis:${Date.now()}`
      await kv.set(analysisKey, JSON.stringify({
        prompt,
        result: fullResponse,
        created_at: new Date().toISOString()
      }))
    } catch (storeErr: any) {
      console.warn('[team/deep-analysis] Failed to store result:', storeErr.message)
    }

    return NextResponse.json({ success: true, result: fullResponse })
  } catch (aiErr: any) {
    return NextResponse.json({
      success: false,
      error: aiErr.message,
      fallback_prompt: prompt
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const allKeys = await kv.keys('deep_analysis:*')
    const analyses = []

    for (const key of allKeys.slice(-10)) {
      const data = await kv.get(key)
      if (data) {
        analyses.push(typeof data === 'string' ? JSON.parse(data) : data)
      }
    }

    analyses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return NextResponse.json({ analyses: analyses.slice(0, 10), count: analyses.length })
  } catch (err: any) {
    return NextResponse.json({ analyses: [], count: 0, message: err.message }, { status: 200 })
  }
}
