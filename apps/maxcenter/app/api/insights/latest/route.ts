import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const member_id = searchParams.get('member_id')

  try {
    if (member_id) {
      const result = await sql`
        SELECT * FROM insights_history
        WHERE member_id = ${member_id}
        ORDER BY created_at DESC
        LIMIT 1
      `
      return NextResponse.json({ insights: result.rows, count: result.rows.length })
    } else {
      const result = await sql`
        SELECT DISTINCT ON (member_id) * FROM insights_history
        ORDER BY member_id, created_at DESC
      `
      return NextResponse.json({ insights: result.rows, count: result.rows.length })
    }
  } catch (err: any) {
    console.warn('[insights/latest] Postgres unavailable — returning empty:', err.message)
    return NextResponse.json({ insights: [], count: 0, local_demo: true, message: 'Database unavailable' }, { status: 200 })
  }
}