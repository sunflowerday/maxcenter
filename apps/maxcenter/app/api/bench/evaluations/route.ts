/**
 * API Route: /api/bench/evaluations
 * 用户评测详情 API - 使用 Upstash REST API 存储
 */

import { NextRequest, NextResponse } from 'next/server'
import { kvGet, kvSet, kvDel, isKVConfigured } from '@/lib/upstash'

const EVALUATIONS_KEY_PREFIX = 'bench:evals:'
const DATA_DIR = 'data/evaluations'

interface EvaluationRecord {
  taskId: string
  score: number | null
  note?: string
  timestamp: string
}

// 本地文件操作
async function getLocalUserFile(userId: string): Promise<string> {
  const path = await import('path')
  return path.join(process.cwd(), DATA_DIR, `${userId}.json`)
}

async function readLocalEvaluations(userId: string): Promise<EvaluationRecord[]> {
  const fs = await import('fs')
  const filePath = await getLocalUserFile(userId)

  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const data = JSON.parse(content)
      return data.evaluations || []
    }
  } catch (e) {
    console.error('Error reading local evaluations:', e)
  }
  return []
}

async function writeLocalEvaluations(userId: string, evaluations: EvaluationRecord[]): Promise<void> {
  const fs = await import('fs')
  const path = await import('path')
  const filePath = await getLocalUserFile(userId)
  const dir = path.dirname(filePath)

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify(evaluations, null, 2))
  } catch (e) {
    console.error('Error writing local evaluations:', e)
  }
}

// GET /api/bench/evaluations?userId=xxx
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  try {
    let evaluations: EvaluationRecord[] = []

    if (isKVConfigured()) {
      const data = await kvGet(`${EVALUATIONS_KEY_PREFIX}${userId}`)
      evaluations = data ? JSON.parse(data) : []
    } else {
      evaluations = await readLocalEvaluations(userId)
    }

    return NextResponse.json({
      userId,
      evaluations,
      total: evaluations.length,
      source: isKVConfigured() ? 'vercel-kv' : 'local',
    })
  } catch (e) {
    console.error('Error fetching evaluations:', e)
    return NextResponse.json({ error: 'Failed to fetch evaluations' }, { status: 500 })
  }
}

// POST /api/bench/evaluations
// 保存单个评测记录
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, taskId, score, note } = body

    if (!userId || !taskId) {
      return NextResponse.json({ error: 'userId and taskId are required' }, { status: 400 })
    }

    let evaluations: EvaluationRecord[] = []

    // 读取现有数据
    if (isKVConfigured()) {
      const data = await kvGet(`${EVALUATIONS_KEY_PREFIX}${userId}`)
      evaluations = data ? JSON.parse(data) : []
    } else {
      evaluations = await readLocalEvaluations(userId)
    }

    // 查找是否已有该任务的评测
    const existingIndex = evaluations.findIndex(e => e.taskId === taskId)
    const newRecord: EvaluationRecord = {
      taskId,
      score: score ?? null,
      note: note || undefined,
      timestamp: new Date().toISOString(),
    }

    if (existingIndex >= 0) {
      evaluations[existingIndex] = newRecord
    } else {
      evaluations.push(newRecord)
    }

    // 保存
    if (isKVConfigured()) {
      await kvSet(`${EVALUATIONS_KEY_PREFIX}${userId}`, JSON.stringify(evaluations))
    } else {
      await writeLocalEvaluations(userId, evaluations)
    }

    return NextResponse.json({
      success: true,
      taskId,
      record: newRecord,
      totalEvaluations: evaluations.length,
      source: isKVConfigured() ? 'vercel-kv' : 'local',
    })
  } catch (e) {
    console.error('Error saving evaluation:', e)
    return NextResponse.json({ error: 'Failed to save evaluation' }, { status: 500 })
  }
}

// PUT /api/bench/evaluations
// 批量更新（保存整个评测会话）
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, evaluations } = body

    if (!userId || !Array.isArray(evaluations)) {
      return NextResponse.json({ error: 'userId and evaluations array are required' }, { status: 400 })
    }

    // 保存
    if (isKVConfigured()) {
      await kvSet(`${EVALUATIONS_KEY_PREFIX}${userId}`, JSON.stringify(evaluations))
    } else {
      await writeLocalEvaluations(userId, evaluations)
    }

    return NextResponse.json({
      success: true,
      userId,
      totalEvaluations: evaluations.length,
      source: isKVConfigured() ? 'vercel-kv' : 'local',
    })
  } catch (e) {
    console.error('Error saving evaluations:', e)
    return NextResponse.json({ error: 'Failed to save evaluations' }, { status: 500 })
  }
}

// DELETE /api/bench/evaluations?secret=xxx&userId=xxx
// 清除指定用户的评测数据
export async function DELETE(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const userId = request.nextUrl.searchParams.get('userId')
  const adminSecret = process.env.ADMIN_SECRET || 'maxloveuser'

  if (secret !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  try {
    if (isKVConfigured()) {
      await kvDel(`${EVALUATIONS_KEY_PREFIX}${userId}`)
    } else {
      const fs = await import('fs')
      const filePath = await getLocalUserFile(userId)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    return NextResponse.json({
      success: true,
      userId,
      message: 'User evaluations cleared',
      source: isKVConfigured() ? 'vercel-kv' : 'local',
    })
  } catch (e) {
    console.error('Error clearing evaluations:', e)
    return NextResponse.json({ error: 'Failed to clear evaluations' }, { status: 500 })
  }
}
