// ShelterPage.tsx — Homeless Shelter Management System case study
// Route: /projects/shelter
// Desktop layout (≥1024px). 반응형은 추후 별도 작업.

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'

import { useLottieAnimation } from '../hooks/useLottieAnimation'
import { LottieHeroPlayer } from './LottieHeroPlayer'
import { ProjectHero } from './ProjectHero'
import { ProjectPageWrapper } from './ProjectPageWrapper'
import { SideNav } from './SideNav'
import imgOverviewDiagram    from '../assets/images/shelter-overview-diagram.webp'
import imgFieldResearch      from '../assets/images/shelter-field-research.webp'
import imgS1Before           from '../assets/images/s1_before.webp'
import imgS1After            from '../assets/images/s1_after.webp'
import imgS2Before           from '../assets/images/s2_before.webp'
import imgS2After            from '../assets/images/s2_after.webp'
import imgS3Notification      from '../assets/images/s3-notification.webp'
import imgNFCSolution         from '../assets/images/nfc-implemented-solution.webp'
import imgCnaiTh              from '../assets/images/cnai-thumb.png'
import imgS31Before          from '../assets/images/s3-1_before.webp'
import imgS31After           from '../assets/images/s3-1_after.webp'
import imgS32Before          from '../assets/images/s3-2_before.webp'
import imgS32After           from '../assets/images/s3-2_after.webp'
import shelterUI01Json       from '../assets/lottie/shelter-ui-01.json'

// ── 영상 파일 (src/assets/videos/) ─────────────────
import vidCornerstoneDemo from '../assets/videos/cornerstone-thumb-v2.mp4'
import vidUsage01 from '../assets/videos/shelter-usage-01.mp4'
import vidUsage02 from '../assets/videos/shelter-usage-02.mp4'
import vidUsage03 from '../assets/videos/shelter-usage-03.mp4'
import vidUsage04 from '../assets/videos/shelter-usage-04.mp4'
import vidUI02    from '../assets/videos/shelter-ui-02.mp4'
import vidUI03    from '../assets/videos/shelter-ui-03.mp4'
import vidUI04    from '../assets/videos/shelter-ui-04.mp4'
// UI 영상 01: public/lottie/shelter-ui-01.json (useLottieAnimation으로 런타임 fetch)
// → 파일이 없으면 placeholder로 폴백됨

const poppins = "'Poppins', sans-serif"

const SHELTER_NAV_ITEMS = [
  { id: 'sh-intro',        label: 'Introduction' },
  { id: 'sh-overview',     label: 'Overview' },
  { id: 'sh-walkthrough',  label: 'Feature Walkthrough' },
  { id: 'sh-ux-research',  label: 'UX Research' },
  { id: 'sh-analysis',     label: 'Analysis of Results' },
  { id: 'sh-problem',      label: 'Problem Definition' },
  { id: 'sh-solution-1',   label: 'Design Solution 1' },
  { id: 'sh-solution-2',   label: 'Design Solution 2' },
  { id: 'sh-solution-3',   label: 'Design Solution 3' },
  { id: 'sh-implemented',  label: 'Implemented Solution' },
  { id: 'sh-reflection',   label: 'Reflection' },
] as const

// ─────────────────────────────────────────────────
// 섹션 레이블 — 번호(accent #CEE0D3) + 소제목
// ─────────────────────────────────────────────────
function ShelterSectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p className="text-[24px] font-medium leading-[36px]" style={{ fontFamily: poppins, color: '#CEE0D3' }}>
        {num}
      </p>
      <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
        {label}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────
