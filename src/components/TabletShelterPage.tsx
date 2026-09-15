// TabletShelterPage.tsx — Homeless Shelter Management System (Tablet 768–1023px)
// ★ ShelterPage.tsx(데스크톱 원본)는 절대 건드리지 않음. 이 파일만 편집.

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLottieAnimation } from '../hooks/useLottieAnimation'
import { LottieHeroPlayer } from './LottieHeroPlayer'

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

// ── 공용 레이아웃 래퍼 — px-[32px], py-[60px], gap 기본 24px ──
function TContentWrap({ children, gap = 24 }: { children: React.ReactNode; gap?: number }) {
  return (
    <div className="w-full px-[32px]" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="w-full flex flex-col" style={{ gap: `${gap}px` }}>
        {children}
      </div>
    </div>
  )
}

// ── 섹션 레이블 — num: 22px/32px #CEE0D3, label: 20px/30px #1e1e1e ──
function TSectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p style={{ margin: 0, fontFamily: poppins, fontSize: '22px', fontWeight: 500, lineHeight: '32px', color: '#CEE0D3' }}>{num}</p>
      <p style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, lineHeight: '30px', color: '#1e1e1e' }}>{label}</p>
    </div>
  )
}

// ── Before/After 가로 2열 공용 컴포넌트 ──
function TBeforeAfterRow({
  beforeLabel, beforeImg, beforeAlt, beforeBg,
  afterImg, afterAlt, height,
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
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>{beforeLabel}</p>
        <div style={{ height: `${height}px`, backgroundColor: beforeBg ?? '#F7F7F7', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src={beforeImg} alt={beforeAlt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
      </div>
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>After</p>
        <div style={{ height: `${height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src={afterImg} alt={afterAlt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
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
function TabletShelterHeader() {
  const heroAnimation = useLottieAnimation('/lottie/wildflower-hero.json')
  const META = [
    { label: 'Product',  value: 'Mobile App + Admin Web' },
    { label: 'My role',  value: 'Product Designer · Mobile App Lead' },
    { label: 'Timeline', value: 'Q3 2024 to Q1 2025' },
    { label: 'Skills',   value: 'UX Research, Usability Testing, Information Architecture, Interaction Design, UI Design, Prototyping' },
  ]
  return (
    <section className="w-full bg-white pt-[64px] pb-[60px] px-[32px]">
      <div className="w-full flex flex-col gap-[32px]">

        {/* 타이틀 행 — Shipped badge absolute top-right */}
        <div className="relative flex items-start w-full">
          <div className="flex flex-col gap-[12px] flex-1 min-w-0 pr-[120px]">
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '28px', fontWeight: 500, lineHeight: '38px', color: '#1e1e1e' }}>
              Homeless Shelter Management System
            </p>
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 400, lineHeight: '30px', color: '#8b8b8b' }}>
              94.3% NFC adoption and 30+ minutes faster response time
            </p>
          </div>
          <div className="absolute right-0 top-0 bg-[#f7f4f0] flex gap-[12px] items-center px-[12px] py-[8px] shrink-0">
            <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: '#00C950' }} />
            <span style={{ fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#8b8b8b', whiteSpace: 'nowrap' }}>Shipped</span>
          </div>
        </div>

        {/* Hero Lottie */}
        {heroAnimation
          ? <LottieHeroPlayer animationData={heroAnimation} className="w-full shrink-0 block" style={{ height: '400px' }} />
          : <div className="w-full shrink-0 bg-[#bebebe]" style={{ height: '400px' }} />
        }

        {/* 소개 문단 */}
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1e1e1e' }}>
          As the Product Designer for Wildflower Gardening, I improved an existing shelter management MVP through field research, usability testing, and iterative redesign. The product included a mobile app for residents and a web platform for shelter administrators.
        </p>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1e1e1e' }}>
          I worked closely with a PM and developers to simplify core flows such as leave requests, status tracking, notifications, and program participation. Based on research with real shelter residents, I redesigned the experience to make essential tasks easier to find and use for people with limited digital familiarity.
        </p>

        {/* 메타정보 그리드 — 2열 flex-wrap + Team full width */}
        <div
          className="w-full py-[20px] flex flex-wrap gap-x-[24px] gap-y-[20px]"
          style={{ borderTop: '1px solid #f7f7f7', borderBottom: '1px solid #f7f7f7' }}
        >
          {META.map((item) => (
            <div key={item.label} className="flex flex-col items-start" style={{ width: 'calc(50% - 12px)' }}>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#8b8b8b' }}>{item.label}</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1e1e1e' }}>{item.value}</p>
            </div>
          ))}
          <div className="flex flex-col items-start w-full">
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#8b8b8b' }}>Team</p>
            <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1e1e1e' }}>2 Product Designers · 1 PM · 5 Developers</p>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 01 Introduction
// ─────────────────────────────────────────────────
function TabletShelterIntroSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="01" label="Introduction" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
          A pilot platform for homeless shelters in Seoul
        </h2>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1e1e1e' }}>
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
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 02 Overview
// ─────────────────────────────────────────────────
function TabletShelterOverviewSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="02" label="Overview" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
          Homeless Shelter Management System
        </h2>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1e1e1e' }}>
          This system is an integrated solution designed for the efficient management of homeless shelters and the convenience of their residents.
        </p>
        <div className="w-full flex flex-col gap-[8px]" style={{ backgroundColor: '#F1FAF3', padding: '16px 20px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, lineHeight: '21px', color: '#1e1e1e' }}>Project Goal</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1e1e1e' }}>
            Validate the existing MVP with real shelter residents, identify usability issues, and evolve the product by improving core workflows and adding features based on real user needs.
          </p>
        </div>
        <div className="w-full overflow-hidden" style={{ aspectRatio: '1920/1080' }}>
          <img src={imgOverviewDiagram} alt="Homeless Shelter Management System overview diagram" className="w-full h-full object-cover block" />
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 03 UX Research
// ─────────────────────────────────────────────────
function TabletShelterUXResearchSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="03" label="UX Research" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
          How might we make essential shelter tasks easier to find for residents with low digital literacy?
        </h2>

        {/* 리서치 테이블 */}
        <div className="w-full flex flex-col" style={{ border: '1px solid #E5E5E5', borderBottom: 'none' }}>
          <div className="flex" style={{ backgroundColor: '#F1FAF3', borderBottom: '1px solid #E5E5E5' }}>
            <div style={{ width: '200px', flexShrink: 0, padding: '12px 16px', fontFamily: poppins, fontSize: '15px', fontWeight: 500, color: '#1e1e1e' }}>Research method</div>
            <div style={{ flex: 1, padding: '12px 16px', fontFamily: poppins, fontSize: '15px', fontWeight: 500, color: '#1e1e1e' }}>What I investigated</div>
          </div>
          {RESEARCH_ROWS.map((row) => (
            <div key={row.method} className="flex" style={{ borderBottom: '1px solid #E5E5E5' }}>
              <div style={{ width: '200px', flexShrink: 0, padding: '12px 16px', fontFamily: poppins, fontSize: '15px', fontWeight: 500, color: '#1e1e1e' }}>{row.method}</div>
              <div style={{ flex: 1, padding: '12px 16px', fontFamily: poppins, fontSize: '15px', fontWeight: 400, color: '#1e1e1e' }}>{row.what}</div>
            </div>
          ))}
        </div>

        <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, color: '#777' }}>
          Primary cohort — shelter residents with limited familiarity with digital devices.
        </p>

        {/* On-site research */}
        <div className="flex flex-col" style={{ gap: '16px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, color: '#1e1e1e' }}>On-site research</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1e1e1e' }}>
            Weekly visits to the shelter revealed that many residents struggled with basic app tasks, including downloading, signing up, and checking status. We also found that the existing location-based leave/return method did not meet legal requirements, which led us to shift to NFC tag-based tracking.
          </p>
          <div className="w-full overflow-hidden" style={{ height: '400px' }}>
            <img src={imgFieldResearch} alt="Field research at homeless shelter" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 05 Analysis of Results
// ─────────────────────────────────────────────────
function TabletShelterAnalysisSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="05" label="Analysis of Results" />
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
          Research revealed three recurring usability issues that made essential shelter tasks harder to complete.
        </p>

        {/* 카드 3개 — 세로로 쌓임, 전체 너비 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {ANALYSIS_CARDS.map((card) => (
            <div
              key={card.pct}
              style={{
                width: '100%',
                backgroundColor: '#F1FAF3',
                padding: '24px 20px',
                display: 'flex', flexDirection: 'column', gap: '8px',
                boxSizing: 'border-box',
              }}
            >
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '32px', fontWeight: 500, lineHeight: 1, color: '#417454' }}>{card.pct}</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 500, lineHeight: '26px', color: '#212121' }}>{card.title}</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#212121' }}>{card.desc}</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#727272' }}>{card.quote}</p>
            </div>
          ))}
        </div>

        <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, color: '#727272' }}>
          These findings pointed to a broader structural issue in the existing MVP, which is defined in the next section.
        </p>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 Problem Definition
// ─────────────────────────────────────────────────
function TabletShelterProblemDefinitionSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="06" label="Problem Definition" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
          A single home screen couldn't hold everything the app needed to do.
        </h2>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1E1E1E' }}>
          Leave requests, status, reminders, notifications, and program information all competed for the same space. As the product grew, key actions became harder to find and the home screen had little room to scale.
        </p>
        <img
          src={imgProblemDefinition}
          alt="Existing MVP screens and key usability issues"
          style={{ width: '100%', display: 'block', objectFit: 'contain' }}
        />

        {/* Problem/Insight 카드 3개 — 카드는 세로, 카드 내부는 2열 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.problemLabel}
              style={{ backgroundColor: '#F7F7F7', padding: '20px', display: 'flex', gap: '24px' }}
            >
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#C2410C' }}>{card.problemLabel}</p>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>{card.problem}</p>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>Insight</p>
                <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>{card.insight}</p>
              </div>
            </div>
          ))}
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 05 Design Solution 1
// ─────────────────────────────────────────────────
function TabletShelterDS1Section() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="05" label="Design Solution 1" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
          From One Screen to Clear Navigation
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#C2410C' }}>Problem</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            A single-screen structure made key actions harder to find and left little room for future features.
          </p>
        </div>
        <div style={{ backgroundColor: '#F1FAF3', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Why this approach</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            We introduced tab-based navigation to give key functions predictable locations. Because tabs stay visible at all times, residents no longer need to remember where features live.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>Result</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Core actions were separated into clearer destinations, making leave requests, community features, and personal information easier to find. It also created room to add future features without crowding the home screen.
          </p>
        </div>
        <TBeforeAfterRow
          beforeLabel="Before : 1st prototype"
          beforeImg={imgS1Before} beforeAlt="Before — Design Solution 1"
          afterImg={imgS1After}   afterAlt="After — Design Solution 1"
          height={400}
        />
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 Design Solution 2
// ─────────────────────────────────────────────────
function TabletShelterDS2Section() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="06" label="Design Solution 2" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
          Instantly Recognizable Status System
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#C2410C' }}>Problem</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Status was shown only as text, making it difficult to understand at a glance.
          </p>
        </div>
        <div style={{ backgroundColor: '#F1FAF3', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Why this approach</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            We introduced a color coded status system with clear visual labels so residents could recognize their current state immediately without relying on text alone.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>Result</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Residents could identify their status at a glance, reducing confusion during leave and return checks.
          </p>
        </div>
        <TBeforeAfterRow
          beforeLabel="Before : 1st prototype"
          beforeImg={imgS2Before} beforeAlt="Before — Design Solution 2"
          afterImg={imgS2After}   afterAlt="After — Design Solution 2"
          height={400}
        />
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 07 Design Solution 3
// ─────────────────────────────────────────────────
function TabletShelterDS3Section() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="07" label="Design Solution 3" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
          Every Notification at a Glance
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#C2410C' }}>Problem</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Notifications were hidden behind a small bell icon, making important information easy to miss for digitally vulnerable users.
          </p>
        </div>
        <div style={{ backgroundColor: '#F1FAF3', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Why this approach</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            We brought notifications directly onto the home screen and redesigned them as visible, actionable cards. This reduced navigation steps and let residents notice important updates and respond in the same place.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#0F766E' }}>Result</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            Residents could notice important updates and respond to program invitations directly in the app, making participation tracking faster and reducing the risk of missed or inconsistent records.
          </p>
        </div>

        {/* 서브섹션 01 — Making Notifications Visible */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '20px', fontWeight: 500, color: '#1E1E1E' }}>
            01 · Making Notifications Visible
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1E1E1E' }}>
            From a hidden bell icon to visible updates on the home screen
          </p>
          <TBeforeAfterRow
            beforeLabel="Before : 2nd prototype"
            beforeImg={imgS31Before} beforeAlt="Before — Making Notifications Visible"
            afterImg={imgS31After}   afterAlt="After — Making Notifications Visible"
            height={400}
          />
        </div>

        {/* 서브섹션 02 — Turning Notifications into Actions */}
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
          <TBeforeAfterRow
            beforeLabel="Before"
            beforeImg={imgS32Before} beforeAlt="Before — Turning Notifications into Actions"
            afterImg={imgS32After}   afterAlt="After — Turning Notifications into Actions"
            height={309}
            beforeBg="transparent"
          />
        </div>

        {/* Notification Card System */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Notification Card System</p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '14px', fontWeight: 400, color: '#777' }}>
            Designed flexible notification patterns for different content types, priorities, and actions.
          </p>
          <img
            src={imgS3Notification}
            alt="Notification Card System"
            style={{ width: '100%', display: 'block', objectFit: 'contain' }}
          />
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 08 Implemented Solution
// ─────────────────────────────────────────────────
function TabletShelterImplementedSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="08" label="Implemented Solution" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
          NFC Leave/Return System enabled
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1E1E1E' }}>
            To improve the inefficiency of the manual leave request process, we introduced an NFC-based system.
          </p>
          <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1E1E1E' }}>
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
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 09 Reflection
// ─────────────────────────────────────────────────
function TabletShelterReflectionSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="09" label="Reflection" />
        <h2 style={{ margin: 0, fontFamily: poppins, fontSize: '24px', fontWeight: 500, lineHeight: '34px', color: '#1e1e1e' }}>
          Design Beyond the Screen
        </h2>
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 400, lineHeight: '27px', color: '#1E1E1E' }}>
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
        <img
          src={imgMockupScreen}
          alt="Homeless Shelter Management System mockup screens"
          style={{ width: '100%', display: 'block', objectFit: 'contain' }}
        />
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Next Project
// ─────────────────────────────────────────────────
function TabletShelterNextProjectSection() {
  const navigate = useNavigate()
  return (
    <section className="w-full bg-[#f7f7f7]">
      <div className="w-full px-[32px] py-[48px] flex flex-col gap-[24px]">
        <p style={{ margin: 0, fontFamily: poppins, fontSize: '18px', fontWeight: 500, lineHeight: '27px', color: '#1e1e1e' }}>Next Project</p>
        <div className="flex gap-[20px] w-full">

          {/* AI Avatar */}
          <div className="flex-1 min-w-0 flex flex-col gap-[12px] cursor-pointer group" onClick={() => navigate('/projects/ai-avatar')}>
            <div className="relative overflow-hidden w-full" style={{ aspectRatio: '886.84/591.23' }}>
              <img src={imgCnaiTh} alt="AI Avatar Video Creation Platform" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 500, lineHeight: '24px', color: '#1e1e1e' }}>AI Avatar Video Creation Platform</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 400, lineHeight: '19px', color: '#8b8b8b' }}>50% faster voice selection, 59% fewer voice re-selections</p>
            </div>
          </div>

          {/* Cornerstone */}
          <div className="flex-1 min-w-0 flex flex-col gap-[12px] cursor-pointer group" onClick={() => navigate('/projects/cornerstone')}>
            <div className="relative overflow-hidden w-full" style={{ aspectRatio: '886.84/591.23' }}>
              <video src={vidCornerstoneDemo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '16px', fontWeight: 500, lineHeight: '24px', color: '#1e1e1e' }}>Cornerstone College Website</p>
              <p style={{ margin: 0, fontFamily: poppins, fontSize: '13px', fontWeight: 400, lineHeight: '19px', color: '#8b8b8b' }}>70%+ AI-assisted workflow, one scalable system across 10 program pages</p>
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
export default function TabletShelterPage() {
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
        className="group fixed top-[24px] right-[24px] w-[40px] h-[40px] bg-[#1e1e1e] flex items-center justify-center z-50 border-0 outline-none cursor-pointer shrink-0"
        aria-label="Close"
      >
        <img src={icClose} alt="" aria-hidden className="block w-[20px] h-[20px] transition-transform duration-200 ease-out group-hover:rotate-90" />
      </button>

      <TabletShelterHeader />
      <TabletShelterIntroSection />
      <TabletShelterOverviewSection />
      <TabletShelterUXResearchSection />
      <TabletShelterAnalysisSection />
      <TabletShelterProblemDefinitionSection />
      <TabletShelterDS1Section />
      <TabletShelterDS2Section />
      <TabletShelterDS3Section />
      <TabletShelterImplementedSection />
      <TabletShelterReflectionSection />
      <TabletShelterNextProjectSection />
    </motion.div>
  )
}
