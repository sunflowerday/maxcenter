import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic()

function buildPrompt(insightsRows: any[]): string {
  const insightsJson = JSON.stringify(insightsRows, null, 2)

  // Static data for context (meeting notes + Feishu stats)
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

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { trigger_analysis } = body

  let insightsRows: any[] = []

  try {
    const result = await sql`
      SELECT DISTINCT ON (member_id) * FROM insights_history
      ORDER BY member_id, created_at DESC
    `
    insightsRows = result.rows
  } catch (dbErr: any) {
    console.warn('[team/deep-analysis] Postgres unavailable:', dbErr.message)
    const prompt = buildPrompt([])
    return NextResponse.json({
      success: false,
      fallback: true,
      prompt,
      message: 'Database unavailable - returning prompt only'
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

    // Store result
    try {
      await sql`
        INSERT INTO deep_analysis (prompt, result, created_at)
        VALUES (${prompt}, ${fullResponse}, NOW())
      `
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
    const result = await sql`
      SELECT * FROM deep_analysis ORDER BY created_at DESC LIMIT 10
    `
    return NextResponse.json({ analyses: result.rows, count: result.rows.length })
  } catch (err: any) {
    return NextResponse.json({ analyses: [], count: 0, message: err.message }, { status: 200 })
  }
}