// 01 Introduction
// ─────────────────────────────────────────────────
function IntroSection() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div className="max-w-[960px] mx-auto w-full flex flex-col" style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}>
        <ShelterSectionLabel num="01" label="Introduction" />
        <h2 className="text-[#1e1e1e] w-full m-0" style={{ fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}>
          A pilot platform for homeless shelters in Seoul
        </h2>
        <p className="text-[#1e1e1e] w-full m-0" style={{ fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px' }}>
          As competition winners, we piloted a homeless shelter platform (web for admins, app for 79
          residents) in two Seoul shelters. Joining as a product designer, I addressed the initial
          MVP's technical shortcomings by improving existing screens based on user feedback and
          designing new features.
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
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 02 Overview
// ─────────────────────────────────────────────────
function OverviewSection() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div className="max-w-[960px] mx-auto w-full flex flex-col" style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}>
        <ShelterSectionLabel num="02" label="Overview" />
        <h2 className="text-[#1e1e1e] w-full m-0" style={{ fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}>
          Homeless Shelter Management System
        </h2>
        <p className="text-[#1e1e1e] w-full m-0" style={{ fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px' }}>
          This system is an integrated solution designed for the efficient management of homeless
          shelters and the convenience of their residents.
        </p>
        <div className="w-full flex flex-col gap-[8px]" style={{ backgroundColor: '#F1FAF3', padding: '16px 20px' }}>
          <p className="m-0" style={{ fontFamily: poppins, fontSize: '14px', fontWeight: 500, lineHeight: '21px', color: '#1e1e1e' }}>
            Project Goal
          </p>
          <p className="m-0" style={{ fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1e1e1e' }}>
            Validate the existing MVP with real shelter residents, identify usability issues, and
            evolve the product by improving core workflows and adding features based on real user needs.
          </p>
        </div>
        <div className="w-full overflow-hidden" style={{ aspectRatio: '1920/1080' }}>
          <img src={imgOverviewDiagram} alt="Homeless Shelter Management System overview diagram" className="w-full h-full object-cover block" />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 03 Feature Walkthrough — 가로 스크롤 (scroll-jacking)
// ─────────────────────────────────────────────────

// ── 스텝 데이터 타입 ──────────────────────────────
type UIMedia =
  | { type: 'lottie'; animationData: unknown }  // src/assets/lottie/ 직접 import
  | { type: 'video';  src: string }             // import된 mp4

interface StepData {
  num: string
  title: string
  description: string
  usageVideo: string
  uiMedia: UIMedia
}

const STEPS: StepData[] = [
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
    description: 'Submit and manage leave or overnight requests directly from the app',
    usageVideo: vidUsage02,
    uiMedia: { type: 'video', src: vidUI02 },
  },
  {
    num: '03',
    title: 'Never Miss a Notification',
    description: 'Stay updated with real-time alerts, surveys, and community announcements',
    usageVideo: vidUsage03,
    uiMedia: { type: 'video', src: vidUI03 },
  },
  {
    num: '04',
    title: 'Feature 04 Title',
    description: 'Feature 04 description goes here',
    usageVideo: vidUsage04,
    uiMedia: { type: 'video', src: vidUI04 },
  },
]

// ── Pause/Play 아이콘 ─────────────────────────────
function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="3.5" height="12" rx="1" fill="white" />
      <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="white" />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polygon points="2,1 13,7 2,13" fill="white" />
    </svg>
  )
}

// ── 사용 영상 카드 — 382×616, border-radius 22px ──
function UsageCard({ num, usageVideo }: { num: string; usageVideo: string }) {
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
      position: 'relative', width: '382px', height: '616px',
      borderRadius: '22px', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* 영상 — 카드 전체 cover */}
      <video
        ref={videoRef}
        src={usageVideo}
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* 상단 그라데이션 오버레이: rgba(0,0,0,0.4) → transparent at 52% */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 52%)',
      }} />
      {/* 스텝 번호 — 좌상단 */}
      <p style={{
        position: 'absolute', top: '10px', left: '20px', margin: 0,
        fontFamily: poppins, fontSize: '64px', fontWeight: 500, lineHeight: 1,
        color: 'white', letterSpacing: '-2.56px',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {num}
      </p>
      {/* Pause/Play 필 배지 — 좌하단 */}
      <button
        type="button" onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        style={{
          position: 'absolute', bottom: '20px', left: '20px',
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          borderRadius: '1000px',
          border: 'none',
          paddingTop: '7px', paddingBottom: '7px',
          paddingLeft: '8px', paddingRight: '15px',
          cursor: 'pointer',
          fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: 'white',
          outline: 'none',
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

// ── Lottie 스크린 (UI 카드 내부) ─────────────────
// lottie.loadAnimation() 직접 호출 패턴 (AIAvatarPage와 동일)
function LottieScreen({ animationData }: { animationData: unknown }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    animRef.current?.destroy()
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      animationData: animationData as any,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    })
    return () => { animRef.current?.destroy(); animRef.current = null }
  }, [animationData])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

// ── UI 영상 카드 — 382×615, border-radius 22px ───
function UICard({ step }: { step: StepData }) {
  // 텍스트 영역 높이: top(24) + num(28) + gap(4) + title(32) + 여유 = ~100px
  const MEDIA_TOP = 100
  return (
    <div style={{
      position: 'relative', width: '382px', height: '615px',
      borderRadius: '22px', overflow: 'hidden', flexShrink: 0,
      background: '#F8F8F8',
    }}>
      {/* 스텝 번호 + 제목 — 좌상단 (21px, 24px) */}
      <div style={{
        position: 'absolute', top: '24px', left: '21px', zIndex: 2,
        display: 'flex', flexDirection: 'column', gap: '4px',
      }}>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '22px', fontWeight: 500, lineHeight: '28px', color: '#999' }}>
          {step.num}
        </p>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '32px', color: '#0C0C13' }}>
          {step.title}
        </p>
      </div>
      {/* UI 미디어 — 텍스트 아래부터 카드 하단까지 채움 */}
      <div style={{ position: 'absolute', top: `${MEDIA_TOP}px`, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {step.uiMedia.type === 'lottie'
          ? <LottieScreen animationData={step.uiMedia.animationData} />
          : (
            <video
              src={step.uiMedia.src}
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )
        }
      </div>
    </div>
  )
}

