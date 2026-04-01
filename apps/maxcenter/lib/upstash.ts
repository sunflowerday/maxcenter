/**
 * Upstash Redis REST API Client
 * 直接使用 Upstash REST API，不依赖 @vercel/kv SDK
 */

const KV_REST_API_URL = process.env.KV_REST_API_URL || ''
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN || ''

interface UpstashResponse {
  result?: string | null
  error?: string
}

async function upstashCommand(command: string, args: string[]): Promise<UpstashResponse> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    return { result: null }
  }

  try {
    const response = await fetch(KV_REST_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command,
        args,
      }),
    })

    return await response.json()
  } catch (error) {
    console.error('Upstash error:', error)
    return { error: String(error) }
  }
}

// 简化版：直接用 REST API
export async function kvGet(key: string): Promise<string | null> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    return null
  }

  try {
    const response = await fetch(`${KV_REST_API_URL}/get/${encodeURIComponent(key)}`, {
      headers: {
        'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
      },
    })

    const data = await response.json()
    // Upstash REST API 返回 { result: "value" } 或 { result: null }
    if (data && data.result) {
      return typeof data.result === 'string' ? data.result : JSON.stringify(data.result)
    }
    return null
  } catch (error) {
    console.error('kvGet error:', error)
    return null
  }
}

export async function kvSet(key: string, value: string): Promise<boolean> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    return false
  }

  try {
    // value 已经是 JSON 字符串，直接发送
    const response = await fetch(`${KV_REST_API_URL}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: value,
    })

    return response.ok
  } catch (error) {
    console.error('kvSet error:', error)
    return false
  }
}

export async function kvDel(key: string): Promise<boolean> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    return false
  }

  try {
    const response = await fetch(`${KV_REST_API_URL}/del/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
      },
    })

    return response.ok
  } catch (error) {
    console.error('kvDel error:', error)
    return false
  }
}

export function isKVConfigured(): boolean {
  return !!(KV_REST_API_URL && KV_REST_API_TOKEN)
}
