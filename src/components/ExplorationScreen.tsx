import { useState, useEffect, useRef } from 'react'
import { sounds } from '../soundEngine'
import triaPlayerImg from '../assets/tria-player.png'
import { ALL_LEVELS } from '../data/levelsData'

interface ExplorationScreenProps {
  levelNumber?: number
  onPause: () => void
  onCompleteExploration: (
    coinsCollected: number,
    shapesCollected: number,
    remainingLives: number
  ) => void
  onBackToMap: () => void
}

interface Platform {
  x: number
  y: number
  w: number
  h: number
  isMoving?: boolean
  minX?: number
  maxX?: number
  speedX?: number
  isBouncy?: boolean
}

export type ShapeItemType =
  | 'coin'
  | 'triangle'
  | 'square'
  | 'circle'
  // Level 2 (Sisi & Titik Sudut)
  | 'square_vertices'
  | 'rectangle_sides'
  | 'triangle_vertices'
  | 'circle_zero'
  | 'star_quad'
  // Level 3 (Benda Bangun Datar Sehari-hari)
  | 'clock_item'
  | 'roof_item'
  | 'tile_item'
  | 'door_item'
  | 'wheel_item'

interface Item {
  id: number
  type: ShapeItemType
  x: number
  y: number
  collected: boolean
  label?: string
  feedback?: string
}

