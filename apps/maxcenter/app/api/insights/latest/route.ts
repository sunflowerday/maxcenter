import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const member_id = searchParams.get('member_id')

  try {
    if (member_id) {
      // Get latest for specific member
      const keys = await kv.keys(`insights:${member_id}:*`)
      if (keys.length === 0) {
        return NextResponse.json({ insights: [], count: 0 })
      }
      const latestKey = keys.sort().pop()
      const data = await kv.get(latestKey!)
      const insight = typeof data === 'string' ? JSON.parse(data) : data
      return NextResponse.json({ insights: [insight], count: 1 })
    } else {
      // Get latest for all members
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

      const insights = Object.values(memberLatest)
      return NextResponse.json({ insights, count: insights.length })
    }
  } catch (err: any) {
    console.warn('[insights/latest] Redis unavailable:', err.message)
    return NextResponse.json({ insights: [], count: 0, local_demo: true, message: 'Redis unavailable' }, { status: 200 })
  }
}
