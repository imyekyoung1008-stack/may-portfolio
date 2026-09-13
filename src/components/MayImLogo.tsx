import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import imgVariant2 from '../assets/icons/logo-variant2.png'

// ── dot grid from Figma node 741:34214 ──────────────────────────────────────
const COLUMNS: string[][] = [
  ['#1e1e1e', '#1e1e1e', '#1e1e1e'],
  ['#1e1e1e', '#1e1e1e', '#1e1e1e', '#1e1e1e', '#1e1e1e'],
  ['#1e1e1e', '#1e1e1e', '#fbf27e', '#1e1e1e', '#1e1e1e', '#1e1e1e', '#1e1e1e'],
  ['#1e1e1e', '#fbf27e', '#1e1e1e', '#1e1e1e', '#1e1e1e', '#1e1e1e', '#1e1e1e'],
  ['#1e1e1e', '#fbf27e', '#1e1e1e', '#1e1e1e', '#1e1e1e', '#fbf27e', '#1e1e1e'],
  ['#1e1e1e', '#1e1e1e', '#1e1e1e', '#1e1e1e', '#1e1e1e'],
  ['#1e1e1e', '#1e1e1e', '#1e1e1e'],
]

const STAGGER    = 0.02                                          // 0.02s per dot (was 0.025)
const DOT_DUR    = 0.12                                          // each dot animation duration
const TOTAL_DOTS = COLUMNS.reduce((n, col) => n + col.length, 0) // 37
const SWEEP_MS   = ((TOTAL_DOTS - 1) * STAGGER + DOT_DUR) * 1000 // 36*0.02+0.12 = 0.84s → 840ms

// Circle starts appearing while ~35% of dots are still animating away (crossfade)
const CIRCLE_IN_DELAY  = (TOTAL_DOTS - 1) * STAGGER * 0.65     // ~0.47s  (globe→circle)
const CIRCLE_IN_DUR    = 0.35
const CIRCLE_OUT_DUR   = 0.22

// Loop wait times
const WAIT_PHASE1_MS   = Math.ceil((CIRCLE_IN_DELAY + CIRCLE_IN_DUR) * 1000) + 60 // ~890ms — circle fully in
const PAUSE_MS         = 1700                                    // pause on yellow circle
const WAIT_PHASE3_MS   = SWEEP_MS + 280                          // all dots back + buffer → ~1120ms

// ── component ────────────────────────────────────────────────────────────────
type Phase = 'globe' | 'circle'

export function MayImLogo({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>('globe')

  useEffect(() => {
    let alive = true
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

    async function loop() {
      while (alive) {
        // ① globe → circle
        setPhase('circle')
        await wait(WAIT_PHASE1_MS)         // ~890ms: dots sweep + circle fade-in

        if (!alive) break

        // ② pause on yellow circle
        await wait(PAUSE_MS)               // 1700ms

        if (!alive) break

        // ③ circle → globe (circle fades out while dots reappear simultaneously)
        setPhase('globe')
        await wait(WAIT_PHASE3_MS)         // ~1120ms: dots sweep back
      }
    }

    loop()
    return () => { alive = false }
  }, [])

  let globalIdx = 0
  const columns = COLUMNS.map(col =>
    col.map(color => ({ color, delay: (globalIdx++) * STAGGER }))
  )

  return (
    <div
      className={className ?? 'w-[72px] h-[72px] shrink-0 block'}
      style={{ position: 'relative', padding: '10px', boxSizing: 'border-box' }}
    >
      {/* Globe pixel-art dot grid */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', width: '52px', height: '52px' }}>
        {columns.map((col, ci) => (
          <div
            key={ci}
            style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start', flexShrink: 0, width: '4px' }}
          >
            {col.map(({ color, delay }, ri) => (
              <motion.div
                key={ri}
                style={{ backgroundColor: color, width: '4px', height: '4px', flexShrink: 0 }}
                initial={{ scale: 1, opacity: 1 }}
                animate={
                  phase === 'circle'
                    ? { scale: 0, opacity: 0, transition: { delay, duration: DOT_DUR, ease: 'easeIn' } }
                    : { scale: 1, opacity: 1, transition: { delay, duration: DOT_DUR, ease: 'easeOut' } }
                }
              />
            ))}
          </div>
        ))}
      </div>

      {/* Variant2 — yellow circle */}
      <motion.img
        src={imgVariant2}
        alt=""
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={
          phase === 'circle'
            ? { opacity: 1, scale: 1,    transition: { delay: CIRCLE_IN_DELAY,  duration: CIRCLE_IN_DUR,  ease: 'easeOut' } }
            : { opacity: 0, scale: 0.85, transition: { delay: 0,                duration: CIRCLE_OUT_DUR, ease: 'easeIn'  } }
        }
      />
    </div>
  )
}