// Reusable SVG Shape component ensuring consistent sizing and styling
export function ShapeIcon({
  type,
  size = 28,
}: {
  type: ShapeItemType
  size?: number
}) {
  // 1. Triangle (Level 1)
  if (type === 'triangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg shape-triangle" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <defs>
          <linearGradient id="yellowTriGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
          <filter id="triDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#854D0E" floodOpacity="0.4" />
          </filter>
        </defs>
        <polygon points="14,3 26,25 2,25" fill="url(#yellowTriGrad)" stroke="#CA8A04" strokeWidth="1.8" strokeLinejoin="round" filter="url(#triDrop)" />
        <polygon points="14,6 23,23 5,23" fill="#FEF08A" opacity="0.38" />
      </svg>
    )
  }

  // 2. Square (Level 1)
  if (type === 'square') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg shape-square" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <defs>
          <linearGradient id="blueSquareGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <filter id="squareDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#1E3A8A" floodOpacity="0.4" />
          </filter>
        </defs>
        <rect x="3" y="3" width="22" height="22" rx="4" ry="4" fill="url(#blueSquareGrad)" stroke="#1D4ED8" strokeWidth="1.8" filter="url(#squareDrop)" />
        <rect x="5" y="5" width="18" height="18" rx="2" ry="2" fill="#93C5FD" opacity="0.35" />
      </svg>
    )
  }

  // 3. Circle (Level 1)
  if (type === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg shape-circle" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <defs>
          <linearGradient id="pinkCircleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
          <filter id="circleDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#831843" floodOpacity="0.4" />
          </filter>
        </defs>
        <circle cx="14" cy="14" r="11" fill="url(#pinkCircleGrad)" stroke="#BE185D" strokeWidth="1.8" filter="url(#circleDrop)" />
        <circle cx="12" cy="11" r="7" fill="#FBCFE8" opacity="0.4" />
      </svg>
    )
  }

  // ================= LEVEL 2 (SISI & TITIK SUDUT) =================
  // 4. Square with 4 vertex dots
  if (type === 'square_vertices') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <rect x="4" y="4" width="20" height="20" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
        <circle cx="4" cy="4" r="3" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
        <circle cx="24" cy="4" r="3" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
        <circle cx="24" cy="24" r="3" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
        <circle cx="4" cy="24" r="3" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
      </svg>
    )
  }

  // 5. Rectangle with highlighted 4 sides
  if (type === 'rectangle_sides') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <rect x="3" y="6" width="22" height="16" rx="2" fill="#10B981" stroke="#047857" strokeWidth="2" strokeDasharray="4,1" />
        <line x1="3" y1="6" x2="25" y2="6" stroke="#FBBF24" strokeWidth="2.5" />
        <line x1="25" y1="6" x2="25" y2="22" stroke="#FBBF24" strokeWidth="2.5" />
        <line x1="25" y1="22" x2="3" y2="22" stroke="#FBBF24" strokeWidth="2.5" />
        <line x1="3" y1="22" x2="3" y2="6" stroke="#FBBF24" strokeWidth="2.5" />
      </svg>
    )
  }

  // 6. Triangle with 3 vertex dots
  if (type === 'triangle_vertices') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <polygon points="14,4 25,24 3,24" fill="#F59E0B" stroke="#B45309" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="14" cy="4" r="3" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
        <circle cx="25" cy="24" r="3" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
        <circle cx="3" cy="24" r="3" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
      </svg>
    )
  }

  // 7. Circle without vertices
  if (type === 'circle_zero') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <circle cx="14" cy="14" r="11" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
        <circle cx="14" cy="14" r="7" fill="none" stroke="#FDE047" strokeWidth="1.2" strokeDasharray="3,2" />
        <text x="14" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800">0</text>
      </svg>
    )
  }

  // 8. Star Quadrilateral
  if (type === 'star_quad') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <polygon points="14,2 24,14 14,26 4,14" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="1.8" />
        <circle cx="14" cy="2" r="2.2" fill="#FDE047" />
        <circle cx="24" cy="14" r="2.2" fill="#FDE047" />
        <circle cx="14" cy="26" r="2.2" fill="#FDE047" />
        <circle cx="4" cy="14" r="2.2" fill="#FDE047" />
      </svg>
    )
  }

  // ================= LEVEL 3 (BENDA SEHARI-HARI DI HUTAN) =================
  // 9. Wall clock (Jam Dinding - Lingkaran)
  if (type === 'clock_item') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <circle cx="14" cy="14" r="12" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
        <circle cx="14" cy="14" r="9.5" fill="#FFFFFF" />
        <line x1="14" y1="14" x2="14" y2="7" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="14" y1="14" x2="19" y2="14" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="14" r="1.5" fill="#DC2626" />
      </svg>
    )
  }

  // 10. Triangular roof (Atap Tenda - Segitiga)
  if (type === 'roof_item') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <polygon points="14,3 26,23 2,23" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.8" strokeLinejoin="round" />
        <polygon points="14,6 23,21 5,21" fill="#FCA5A5" opacity="0.35" />
        <line x1="14" y1="3" x2="14" y2="23" stroke="#FDE047" strokeWidth="1.5" />
      </svg>
    )
  }

  // 11. Ceramic Tile (Ubin Keramik - Persegi)
  if (type === 'tile_item') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <rect x="3" y="3" width="22" height="22" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
        <line x1="14" y1="3" x2="14" y2="25" stroke="#E0F2FE" strokeWidth="1.2" />
        <line x1="3" y1="14" x2="25" y2="14" stroke="#E0F2FE" strokeWidth="1.2" />
        <rect x="8" y="8" width="12" height="12" fill="none" stroke="#FFFFFF" strokeWidth="1.2" transform="rotate(45 14 14)" />
      </svg>
    )
  }

  // 12. Door (Pintu - Persegi Panjang)
  if (type === 'door_item') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <rect x="6" y="3" width="16" height="22" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1.8" />
        <rect x="8" y="5" width="12" height="8" rx="1" fill="#D97706" />
        <rect x="8" y="15" width="12" height="8" rx="1" fill="#D97706" />
        <circle cx="19" cy="15" r="1.5" fill="#FDE047" />
      </svg>
    )
  }

  // 13. Wheel (Roda - Lingkaran)
  if (type === 'wheel_item') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
        <circle cx="14" cy="14" r="12" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="9" fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
        <line x1="14" y1="3" x2="14" y2="25" stroke="#94A3B8" strokeWidth="1" />
        <line x1="3" y1="14" x2="25" y2="14" stroke="#94A3B8" strokeWidth="1" />
        <line x1="6" y1="6" x2="22" y2="22" stroke="#94A3B8" strokeWidth="1" />
        <line x1="6" y1="22" x2="22" y2="6" stroke="#94A3B8" strokeWidth="1" />
        <circle cx="14" cy="14" r="3" fill="#F59E0B" />
      </svg>
    )
  }

  // Default: Gold Coin
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" className="shape-svg shape-coin" style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}>
      <defs>
        <linearGradient id="goldCoinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="coinDrop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#78350F" floodOpacity="0.4" />
        </filter>
      </defs>
      <circle cx="14" cy="14" r="11" fill="url(#goldCoinGrad)" stroke="#D97706" strokeWidth="1.8" filter="url(#coinDrop)" />
      <circle cx="14" cy="14" r="7.5" fill="none" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2,2" />
      <polygon points="14,8.5 15.6,12.5 19.8,12.7 16.5,15.2 17.6,19.3 14,16.8 10.4,19.3 11.5,15.2 8.2,12.7 12.4,12.5" fill="#FEF3C7" />
    </svg>
  )
}

