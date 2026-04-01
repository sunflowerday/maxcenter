/**
 * API Route: /api/bench/evaluations
 * 用户评测详情 API - 使用 Vercel KV (Upstash Redis) 存储
 */

import { NextRequest, NextResponse } from 'next/server'

// Vercel KV imports (支持本地开发和 Vercel 部署)
let kv: any = null

async function getKV() {
  if (kv) return kv

  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { createClient } = await import('@vercel/kv')
    kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
    return kv
  }

  return null
}

// 数据存储配置
const EVALUATIONS_KEY_PREFIX = 'bench:evals:'
const EVALUATIONS_LIST_KEY = 'bench:evaluations:users'
const DATA_DIR = 'data/evaluations'

interface EvaluationRecord {
  taskId: string
  score: number | null  // null = 跳过
  note?: string
  timestamp: string
}

interface UserEvaluations {
  userId: string
  evaluations: EvaluationRecord[]
  updatedAt: string
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
    const data: UserEvaluations = {
      userId,
      evaluations,
      updatedAt: new Date().toISOString(),
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
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
    const kvClient = await getKV()
    let evaluations: EvaluationRecord[] = []

    if (kvClient) {
      const data = await kvClient.get(`${EVALUATIONS_KEY_PREFIX}${userId}`)
      evaluations = data ? JSON.parse(data) : []
    } else {
      evaluations = await readLocalEvaluations(userId)
    }

    return NextResponse.json({
      userId,
      evaluations,
      total: evaluations.length,
      source: kvClient ? 'vercel-kv' : 'local',
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

    const kvClient = await getKV()
    let evaluations: EvaluationRecord[] = []

    // 读取现有数据
    if (kvClient) {
      const data = await kvClient.get(`${EVALUATIONS_KEY_PREFIX}${userId}`)
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
      // 更新现有记录
      evaluations[existingIndex] = newRecord
    } else {
      // 新增记录
      evaluations.push(newRecord)
    }

    // 保存
    if (kvClient) {
      await kvClient.set(`${EVALUATIONS_KEY_PREFIX}${userId}`, JSON.stringify(evaluations))
    } else {
      await writeLocalEvaluations(userId, evaluations)
    }

    return NextResponse.json({
      success: true,
      taskId,
      record: newRecord,
      totalEvaluations: evaluations.length,
      source: kvClient ? 'vercel-kv' : 'local',
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

    const kvClient = await getKV()

    // 保存
    if (kvClient) {
      await kvClient.set(`${EVALUATIONS_KEY_PREFIX}${userId}`, JSON.stringify(evaluations))
    } else {
      await writeLocalEvaluations(userId, evaluations)
    }

    return NextResponse.json({
      success: true,
      userId,
      totalEvaluations: evaluations.length,
      source: kvClient ? 'vercel-kv' : 'local',
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
    const kvClient = await getKV()

    if (kvClient) {
      await kvClient.del(`${EVALUATIONS_KEY_PREFIX}${userId}`)
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
      source: kvClient ? 'vercel-kv' : 'local',
    })
  } catch (e) {
    console.error('Error clearing evaluations:', e)
    return NextResponse.json({ error: 'Failed to clear evaluations' }, { status: 500 })
  }
}
