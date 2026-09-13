/**
 * LottieHeroPlayer — Lottie 애니메이션 + 커스텀 비디오 컨트롤
 *
 * - 재생/일시정지 버튼 + 타임라인 진행바
 * - 호버 시 컨트롤 표시, 벗어나면 사라짐
 * - 진행바는 직접 DOM 조작(setState 없이)으로 60fps에서도 성능 유지
 * - Cornerstone 페이지 video controls와 동일한 크림색 그라데이션 바
 */

import React, { useRef, useState, useCallback, CSSProperties } from 'react'
import LottieLib from 'lottie-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LottieComponent = ((LottieLib as any).default ?? LottieLib) as React.ComponentType<any>

// ── 인라인 SVG 아이콘 ──────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,3 17,10 5,17" fill="#1e1e1e" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4"  y="3" width="4" height="14" rx="1" fill="#1e1e1e" />
      <rect x="12" y="3" width="4" height="14" rx="1" fill="#1e1e1e" />
    </svg>
  )
}

// ── Props ─────────────────────────────────────────────────────────────────
interface LottieHeroPlayerProps {
  animationData: unknown
  className?: string
  style?: CSSProperties
}

// ── Component ─────────────────────────────────────────────────────────────
export function LottieHeroPlayer({ animationData, className, style }: LottieHeroPlayerProps) {
  // lottie ref — controls .play(), .pause(), .goToAndPlay()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null)

  // React state: only changes on user interaction → minimal re-renders
  const [playing, setPlaying]   = useState(true)
  const [hovered, setHovered]   = useState(false)

  // Direct DOM ref for the progress fill — updated at 60fps without setState
  const fillRef     = useRef<HTMLDivElement>(null)
  const thumbRef    = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const isDragging  = useRef(false)

  // ── frame tracking (direct DOM, no re-render) ──────────────────────────
  const handleEnterFrame = useCallback(() => {
    if (isDragging.current) return
    const item = lottieRef.current?.animationItem
    if (!item || !fillRef.current) return
    const pct = (item.currentFrame / item.totalFrames) * 100
    fillRef.current.style.width = `${pct}%`
    if (thumbRef.current) thumbRef.current.style.left = `${pct}%`
  }, [])

  // ── play / pause ───────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    if (playing) {
      lottieRef.current?.pause()
      setPlaying(false)
    } else {
      lottieRef.current?.play()
      setPlaying(true)
    }
  }, [playing])

  // ── seek helpers ───────────────────────────────────────────────────────
  const seekToRatio = useCallback((ratio: number) => {
    const item = lottieRef.current?.animationItem
    const total = item?.totalFrames ?? 240
    const frame = Math.max(0, Math.min(total - 1, Math.round(ratio * total)))
    lottieRef.current?.goToAndPlay(frame, true)
    setPlaying(true)
    // update bar immediately (before next enterFrame)
    if (fillRef.current)  fillRef.current.style.width  = `${ratio * 100}%`
    if (thumbRef.current) thumbRef.current.style.left  = `${ratio * 100}%`
  }, [])

  const ratioFromPointer = (e: { clientX: number }, el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect()
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  }

  // ── mouse seek on track ────────────────────────────────────────────────
  const handleTrackMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    isDragging.current = true
    seekToRatio(ratioFromPointer(e, e.currentTarget))

    const onMove = (ev: MouseEvent) => {
      if (trackRef.current) seekToRatio(ratioFromPointer(ev, trackRef.current))
    }
    const onUp = () => {
      isDragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [seekToRatio])

  // ── touch seek on track ────────────────────────────────────────────────
  const handleTrackTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true
    seekToRatio(ratioFromPointer(e.touches[0], e.currentTarget))

    const onMove = (ev: TouchEvent) => {
      if (trackRef.current) seekToRatio(ratioFromPointer(ev.touches[0], trackRef.current))
    }
    const onEnd = () => {
      isDragging.current = false
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
  }, [seekToRatio])

  // ── render ─────────────────────────────────────────────────────────────
  return (
    <div
      className={className}
      style={{ position: 'relative', ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // mobile: tap anywhere on the container to toggle controls
      onTouchStart={() => setHovered(h => !h)}
    >
      {/* Lottie animation */}
      <LottieComponent
        animationData={animationData}
        loop
        autoplay
        lottieRef={lottieRef}
        onEnterFrame={handleEnterFrame}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      {/* Controls overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '48px 20px 18px',
          background: 'linear-gradient(to top, rgba(247,244,240,0.96) 0%, rgba(247,244,240,0.5) 60%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.22s ease',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Progress bar track */}
        <div
          ref={trackRef}
          onMouseDown={handleTrackMouseDown}
          onTouchStart={handleTrackTouchStart}
          style={{
            flex: 1,
            height: '3px',
            background: 'rgba(30,30,30,0.18)',
            borderRadius: '2px',
            position: 'relative',
            cursor: 'pointer',
            // larger hit area without changing visual size
            padding: '6px 0',
            marginTop: '-6px',
            marginBottom: '-6px',
            boxSizing: 'content-box',
          }}
        >
          {/* Fill */}
          <div
            ref={fillRef}
            style={{
              position: 'absolute',
              top: 6,
              left: 0,
              height: '3px',
              width: '0%',
              background: '#1e1e1e',
              borderRadius: '2px',
              pointerEvents: 'none',
            }}
          />
          {/* Thumb dot */}
          <div
            ref={thumbRef}
            style={{
              position: 'absolute',
              top: 6,
              left: '0%',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#1e1e1e',
              transform: 'translate(-50%, -3.5px)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}