function getInitialPlatforms(levelNumber: number): Platform[] {
  if (levelNumber === 2) {
    // Level 2: Lembah Bentuk (Canyon ledges with moving plateau)
    return [
      { x: 0, y: 440, w: 140, h: 40 }, // Canyon ground
      { x: 160, y: 410, w: 85, h: 25 }, // Stepping rock
      { x: 260, y: 345, w: 90, h: 25, isMoving: true, minX: 235, maxX: 295, speedX: 0.8 }, // Moving plateau
      { x: 110, y: 280, w: 105, h: 25 }, // Middle canyon cliff
      { x: 15, y: 210, w: 85, h: 25 }, // High canyon rock
      { x: 135, y: 155, w: 100, h: 25 }, // Canyon arch ledge
      { x: 260, y: 100, w: 135, h: 30 }, // Summit cliff (Goal Flag)
    ]
  }

  if (levelNumber === 3) {
    // Level 3: Hutan Bentuk (Tree branches and bouncy spring-mushrooms)
    return [
      { x: 0, y: 440, w: 130, h: 40 }, // Forest mossy floor
      { x: 155, y: 415, w: 75, h: 30, isBouncy: true }, // Spring Mushroom #1
      { x: 255, y: 320, w: 110, h: 25 }, // Oak branch platform
      { x: 110, y: 255, w: 105, h: 25 }, // Hollow log
      { x: 15, y: 195, w: 70, h: 28, isBouncy: true }, // Spring Mushroom #2
      { x: 120, y: 140, w: 105, h: 25 }, // High canopy foliage
      { x: 255, y: 90, w: 135, h: 30 }, // Treehouse canopy (Goal Flag)
    ]
  }

  // Level 1: Pulau Bentuk
  return [
    { x: 0, y: 440, w: 160, h: 40 }, // Ground 1
    { x: 190, y: 390, w: 120, h: 30 }, // Platform 2
    { x: 70, y: 320, w: 110, h: 25 }, // Platform 3
    { x: 230, y: 240, w: 110, h: 25 }, // Platform 4
    { x: 100, y: 160, w: 120, h: 25 }, // Platform 5
    { x: 260, y: 110, w: 130, h: 30 }, // Goal Platform
  ]
}

