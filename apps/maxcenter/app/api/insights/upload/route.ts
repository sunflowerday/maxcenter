import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { member_id, period_start, period_end, insights, raw_html } = body

  if (!member_id || !period_start || !period_end || !insights) {
    return NextResponse.json(
      { error: 'missing required fields: member_id, period_start, period_end, insights' },
      { status: 400 }
    )
  }

  try {
    const key = `insights:${member_id}:${period_start}`
    const data = {
      member_id,
      period_start,
      period_end,
      insights,
      raw_html: raw_html ?? null,
      created_at: new Date().toISOString()
    }

    await kv.set(key, JSON.stringify(data))
    await kv.zadd(`insights:by_member:${member_id}`, { score: Date.now(), member: key })

    return NextResponse.json({ success: true, local_demo: false, member_id, period_start, period_end })
  } catch (err: any) {
    console.warn('[insights/upload] Redis unavailable:', err.message)
    return NextResponse.json({ success: true, local_demo: true, member_id, period_start, period_end })
  }
}
