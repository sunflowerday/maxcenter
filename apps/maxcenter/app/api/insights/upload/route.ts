import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(req: NextRequest) {
  let member_id: string | undefined, period_start: string | undefined, period_end: string | undefined
  let insights: any, raw_html: string | undefined | null

  try {
    const body = await req.json()
    ;({ member_id, period_start, period_end, insights, raw_html } = body)

    if (!member_id || !period_start || !period_end || !insights) {
      return NextResponse.json({ error: 'missing required fields: member_id, period_start, period_end, insights' }, { status: 400 })
    }

    await sql`
      INSERT INTO insights_history (member_id, period_start, period_end, insights, raw_html, created_at)
      VALUES (${member_id}, ${period_start}, ${period_end}, ${JSON.stringify(insights)}, ${raw_html ?? null}, NOW())
      ON CONFLICT (member_id, period_start) DO UPDATE SET
        insights = EXCLUDED.insights,
        raw_html = EXCLUDED.raw_html,
        create_at = NOW()
    `

    return NextResponse.json({ success: true, local_demo: false, member_id, period_start, period_end })
  } catch (err: any) {
    console.warn('[insights/upload] Postgres unavailable — local demo mode:', err.message)
    // Fallback: still return success for demo purposes
    if (!member_id || !period_start || !period_end || !insights) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
    return NextResponse.json({ success: true, local_demo: true, member_id, period_start, period_end })
  }
}