function getInitialItems(levelNumber: number): Item[] {
  if (levelNumber === 2) {
    return [
      { id: 1, type: 'triangle_vertices', x: 195, y: 370, collected: false, label: 'Segitiga', feedback: '🔺 Segitiga: 3 Sisi & 3 Titik Sudut!' },
      { id: 2, type: 'square_vertices', x: 295, y: 305, collected: false, label: 'Persegi', feedback: '🟦 Persegi: 4 Titik Sudut Siku-Siku!' },
      { id: 3, type: 'rectangle_sides', x: 150, y: 240, collected: false, label: 'Persegi Panjang', feedback: '▭ Persegi Panjang: 4 Sisi Lurus!' },
      { id: 4, type: 'circle_zero', x: 48, y: 170, collected: false, label: 'Lingkaran', feedback: '🔴 Lingkaran: 1 Sisi Lengkung, 0 Sudut!' },
      { id: 5, type: 'star_quad', x: 175, y: 115, collected: false, label: 'Segi Empat', feedback: '🔲 Segi Empat: 4 Sisi & 4 Sudut!' },
      { id: 6, type: 'coin', x: 315, y: 60, collected: false },
      { id: 7, type: 'coin', x: 130, y: 370, collected: false },
    ]
  }

  if (levelNumber === 3) {
    return [
      { id: 1, type: 'clock_item', x: 290, y: 280, collected: false, label: 'Jam Dinding', feedback: '⏰ Jam Dinding: Bentuk Lingkaran!' },
      { id: 2, type: 'roof_item', x: 150, y: 215, collected: false, label: 'Atap Tenda', feedback: '⛺ Atap Rumah: Bentuk Segitiga!' },
      { id: 3, type: 'tile_item', x: 45, y: 155, collected: false, label: 'Ubin Keramik', feedback: '🪟 Ubin Keramik: Bentuk Persegi 4 Sisi!' },
      { id: 4, type: 'door_item', x: 160, y: 100, collected: false, label: 'Pintu Pondok', feedback: '🚪 Pintu: Bentuk Persegi Panjang 4 Sisi!' },
      { id: 5, type: 'wheel_item', x: 295, y: 50, collected: false, label: 'Roda Gerobak', feedback: '🛞 Roda Sepeda: Bentuk Lingkaran!' },
      { id: 6, type: 'coin', x: 190, y: 375, collected: false },
      { id: 7, type: 'coin', x: 80, y: 215, collected: false },
    ]
  }

  // Level 1: Pulau Bentuk
  return [
    { id: 1, type: 'triangle', x: 230, y: 350, collected: false, label: 'Segitiga', feedback: '🔺 Menemukan Segitiga!' },
    { id: 2, type: 'square', x: 110, y: 280, collected: false, label: 'Persegi', feedback: '🟦 Menemukan Persegi!' },
    { id: 3, type: 'coin', x: 140, y: 280, collected: false },
    { id: 4, type: 'circle', x: 270, y: 200, collected: false, label: 'Lingkaran', feedback: '🔴 Menemukan Lingkaran!' },
    { id: 5, type: 'coin', x: 150, y: 120, collected: false },
    { id: 6, type: 'coin', x: 320, y: 70, collected: false },
  ]
}

