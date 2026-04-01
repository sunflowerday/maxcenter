"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { PinchBenchTask } from "@/lib/data/types"
import { cn } from "@/lib/utils"
import { IconChevronLeft, IconChevronRight, IconRotate, IconSend, IconMicrophone, IconAlertCircle, IconPlayerSkipForward, IconUser } from "@tabler/icons-react"
import { BenchTaskCard } from "@/components/max/bench-task-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { RankingPopup } from "@/components/max/ranking-popup"
import { EasterEggPopup } from "@/components/max/easter-egg-popup"
import { getRandomEasterEgg, easterEggs } from "@/lib/easter-eggs"

// Score type with note support
type TaskScore = {
  taskId: string
  score: number | null
  note?: string
  timestamp: number
}

// Session data type for localStorage
type SessionData = {
  sessionId: string
  userId: string
  startTime: number
  endTime?: number
  scores: TaskScore[]
  totalTasks: number
}

// Drag state type
type DragState = {
  isDragging: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
}

const STORAGE_KEY = "pinchbench_sessions"
const USER_KEY = "pinchbench_user_id"
const PROGRESS_KEY = "pinchbench_progress"
const SHUFFLE_KEY = "pinchbench_shuffled_order"

// Seeded random number generator for consistent shuffle per user
function seededRandom(seed: string): () => number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return function() {
    hash = Math.imul(hash ^ (hash >>> 16), 0x85ebca6b)
    hash = Math.imul(hash ^ (hash >>> 13), 0xc2b2ae35)
    hash ^= hash >>> 16
    return (hash >>> 0) / 4294967296
  }
}