// ── 가로 스크롤 섹션 — scroll-jacking ────────────
//
// 레이아웃:
//   한 세트 = UsageCard(382) + gap(20) + UICard(382) = 784px
//   세트 간 gap = 24px
//   좌우 여백 = 160px
//   전체 트랙 = 160 + 4×784 + 3×24 + 160 = 3528px
//
// 세로 스크롤 높이 = calc(100vh + 3528px - 100vw)
//   → 1px 세로 스크롤 = 1px 가로 이동 (자연스러운 비율)
//   → 시작: 첫 세트가 왼쪽 80px 안쪽에서 시작
//   → 끝: 마지막 세트 오른쪽 끝이 화면 오른쪽 끝에서 80px 안쪽에서 멈춤
// ─────────────────────────────────────────────────
const CARD_GAP  = 20   // UsageCard ↔ UICard 간격
const SET_GAP   = 24   // 세트와 세트 사이 간격
const SIDE_PAD  = 160  // 트랙 좌우 여백
const SET_W     = 382 + CARD_GAP + 382                                   // 784px
const TRACK_W   = SIDE_PAD * 2 + STEPS.length * SET_W + (STEPS.length - 1) * SET_GAP  // 3368px

function HorizontalScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  // ProjectPageWrapper의 fixed overflow div (framer-motion effect 전에 설정)
  const scrollContainerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const el = document.querySelector('[data-scroll-container="project-page"]')
    scrollContainerRef.current = el as HTMLElement | null
  }, [])

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    container: scrollContainerRef as React.RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  })

  // translateX: 0 → -(TRACK_W - vw)   ※ 1px 세로 = 1px 가로 이동
  const x = useTransform(scrollYProgress, (v) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
    return -v * Math.max(0, TRACK_W - vw)
  })

  return (
    // 세로 스크롤 거리 = 오버플로 픽셀 수 (1:1 비율)
    // max(100vh, ...) 로 뷰포트가 트랙보다 넓을 때도 최소 100vh 확보
    <div
      ref={wrapperRef}
      style={{ height: `max(100vh, calc(100vh + ${TRACK_W}px - 100vw))`, position: 'relative' }}
    >
      {/* 고정 컨테이너 */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* 가로 트랙 — 좌우 80px 패딩 포함 */}
        <motion.div
          style={{
            x,
            display: 'flex',
            gap: `${SET_GAP}px`,
            alignItems: 'center',
            height: '100%',
            width: `${TRACK_W}px`,
            paddingLeft: `${SIDE_PAD}px`,
            paddingRight: `${SIDE_PAD}px`,
            boxSizing: 'border-box',
            willChange: 'transform',
          }}
        >
          {STEPS.map((step) => (
            // 한 세트: UsageCard + UICard, gap 20px
            <div
              key={step.num}
              style={{ display: 'flex', gap: `${CARD_GAP}px`, alignItems: 'center', flexShrink: 0 }}
            >
              <UsageCard num={step.num} usageVideo={step.usageVideo} />
              <UICard step={step} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// 03 UX Research
// ─────────────────────────────────────────────────
const RESEARCH_ROWS = [
  { method: 'Weekly field observation', what: 'How residents used the app in real shelter environments' },
  { method: 'Survey · 54 residents',    what: 'Where users experienced the most friction' },
  { method: 'Interviews · 5 residents', what: 'Why users struggled with existing flows' },
  { method: 'Usability testing',        what: 'Navigation, terminology, visibility, and task completion' },
]

// ─────────────────────────────────────────────────
// 05 Analysis of Results
// ─────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────
// 07 Design Solution 01 — Before / After
// ─────────────────────────────────────────────────
function DesignSolution1Section() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div
        className="max-w-[960px] mx-auto w-full flex flex-col"
        style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}
      >
        <ShelterSectionLabel num="05" label="Design Solution 1" />

        {/* 제목 */}
        <h2
          className="text-[#1e1e1e] w-full m-0"
          style={{ fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}
        >
          From One Screen to Clear Navigation
        </h2>

        {/* Problem 블록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#C2410C' }}>
            Problem
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            A single-screen structure made key actions harder to find and left little room for future features.
          </p>
        </div>

        {/* Why this approach 박스 */}
        <div style={{ backgroundColor: '#F1FAF3', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>
            Why this approach
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            We introduced tab-based navigation to give key functions predictable locations. Because tabs stay visible at all times, residents no longer need to remember where features live.
          </p>
        </div>

        {/* Result 블록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>
            Result
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Core actions were separated into clearer destinations, making leave requests, community features, and personal information easier to find. It also created room to add future features without crowding the home screen.
          </p>
        </div>

        {/* Before / After — 가로 2열 */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Before */}
          <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>
              Before : 1st prototype
            </p>
            <div style={{
              height: '600px', backgroundColor: '#F7F7F7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                src={imgS1Before}
                alt="Before — Design Solution 1"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>

          {/* After */}
          <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>
              After
            </p>
            <div style={{
              height: '600px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                src={imgS1After}
                alt="After — Design Solution 1"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 Design Solution 02
// ─────────────────────────────────────────────────
function DesignSolution2Section() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div
        className="max-w-[960px] mx-auto w-full flex flex-col"
        style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}
      >
        <ShelterSectionLabel num="06" label="Design Solution 2" />

        {/* 제목 */}
        <h2
          className="text-[#1e1e1e] w-full m-0"
          style={{ fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}
        >
          Instantly Recognizable Status System
        </h2>

        {/* Problem 블록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#C2410C' }}>
            Problem
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Status was shown only as text, making it difficult to understand at a glance.
          </p>
        </div>

        {/* Why this approach 박스 */}
        <div style={{ backgroundColor: '#F1FAF3', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>
            Why this approach
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            We introduced a color coded status system with clear visual labels so residents could recognize their current state immediately without relying on text alone.
          </p>
        </div>

        {/* Result 블록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>
            Result
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Residents could identify their status at a glance, reducing confusion during leave and return checks.
          </p>
        </div>

        {/* Before / After 가로 2열 */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Before */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>
              Before : 1st prototype
            </p>
            <div style={{
              height: '600px', backgroundColor: '#F7F7F7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                src={imgS2Before}
                alt="Before — Design Solution 02"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>

          {/* After */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>
              After
            </p>
            <div style={{
              height: '600px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                src={imgS2After}
                alt="After — Design Solution 02"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 Problem Definition
// ─────────────────────────────────────────────────
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

function ProblemDefinitionSection() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div
        className="max-w-[960px] mx-auto w-full flex flex-col"
        style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}
      >
        <ShelterSectionLabel num="06" label="Problem Definition" />

        {/* 제목 */}
        <h2
          className="text-[#1e1e1e] w-full m-0"
          style={{ fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}
        >
          A single home screen couldn't hold everything the app needed to do.
        </h2>

        {/* 본문 */}
        <p className="m-0" style={{ fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1E1E1E' }}>
          Leave requests, status, reminders, notifications, and program information all competed for
          the same space. As the product grew, key actions became harder to find and the home screen
          had little room to scale.
        </p>

        {/* 이미지 플레이스홀더 — 실제 이미지로 교체 시 <img> 태그로 대체 */}
        <div
          style={{
            width: '100%', height: '530px',
            backgroundColor: '#F0F0F0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, color: '#1E1E1E', textAlign: 'center' }}>
            Existing MVP screens and key usability issues
          </p>
        </div>

        {/* Problem / Insight 카드 3개 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.problemLabel}
              style={{
                backgroundColor: '#F7F7F7',
                padding: '20px',
                display: 'flex',
                gap: '24px',
              }}
            >
              {/* 좌측: Problem */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#C2410C' }}>
                  {card.problemLabel}
                </p>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
                  {card.problem}
                </p>
              </div>
              {/* 우측: Insight */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>
                  Insight
                </p>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
                  {card.insight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnalysisSection() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div
        className="max-w-[960px] mx-auto w-full flex flex-col"
        style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}
      >
        <ShelterSectionLabel num="05" label="Analysis of Results" />

        {/* 인트로 */}
        <p className="m-0" style={{ fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
          Research revealed three recurring usability issues that made essential shelter tasks harder to complete.
        </p>

        {/* 카드 3개 */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {ANALYSIS_CARDS.map((card) => (
            <div
              key={card.pct}
              style={{
                width: '304px', height: '330px', flexShrink: 0,
                backgroundColor: '#F1FAF3',
                padding: '24px 20px',
                display: 'flex', flexDirection: 'column', gap: '8px',
                boxSizing: 'border-box',
              }}
            >
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '32px', fontWeight: 500, lineHeight: 1, color: '#417454' }}>
                {card.pct}
              </p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 500, lineHeight: '26px', color: '#212121' }}>
                {card.title}
              </p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#212121' }}>
                {card.desc}
              </p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#727272' }}>
                {card.quote}
              </p>
            </div>
          ))}
        </div>

        {/* 하단 캡션 */}
        <p className="m-0" style={{ fontFamily: poppins, fontSize: '14px', fontWeight: 400, color: '#727272' }}>
          These findings pointed to a broader structural issue in the existing MVP, which is defined in the next section.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 03 UX Research
// ─────────────────────────────────────────────────
function UXResearchSection() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div
        className="max-w-[960px] mx-auto w-full flex flex-col"
        style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}
      >
        <ShelterSectionLabel num="03" label="UX Research" />

        {/* HMW 질문 */}
        <h2
          className="text-[#1e1e1e] w-full m-0"
          style={{ fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}
        >
          How might we make essential shelter tasks easier to find for residents with low digital literacy?
        </h2>

        {/* 리서치 방법 테이블 */}
        <div className="w-full flex flex-col" style={{ border: '1px solid #E5E5E5', borderBottom: 'none' }}>
          {/* 헤더 */}
          <div
            className="flex"
            style={{ backgroundColor: '#F1FAF3', borderBottom: '1px solid #E5E5E5' }}
          >
            <div style={{ width: '280px', flexShrink: 0, padding: '16px 20px', fontFamily: poppins, fontSize: '16px', fontWeight: 500, color: '#1e1e1e' }}>
              Research method
            </div>
            <div style={{ flex: 1, padding: '16px 20px', fontFamily: poppins, fontSize: '16px', fontWeight: 500, color: '#1e1e1e' }}>
              What I investigated
            </div>
          </div>
          {/* 데이터 행 */}
          {RESEARCH_ROWS.map((row) => (
            <div
              key={row.method}
              className="flex"
              style={{ borderBottom: '1px solid #E5E5E5' }}
            >
              <div style={{ width: '280px', flexShrink: 0, padding: '16px 20px', fontFamily: poppins, fontSize: '16px', fontWeight: 500, color: '#1e1e1e' }}>
                {row.method}
              </div>
              <div style={{ flex: 1, padding: '16px 20px', fontFamily: poppins, fontSize: '16px', fontWeight: 400, color: '#1e1e1e' }}>
                {row.what}
              </div>
            </div>
          ))}
        </div>

        {/* 캡션 */}
        <p className="m-0" style={{ fontFamily: poppins, fontSize: '14px', fontWeight: 400, color: '#777' }}>
          Primary cohort — shelter residents with limited familiarity with digital devices.
        </p>

        {/* On-site research 서브섹션 */}
        <div className="flex flex-col" style={{ gap: '16px' }}>
          <p className="m-0" style={{ fontFamily: poppins, fontSize: '20px', fontWeight: 500, color: '#1e1e1e' }}>
            On-site research
          </p>
          <p className="m-0" style={{ fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1e1e1e' }}>
            Weekly visits to the shelter revealed that many residents struggled with basic app tasks,
            including downloading, signing up, and checking status. We also found that the existing
            location-based leave/return method did not meet legal requirements, which led us to shift
            to NFC tag-based tracking.
          </p>
          {/* 필드 리서치 사진 */}
          <div className="w-full overflow-hidden" style={{ height: '540px' }}>
            <img
              src={imgFieldResearch}
              alt="Field research at homeless shelter"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 07 Design Solution 03
// ─────────────────────────────────────────────────

/** Before/After 가로 2열 공용 컴포넌트 */
function BeforeAfterRow({
  beforeLabel, beforeImg, beforeAlt, beforeBg,
  afterImg, afterAlt,
  height,
}: {
  beforeLabel: string
  beforeImg: string
  beforeAlt: string
  beforeBg?: string
  afterImg: string
  afterAlt: string
  height: number
}) {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      {/* Before */}
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>
          {beforeLabel}
        </p>
        <div style={{
          height: `${height}px`,
          backgroundColor: beforeBg ?? '#F7F7F7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img src={beforeImg} alt={beforeAlt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
      </div>
      {/* After */}
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>
          After
        </p>
        <div style={{
          height: `${height}px`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img src={afterImg} alt={afterAlt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
      </div>
    </div>
  )
}

function DesignSolution3Section() {
  return (
    <section className="w-full bg-white px-[170px]" style={{ borderTop: '1px solid #EAEAEA' }}>
      <div
        className="max-w-[960px] mx-auto w-full flex flex-col"
        style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}
      >
        <ShelterSectionLabel num="07" label="Design Solution 3" />

        {/* 제목 */}
        <h2
          className="text-[#1e1e1e] w-full m-0"
          style={{ fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}
        >
          Every Notification at a Glance
        </h2>

        {/* Problem 블록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#C2410C' }}>Problem</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Notifications were hidden behind a small bell icon, making important information easy to miss for digitally vulnerable users.
          </p>
        </div>

        {/* Why this approach 박스 */}
        <div style={{ backgroundColor: '#F1FAF3', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Why this approach</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            We brought notifications directly onto the home screen and redesigned them as visible, actionable cards. This reduced navigation steps and let residents notice important updates and respond in the same place.
          </p>
        </div>

        {/* Result 블록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>Result</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Residents could notice important updates and respond to program invitations directly in the app, making participation tracking faster and reducing the risk of missed or inconsistent records.
          </p>
        </div>

        {/* ── 서브섹션 01 ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, color: '#1E1E1E' }}>
            01 · Making Notifications Visible
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            From a hidden bell icon to visible updates on the home screen
          </p>
          <BeforeAfterRow
            beforeLabel="Before : 2nd prototype"
            beforeImg={imgS31Before} beforeAlt="Before — Making Notifications Visible"
            afterImg={imgS31After}   afterAlt="After — Making Notifications Visible"
            height={600}
          />
        </div>

        {/* ── 서브섹션 02 ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, color: '#1E1E1E' }}>
            02 · Turning Notifications into Actions
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            From manual tracking to in-app participation
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Program participation had been managed verbally or on paper, making tracking slow and unreliable. We added Join and Decline actions directly to notification cards so participation could be recorded in real time.
          </p>
          <BeforeAfterRow
            beforeLabel="Before"
            beforeImg={imgS32Before} beforeAlt="Before — Turning Notifications into Actions"
            afterImg={imgS32After}   afterAlt="After — Turning Notifications into Actions"
            height={426}
            beforeBg="transparent"
          />
        </div>

        {/* ── Notification Card System 플레이스홀더 ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>
            Notification Card System
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, color: '#777' }}>
            Designed flexible notification patterns for different content types, priorities, and actions.
          </p>
          <div style={{ width: '100%', height: '537px', overflow: 'hidden' }}>
            <img
              src={imgS3Notification}
              alt="Notification Card System"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 01 Implemented Solution (넘버링 리셋 — Figma 원본 기준)
// ─────────────────────────────────────────────────
function ImplementedSolutionSection() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div
        className="max-w-[960px] mx-auto w-full flex flex-col"
        style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}
      >
        <ShelterSectionLabel num="08" label="Implemented Solution" />

        {/* 제목 */}
        <h2
          className="text-[#1e1e1e] w-full m-0"
          style={{ fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}
        >
          NFC Leave/Return System enabled
        </h2>

        {/* 본문 — 첫 문장 뒤 줄바꿈 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="m-0" style={{ fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1E1E1E' }}>
            To improve the inefficiency of the manual leave request process, we introduced an NFC-based system.
          </p>
          <p className="m-0" style={{ fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1E1E1E' }}>
            Residents apply for leave via the app, and administrators manage requests through the web. Scanning the QR code at the center automatically records leave and return, greatly enhancing management efficiency.
          </p>
        </div>

        {/* 이미지 — 16:9, object-fit: cover */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '1920/1080' }}>
          <img
            src={imgNFCSolution}
            alt="NFC Leave/Return System"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 09 Reflection
// ─────────────────────────────────────────────────
function ReflectionSection() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div
        className="max-w-[960px] mx-auto w-full flex flex-col"
        style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}
      >
        <ShelterSectionLabel num="09" label="Reflection" />

        {/* 제목 */}
        <h2
          className="text-[#1e1e1e] w-full m-0"
          style={{ fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}
        >
          Design Beyond the Screen
        </h2>

        {/* 본문 */}
        <p className="m-0" style={{ fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1E1E1E' }}>
          Many residents were initially skeptical of using the app, and even basic tasks like downloading it were unfamiliar. Watching my team persist through these challenges deeply inspired me. This project taught me that design is not only about usability, but also about responsibility. As a product designer, I learned how to create experiences that deliver both functionality and social value. Moving forward, I aim to build technology that makes a real difference in people's lives.
        </p>

        {/* YouTube 임베드 — 16:9, autoplay + mute */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '1920/1080' }}>
          <iframe
            src="https://www.youtube.com/embed/VlxojGwgZg8?autoplay=1&mute=1"
            title="Homeless Shelter Management System — Reflection"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Next Project 섹션
// ─────────────────────────────────────────────────
function NextProjectSection() {
  const navigate = useNavigate()
  return (
    <section className="w-full bg-[#f7f7f7]">
      <div className="w-full px-[40px] py-[60px]">
        <div className="max-w-[960px] mx-auto w-full flex flex-col gap-[32px]">
          <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Next Project</p>
          <div className="flex gap-[24px] w-full">

            {/* AI Avatar — 클릭 가능 */}
            <div
              className="flex-1 min-w-0 flex flex-col gap-[16px] cursor-pointer group"
              onClick={() => navigate('/projects/ai-avatar')}
            >
              <div className="relative overflow-hidden w-full" style={{ aspectRatio: '886.84/591.23' }}>
                <img src={imgCnaiTh} alt="AI Avatar Video Creation Platform" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>AI Avatar Video Creation Platform</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>50% faster voice selection, 59% fewer voice re-selections</p>
              </div>
            </div>

            {/* Cornerstone — 클릭 가능 */}
            <div
              className="flex-1 min-w-0 flex flex-col gap-[16px] cursor-pointer group"
              onClick={() => navigate('/projects/cornerstone')}
            >
              <div className="relative overflow-hidden w-full" style={{ aspectRatio: '886.84/591.23' }}>
                <video src={vidCornerstoneDemo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Cornerstone College Website</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>70%+ AI-assisted workflow, one scalable system across 10 program pages</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// ShelterPage
// ─────────────────────────────────────────────────
export default function ShelterPage() {
  const heroAnimation = useLottieAnimation('/lottie/wildflower-hero.json')

  return (
    <ProjectPageWrapper>
      <ProjectHero
        title="Homeless Shelter Management System"
        subtitle="94.3% NFC adoption and 30+ minutes faster response time"
        status={{ label: 'Shipped' }}
        heroNode={
          heroAnimation
            ? <LottieHeroPlayer
                animationData={heroAnimation}
                className="w-full shrink-0 block"
                style={{ height: '640px' }}
              />
            : <div className="w-full shrink-0 bg-[#bebebe]" style={{ height: '640px' }} />
        }
        descriptions={[
          'As the Product Designer for Wildflower Gardening, I improved an existing shelter management MVP through field research, usability testing, and iterative redesign. The product included a mobile app for residents and a web platform for shelter administrators.',
          'I worked closely with a PM and developers to simplify core flows such as leave requests, status tracking, notifications, and program participation. Based on research with real shelter residents, I redesigned the experience to make essential tasks easier to find and use for people with limited digital familiarity.',
        ]}
        meta={[
          { label: 'Product',  value: 'Mobile App + Admin Web' },
          { label: 'My role',  value: 'Product Designer · Mobile App Lead' },
          { label: 'Timeline', value: 'Q3 2024 to Q1 2025' },
          { label: 'Skills',   value: 'UX Research, Usability Testing, Information Architecture, Interaction Design, UI Design, Prototyping' },
        ]}
        teamLines={['2 Product Designers · 1 PM · 5 Developers']}
      />

      <SideNav items={SHELTER_NAV_ITEMS} />

      <div id="sh-intro"><IntroSection /></div>
      <div id="sh-overview"><OverviewSection /></div>
      <div id="sh-walkthrough"><HorizontalScrollSection /></div>
      <div id="sh-ux-research"><UXResearchSection /></div>
      <div id="sh-analysis"><AnalysisSection /></div>
      <div id="sh-problem"><ProblemDefinitionSection /></div>
      <div id="sh-solution-1"><DesignSolution1Section /></div>
      <div id="sh-solution-2"><DesignSolution2Section /></div>
      <div id="sh-solution-3"><DesignSolution3Section /></div>
      <div id="sh-implemented"><ImplementedSolutionSection /></div>
      <div id="sh-reflection"><ReflectionSection /></div>
      <NextProjectSection />
    </ProjectPageWrapper>
  )
}
