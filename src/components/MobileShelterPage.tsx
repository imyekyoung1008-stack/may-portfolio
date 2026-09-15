// MobileShelterPage.tsx — Homeless Shelter Management System (Mobile < 768px)
// ★ ShelterPage.tsx(데스크톱) / TabletShelterPage.tsx(태블릿)은 절대 건드리지 않음. 이 파일만 편집.

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'
import { useLottieAnimation } from '../hooks/useLottieAnimation'
import { LottieHeroPlayer } from './LottieHeroPlayer'

import shelterUI01Json from '../assets/lottie/shelter-ui-01.json'
import vidUsage01 from '../assets/videos/shelter-usage-01.mp4'
import vidUsage02 from '../assets/videos/shelter-usage-02.mp4'
import vidUsage03 from '../assets/videos/shelter-usage-03.mp4'
import vidUsage04 from '../assets/videos/shelter-usage-04.mp4'
import vidUI02    from '../assets/videos/shelter-ui-02.mp4'
import vidUI03    from '../assets/videos/shelter-ui-03.mp4'
import vidUI04    from '../assets/videos/shelter-ui-04.mp4'

import imgOverviewDiagram   from '../assets/images/shelter-overview-diagram.webp'
import imgFieldResearch     from '../assets/images/shelter-field-research.webp'
import imgS1Before          from '../assets/images/s1_before.webp'
import imgS1After           from '../assets/images/s1_after.webp'
import imgS2Before          from '../assets/images/s2_before.webp'
import imgS2After           from '../assets/images/s2_after.webp'
import imgS3Notification    from '../assets/images/s3-notification.webp'
import imgNFCSolution       from '../assets/images/nfc-implemented-solution.webp'
import imgCnaiTh            from '../assets/images/cnai-thumb.png'
import imgS31Before         from '../assets/images/s3-1_before.webp'
import imgS31After          from '../assets/images/s3-1_after.webp'
import imgS32Before         from '../assets/images/s3-2_before.webp'
import imgS32After          from '../assets/images/s3-2_after.webp'
import imgMockupScreen      from '../assets/images/mockup-screen.webp'
import imgProblemDefinition from '../assets/images/problem-definition.webp'
import icClose              from '../assets/icons/close.svg'

import vidCornerstoneDemo from '../assets/videos/cornerstone-thumb-v2.mp4'

const poppins = "'Poppins', sans-serif"

// ─────────────────────────────────────────────────
// Feature Walkthrough 캐러셀 — 데이터 & 카드 컴포넌트
// ─────────────────────────────────────────────────

type MUIMedia =
  | { type: 'lottie'; animationData: unknown }
  | { type: 'video';  src: string }

interface MStepData {
  num: string
  title: string
  description?: string
  usageVideo: string
  uiMedia: MUIMedia
}

const M_STEPS: MStepData[] = [
  {
    num: '01',
    title: 'Resident Status Tracking',
    description: 'Instantly update and check resident status via NFC tagging',
    usageVideo: vidUsage01,
    uiMedia: { type: 'lottie', animationData: shelterUI01Json },
  },
  {
    num: '02',
    title: 'Leave & Overnight Requests',
    usageVideo: vidUsage02,
    uiMedia: { type: 'video', src: vidUI02 },
  },
  {
    num: '03',
    title: 'Never Miss a Notification',
    usageVideo: vidUsage03,
    uiMedia: { type: 'video', src: vidUI03 },
  },
  {
    num: '04',
    title: 'Personalized Jobs and Programs',
    usageVideo: vidUsage04,
    uiMedia: { type: 'video', src: vidUI04 },
  },
]

// 카드 크기: 200×323 (usage), 200×322 (UI) — 270×436/435 기준 200/270 배율
const M_CARD_W   = 200
const M_USAGE_H  = 323
const M_UI_H     = 322
const M_CARD_GAP = 12  // UsageCard ↔ UICard 간격
const M_SET_GAP  = 16  // 세트 간 간격

function MPauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="3.5" height="12" rx="1" fill="white" />
      <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="white" />
    </svg>
  )
}
function MPlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <polygon points="2,1 13,7 2,13" fill="white" />
    </svg>
  )
}

// 사용 영상 카드 — M_CARD_W × M_USAGE_H
function MUsageCard({ num, usageVideo }: { num: string; usageVideo: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (isPlaying) { v.pause() } else { v.play().catch(() => {}) }
    setIsPlaying(!isPlaying)
  }

  return (
    <div style={{
      position: 'relative', width: `${M_CARD_W}px`, height: `${M_USAGE_H}px`,
      overflow: 'hidden', flexShrink: 0,
    }}>
      <video
        ref={videoRef}
        src={usageVideo}
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 52%)',
      }} />
      <p style={{
        position: 'absolute', top: '12px', left: '12px', margin: 0,
        fontFamily: poppins, fontSize: '35px', fontWeight: 500, lineHeight: 1,
        color: 'white', letterSpacing: '-1.4px',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {num}
      </p>
      <button
        type="button" onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        style={{
          position: 'absolute', bottom: '12px', left: '12px',
          display: 'flex', alignItems: 'center', gap: '3px',
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          borderRadius: '1000px',
          border: 'none',
          paddingTop: '5px', paddingBottom: '5px',
          paddingLeft: '7px', paddingRight: '9px',
          cursor: 'pointer',
          fontFamily: poppins, fontSize: '12px', fontWeight: 500, color: 'white',
          outline: 'none',
        }}
      >
        {isPlaying ? <MPauseIcon /> : <MPlayIcon />}
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

// 컨트롤바 (UI 영상 카드 전용)
function MControlBar({
  isPlaying, progress, onToggle, onSeek,
}: {
  isPlaying: boolean
  progress: number
  onToggle: () => void
  onSeek: (ratio: number) => void
}) {
  const barRef = useRef<HTMLDivElement>(null)

  const calcRatio = (clientX: number): number => {
    const rect = barRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return 0
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    onSeek(calcRatio(e.clientX))
    const onMove = (ev: MouseEvent) => onSeek(calcRatio(ev.clientX))
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '7px 12px 9px',
      background: 'rgba(0,0,0,0.18)',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
    }}>
      <button
        type="button" onClick={onToggle}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        style={{
          background: 'none', border: 'none', padding: 0, margin: 0,
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          flexShrink: 0, outline: 'none',
        }}
      >
        {isPlaying ? <MPauseIcon /> : <MPlayIcon />}
      </button>
      <div
        ref={barRef}
        onMouseDown={handleMouseDown}
        style={{
          flex: 1, height: '2px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '2px',
          cursor: 'pointer',
          position: 'relative',
          userSelect: 'none',
        }}
      >
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${Math.min(100, progress * 100)}%`,
          background: 'white',
          borderRadius: '2px',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}

// UI 영상 카드 — M_CARD_W × M_UI_H
function MUICard({ step }: { step: MStepData }) {
  const MEDIA_TOP = step.description ? 78 : 60
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress,  setProgress ] = useState(0)

  const lottieContainerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<AnimationItem | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (step.uiMedia.type !== 'lottie') return
    const container = lottieContainerRef.current
    if (!container) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: step.uiMedia.animationData as any,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    })
    animRef.current = anim
    const onFrame = () => {
      if (anim.totalFrames > 0) setProgress(anim.currentFrame / anim.totalFrames)
    }
    anim.addEventListener('enterFrame', onFrame)
    return () => {
      anim.removeEventListener('enterFrame', onFrame)
      anim.destroy()
      animRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (step.uiMedia.type !== 'video') return
    const v = videoRef.current
    if (!v) return
    const onTimeUpdate = () => {
      if (v.duration) setProgress(v.currentTime / v.duration)
    }
    v.addEventListener('timeupdate', onTimeUpdate)
    return () => v.removeEventListener('timeupdate', onTimeUpdate)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const togglePlay = () => {
    if (step.uiMedia.type === 'lottie') {
      if (isPlaying) animRef.current?.pause()
      else           animRef.current?.play()
    } else {
      const v = videoRef.current
      if (!v) return
      if (isPlaying) v.pause()
      else           v.play().catch(() => {})
    }
    setIsPlaying(p => !p)
  }

  const seekTo = (ratio: number) => {
    if (step.uiMedia.type === 'lottie') {
      const anim = animRef.current
      if (!anim) return
      anim.goToAndStop(ratio * anim.totalFrames, true)
      setProgress(ratio)
    } else {
      const v = videoRef.current
      if (!v || !v.duration) return
      v.currentTime = ratio * v.duration
      setProgress(ratio)
    }
  }

  return (
    <div style={{
      position: 'relative', width: `${M_CARD_W}px`, height: `${M_UI_H}px`,
      overflow: 'hidden', flexShrink: 0,
      background: '#F8F8F8',
    }}>
      <div style={{
        position: 'absolute', top: '16px', left: '14px', zIndex: 2,
        display: 'flex', flexDirection: 'column', gap: '3px',
      }}>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, lineHeight: '19px', color: '#999' }}>
          {step.num}
        </p>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 500, lineHeight: '22px', color: '#0C0C13' }}>
          {step.title}
        </p>
        {step.description && (
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '12px', fontWeight: 400, lineHeight: '18px', color: '#212121', letterSpacing: '-0.24px' }}>
            {step.description}
          </p>
        )}
      </div>
      <div style={{ position: 'absolute', top: `${MEDIA_TOP}px`, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {step.uiMedia.type === 'lottie'
          ? <div ref={lottieContainerRef} style={{ width: '100%', height: '100%' }} />
          : (
            <video
              ref={videoRef}
              src={step.uiMedia.src}
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )
        }
      </div>
      <MControlBar isPlaying={isPlaying} progress={progress} onToggle={togglePlay} onSeek={seekTo} />
    </div>
  )
}

// ── 공용 레이아웃 래퍼 — px-[16px], py-[48px], gap 기본 20px ──
function MContentWrap({ children, gap = 20 }: { children: React.ReactNode; gap?: number }) {
  return (
    <div className="w-full px-[16px]" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
      <div className="w-full flex flex-col" style={{ gap: `${gap}px` }}>
        {children}
      </div>
    </div>
  )
}

// ── 섹션 레이블 — num: 18px/26px #CEE0D3, label: 16px/24px #1e1e1e ──
function MSectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 500, lineHeight: '26px', color: '#CEE0D3' }}>{num}</p>
      <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 500, lineHeight: '24px', color: '#1e1e1e' }}>{label}</p>
    </div>
  )
}

// ── Before/After 세로 스택 공용 컴포넌트 (모바일 전용) ──
function MBeforeAfterStack({
  beforeLabel, beforeImg, beforeAlt, beforeBg,
  afterImg, afterAlt,
}: {
  beforeLabel: string
  beforeImg: string
  beforeAlt: string
  beforeBg?: string
  afterImg: string
  afterAlt: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#1E1E1E' }}>{beforeLabel}</p>
        <div style={{ backgroundColor: beforeBg ?? '#F7F7F7' }}>
          <img src={beforeImg} alt={beforeAlt} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#0F766E' }}>After</p>
        <img src={afterImg} alt={afterAlt} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </div>
  )
}

// ── 정적 데이터 ──
const RESEARCH_ROWS = [
  { method: 'Weekly field observation', what: 'How residents used the app in real shelter environments' },
  { method: 'Survey · 54 residents',    what: 'Where users experienced the most friction' },
  { method: 'Interviews · 5 residents', what: 'Why users struggled with existing flows' },
  { method: 'Usability testing',        what: 'Navigation, terminology, visibility, and task completion' },
]

const ANALYSIS_CARDS = [
  {
    pct:   '40%',
    title: 'Difficulty checking leave / return status',
    desc:  'Residents often struggled to understand whether they were currently marked as out or back at the shelter.',
    quote: '"It\'s hard to see whether I\'m on leave or back in the facility in the app."',
  },
  {
    pct:   '36%',
    title: 'Issues with UI intuitiveness',
    desc:  'Important actions were difficult to locate, especially for residents with limited familiarity with digital products.',
    quote: '"I spent a long time searching for the leave request button."',
  },
  {
    pct:   '24%',
    title: 'Unnecessary buttons and confusing UI',
    desc:  'Some interface elements looked actionable even when they were only informational.',
    quote: '"Why is there a button telling me to take my medication? Oh wait, that wasn\'t even a button."',
  },
]

const PROBLEM_CARDS = [
  {
    problemLabel: 'Problem 01',
    problem: 'Single-screen architecture made key actions harder to find as features grew.',
    insight: 'Residents had to scan unrelated content to complete simple tasks.',
  },
  {
    problemLabel: 'Problem 02',
    problem: 'Secondary content competed visually with core actions.',
    insight: 'Some residents mistook reminders for actionable buttons.',
  },
  {
    problemLabel: 'Problem 03',
    problem: 'Text-only status made the current state harder to understand at a glance.',
    insight: 'This added friction during time-sensitive status checks.',
  },
]

// ─────────────────────────────────────────────────
// Hero Header
// ─────────────────────────────────────────────────
function MobileShelterHeader() {
  const heroAnimation = useLottieAnimation('/lottie/wildflower-hero.json')
  const META = [
    { label: 'Product',  value: 'Mobile App + Admin Web' },
    { label: 'My role',  value: 'Product Designer · Mobile App Lead' },
    { label: 'Timeline', value: 'Q3 2024 to Q1 2025' },
    { label: 'Skills',   value: 'UX Research, Usability Testing, Information Architecture, Interaction Design, UI Design, Prototyping' },
  ]
  return (
    <section className="w-full bg-white pt-[56px] pb-[48px] px-[16px]">
      <div className="w-full flex flex-col gap-[24px]">

        {/* 타이틀 행 — Shipped badge absolute top-right */}
        <div className="relative flex items-start w-full">
          <div className="flex flex-col gap-[8px] flex-1 min-w-0 pr-[90px]">
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
              Homeless Shelter Management System
            </p>
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#8b8b8b' }}>
              94.3% NFC adoption and 30+ minutes faster response time
            </p>
          </div>
          <div className="absolute right-0 top-0 bg-[#f7f4f0] flex gap-[8px] items-center px-[10px] py-[6px] shrink-0">
            <div className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: '#00C950' }} />
            <span style={{ fontFamily: poppins, fontSize: '13px', fontWeight: 400, lineHeight: '20px', color: '#8b8b8b', whiteSpace: 'nowrap' }}>Shipped</span>
          </div>
        </div>

        {/* Hero Lottie */}
        {heroAnimation
          ? <LottieHeroPlayer animationData={heroAnimation} className="w-full shrink-0 block" style={{ aspectRatio: '358 / 238.668' }} />
          : <div className="w-full shrink-0 bg-[#bebebe]" style={{ aspectRatio: '358 / 238.668' }} />
        }

        {/* 소개 문단 */}
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1e1e1e' }}>
          As the Product Designer for Wildflower Gardening, I improved an existing shelter management MVP through field research, usability testing, and iterative redesign. The product included a mobile app for residents and a web platform for shelter administrators.
        </p>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1e1e1e' }}>
          I worked closely with a PM and developers to simplify core flows such as leave requests, status tracking, notifications, and program participation. Based on research with real shelter residents, I redesigned the experience to make essential tasks easier to find and use for people with limited digital familiarity.
        </p>

        {/* 메타정보 그리드 — 2열 flex-wrap + Team full width */}
        <div
          className="w-full py-[16px] flex flex-wrap gap-x-[16px] gap-y-[16px]"
          style={{ borderTop: '1px solid #f7f7f7', borderBottom: '1px solid #f7f7f7' }}
        >
          {META.map((item) => (
            <div key={item.label} className="flex flex-col items-start" style={{ width: 'calc(50% - 8px)' }}>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '12px', fontWeight: 400, lineHeight: '18px', color: '#8b8b8b' }}>{item.label}</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#1e1e1e' }}>{item.value}</p>
            </div>
          ))}
          <div className="flex flex-col items-start w-full">
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '12px', fontWeight: 400, lineHeight: '18px', color: '#8b8b8b' }}>Team</p>
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#1e1e1e' }}>2 Product Designers · 1 PM · 5 Developers</p>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 01 Introduction
// ─────────────────────────────────────────────────
function MobileShelterIntroSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <MContentWrap gap={20}>
        <MSectionLabel num="01" label="Introduction" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>
          A pilot platform for homeless shelters in Seoul
        </h2>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1e1e1e' }}>
          As competition winners, we piloted a homeless shelter platform (web for admins, app for 79 residents) in two Seoul shelters. Joining as a product designer, I addressed the initial MVP's technical shortcomings by improving existing screens based on user feedback and designing new features.
        </p>
        <div className="w-full overflow-hidden" style={{ aspectRatio: '1920/1080' }}>
          <iframe
            src="https://www.youtube.com/embed/dm4Zx-AYR5Y?autoplay=1&mute=1"
            title="Homeless Shelter Management System Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          />
        </div>
      </MContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 02 Overview
// ─────────────────────────────────────────────────
function MobileShelterOverviewSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <MContentWrap gap={20}>
        <MSectionLabel num="02" label="Overview" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>
          Homeless Shelter Management System
        </h2>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1e1e1e' }}>
          This system is an integrated solution designed for the efficient management of homeless shelters and the convenience of their residents.
        </p>
        <div className="w-full flex flex-col gap-[8px]" style={{ backgroundColor: '#F1FAF3', padding: '14px 16px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, lineHeight: '20px', color: '#1e1e1e' }}>Project Goal</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1e1e1e' }}>
            Validate the existing MVP with real shelter residents, identify usability issues, and evolve the product by improving core workflows and adding features based on real user needs.
          </p>
        </div>
        <div className="w-full overflow-hidden" style={{ aspectRatio: '1920/1080' }}>
          <img src={imgOverviewDiagram} alt="Homeless Shelter Management System overview diagram" className="w-full h-full object-cover block" />
        </div>
      </MContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 03 Feature Walkthrough — 가로 스크롤 캐러셀
// ─────────────────────────────────────────────────
function MobileFeatureWalkthroughSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <div
        className="[&::-webkit-scrollbar]:hidden"
        style={{
          width: '100%',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '48px',
          paddingBottom: '48px',
          boxSizing: 'border-box',
          display: 'flex',
          gap: `${M_SET_GAP}px`,
        }}
      >
        {M_STEPS.map((step) => (
          <div key={step.num} style={{ display: 'flex', gap: `${M_CARD_GAP}px`, alignItems: 'center', flexShrink: 0 }}>
            <MUsageCard num={step.num} usageVideo={step.usageVideo} />
            <MUICard step={step} />
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 04 UX Research
// ─────────────────────────────────────────────────
function MobileShelterUXResearchSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <MContentWrap gap={20}>
        <MSectionLabel num="04" label="UX Research" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>
          How might we make essential shelter tasks easier to find for residents with low digital literacy?
        </h2>

        {/* 리서치 테이블 — 모바일: 각 행이 세로로 쌓임 (가로 2열 아님) */}
        <div className="w-full flex flex-col" style={{ border: '1px solid #E5E5E5', borderBottom: 'none' }}>
          {RESEARCH_ROWS.map((row) => (
            <div key={row.method} style={{ borderBottom: '1px solid #E5E5E5', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1e1e1e' }}>{row.method}</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#1e1e1e' }}>{row.what}</p>
            </div>
          ))}
        </div>

        <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 400, color: '#777' }}>
          Primary cohort — shelter residents with limited familiarity with digital devices.
        </p>

        {/* On-site research */}
        <div className="flex flex-col" style={{ gap: '14px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 500, color: '#1e1e1e' }}>On-site research</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1e1e1e' }}>
            Weekly visits to the shelter revealed that many residents struggled with basic app tasks, including downloading, signing up, and checking status. We also found that the existing location-based leave/return method did not meet legal requirements, which led us to shift to NFC tag-based tracking.
          </p>
          <div className="w-full overflow-hidden" style={{ aspectRatio: '1920/1077' }}>
            <img src={imgFieldResearch} alt="Field research at homeless shelter" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </MContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 05 Analysis of Results
// ─────────────────────────────────────────────────
function MobileShelterAnalysisSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <MContentWrap gap={20}>
        <MSectionLabel num="05" label="Analysis of Results" />
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
          Research revealed three recurring usability issues that made essential shelter tasks harder to complete.
        </p>

        {/* 카드 3개 — 세로로 쌓임, 전체 너비 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ANALYSIS_CARDS.map((card) => (
            <div
              key={card.pct}
              style={{
                width: '100%',
                backgroundColor: '#F1FAF3',
                padding: '20px 16px',
                display: 'flex', flexDirection: 'column', gap: '8px',
                boxSizing: 'border-box',
              }}
            >
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: 1, color: '#417454' }}>{card.pct}</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 500, lineHeight: '24px', color: '#212121' }}>{card.title}</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#212121' }}>{card.desc}</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 400, lineHeight: '20px', color: '#727272' }}>{card.quote}</p>
            </div>
          ))}
        </div>

        <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 400, color: '#727272' }}>
          These findings pointed to a broader structural issue in the existing MVP, which is defined in the next section.
        </p>
      </MContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 Problem Definition
// ─────────────────────────────────────────────────
function MobileShelterProblemDefinitionSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <MContentWrap gap={20}>
        <MSectionLabel num="06" label="Problem Definition" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>
          A single home screen couldn't hold everything the app needed to do.
        </h2>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
          Leave requests, status, reminders, notifications, and program information all competed for the same space. As the product grew, key actions became harder to find and the home screen had little room to scale.
        </p>
        <img
          src={imgProblemDefinition}
          alt="Existing MVP screens and key usability issues"
          style={{ width: '100%', display: 'block', objectFit: 'contain' }}
        />

        {/* Problem/Insight 카드 3개 — 카드 세로 스택, 카드 내부 Problem/Insight도 세로로 쌓임 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.problemLabel}
              style={{ backgroundColor: '#F7F7F7', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#C2410C' }}>{card.problemLabel}</p>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>{card.problem}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#0F766E' }}>Insight</p>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>{card.insight}</p>
              </div>
            </div>
          ))}
        </div>
      </MContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 05 Design Solution 1
// ─────────────────────────────────────────────────
function MobileShelterDS1Section() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <MContentWrap gap={20}>
        <MSectionLabel num="05" label="Design Solution 1" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>
          From One Screen to Clear Navigation
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#C2410C' }}>Problem</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            A single-screen structure made key actions harder to find and left little room for future features.
          </p>
        </div>
        <div style={{ backgroundColor: '#F1FAF3', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#1E1E1E' }}>Why this approach</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            We introduced tab-based navigation to give key functions predictable locations. Because tabs stay visible at all times, residents no longer need to remember where features live.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#0F766E' }}>Result</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            Core actions were separated into clearer destinations, making leave requests, community features, and personal information easier to find. It also created room to add future features without crowding the home screen.
          </p>
        </div>
        <MBeforeAfterStack
          beforeLabel="Before : 1st prototype"
          beforeImg={imgS1Before} beforeAlt="Before — Design Solution 1"
          afterImg={imgS1After}   afterAlt="After — Design Solution 1"
        />
      </MContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 Design Solution 2
// ─────────────────────────────────────────────────
function MobileShelterDS2Section() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <MContentWrap gap={20}>
        <MSectionLabel num="06" label="Design Solution 2" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>
          Instantly Recognizable Status System
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#C2410C' }}>Problem</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            Status was shown only as text, making it difficult to understand at a glance.
          </p>
        </div>
        <div style={{ backgroundColor: '#F1FAF3', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#1E1E1E' }}>Why this approach</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            We introduced a color coded status system with clear visual labels so residents could recognize their current state immediately without relying on text alone.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#0F766E' }}>Result</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            Residents could identify their status at a glance, reducing confusion during leave and return checks.
          </p>
        </div>
        <MBeforeAfterStack
          beforeLabel="Before : 1st prototype"
          beforeImg={imgS2Before} beforeAlt="Before — Design Solution 2"
          afterImg={imgS2After}   afterAlt="After — Design Solution 2"
        />
      </MContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 07 Design Solution 3
// ─────────────────────────────────────────────────
function MobileShelterDS3Section() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <MContentWrap gap={20}>
        <MSectionLabel num="07" label="Design Solution 3" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>
          Every Notification at a Glance
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#C2410C' }}>Problem</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            Notifications were hidden behind a small bell icon, making important information easy to miss for digitally vulnerable users.
          </p>
        </div>
        <div style={{ backgroundColor: '#F1FAF3', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#1E1E1E' }}>Why this approach</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            We brought notifications directly onto the home screen and redesigned them as visible, actionable cards. This reduced navigation steps and let residents notice important updates and respond in the same place.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#0F766E' }}>Result</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            Residents could notice important updates and respond to program invitations directly in the app, making participation tracking faster and reducing the risk of missed or inconsistent records.
          </p>
        </div>

        {/* 서브섹션 01 — Making Notifications Visible */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 500, color: '#1E1E1E' }}>
            01 · Making Notifications Visible
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            From a hidden bell icon to visible updates on the home screen
          </p>
          <MBeforeAfterStack
            beforeLabel="Before : 2nd prototype"
            beforeImg={imgS31Before} beforeAlt="Before — Making Notifications Visible"
            afterImg={imgS31After}   afterAlt="After — Making Notifications Visible"
          />
        </div>

        {/* 서브섹션 02 — Turning Notifications into Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 500, color: '#1E1E1E' }}>
            02 · Turning Notifications into Actions
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            From manual tracking to in-app participation
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            Program participation had been managed verbally or on paper, making tracking slow and unreliable. We added Join and Decline actions directly to notification cards so participation could be recorded in real time.
          </p>
          <MBeforeAfterStack
            beforeLabel="Before"
            beforeImg={imgS32Before} beforeAlt="Before — Turning Notifications into Actions"
            afterImg={imgS32After}   afterAlt="After — Turning Notifications into Actions"
            beforeBg="transparent"
          />
        </div>

        {/* Notification Card System */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 500, color: '#1E1E1E' }}>Notification Card System</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 400, color: '#777' }}>
            Designed flexible notification patterns for different content types, priorities, and actions.
          </p>
          <img
            src={imgS3Notification}
            alt="Notification Card System"
            style={{ width: '100%', display: 'block', objectFit: 'contain' }}
          />
        </div>
      </MContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 08 Implemented Solution
// ─────────────────────────────────────────────────
function MobileShelterImplementedSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <MContentWrap gap={20}>
        <MSectionLabel num="08" label="Implemented Solution" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>
          NFC Leave/Return System enabled
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            To improve the inefficiency of the manual leave request process, we introduced an NFC-based system.
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            Residents apply for leave via the app, and administrators manage requests through the web. Scanning the QR code at the center automatically records leave and return, greatly enhancing management efficiency.
          </p>
        </div>
        <div className="w-full overflow-hidden" style={{ aspectRatio: '1920/1080' }}>
          <img
            src={imgNFCSolution}
            alt="NFC Leave/Return System"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </MContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 09 Reflection
// ─────────────────────────────────────────────────
function MobileShelterReflectionSection() {
  return (
    <>
      <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
        <MContentWrap gap={20}>
          <MSectionLabel num="09" label="Reflection" />
          <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>
            Design Beyond the Screen
          </h2>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#1E1E1E' }}>
            Many residents were initially skeptical of using the app, and even basic tasks like downloading it were unfamiliar. Watching my team persist through these challenges deeply inspired me. This project taught me that design is not only about usability, but also about responsibility. As a product designer, I learned how to create experiences that deliver both functionality and social value. Moving forward, I aim to build technology that makes a real difference in people's lives.
          </p>
          <div className="w-full overflow-hidden" style={{ aspectRatio: '1920/1080' }}>
            <iframe
              src="https://www.youtube.com/embed/VlxojGwgZg8?autoplay=1&mute=1"
              title="Homeless Shelter Management System — Reflection"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
            />
          </div>
        </MContentWrap>
      </section>
      {/* 목업 스크린 콜라주 — full-bleed (좌우 패딩 벗어남) */}
      <img
        src={imgMockupScreen}
        alt="Homeless Shelter Management System mockup screens"
        style={{ width: '100%', display: 'block' }}
      />
    </>
  )
}

// ─────────────────────────────────────────────────
// Next Project
// ─────────────────────────────────────────────────
function MobileShelterNextProjectSection() {
  const navigate = useNavigate()
  return (
    <section className="w-full bg-[#f7f7f7]">
      <div className="w-full px-[16px] py-[40px] flex flex-col gap-[20px]">
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 500, lineHeight: '24px', color: '#1e1e1e' }}>Next Project</p>
        <div className="flex flex-col gap-[20px] w-full">

          {/* AI Avatar */}
          <div className="flex flex-col gap-[12px] cursor-pointer group" onClick={() => navigate('/projects/ai-avatar')}>
            <div className="relative overflow-hidden w-full" style={{ aspectRatio: '886.84/591.23' }}>
              <img src={imgCnaiTh} alt="AI Avatar Video Creation Platform" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, lineHeight: '21px', color: '#1e1e1e' }}>AI Avatar Video Creation Platform</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '12px', fontWeight: 400, lineHeight: '18px', color: '#8b8b8b' }}>50% faster voice selection, 59% fewer voice re-selections</p>
            </div>
          </div>

          {/* Cornerstone */}
          <div className="flex flex-col gap-[12px] cursor-pointer group" onClick={() => navigate('/projects/cornerstone')}>
            <div className="relative overflow-hidden w-full" style={{ aspectRatio: '886.84/591.23' }}>
              <video src={vidCornerstoneDemo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, lineHeight: '21px', color: '#1e1e1e' }}>Cornerstone College Website</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '12px', fontWeight: 400, lineHeight: '18px', color: '#8b8b8b' }}>70%+ AI-assisted workflow, one scalable system across 10 program pages</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────
export default function MobileShelterPage() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0
  }, [])

  return (
    <motion.div
      ref={containerRef}
      data-scroll-id="shelter"
      style={{
        fontFamily: poppins,
        position: 'fixed', inset: 0, overflowY: 'auto',
        zIndex: 20, backgroundColor: 'white',
      }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="group fixed top-[16px] right-[16px] w-[36px] h-[36px] bg-[#1e1e1e] flex items-center justify-center z-50 border-0 outline-none cursor-pointer shrink-0"
        aria-label="Close"
      >
        <img src={icClose} alt="" aria-hidden className="block w-[18px] h-[18px] transition-transform duration-200 ease-out group-hover:rotate-90" />
      </button>

      <MobileShelterHeader />
      <MobileShelterIntroSection />
      <MobileShelterOverviewSection />
      <MobileFeatureWalkthroughSection />
      <MobileShelterUXResearchSection />
      <MobileShelterAnalysisSection />
      <MobileShelterProblemDefinitionSection />
      <MobileShelterDS1Section />
      <MobileShelterDS2Section />
      <MobileShelterDS3Section />
      <MobileShelterImplementedSection />
      <MobileShelterReflectionSection />
      <MobileShelterNextProjectSection />
    </motion.div>
  )
}