// Fisher-Yates shuffle with seeded random
function shuffleTasks<T>(array: T[], seed: string): T[] {
  const result = [...array]
  const random = seededRandom(seed + '_' + array.length)
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// Swipe threshold - must drag at least this far to trigger
const SWIPE_THRESHOLD = 80
// Upward swipe threshold (Y axis)
const UP_SWIPE_THRESHOLD = 60

export default function BenchSwipePage() {
  // User identification
  const [userId, setUserId] = useState<string>("")
  const [showUserDialog, setShowUserDialog] = useState(true)

  // Tasks state
  const [tasks, setTasks] = useState<PinchBenchTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Session state
  const [sessionId, setSessionId] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scores, setScores] = useState<TaskScore[]>([])
  const [direction, setDirection] = useState<"left" | "right" | "up" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [exitDirection, setExitDirection] = useState<"left" | "right" | "up" | null>(null)
  const [currentNote, setCurrentNote] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [clickScore, setClickScore] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Ranking state
  const [showRankingPopup, setShowRankingPopup] = useState(false)
  const [rankingData, setRankingData] = useState<{
    rank: number
    prevRank: number
    improved: boolean
    currentScoreCount: number
    nextUser: { userId: string; scoreCount: number } | null
    gapToNext: number
    totalUsers: number
  } | null>(null)
  const [totalRankedUsers, setTotalRankedUsers] = useState(0)

  // Easter Egg state
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [easterEggTriggeredAt, setEasterEggTriggeredAt] = useState(0)
  const [lastEasterEggId, setLastEasterEggId] = useState<string>("")

  // Drag state for swipe gestures
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  })

  const totalTasks = tasks.length
  const currentTask = tasks[currentIndex]
  const progress = totalTasks > 0 ? ((currentIndex + 1) / totalTasks) * 100 : 0

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY)
    if (storedUser) {
      setUserId(storedUser)
      setShowUserDialog(false)
    }
  }, [])

  // Load tasks from API
  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true)

        const response = await fetch('/api/bench/tasks')
        const data = await response.json()

        const mappedTasks: PinchBenchTask[] = data.tasks.map((task: any) => ({
          id: task.id,
          cnName: task.cnName,
          type: task.type,
          initialUserMessage: task.initialUserMessage,
          hiddenContext: task.hiddenContext,
        }))

        if (mappedTasks.length > 0) {
          // Get current userId for shuffle persistence
          const currentUserId = localStorage.getItem(USER_KEY) || ""

          // Check for saved shuffled order
          const savedShuffle = localStorage.getItem(SHUFFLE_KEY)
          let orderedTasks = mappedTasks
          let restoredIndex = 0

          if (savedShuffle) {
            try {
              const shuffleData = JSON.parse(savedShuffle)
              // Verify it's for the same user and same task set
              if (shuffleData.userId === currentUserId && shuffleData.taskCount === mappedTasks.length) {
                // Restore the shuffled order
                const shuffledIds = shuffleData.shuffledIds as string[]
                const taskMap = new Map(mappedTasks.map(t => [t.id, t]))
                orderedTasks = shuffledIds
                  .map(id => taskMap.get(id))
                  .filter((t): t is PinchBenchTask => t !== undefined)

                // Restore progress
                restoredIndex = shuffleData.currentIndex || 0
                toast.info(`从第 ${restoredIndex + 1} 题继续 (随机顺序已恢复)`)
              } else {
                // Different user or task set - create new shuffle
                orderedTasks = shuffleTasks(mappedTasks, currentUserId)
                toast.success("已为您随机排序题目")
              }
            } catch {
              // Invalid shuffle data - create new shuffle
              orderedTasks = shuffleTasks(mappedTasks, currentUserId)
              toast.success("已为您随机排序题目")
            }
          } else {
            // First time - create new shuffle
            orderedTasks = shuffleTasks(mappedTasks, currentUserId)
            toast.success("已为您随机排序题目")
          }

          setTasks(orderedTasks)
          setCurrentIndex(restoredIndex)

          // Initialize new session
          const newSessionId = `session_${Date.now()}`
          setSessionId(newSessionId)
        } else {
          setError("No tasks found in the data source")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tasks")
        toast.error("Failed to load tasks")
      } finally {
        setLoading(false)
      }
    }
    loadTasks()
  }, [])

  // Handle user login
  const handleUserLogin = (newUserId: string) => {
    if (!newUserId.trim()) {
      toast.error("请输入用户标识")
      return
    }
    setUserId(newUserId.trim())
    localStorage.setItem(USER_KEY, newUserId.trim())
    setShowUserDialog(false)
    toast.success(`欢迎, ${newUserId.trim()}!`)
  }

  // Switch user - reset all scoring state
  const handleSwitchUser = () => {
    // Reset all scoring state
    setCurrentIndex(0)
    setScores([])
    setCurrentNote("")
    setShowSummary(false)
    setDirection(null)
    setExitDirection(null)
    setClickScore(null)
    // Stop any ongoing recording
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
    // Clear localStorage progress
    localStorage.removeItem(PROGRESS_KEY)
    // Show user dialog
    setShowUserDialog(true)
  }

  // Web Speech API setup
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognitionCtor) {
        recognitionRef.current = new SpeechRecognitionCtor()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "zh-CN"

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            }
          }

          setCurrentNote((prev) => prev + finalTranscript)
        }

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error:", event.error)
          setIsRecording(false)
        }

        recognitionRef.current.onend = () => {
          setIsRecording(false)
        }
      }
    }
  }, [])


  const toggleRecording = useCallback(() => {
    if (!recognitionRef.current) {
      toast.error("您的浏览器不支持语音输入")
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }, [isRecording])

  // Save session to localStorage
  const saveSession = useCallback(() => {
    if (!sessionId || tasks.length === 0 || !userId) return

    const sessions: SessionData[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    const existingIndex = sessions.findIndex((s) => s.sessionId === sessionId)

    const sessionData: SessionData = {
      sessionId,
      userId,
      startTime: parseInt(sessionId.split("_")[1]),
      scores,
      totalTasks: tasks.length,
    }

    if (existingIndex >= 0) {
      sessions[existingIndex] = sessionData
    } else {
      sessions.push(sessionData)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))

    // Save current progress (currentIndex) separately for quick resume
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      sessionId,
      currentIndex,
      timestamp: Date.now(),
    }))

    // Save shuffled order for persistence across sessions
    const shuffleData = {
      userId,
      taskCount: tasks.length,
      shuffledIds: tasks.map(t => t.id),
      currentIndex,
      timestamp: Date.now(),
    }
    localStorage.setItem(SHUFFLE_KEY, JSON.stringify(shuffleData))
  }, [sessionId, scores, tasks, userId, currentIndex])

  // Auto-save session when scores change
  useEffect(() => {
    if (scores.length > 0) {
      saveSession()
    }
  }, [scores, saveSession])

  const handleScore = useCallback((score: number | null) => {
    if (isAnimating || !currentTask) return
    setIsAnimating(true)

    // Show click score feedback
    setClickScore(score)

    // 动画方向: 不通过=左飞, 通过=右飞, 一般般=上飞
    const animDir: "left" | "right" | "up" | null =
      score === null ? null :
      score >= 4 ? "right" :  // 通过 = 右飞
      score === 3 ? "up" :     // 一般般 = 上飞
      "left"                   // 不通过 = 左飞

    setDirection(animDir)
    setExitDirection(animDir)

    const newScore: TaskScore = {
      taskId: currentTask.id,
      score,
      note: currentNote.trim() || undefined,
      timestamp: Date.now()
    }

    setScores((prev) => [...prev, newScore])

    // Track if ranking popup was shown
    let rankingShown = false

    // Update ranking (skip for null scores/skip)
    if (score !== null && userId) {
      const newScoreCount = scores.length + 1 // +1 because we just added
      fetch('/api/bench/rankings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, scoreCount: newScoreCount }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.improved) {
            // User improved their rank - show ranking popup
            setRankingData({
              rank: data.rank,
              prevRank: data.prevRank,
              improved: data.improved,
              currentScoreCount: data.currentScoreCount,
              nextUser: data.nextUser,
              gapToNext: data.gapToNext,
              totalUsers: data.rank + (data.nextUser ? 0 : 0),
            })
            // Delay popup to let card animation finish
            setTimeout(() => {
              setShowRankingPopup(true)
              rankingShown = true
            }, 600)
          }
          setTotalRankedUsers(data.rank + 5) // Approximate

          // Check for Easter Egg if ranking didn't show (priority to ranking)
          if (!rankingShown) {
            const questionsSinceLastEasterEgg = scores.length - easterEggTriggeredAt
            if (questionsSinceLastEasterEgg >= 4) {
              const triggerAt = 4 + Math.floor(Math.random() * 3)
              if (questionsSinceLastEasterEgg >= triggerAt) {
                const egg = getRandomEasterEgg()
                setLastEasterEggId(egg.id)
                setEasterEggTriggeredAt(scores.length)
                setTimeout(() => setShowEasterEgg(true), 600)
              }
            }
          }
        })
        .catch((err) => {
          console.error(err)
          // Even if ranking API fails, try Easter Egg
          const questionsSinceLastEasterEgg = scores.length - easterEggTriggeredAt
          if (questionsSinceLastEasterEgg >= 4) {
            const triggerAt = 4 + Math.floor(Math.random() * 3)
            if (questionsSinceLastEasterEgg >= triggerAt) {
              const egg = getRandomEasterEgg()
              setLastEasterEggId(egg.id)
              setEasterEggTriggeredAt(scores.length)
              setTimeout(() => setShowEasterEgg(true), 600)
            }
          }
        })
    } else if (score === null) {
      // Skip score - still check for Easter Egg
      const questionsSinceLastEasterEgg = scores.length - easterEggTriggeredAt
      if (questionsSinceLastEasterEgg >= 4) {
        const triggerAt = 4 + Math.floor(Math.random() * 3)
        if (questionsSinceLastEasterEgg >= triggerAt) {
          const egg = getRandomEasterEgg()
          setLastEasterEggId(egg.id)
          setEasterEggTriggeredAt(scores.length)
          setTimeout(() => setShowEasterEgg(true), 600)
        }
      }
    }

    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }

    // 500ms 后切换卡片（飞走动画 1500ms 主要用于视觉效果）
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1
        if (next >= totalTasks) {
          setShowSummary(true)
          return prev
        }
        return next
      })
      setDirection(null)
      setExitDirection(null)
      setIsAnimating(false)
      setClickScore(null)
      setCurrentNote("")
    }, 500)
  }, [currentIndex, currentTask, isAnimating, totalTasks, currentNote, isRecording, easterEggTriggeredAt])

  const handleSkip = useCallback(() => handleScore(null), [handleScore])

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true)
      setDirection("left")
      // Capture score before setTimeout to avoid stale closure
      const prevScoreNote = scores[scores.length - 1]?.note
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1)
        setScores((prev) => prev.slice(0, -1))
        setCurrentNote(prevScoreNote || "")
        setDirection(null)
        setIsAnimating(false)
      }, 200)
    }
  }, [currentIndex, isAnimating, scores])

  const handleReset = useCallback(() => {
    // Save current session before reset
    if (scores.length > 0) {
      saveSession()
    }

    const newSessionId = `session_${Date.now()}`
    setSessionId(newSessionId)
    setCurrentIndex(0)
    setScores([])
    setDirection(null)
    setShowSummary(false)
    setCurrentNote("")
    setIsRecording(false)
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    // Clear saved progress and shuffle order for fresh start
    localStorage.removeItem(PROGRESS_KEY)
    localStorage.removeItem(SHUFFLE_KEY)

    // Reload page to get fresh shuffled order
    window.location.reload()
  }, [scores.length, saveSession])

  // ===== SWIPE GESTURE HANDLERS =====
  // Tinder-style swipe: left (1.5), right (4.5), up (3)

  const onDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating || showSummary) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    setDragState({
      isDragging: true,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
    })
  }, [isAnimating, showSummary])

  const onDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragState.isDragging) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    setDragState(prev => ({
      ...prev,
      currentX: clientX,
      currentY: clientY,
    }))
  }, [dragState.isDragging])

  const onDragEnd = useCallback(() => {
    if (!dragState.isDragging) return

    const deltaX = dragState.currentX - dragState.startX
    const deltaY = dragState.currentY - dragState.startY
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // Determine swipe direction and score
    // Priority: horizontal for left/right, vertical for up
    if (absX > absY && absX > SWIPE_THRESHOLD) {
      // Horizontal swipe
      if (deltaX > 0) {
        // Right swipe -> 4.5
        handleScore(4.5)
      } else {
        // Left swipe -> 1.5
        handleScore(1.5)
      }
    } else if (absY > absX && deltaY < -UP_SWIPE_THRESHOLD) {
      // Upward swipe -> 3
      handleScore(3)
    }

    // Reset drag state
    setDragState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    })
  }, [dragState, handleScore])

  // Calculate card transform based on drag
  // 注意：动画进行中时不应用拖拽transform，让飞走动画执行
  const getCardTransform = () => {
    // 如果正在执行飞走动画，不应用任何transform
    if (isAnimating || exitDirection) return undefined

    // 如果没有在拖拽，返回中性位置
    if (!dragState.isDragging) return undefined

    const deltaX = dragState.currentX - dragState.startX
    const deltaY = dragState.currentY - dragState.startY

    // Limit the movement
    const maxMove = 200
    const clampedX = Math.max(-maxMove, Math.min(maxMove, deltaX))
    const clampedY = Math.max(-maxMove, Math.min(maxMove / 2, deltaY))

    // Rotation based on horizontal movement
    const rotation = clampedX * 0.05

    return `translate(${clampedX}px, ${clampedY}px) rotate(${rotation}deg)`
  }

  // Calculate opacity and overlay based on drag
  const getSwipeFeedback = useCallback(() => {
    if (!dragState.isDragging) return null

    const deltaX = dragState.currentX - dragState.startX
    const deltaY = dragState.currentY - dragState.startY
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // 业务逻辑:
    // - 左滑 = 不通过 (红色, 1.5分), 卡片左飞
    // - 右滑 = 通过 (绿色, 4.5分), 卡片右飞
    // - 上滑 = 一般般 (黄色, 3分), 卡片上飞
    if (absX > absY) {
      if (deltaX < -SWIPE_THRESHOLD) return { direction: 'left', score: 1.5 } // 左滑 = 不通过
      if (deltaX > SWIPE_THRESHOLD) return { direction: 'right', score: 4.5 } // 右滑 = 通过
    } else if (absY > absX && deltaY < -UP_SWIPE_THRESHOLD) {
      return { direction: 'up', score: 3 } // 上滑 = 一般般
    }
    return null
  }, [dragState])

  const swipeFeedback = getSwipeFeedback()

  // 根据分数获取显示文字
  const getScoreText = (score: number | null) => {
    if (score === null) return ''
    if (score <= 2) return '不通过'
    if (score === 3) return '一般般'
    return '通过'
  }

  // 根据分数获取文字颜色 (深色，用于 feedback 文字)
  const getScoreColor = (score: number | null) => {
    if (score === null) return { color: 'var(--muted-foreground)' }
    if (score <= 2) return { color: 'var(--score-low)' }
    if (score === 3) return { color: 'var(--score-mid)' }
    return { color: 'var(--score-high)' }
  }

  // 根据分数获取按钮颜色 (浅色) - 使用 inline style
  const getButtonColorStyle = (score: number) => {
    if (score <= 2) {
      return score === 1
        ? { borderColor: 'var(--score-low)', color: 'var(--score-low)' }
        : { borderColor: 'var(--score-low-light)', color: 'var(--score-low-light)' }
    }
    if (score === 3) {
      return { borderColor: 'var(--score-mid-light)', color: 'var(--score-mid-light)' }
    }
    return { borderColor: 'var(--score-high-light)', color: 'var(--score-high-light)' }
  }

  // 根据分数获取方向 (用于点击按钮时的动画)
  const getScoreDirection = (score: number | null): 'left' | 'right' | 'up' | null => {
    if (score === null) return null
    if (score <= 2) return 'left' // 不通过 = 左飞动画
    if (score === 3) return 'up' // 一般般 = 上飞动画
    return 'right' // 通过 = 右飞动画
  }

  // Keyboard navigation with swipe shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSummary) return
      if (e.target instanceof HTMLTextAreaElement) return
      if (showUserDialog) return

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          handleScore(1.5) // Left = 不通过
          break
        case "ArrowUp":
          e.preventDefault()
          handleScore(3) // Up = 一般般
          break
        case "ArrowRight":
          e.preventDefault()
          handleScore(4.5) // Right = 通过
          break
        case "1": case "2": case "3": case "4": case "5":
          e.preventDefault()
          handleScore(parseInt(e.key))
          break
        case "s": case "S": case "Escape":
          e.preventDefault()
          handleSkip()
          break
        case "z": // Ctrl/Cmd+Z for undo
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault()
            handlePrevious()
          }
          break
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handlePrevious, handleSkip, handleScore, showSummary, showUserDialog])

  // 卡片飞走动画 - 使用 CSS animation 而不是 transition
  // 这样动画会在完成后自动停止，不需要等待 setTimeout
  const cardAnimationClass = isAnimating && exitDirection ? `animate-card-exit-${exitDirection}` : ""

  const cardWrapperClass = cn(
    "absolute inset-0 z-10",
    cardAnimationClass
  )

  // Stats
  const scoredTasks = scores.filter((s) => s.score !== null)
  const skippedCount = scores.filter((s) => s.score === null).length
  const avgScore = scoredTasks.length > 0
    ? scoredTasks.reduce((sum, s) => sum + (s.score || 0), 0) / scoredTasks.length
    : 0
  const scoreDistribution = {
    1: scoredTasks.filter((s) => s.score === 1).length,
    2: scoredTasks.filter((s) => s.score === 2).length,
    3: scoredTasks.filter((s) => s.score === 3).length,
    4: scoredTasks.filter((s) => s.score === 4).length,
    5: scoredTasks.filter((s) => s.score === 5).length,
  }

  const nextTask = tasks[currentIndex + 1]

  // User Login Dialog
  if (showUserDialog) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto">
                <IconUser className="size-6 sm:size-7 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">请输入用户标识</h2>
              <p className="text-sm text-muted-foreground">
                用于区分不同评分者的数据
              </p>
            </div>
            <UserLoginForm onSubmit={handleUserLogin} defaultValue={userId} />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full size-8 sm:size-10 border-b-2 border-primary" />
          <p className="text-muted-foreground text-sm sm:text-base">加载任务数据...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || tasks.length === 0) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <IconAlertCircle className="size-8 sm:size-10 text-muted-foreground" />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-1">无法加载任务</h2>
            <p className="text-muted-foreground text-sm">{error || "未找到任务数据"}</p>
            <p className="text-xs text-muted-foreground mt-2">
              数据来自 lib/data/bench-tasks.ts
            </p>
          </div>
          <Button onClick={() => window.location.reload()} className="min-h-[44px]">
            重试
          </Button>
        </div>
      </div>
    )
  }

  return (
    // 移动端: flex-1 min-h-0 填充剩余空间 (父容器已 offset header)
    // 桌面端: h-[calc(100vh-4rem)] 减去 sidebar
    <div
      className="flex flex-1 min-h-0 flex-col overflow-hidden sm:h-[calc(100vh-4rem)]"
      style={{
        touchAction: 'pan-x pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Header - 固定高度，有足够呼吸空间 */}
      <div className="flex items-center justify-between px-3 pt-2 pb-2 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm sm:text-base text-muted-foreground font-medium tabular-nums">
            {currentIndex + 1} / {totalTasks}
          </span>
          <div className="hidden sm:flex items-center gap-1">
            <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-semibold text-orange-500">{userId}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs sm:h-7 sm:text-sm"
            onClick={handleSwitchUser}
          >
            切换
          </Button>
        </div>
      </div>

      {/* Card Area - 控制最大高度，水平居中 */}
      <div className="flex-1 w-full max-w-lg mx-auto flex flex-col min-h-0 px-3 pb-2">
        <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl border border-border/30 bg-card shadow-lg">
          {/* 下一张卡片预览 - 滑动时升起 */}
          {nextTask && !showSummary && (
            <div
              className={cn(
                "absolute inset-0",
                isAnimating && "animate-slide-up-from-bottom"
              )}
            >
              <BenchTaskCard task={nextTask} className="w-full h-full opacity-50 scale-95" />
            </div>
          )}

          {!showSummary ? (
            <div
              ref={cardRef}
              role="button"
              tabIndex={0}
              aria-label={`任务卡片: ${currentTask.cnName}. 滑动或按方向键评分.`}
              className={cn("absolute inset-0 z-10", cardWrapperClass)}
              style={{
                transform: getCardTransform(),
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') handleScore(1.5)
                else if (e.key === 'ArrowUp') handleScore(3)
                else if (e.key === 'ArrowRight') handleScore(4.5)
              }}
              data-testid="card-stack"
            >
              <BenchTaskCard
                task={currentTask}
                className="w-full h-full cursor-grab active:cursor-grabbing"
                onDragStart={onDragStart}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
              />

              {/* Score Feedback - 显示评分文字和颜色 */}
              {(swipeFeedback || clickScore !== null) && (() => {
                const score = swipeFeedback?.score ?? clickScore
                const dir = swipeFeedback?.direction ?? getScoreDirection(clickScore)
                return (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={cn(
                        "text-2xl sm:text-4xl font-bold rounded-xl px-4 sm:px-6 py-2 sm:py-3",
                        dir === 'left' && '-rotate-12',
                        dir === 'right' && 'rotate-12',
                      )}
                      style={getScoreColor(score)}
                    >
                      [{getScoreText(score)}]
                    </div>
                  </div>
                )
              })()}
            </div>
          ) : (
            <Card className="h-full overflow-auto">
              <CardContent className="flex flex-col items-center justify-center h-full gap-4 p-4">
                <div className="p-4 rounded-full" style={{ backgroundColor: 'color-mix(in oklch, var(--score-high) 10%, transparent)' }}>
                  <IconSend className="size-8" style={{ color: 'var(--score-high)' }} />
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold mb-1">评分完成!</h2>
                  <p className="text-sm text-muted-foreground">
                    已完成 {scoredTasks.length} / {totalTasks} 题
                  </p>
                </div>

                {/* Score distribution compact */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: 'var(--score-low)' }}>{scoreDistribution[1] + scoreDistribution[2]}</p>
                    <p className="text-xs text-muted-foreground">不通过</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: 'var(--score-mid)' }}>{scoreDistribution[3]}</p>
                    <p className="text-xs text-muted-foreground">一般般</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: 'var(--score-high)' }}>{scoreDistribution[4] + scoreDistribution[5]}</p>
                    <p className="text-xs text-muted-foreground">通过</p>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={handleReset} className="mt-2">
                  <IconRotate className="size-4 mr-2" />
                  重新开始
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

      </div>

      {/* Controls - 与卡片宽度统一 */}
      <div className="shrink-0 w-full max-w-lg mx-auto px-3 pb-3 pt-1 space-y-2">
        {/* Note Input */}
        {!showSummary && (
          <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm px-3 py-1.5">
            <Textarea
              ref={textareaRef}
              placeholder="备注..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="flex-1 min-h-[28px] h-7 sm:h-8 resize-none text-xs sm:text-sm border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ fontSize: '16px' }}
            />
            <Button
              variant={isRecording ? "destructive" : "ghost"}
              size="icon"
              className="size-7 sm:size-8 shrink-0"
              onClick={toggleRecording}
            >
              {isRecording ? (
                <span className="relative flex size-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-3 bg-red-500" />
                </span>
              ) : (
                <IconMicrophone className="size-3.5 sm:size-4" />
              )}
            </Button>
          </div>
        )}

        {/* Score Buttons */}
        {!showSummary && (
          <div className="flex items-center justify-between gap-2">
            {/* Left: Navigation buttons */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                aria-label="返回上一题"
                className="size-9 sm:size-10 shrink-0"
                onClick={handlePrevious}
                disabled={currentIndex === 0 || isAnimating}
              >
                <IconChevronLeft className="size-4 sm:size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="下一题"
                className="size-9 sm:size-10 shrink-0"
                onClick={() => setCurrentIndex((p) => Math.min(p + 1, totalTasks - 1))}
                disabled={currentIndex === totalTasks - 1 || isAnimating}
              >
                <IconChevronRight className="size-4 sm:size-5" />
              </Button>
            </div>

            {/* Right: Score buttons 1-5 */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((score) => (
                <Button
                  key={score}
                  variant="outline"
                  aria-label={`评分 ${score}`}
                  className="size-10 sm:size-12 text-sm sm:text-base font-bold shrink-0"
                  style={getButtonColorStyle(score)}
                  onClick={() => handleScore(score)}
                  disabled={isAnimating}
                >
                  {score}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Dialog */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-sm sm:max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base">评分汇总</DialogTitle>
            <DialogDescription className="text-xs">
              已完成 {scoredTasks.length} / {totalTasks} 题
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-3">
            {/* Score distribution - simplified */}
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--score-low)' }}>{scoreDistribution[1] + scoreDistribution[2]}</p>
                <p className="text-xs text-muted-foreground">不通过</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--score-mid)' }}>{scoreDistribution[3]}</p>
                <p className="text-xs text-muted-foreground">一般般</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--score-high)' }}>{scoreDistribution[4] + scoreDistribution[5]}</p>
                <p className="text-xs text-muted-foreground">通过</p>
              </div>
            </div>

            {/* Notes summary */}
            {scores.filter((s) => s.note).length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium">备注 ({scores.filter((s) => s.note).length}):</p>
                <div className="space-y-1 max-h-28 overflow-y-auto">
                  {scores.filter((s) => s.note).map((s, i) => (
                    <div key={i} className="p-1.5 rounded bg-muted text-[10px]">
                      <span className="font-mono font-medium">{s.taskId}</span>
                      {s.score !== null && (
                        <Badge variant="secondary" className="ml-2 text-[10px]">{getScoreText(s.score)}</Badge>
                      )}
                      <p className="text-muted-foreground mt-0.5">{s.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">最近评分:</p>
              <div className="space-y-0.5 max-h-24 overflow-y-auto">
                {scores.slice(-10).reverse().map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-0.5">
                    <span className="font-mono text-[10px] truncate max-w-[120px]">{s.taskId}</span>
                    {s.score !== null ? (
                      <Badge className="text-[10px]" style={getScoreColor(s.score)}>
                        {getScoreText(s.score)}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">跳过</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Session info */}
            <div className="p-2 rounded bg-muted/50 text-[10px] text-muted-foreground">
              <p>用户: {userId}</p>
              <p>评分已自动保存</p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full" onClick={handleReset}>
            <IconRotate className="size-4 mr-2" />
            重新开始
          </Button>
        </DialogContent>
      </Dialog>

      {/* Ranking Popup */}
      <RankingPopup
        isOpen={showRankingPopup}
        currentRank={rankingData?.rank || 1}
        totalUsers={totalRankedUsers || rankingData?.rank || 10}
        nextUser={rankingData?.nextUser || null}
        gapToNext={rankingData?.gapToNext || 0}
        yourScoreCount={rankingData?.currentScoreCount || scoredTasks.length}
        onClose={() => setShowRankingPopup(false)}
      />

      {/* Easter Egg Popup */}
      <EasterEggPopup
        isOpen={showEasterEgg}
        easterEgg={lastEasterEggId ? easterEggs.find(e => e.id === lastEasterEggId) || null : null}
        onClose={() => setShowEasterEgg(false)}
      />
    </div>
  )
}

// User Login Form Component
function UserLoginForm({ onSubmit, defaultValue }: { onSubmit: (userId: string) => void; defaultValue: string }) {
  const [value, setValue] = useState(defaultValue)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(value)
      }}
      className="space-y-3"
    >
      <Input
        placeholder="输入你的名字或标识"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        className="min-h-[44px]"
      />
      <Button type="submit" className="w-full min-h-[44px]">
        开始评分
      </Button>
    </form>
  )
}
