/**
 * API Route: /api/bench/rankings
 * 排行榜 API - 使用 Upstash REST API 存储
 */

import { NextRequest, NextResponse } from 'next/server'
import { kvGet, kvSet, kvDel, isKVConfigured } from '@/lib/upstash'

const RANKINGS_KEY = 'bench:rankings'
const DATA_FILE = 'data/rankings.json'

interface RankingEntry {
  userId: string
  scoreCount: number
  updatedAt: string
}

// 本地开发用的文件操作
async function readLocalRankings(): Promise<RankingEntry[]> {
  const fs = await import('fs')
  const path = await import('path')
  const filePath = path.join(process.cwd(), DATA_FILE)

  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const data = JSON.parse(content)
      return data.rankings || []
    }
  } catch (e) {
    console.error('Error reading local rankings:', e)
  }
  return []
}

async function writeLocalRankings(rankings: RankingEntry[]): Promise<void> {
  const fs = await import('fs')
  const path = await import('path')
  const filePath = path.join(process.cwd(), DATA_FILE)
  const dir = path.dirname(filePath)

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify({ rankings }, null, 2))
  } catch (e) {
    console.error('Error writing local rankings:', e)
  }
}

function sortRankings(rankings: RankingEntry[]): RankingEntry[] {
  return rankings.sort((a, b) => b.scoreCount - a.scoreCount)
}

// GET /api/bench/rankings
export async function GET() {
  try {
    let rankings: RankingEntry[] = []

    if (isKVConfigured()) {
      // 使用 Upstash
      const data = await kvGet(RANKINGS_KEY)
      rankings = data ? JSON.parse(data) : []
    } else {
      // 本地开发模式
      rankings = await readLocalRankings()
    }

    const sorted = sortRankings(rankings)

    return NextResponse.json({
      rankings: sorted,
      total: sorted.length,
      source: isKVConfigured() ? 'vercel-kv' : 'local',
    })
  } catch (e) {
    console.error('Error fetching rankings:', e)
    return NextResponse.json({ error: 'Failed to fetch rankings' }, { status: 500 })
  }
}

// DELETE /api/bench/rankings?secret=xxx - 管理员清除所有排行榜数据
export async function DELETE(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const adminSecret = process.env.ADMIN_SECRET || 'maxloveuser'

  if (secret !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (isKVConfigured()) {
      await kvDel(RANKINGS_KEY)
    }

    // 清除本地文件
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.join(process.cwd(), DATA_FILE)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    return NextResponse.json({
      success: true,
      message: 'All rankings cleared',
      source: isKVConfigured() ? 'vercel-kv' : 'local',
    })
  } catch (e) {
    console.error('Error clearing rankings:', e)
    return NextResponse.json({ error: 'Failed to clear rankings' }, { status: 500 })
  }
}

// POST /api/bench/rankings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, scoreCount } = body

    if (!userId || typeof scoreCount !== 'number') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    let rankings: RankingEntry[] = []

    if (isKVConfigured()) {
      const data = await kvGet(RANKINGS_KEY)
      rankings = data ? JSON.parse(data) : []
    } else {
      rankings = await readLocalRankings()
    }

    // 计算更新前的排名
    const sortedBefore = sortRankings([...rankings])
    const rankBefore = sortedBefore.findIndex(r => r.userId === userId) + 1 || sortedBefore.length + 1

    // 更新或新增用户
    const existingIndex = rankings.findIndex(r => r.userId === userId)
    const newEntry: RankingEntry = {
      userId,
      scoreCount,
      updatedAt: new Date().toISOString(),
    }

    if (existingIndex >= 0) {
      rankings[existingIndex] = newEntry
    } else {
      rankings.push(newEntry)
    }

    // 保存
    if (isKVConfigured()) {
      await kvSet(RANKINGS_KEY, JSON.stringify(rankings))
    } else {
      await writeLocalRankings(rankings)
    }

    // 计算新排名
    const sortedAfter = sortRankings([...rankings])
    const newRank = sortedAfter.findIndex(r => r.userId === userId) + 1
    const improved = newRank < rankBefore

    // 找下一名
    const nextUser = newRank > 1 ? sortedAfter[newRank - 2] : null
    const gapToNext = nextUser ? nextUser.scoreCount - scoreCount : 0

    return NextResponse.json({
      rank: newRank,
      prevRank: rankBefore,
      improved,
      currentScoreCount: scoreCount,
      nextUser: nextUser ? { userId: nextUser.userId, scoreCount: nextUser.scoreCount } : null,
      gapToNext: Math.max(0, gapToNext),
      source: isKVConfigured() ? 'vercel-kv' : 'local',
    })
  } catch (e) {
    console.error('Error processing ranking:', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
