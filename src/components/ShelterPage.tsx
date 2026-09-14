// ShelterPage.tsx — Homeless Shelter Management System case study
// Route: /projects/shelter
// Desktop layout (≥1024px). 반응형은 추후 별도 작업.

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'

import { useLottieAnimation } from '../hooks/useLottieAnimation'
import { LottieHeroPlayer } from './LottieHeroPlayer'
import { ProjectHero } from './ProjectHero'
import { ProjectPageWrapper } from './ProjectPageWrapper'
import imgOverviewDiagram    from '../assets/images/shelter-overview-diagram.webp'
import imgFieldResearch      from '../assets/images/shelter-field-research.webp'
import shelterUI01Json       from '../assets/lottie/shelter-ui-01.json'

// ── 영상 파일 (src/assets/videos/) ─────────────────
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

      <IntroSection />
      <OverviewSection />
      <HorizontalScrollSection />
      <UXResearchSection />
      <AnalysisSection />
    </ProjectPageWrapper>
  )
}
