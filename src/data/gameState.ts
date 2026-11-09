export interface CompletedLevelRecord {
  stars: number
  highscore: number
  completedAt: string
}

export interface PlayerProgress {
  studentName: string
  studentLevel: number
  unlockedLevel: number
  completedLevels: Record<number, CompletedLevelRecord>
  totalStars: number
  totalCoins: number
  totalDiamonds: number
  totalXp: number
  collectedShapesCount: number
}

const STORAGE_KEY = 'petualangan_bangun_datar_save_v2'

export const DEFAULT_PROGRESS: PlayerProgress = {
  studentName: 'Rizki',
  studentLevel: 1,
  unlockedLevel: 1, // Only Level 1 is unlocked initially!
  completedLevels: {},
  totalStars: 0,
  totalCoins: 0,
  totalDiamonds: 45,
  totalXp: 0,
  collectedShapesCount: 0,
}

export function loadPlayerProgress(): PlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      const mergedCompleted: Record<number, CompletedLevelRecord> = {
        ...(parsed.completedLevels || {}),
      }

      // Compute unlockedLevel based on completed levels:
      // If level N is completed, level N+1 is guaranteed to be unlocked.
      let highestUnlocked = parsed.unlockedLevel || 1
      for (let i = 1; i <= 15; i++) {
        if (mergedCompleted[i]) {
          highestUnlocked = Math.max(highestUnlocked, Math.min(15, i + 1))
        }
      }

      return {
        ...DEFAULT_PROGRESS,
        ...parsed,
        unlockedLevel: Math.min(15, Math.max(1, highestUnlocked)),
        completedLevels: mergedCompleted,
      }
    }
  } catch (e) {
    console.error('Failed to load player progress from localStorage', e)
  }
  return DEFAULT_PROGRESS
}

export function savePlayerProgress(progress: PlayerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.error('Failed to save player progress to localStorage', e)
  }
}

export function completeLevelAndAdvance(
  currentLevelNumber: number,
  starsEarned: number,
  scoreEarned: number,
  coinsEarned: number,
  xpEarned: number,
  prevProgress: PlayerProgress
): PlayerProgress {
  const existingRecord = prevProgress.completedLevels[currentLevelNumber]
  const isFirstCompletion = !existingRecord
  const bestStars = Math.max(starsEarned, existingRecord?.stars || 0)
  const bestScore = Math.max(scoreEarned, existingRecord?.highscore || 0)

  // Sequential 1 to 15 level advancement:
  // Completing level N unlocks level N + 1 (up to level 15)
  const nextLevel = Math.min(15, currentLevelNumber + 1)
  const updatedUnlockedLevel = Math.max(prevProgress.unlockedLevel, nextLevel)

  // Star bonus (only award new stars if earned more than previous best)
  const newStarsDelta = isFirstCompletion
    ? starsEarned
    : Math.max(0, starsEarned - (existingRecord?.stars || 0))

  const updatedProgress: PlayerProgress = {
    ...prevProgress,
    unlockedLevel: updatedUnlockedLevel,
    completedLevels: {
      ...prevProgress.completedLevels,
      [currentLevelNumber]: {
        stars: bestStars,
        highscore: bestScore,
        completedAt: new Date().toISOString(),
      },
    },
    totalStars: prevProgress.totalStars + newStarsDelta,
    totalCoins: prevProgress.totalCoins + coinsEarned,
    totalXp: prevProgress.totalXp + xpEarned,
    studentLevel: Math.floor((prevProgress.totalXp + xpEarned) / 100) + 1,
    collectedShapesCount: Math.min(24, prevProgress.collectedShapesCount + (isFirstCompletion ? 1 : 0)),
  }

  savePlayerProgress(updatedProgress)
  return updatedProgress
}