export function ExplorationScreen({
  levelNumber = 1,
  onPause,
  onCompleteExploration,
  onBackToMap,
}: ExplorationScreenProps) {
  const [coins, setCoins] = useState(levelNumber === 3 ? 18 : levelNumber === 2 ? 15 : 12)
  const [shapesCount, setShapesCount] = useState(0)
  const totalShapes = 5
  const [hasReachedGoal, setHasReachedGoal] = useState(false)
  const [itemFeedback, setItemFeedback] = useState<string | null>(null)
  const feedbackTimerRef = useRef<number | null>(null)

  // 3 Bintang Nyawa Pemain
  const [lives, setLives] = useState(3)
  const [isGameOver, setIsGameOver] = useState(false)
  const isRespawningRef = useRef(false)

  // Platforms state (supports moving platforms)
  const [platforms, setPlatforms] = useState<Platform[]>(() => getInitialPlatforms(levelNumber))
  const platformsRef = useRef<Platform[]>(getInitialPlatforms(levelNumber))

  // Collectibles state
  const [items, setItems] = useState<Item[]>(() => getInitialItems(levelNumber))

  // Player physics state
  const playerRef = useRef({
    x: 40,
    y: 380,
    vx: 0,
    vy: 0,
    w: 44,
    h: 48,
    onGround: true,
  })

  const [playerPos, setPlayerPos] = useState({ x: 40, y: 380, facingRight: true })

  // Key controls state
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({
    left: false,
    right: false,
    jump: false,
  })

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = true
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isGameOver])

  // Restart level when lives depleted or player chooses repeat
  const handleRestartLevel = () => {
    sounds.playClick()
    setLives(3)
    setIsGameOver(false)
    setHasReachedGoal(false)
    setCoins(levelNumber === 3 ? 18 : levelNumber === 2 ? 15 : 12)
    setShapesCount(0)
    const freshItems = getInitialItems(levelNumber)
    setItems(freshItems)
    const freshPlats = getInitialPlatforms(levelNumber)
    setPlatforms(freshPlats)
    platformsRef.current = freshPlats
    const p = playerRef.current
    p.x = 40
    p.y = 380
    p.vx = 0
    p.vy = 0
    p.onGround = true
    setPlayerPos({ x: 40, y: 380, facingRight: true })
  }

  const showItemBanner = (text: string) => {
    setItemFeedback(text)
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
    feedbackTimerRef.current = window.setTimeout(() => {
      setItemFeedback(null)
    }, 2200)
  }

  // Physics loop
  useEffect(() => {
    let animId: number
    const gravity = 0.5
    const jumpStrength = -10
    const moveSpeed = 3.6

    const loop = () => {
      const p = playerRef.current

      if (isGameOver) {
        p.vx = 0
        p.vy = 0
        animId = requestAnimationFrame(loop)
        return
      }

      // Update moving platforms (Level 2)
      let platsChanged = false
      const currentPlats = platformsRef.current
      for (const plat of currentPlats) {
        if (plat.isMoving && plat.speedX !== undefined) {
          plat.x += plat.speedX
          if (plat.minX !== undefined && plat.x <= plat.minX) {
            plat.speedX = Math.abs(plat.speedX)
          } else if (plat.maxX !== undefined && plat.x >= plat.maxX) {
            plat.speedX = -Math.abs(plat.speedX)
          }
          platsChanged = true

          // Carry player if on top of moving platform
          if (
            p.onGround &&
            p.x + p.w > plat.x &&
            p.x < plat.x + plat.w &&
            Math.abs(p.y + p.h - plat.y) <= 4
          ) {
            p.x += plat.speedX
          }
        }
      }
      if (platsChanged) {
        setPlatforms([...currentPlats])
      }

      // Horizontal movement
      if (keysRef.current.left) {
        p.vx = -moveSpeed
      } else if (keysRef.current.right) {
        p.vx = moveSpeed
      } else {
        p.vx = 0
      }

      // Jump
      if (keysRef.current.jump && p.onGround) {
        p.vy = jumpStrength
        p.onGround = false
        sounds.playClick()
      }

      // Apply gravity
      p.vy += gravity
      p.x += p.vx
      p.y += p.vy

      // Arena horizontal bounds
      if (p.x < 10) p.x = 10
      if (p.x > 380) p.x = 380

      // Platform collision detection
      p.onGround = false
      for (const plat of currentPlats) {
        if (
          p.x + p.w > plat.x &&
          p.x < plat.x + plat.w &&
          p.y + p.h >= plat.y &&
          p.y + p.h <= plat.y + 14 &&
          p.vy >= 0
        ) {
          if (plat.isBouncy) {
            // Level 3: Bouncy Mushroom Spring Launch!
            sounds.playBoing()
            p.vy = -12.5
            p.onGround = false
            showItemBanner('🍄 Lompatan Jamur Melenting!')
          } else {
            p.y = plat.y - p.h
            p.vy = 0
            p.onGround = true
          }
          break
        }
      }

      // Bottom fall detection -> Deduct exactly 1 life!
      if (p.y > 480 && !isRespawningRef.current && !isGameOver) {
        isRespawningRef.current = true
        sounds.playBoing()

        setLives((prevLives) => {
          const nextLives = Math.max(0, prevLives - 1)
          if (nextLives <= 0) {
            setIsGameOver(true)
          }
          return nextLives
        })

        // Respawn player at initial ground platform
        p.x = 40
        p.y = 380
        p.vx = 0
        p.vy = 0

        setTimeout(() => {
          isRespawningRef.current = false
        }, 500)
      }

      // Check item collection
      setItems((prevItems) => {
        let changed = false
        const nextItems = prevItems.map((item) => {
          if (!item.collected) {
            const dist = Math.hypot(p.x + 18 - item.x, p.y + 18 - item.y)
            if (dist < 26) {
              changed = true
              if (item.type === 'coin') {
                sounds.playCoin()
                setCoins((c) => c + 1)
              } else {
                sounds.playSuccess()
                setShapesCount((s) => Math.min(totalShapes, s + 1))
                if (item.feedback) {
                  showItemBanner(item.feedback)
                }
              }
              return { ...item, collected: true }
            }
          }
          return item
        })
        return changed ? nextItems : prevItems
      })

      // Check reaching goal flag
      const goalTriggerX = levelNumber === 3 ? 270 : levelNumber === 2 ? 275 : 280
      const goalTriggerY = levelNumber === 3 ? 100 : levelNumber === 2 ? 110 : 120
      if (p.x >= goalTriggerX && p.y <= goalTriggerY && !hasReachedGoal && !isGameOver) {
        setHasReachedGoal(true)
        sounds.playFanfare()
        setTimeout(() => {
          // Otomatis lanjut ke Kuis Soal!
          onCompleteExploration(coins, shapesCount, lives)
        }, 800)
      }

      setPlayerPos({
        x: p.x,
        y: p.y,
        facingRight: p.vx >= 0,
      })

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [hasReachedGoal, isGameOver, coins, shapesCount, lives, levelNumber, onCompleteExploration])

  // Screen theme CSS classes
  const currentLevelInfo = ALL_LEVELS.find((l) => l.levelNumber === levelNumber)

  const themeClass =
    levelNumber === 3 || (levelNumber >= 4 && levelNumber <= 6)
      ? 'exploration-forest'
      : levelNumber === 2 || (levelNumber >= 7 && levelNumber <= 9)
      ? 'exploration-valley'
      : (levelNumber >= 13)
      ? 'exploration-valley'
      : 'exploration-island'

  const levelTitle = currentLevelInfo
    ? `Level ${levelNumber}: ${currentLevelInfo.title}`
    : `Level ${levelNumber}`

  const missionText = currentLevelInfo
    ? currentLevelInfo.tujuan
    : 'Kumpulkan semua bentuk bangun datar!'

  // Flag coordinates per level
  const flagPos =
    levelNumber === 3
      ? { left: '330px', top: '50px' }
      : levelNumber === 2
      ? { left: '330px', top: '60px' }
      : { left: '330px', top: '70px' }

  return (
    <div className={`game-screen-wrapper exploration-screen ${themeClass}`}>
      {/* Dynamic Themed Backdrop */}
      <div className="exploration-backdrop">
        {levelNumber === 2 && (
          <div className="valley-sky-scenery">
            <div className="canyon-ridge ridge-back" />
            <div className="canyon-ridge ridge-front" />
            <div className="canyon-sun-glow" />
          </div>
        )}
        {levelNumber === 3 && (
          <div className="forest-sky-scenery">
            <div className="forest-canopy-layer" />
            <div className="forest-sunbeams" />
            <div className="forest-firefly firefly-1" />
            <div className="forest-firefly firefly-2" />
            <div className="forest-firefly firefly-3" />
          </div>
        )}
        {levelNumber === 1 && (
          <>
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
          </>
        )}
      </div>

      {/* Screen HUD Overlay */}
      <div className="game-ui-layer">
        {/* Top Header Bar */}
        <div className="exploration-top-bar">
          <button className="hud-circle-btn" onClick={onPause} title="Jeda Permainan">
            ⏸️
          </button>

          <div className="hud-pill coins-pill" title={`Koin Terkumpul: ${coins}`}>
            <span className="hud-icon">🟡</span>
            <span className="hud-val">{coins}</span>
          </div>

          {/* 3 Bintang Sebagai Indikator Nyawa Pemain */}
          <div className="hud-stars-pill" title={`Nyawa Pemain: ${lives} / 3 Kesempatan`}>
            <span className="hud-lives-label">Nyawa:</span>
            <div className="hud-lives-stars">
              {[1, 2, 3].map((starNum) => (
                <span
                  key={starNum}
                  className={`hud-life-star ${starNum <= lives ? 'active' : 'lost'}`}
                  title={starNum <= lives ? 'Nyawa Aktif' : 'Nyawa Hilang'}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>

          <button
            className="hud-skip-btn"
            onClick={() => {
              sounds.playFanfare()
              onCompleteExploration(coins, shapesCount, lives)
            }}
            title="Lanjut ke Soal Kuis"
          >
            Kuis ➔
          </button>
        </div>

        {/* Mission Box */}
        <div className="exploration-mission-card">
          <div className="mission-title-row">
            <span className="mission-level-badge">{levelTitle}</span>
          </div>
          <div className="mission-prompt">{missionText}</div>
          <div className="mission-shapes-row">
            {levelNumber === 1 && (
              <>
                <span className="mission-shape-badge" title="Segitiga Kuning">
                  <ShapeIcon type="triangle" size={20} />
                </span>
                <span className="mission-shape-badge" title="Persegi Biru">
                  <ShapeIcon type="square" size={20} />
                </span>
                <span className="mission-shape-badge" title="Lingkaran Merah Muda">
                  <ShapeIcon type="circle" size={20} />
                </span>
              </>
            )}

            {levelNumber === 2 && (
              <>
                <span className="mission-shape-badge" title="Segitiga (3 Titik Sudut)">
                  <ShapeIcon type="triangle_vertices" size={20} />
                </span>
                <span className="mission-shape-badge" title="Persegi (4 Titik Sudut)">
                  <ShapeIcon type="square_vertices" size={20} />
                </span>
                <span className="mission-shape-badge" title="Persegi Panjang (4 Sisi)">
                  <ShapeIcon type="rectangle_sides" size={20} />
                </span>
                <span className="mission-shape-badge" title="Lingkaran (0 Sudut)">
                  <ShapeIcon type="circle_zero" size={20} />
                </span>
              </>
            )}

            {levelNumber === 3 && (
              <>
                <span className="mission-shape-badge" title="Jam Dinding (Lingkaran)">
                  <ShapeIcon type="clock_item" size={20} />
                </span>
                <span className="mission-shape-badge" title="Atap Tenda (Segitiga)">
                  <ShapeIcon type="roof_item" size={20} />
                </span>
                <span className="mission-shape-badge" title="Ubin Kayu (Persegi)">
                  <ShapeIcon type="tile_item" size={20} />
                </span>
                <span className="mission-shape-badge" title="Pintu Pondok (Persegi Panjang)">
                  <ShapeIcon type="door_item" size={20} />
                </span>
                <span className="mission-shape-badge" title="Roda Gerobak (Lingkaran)">
                  <ShapeIcon type="wheel_item" size={20} />
                </span>
              </>
            )}

            {levelNumber > 3 && (
              <>
                <span className="mission-shape-badge" title="Segitiga Kuning">
                  <ShapeIcon type="triangle" size={20} />
                </span>
                <span className="mission-shape-badge" title="Persegi Biru">
                  <ShapeIcon type="square" size={20} />
                </span>
                <span className="mission-shape-badge" title="Lingkaran Merah Muda">
                  <ShapeIcon type="circle" size={20} />
                </span>
              </>
            )}

            <span className="mission-shape-count">
              {shapesCount}/{totalShapes}
            </span>
          </div>
        </div>

        {/* Floating Item Pickup Educational Feedback */}
        {itemFeedback && (
          <div className="item-feedback-pill">
            {itemFeedback}
          </div>
        )}

        {/* Game Arena with Platforms and Collectibles */}
        <div className="platformer-arena">
          {/* Platforms */}
          {platforms.map((plat, idx) => {
            let platClass = 'floating-platform'
            if (plat.isBouncy) platClass += ' bouncy-mushroom-platform'
            if (plat.isMoving) platClass += ' moving-canyon-platform'

            return (
              <div
                key={idx}
                className={platClass}
                style={{
                  left: `${plat.x}px`,
                  top: `${plat.y}px`,
                  width: `${plat.w}px`,
                  height: `${plat.h}px`,
                }}
              >
                {plat.isBouncy ? (
                  <div className="mushroom-composite">
                    <div className="mushroom-cap">
                      <span className="mushroom-dot dot-1" />
                      <span className="mushroom-dot dot-2" />
                      <span className="mushroom-spring-text">▲ Lenting!</span>
                    </div>
                    <div className="mushroom-stem" />
                  </div>
                ) : levelNumber === 2 ? (
                  <div className="canyon-platform-rock">
                    <div className="canyon-top-strata" />
                    <div className="canyon-body-strata" />
                    {plat.isMoving && <span className="moving-arrow-hint">◀ ▶</span>}
                  </div>
                ) : levelNumber === 3 ? (
                  <div className="forest-platform-wood">
                    <div className="forest-moss-top" />
                    <div className="forest-bark-bottom" />
                  </div>
                ) : (
                  <>
                    <div className="platform-grass" />
                    <div className="platform-rock" />
                  </>
                )}
              </div>
            )
          })}

          {/* Goal Flag on top platform */}
          <div
            className="goal-flag"
            style={flagPos}
            title="Bendera Finish: Capai untuk lanjut ke Kuis Soal!"
          >
            🚩
          </div>

          {/* Collectible Items */}
          {items.map((item) =>
            !item.collected ? (
              <div
                key={item.id}
                className={`collectible-item ${item.type}`}
                style={{ left: `${item.x}px`, top: `${item.y}px` }}
                title={item.label || item.type}
              >
                <ShapeIcon type={item.type} size={28} />
              </div>
            ) : null
          )}

          {/* Tria Player Mascot */}
          <div
            className={`tria-player ${playerPos.facingRight ? 'face-right' : 'face-left'}`}
            style={{
              left: `${playerPos.x}px`,
              top: `${playerPos.y}px`,
            }}
          >
            <img src={triaPlayerImg} alt="Tria Mascot" className="tria-game-sprite" />
          </div>
        </div>

        {/* Mobile On-Screen Virtual Controls */}
        <div className="virtual-controls-bar">
          <div className="dpad-left-right">
            <button
              className="ctrl-btn"
              onPointerDown={() => (keysRef.current.left = true)}
              onPointerUp={() => (keysRef.current.left = false)}
              onPointerLeave={() => (keysRef.current.left = false)}
              title="Gerak Kiri"
            >
              ◀
            </button>
            <button
              className="ctrl-btn"
              onPointerDown={() => (keysRef.current.right = true)}
              onPointerUp={() => (keysRef.current.right = false)}
              onPointerLeave={() => (keysRef.current.right = false)}
              title="Gerak Kanan"
            >
              ▶
            </button>
          </div>

          <div className="dpad-jump">
            <button
              className="ctrl-btn jump-btn"
              onPointerDown={() => (keysRef.current.jump = true)}
              onPointerUp={() => (keysRef.current.jump = false)}
              onPointerLeave={() => (keysRef.current.jump = false)}
              title="Lompat"
            >
              ▲
            </button>
          </div>
        </div>

        {/* Notifikasi Nyawa Habis (Game Over Modal) */}
        {isGameOver && (
          <div className="game-over-modal-backdrop">
            <div className="game-over-modal-card">
              <div className="game-over-icon-glow">
                <span className="game-over-stars-empty">💔</span>
              </div>
              <h3 className="game-over-title">Nyawa Habis!</h3>
              <p className="game-over-desc">
                Kamu kehabisan 3 bintang nyawa karena terjatuh dari platform. Silakan mengulang permainan dari awal!
              </p>
              <div className="game-over-actions">
                <button
                  className="game-over-btn repeat-btn"
                  onClick={handleRestartLevel}
                  title="Mulai kembali permainan dari awal dengan 3 nyawa penuh"
                >
                  <span className="btn-icon">🔄</span> Ulangi
                </button>
                <button
                  className="game-over-btn map-btn"
                  onClick={onBackToMap}
                  title="Kembali ke Peta Petualangan"
                >
                  <span className="btn-icon">🗺️</span> Kembali ke Peta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
