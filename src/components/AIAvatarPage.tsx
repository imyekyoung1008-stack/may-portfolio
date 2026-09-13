// AIAvatarPage.tsx — AI Avatar Video Creation Platform case study
// Route: /projects/ai-avatar
// Figma: https://www.figma.com/design/fCphmFmQRkjF6EWKKqby8E/2026?node-id=889-18398
// ★ Desktop only (1440px+). 반응형은 별도 작업 예정.

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLottieAnimation } from '../hooks/useLottieAnimation'
import { LottieHeroPlayer } from './LottieHeroPlayer'

// ── Images ────────────────────────────────────────
import imgIntroTabletPhoto from '../assets/images/ai-avatar/intro-tablet-photo.jpg'

// ── Icons ─────────────────────────────────────────
import icClose           from '../assets/icons/close.svg'
import icAvatarCheck     from '../assets/icons/ai-avatar/check-circle.svg'
import icAvatarArrowDown from '../assets/icons/ai-avatar/arrow-down-box.svg'
import icProblemFlow     from '../assets/icons/ai-avatar/problem-flow-lines.svg'

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────
const poppins = "'Poppins', sans-serif"

// ─────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────

/** KT 프로젝트 섹션 레이블 — accent color #a6daff */
function KTSectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p className="text-[24px] font-medium leading-[36px]" style={{ fontFamily: poppins, color: '#a6daff' }}>{num}</p>
      <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

/** Image Placeholder — Figma 의 회색 rounded-rect 박스 그대로 유지 */
function ImgPlaceholder({ aspectRatio = '16/9', className = '' }: { aspectRatio?: string; className?: string }) {
  return (
    <div
      className={`w-full bg-[#c4c4c4] shrink-0 ${className}`}
      style={{ aspectRatio }}
      aria-hidden
    />
  )
}

/** ContentWrap — max-w-[960px] 가운데 정렬, 섹션별 사용 */
function ContentWrap({ children, gap = 24, py = 60 }: { children: React.ReactNode; gap?: number; py?: number }) {
  return (
    <div className="w-full px-[40px]" style={{ paddingTop: `${py}px`, paddingBottom: `${py}px` }}>
      <div className="max-w-[960px] mx-auto w-full flex flex-col" style={{ gap: `${gap}px` }}>
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// 사이드 네비게이션
// ─────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'intro',          label: 'Introduction' },
  { id: 'project-goal',   label: 'Project Goal' },
  { id: 'ai-thinking',    label: 'AI Product Thinking' },
  { id: 'outcome-top',    label: 'Outcome' },
  { id: 'what-i-worked',  label: 'What Did I Work On?' },
  { id: 'ux-research',    label: 'UX Research' },
  { id: 'analysis',       label: 'Analysis of Results' },
  { id: 'problem-def',    label: 'Problem Definition' },
  { id: 'solution-01',    label: 'Design Solution 01' },
  { id: 'solution-02',    label: 'Design Solution 02' },
  { id: 'solution-03',    label: 'Design Solution 03' },
  { id: 'solution-04',    label: 'Design Solution 04' },
  { id: 'outcome-bottom', label: 'Outcome' },
  { id: 'reflection',     label: 'Reflection' },
] as const

function SideNav() {
  const [activeId, setActiveId] = useState<string>('intro')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      // 뷰포트 상단 30% 구간에 들어온 섹션을 활성으로 판단
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="hidden 3xl:block"
      style={{
        position: 'fixed',
        left: '48px',
        top: '100px',
        width: '200px',
        zIndex: 30,
        background: 'transparent',
      }}
    >
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px', background: 'transparent' }}>
        {NAV_ITEMS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: poppins,
                fontSize: '11px',
                fontWeight: activeId === id ? 500 : 400,
                lineHeight: '16px',
                color: activeId === id ? '#1e1e1e' : '#c0c0c0',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ─────────────────────────────────────────────────
// Header — 889:18399
// ─────────────────────────────────────────────────
function AIAvatarHeader() {
  const heroAnimation = useLottieAnimation('/lottie/ai-avatar-hero.json')
  const META = [
    { label: 'Product',  value: 'Web' },
    { label: 'My role',  value: 'Solo Product Designer' },
    { label: 'Timeline', value: 'Q2 2026 to Q3 2026' },
    { label: 'Skills',   value: 'UX Strategy, Information Architecture, UI Design, Responsive Design, AI Assisted Workflow, Stakeholder Collaboration' },
  ]
  return (
    <section className="w-full bg-white pt-[80px] pb-[60px] px-[42px]">
      <div className="max-w-[960px] mx-auto w-full flex flex-col gap-[42px]">

        {/* 타이틀 행 */}
        <div className="flex gap-[40px] items-start w-full">
          <div className="flex flex-col gap-[12px] flex-1 min-w-0">
            <p className="text-[36px] font-medium leading-[47px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              AI Avatar Video Creation Platform
            </p>
            <p className="text-[20px] font-normal leading-[30px] text-[#8b8b8b] w-full" style={{ fontFamily: poppins }}>
              Improved voice selection efficiency with 50% faster selection and 59% fewer reselections
            </p>
          </div>
          {/* Shipped 배지 */}
          <div className="bg-[#f7f4f0] flex gap-[12px] items-center justify-center px-[12px] py-[8px] shrink-0">
            <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: '#00C950' }} />
            <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>
              Shipped
            </span>
          </div>
        </div>

        {/* 히어로 — Lottie 애니메이션 (1800×1200 = 3:2, 960×640) */}
        {heroAnimation
          ? <LottieHeroPlayer
              animationData={heroAnimation}
              className="w-full shrink-0 block"
              style={{ height: '640px' }}
            />
          : <div className="w-full shrink-0 bg-[#bebebe]" style={{ height: '640px' }} />
        }

        {/* 소개 문단 */}
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          As the product designer, I led the end-to-end UX/UI of KT AI Human Studio, integrating video generation and voice synthesis. I worked closely with KT's AI division to align technical feasibility and UX goals, and defined and optimized the voice feature through usability testing on KT AI Voice Studio. Using Figma, I designed the core flows, including the main interface, admin pages, and payment system, and validated them through rapid prototyping.
        </p>

        {/* 메타정보 그리드 */}
        <div
          className="w-full py-[20px] grid gap-[20px]"
          style={{
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            borderTop: '1px solid #f7f7f7',
            borderBottom: '1px solid #f7f7f7',
          }}
        >
          {META.map((item) => (
            <div key={item.label} className="flex flex-col items-start">
              <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>{item.label}</p>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item.value}</p>
            </div>
          ))}
          <div className="flex flex-col items-start" style={{ gridColumn: '1 / span 4' }}>
            <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>Team</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>2 Developers · 6 Program Managers</p>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 01 INTRODUCTION — 889:18442
// ─────────────────────────────────────────────────
function IntroSection() {
  return (
    <section className="w-full bg-white">
      <ContentWrap gap={24}>
        <KTSectionLabel num="01" label="INTRODUTION" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Two Platforms in One: KT AI Human Studio Launch
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            CNAI STUDIO collaborated with KT, Korea's largest telecom carrier, to integrate KT's AI voice generation technology into our video creation platform. This partnership evolved CNAI STUDIO from a B2B to a B2B2C service, allowing users to create personalized AI human videos by customizing both visuals and voices.
          </p>
        </div>
        {/* 01 INTRODUCTION 유튜브 임베드 */}
        <div className="w-full relative" style={{ paddingTop: '56.25%' }}>
          <iframe
            key="MGSxaNMiLwU"
            src={`https://www.youtube.com/embed/MGSxaNMiLwU?autoplay=1&mute=1&controls=1&rel=0&playsinline=1&cc_load_policy=1&cc_lang_pref=en&hl=en`}
            title="KT AI Human Studio"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </div>
        {/* 실제 이미지 — Figma 942:19974 (Handing over phone) */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={imgIntroTabletPhoto} alt="KT AI Human Studio interface on a tablet" className="w-full h-full object-cover" />
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 02 PROJECT GOAL — 889:18459
// ─────────────────────────────────────────────────
function ProjectGoalSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={24}>
        <KTSectionLabel num="02" label="PROJECT GOAL" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Integrating AI Voice Customization Into the Creation Flow
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Our goal was to seamlessly integrate AI voice customization into the existing AI human video workflow. We designed a familiar yet intuitive creation experience, allowing users to easily personalize both voice and visuals within one unified platform.
          </p>
        </div>
        {/* Image Placeholder — Figma 889:18473 */}
        <ImgPlaceholder aspectRatio="16/9" />
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 03 AI Product Thinking — 889:18474
// ─────────────────────────────────────────────────
function AIProductThinkingSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={24}>
        <KTSectionLabel num="03" label="AI Product Thinking" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Defining What the AI Should Use as Its Criteria
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            This project went beyond screen design. It brought together CNAI STUDIO, which generates video using morphing technology, and a voice generation AI to create a single, coherent AI human. That meant defining each AI human's traits and each voice's tone as keywords, and deciding the criteria the AI would use to match them automatically. This became the foundation for the voice recommendation logic in Design Solution 03.
          </p>
        </div>
        {/* Image Placeholder — Figma 889:18488 */}
        <ImgPlaceholder aspectRatio="16/9" />
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 04 Outcome — 889:18489
// ─────────────────────────────────────────────────
function OutcomeTopSection() {
  const outcomes = [
    {
      num: '01',
      text: "Integrated the client's AI voice platform (KT AI Voice Studio) into our own AI avatar video generation platform (CNAI STUDIO)",
      highlight: null,
    },
    {
      num: '02',
      text: 'Shortened voice selection time by',
      highlight: '50%',
    },
    {
      num: '03',
      text: 'Reduced voice reselection rate by',
      highlight: '59%',
    },
  ]
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={40}>
        <KTSectionLabel num="04" label="Outcome" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Scaling the Product from B2B to B2B2C
          </h2>
        </div>
        <div className="flex flex-col gap-[24px] w-full">
          {outcomes.map(({ num, text, highlight }) => (
            <div
              key={num}
              className="flex gap-[20px] items-center px-[32px] py-[28px] w-full"
              style={{ backgroundColor: '#a6daff' }}
            >
              <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                <span className="text-[20px] font-medium leading-[30px] text-white text-center" style={{ fontFamily: poppins }}>{num}</span>
              </div>
              <p className="text-[20px] font-normal leading-[30px] text-[#1e1e1e] flex-1" style={{ fontFamily: poppins }}>
                {text}
              </p>
              {highlight && (
                <span className="text-[24px] font-semibold leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                  {highlight}
                </span>
              )}
            </div>
          ))}
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 05 What did I work on? — 889:18528
// ─────────────────────────────────────────────────
const WORK_ITEMS = [
  {
    num: '01',
    title: 'End-to-End UX/UI Design',
    body: 'Led end-to-end UX/UI design for the AI human video creation experience, from problem discovery to final delivery, focusing on reducing cognitive load in early voice selection.',
  },
  {
    num: '02',
    title: 'Voice Discovery & Selection UX',
    body: 'Optimized voice discovery and selection through recommended voices, clearer filter states, and improved preview interactions.',
  },
  {
    num: '03',
    title: 'Integration Across Platforms',
    body: 'Collaborated with KT to integrate Voice Studio features into the AI avatar video creation platform, aligning IA and interaction patterns across both workflows.',
  },
]

function WhatIWorkedOnSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={40}>
        <KTSectionLabel num="05" label="What did I work on?" />
        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          UX/UI Design From Concept to Delivery
        </h2>
        <div className="flex flex-col gap-[24px] w-full">
          {WORK_ITEMS.map(({ num, title, body }) => (
            <div key={num} className="bg-[#f7f7f7] flex flex-col gap-[12px] px-[32px] py-[28px] w-full">
              <div className="flex flex-col gap-[8px]">
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{num}</p>
                <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{title}</p>
              </div>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{body}</p>
            </div>
          ))}
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 UX Research — 889:18563
// ─────────────────────────────────────────────────
const TASKS = [
  { id: 'T1', label: 'Task 1', title: 'Access the AI voice selection screen after creating a project', expected: 'Expected 30s · 5 taps', highlight: true },
  { id: 'T2', label: 'Task 2', title: 'Select a voice using filters and search (by project)', expected: 'Expected 4 min · 8 taps', highlight: true },
  { id: 'T3', label: 'Task 3', title: 'Write a sentence and select a voice (by sentence)', expected: 'Expected 6 min · 79 taps', highlight: false },
  { id: 'T4', label: 'Task 4', title: 'Adjust detailed voice settings (emotion · language · speed · pitch)', expected: 'Expected 2 min · 34 taps', highlight: false },
  { id: 'T5', label: 'Task 5', title: 'Play the written sentence, add silence', expected: 'Expected 1 min · 12 taps', highlight: false },
]

function UXResearchSection() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f7f7f7' }}>
      <ContentWrap gap={40}>
        <KTSectionLabel num="06" label="UX Research" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Conducting a Usability Test on "KT AI Voice Studio"
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            To identify integration challenges and improve the voice selection experience, we conducted a usability test with six people using KT AI Voice Studio for the first time. Participants were split into two groups, with and without content creation experience, to compare behavior patterns. We designed five tasks covering the full voice selection and editing flow. The most critical usability issues appeared in Tasks 1 and 2, related to voice access and search efficiency.
          </p>
        </div>
        {/* Task 카드 5개 */}
        <div className="flex gap-[12px] items-stretch w-full">
          {TASKS.map(({ id, label, title, expected, highlight }) => (
            <div
              key={id}
              className="flex flex-col gap-[12px] flex-1 min-w-0 px-[16px] py-[17px]"
              style={{
                backgroundColor: highlight ? '#a6daff' : '#f3f3f3',
                border: highlight ? 'none' : '1px solid #ddd',
              }}
            >
              <p className="text-[14px] font-normal leading-[21px]" style={{ fontFamily: poppins, color: highlight ? '#1e1e1e' : '#666' }}>{label}</p>
              <p className="text-[14px] font-medium leading-[21px] min-h-[56px]" style={{ fontFamily: poppins, color: highlight ? '#1e1e1e' : '#666' }}>{title}</p>
              <p className="text-[14px] font-normal leading-[21px]" style={{ fontFamily: poppins, color: highlight ? '#1e1e1e' : '#666' }}>{expected}</p>
            </div>
          ))}
        </div>
        {/* Key Insight */}
        <div className="bg-[#a6daff] flex flex-col gap-[16px] items-center px-[60px] py-[40px] w-full text-center">
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Key Insight</p>
          <p className="text-[24px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Most usability issues occurred before users could confidently start selecting voices.
          </p>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 07 Analysis of Results — 889:18616
// ─────────────────────────────────────────────────

/** 바 차트 공통 컬럼 */
function BarCol({ value, barH, barColor, isGradient, label }: {
  value: string; barH: string | 'flex'; barColor: string; isGradient?: boolean; label: string
}) {
  const barStyle: React.CSSProperties = isGradient
    ? { background: 'linear-gradient(to bottom, #3d5afb, #1c2a78)', borderRadius: '6px 6px 0 0', flexShrink: 0 }
    : { backgroundColor: barColor, borderRadius: '6px 6px 0 0', flexShrink: 0 }

  return (
    <div className="flex flex-col items-center justify-end h-[180px] shrink-0" style={{ width: '53.5px' }}>
      <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>{value}</p>
      {barH === 'flex'
        ? <div className="flex-1 min-h-0 w-full" style={barStyle} />
        : <div style={{ ...barStyle, height: barH, width: '100%' }} />
      }
      <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white flex flex-col gap-[16px] items-center px-[16px] py-[24px] shrink-0" style={{ width: '470px', height: '320px', border: '1px solid #ddd' }}>
      <div className="flex flex-col items-start w-[422px] shrink-0">
        <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{title}</p>
      </div>
      {subtitle && (
        <div className="w-[422px] shrink-0">
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{subtitle}</p>
        </div>
      )}
      {children}
    </div>
  )
}

function AnalysisSection() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f7f7f7' }}>
      <ContentWrap gap={40}>
        <KTSectionLabel num="07" label="Analysis of Results" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Key Challenges Identified in Tasks 1 and 2
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            We analyzed four metrics: success rate, time on task, error rate, and satisfaction. Tasks 1 and 2 had the lowest success rates and the highest error rates.
          </p>
        </div>

        {/* 2×2 차트 그리드 */}
        <div className="flex flex-col gap-[20px] w-full">
          {/* Row 1 */}
          <div className="flex gap-[20px]">
            {/* Success rate */}
            <ChartCard title="Success rate">
              <div className="flex gap-[10.5px] items-end justify-center h-[180px] w-full">
                <BarCol value="16"  barH="28.785px" barColor="#3d5afb" isGradient label="T1" />
                <BarCol value="33"  barH="59.385px" barColor="#3d5afb" isGradient label="T2" />
                <BarCol value="83"  barH="flex"     barColor="#e7e9f5" label="T3" />
                <BarCol value="100" barH="flex"     barColor="#e7e9f5" label="T4" />
                <BarCol value="100" barH="flex"     barColor="#e7e9f5" label="T5" />
              </div>
            </ChartCard>
            {/* Time taken */}
            <ChartCard title="Time taken (s)" subtitle="Expected Task Time">
              <div className="flex gap-[10.5px] items-end justify-center h-[180px] w-full">
                <BarCol value="65"  barH="32.49px" barColor="#3d5afb" isGradient label="T1" />
                <BarCol value="328" barH="flex"    barColor="#3d5afb" isGradient label="T2" />
                <BarCol value="283" barH="flex"    barColor="#e7e9f5" label="T3" />
                <BarCol value="91"  barH="45.495px" barColor="#e7e9f5" label="T4" />
                <BarCol value="42"  barH="21px"    barColor="#e7e9f5" label="T5" />
              </div>
            </ChartCard>
          </div>

          {/* Row 2 */}
          <div className="flex gap-[20px]">
            {/* Error rate — stacked */}
            <ChartCard title="Error rate">
              {/* Legend */}
              <div className="flex flex-wrap gap-x-[18px] items-center w-[422px] shrink-0">
                {[{ color: '#8fd9d9', label: 'Interaction' }, { color: '#f4d98a', label: 'Labeling' }, { color: '#c9b8f5', label: 'IA' }, { color: '#b7e8c4', label: 'UI' }].map(({ color, label }) => (
                  <div key={label} className="flex gap-[6px] items-center">
                    <div style={{ width: 12, height: 12, backgroundColor: color, flexShrink: 0 }} />
                    <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-[10.5px] items-end justify-center h-[180px] w-full">
                {/* T1: 8 errors — teal+yellow */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '53.5px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>8</p>
                  <div className="flex flex-col w-full" style={{ height: '63.39px' }}>
                    <div style={{ height: '23.76px', backgroundColor: '#8fd9d9', flexShrink: 0 }} />
                    <div style={{ height: '39.63px', backgroundColor: '#f4d98a', flexShrink: 0 }} />
                  </div>
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T1</p>
                </div>
                {/* T2: 12 errors — teal+yellow+purple */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '53.5px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>12</p>
                  <div className="flex flex-col w-full" style={{ height: '95.1px' }}>
                    <div style={{ height: '23.76px', backgroundColor: '#8fd9d9', flexShrink: 0 }} />
                    <div style={{ height: '59.46px', backgroundColor: '#f4d98a', flexShrink: 0 }} />
                    <div style={{ height: '11.88px', backgroundColor: '#c9b8f5', flexShrink: 0 }} />
                  </div>
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T2</p>
                </div>
                {/* T3: 4 errors — teal+purple */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '53.5px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>4</p>
                  <div className="flex flex-col w-full" style={{ height: '31.68px' }}>
                    <div style={{ height: '19.8px', backgroundColor: '#8fd9d9', flexShrink: 0 }} />
                    <div style={{ height: '11.88px', backgroundColor: '#c9b8f5', flexShrink: 0 }} />
                  </div>
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T3</p>
                </div>
                {/* T4: 0 errors */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '53.5px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>0</p>
                  <div className="flex-1 min-h-0 w-full" />
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T4</p>
                </div>
                {/* T5: 1 error — yellow */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '53.5px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>1</p>
                  <div className="flex flex-col w-full flex-1 min-h-0">
                    <div className="flex-1 min-h-0" />
                    <div style={{ backgroundColor: '#f4d98a', flexShrink: 0, height: '7.92px' }} />
                  </div>
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T5</p>
                </div>
              </div>
            </ChartCard>

            {/* Satisfaction */}
            <ChartCard title="Satisfaction (/5)" subtitle="Average: 2.67">
              <div className="flex gap-[10.5px] items-end justify-center h-[180px] w-full">
                {[
                  { val: '2.9', h: '104.385px', isGrad: false, label: 'P1' },
                  { val: '2.9', h: '104.385px', isGrad: false, label: 'P2' },
                  { val: '4',   h: 'flex',      isGrad: false, label: 'P3' },
                  { val: '1',   h: '36px',      isGrad: true,  label: 'P4' },
                  { val: '3.5', h: 'flex',      isGrad: false, label: 'P5' },
                  { val: '2',   h: '72px',      isGrad: false, label: 'P6' },
                ].map(({ val, h, isGrad, label }) => (
                  <div key={label} className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '42.87px' }}>
                    <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>{val}</p>
                    {h === 'flex'
                      ? <div className="flex-1 min-h-0 w-full" style={{ backgroundColor: '#e7e9f5', borderRadius: '6px 6px 0 0' }} />
                      : <div style={{ height: h, width: '100%', borderRadius: '6px 6px 0 0', background: isGrad ? 'linear-gradient(to bottom, #3d5afb, #1c2a78)' : '#e7e9f5', flexShrink: 0 }} />
                    }
                    <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>{label}</p>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 08 Problem Definition — 889:18806
// ─────────────────────────────────────────────────
const PROBLEMS = [
  { num: 'Problem 1', title: 'AI Voice Selection button UI, hard to notice',            tag: 'Usability',         solution: 'Stronger UI prominence and user awareness' },
  { num: 'Problem 2', title: 'Hard to check applied values when multiple filters are selected', tag: 'Usability',  solution: 'Switched to an intuitive vertical filter layout' },
  { num: 'Problem 3', title: 'Voice variety causes user selection overload',             tag: 'Connected Insight', solution: 'Recommended voices and a Default Voice' },
  { num: 'Problem 4', title: 'Applying a voice to the script often differs from expectation, causing rework', tag: 'Usage Pattern', solution: 'Added an "enter example sentence" feature' },
]


function ProblemDefinitionSection() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f7f7f7' }}>
      <ContentWrap gap={40}>
        <KTSectionLabel num="08" label="Problem Definition" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Four Problems Identified Through Research Data
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Users struggled to discover due to high complexity and lack of preview.
          </p>
        </div>

        {/* 이모지 + 말풍선 다이어그램 */}
        <div className="bg-white flex flex-col gap-[12px] px-[24px] py-[32px] w-full" style={{ border: '1px solid #ddd' }}>
          <p className="text-[18px] font-normal leading-[27px] text-[#8b8b8b] text-center w-full" style={{ fontFamily: poppins }}>
            Here's what drove the low success rates and high error rates in Tasks 1 and 2, task by task.
          </p>
          <div className="flex flex-col gap-[22px] w-full overflow-auto pb-[6px]">
            {/* 이모지 행 — flow lines SVG + emoji circles */}
            <div className="relative flex gap-[14px] items-end justify-center h-[130px] w-full min-w-[560px]">
              <img src={icProblemFlow} alt="" aria-hidden className="absolute inset-0 w-full h-full object-fill" />
              {/* T1: 😰 (맨 아래) */}
              <div className="flex flex-1 min-w-0 items-end justify-center relative z-10">
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-[20px] bg-white" style={{ border: '2px solid #e6e8f5', boxShadow: '0px 4px 14px -6px rgba(30,40,120,0.2)' }}>
                  <span style={{ fontSize: '22px', lineHeight: 1 }}>😰</span>
                </div>
              </div>
              {/* T2: 😰 (맨 아래) */}
              <div className="flex flex-1 min-w-0 items-end justify-center relative z-10">
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-[20px] bg-white" style={{ border: '2px solid #e6e8f5', boxShadow: '0px 4px 14px -6px rgba(30,40,120,0.2)' }}>
                  <span style={{ fontSize: '22px', lineHeight: 1 }}>😰</span>
                </div>
              </div>
              {/* T3: 😧 (중간 위) */}
              <div className="flex flex-1 min-w-0 items-start justify-center relative z-10" style={{ paddingBottom: '40px' }}>
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-[20px] bg-white" style={{ border: '2px solid #e6e8f5', boxShadow: '0px 4px 14px -6px rgba(30,40,120,0.2)' }}>
                  <span style={{ fontSize: '22px', lineHeight: 1 }}>😧</span>
                </div>
              </div>
              {/* T4: 😧 (중간) */}
              <div className="flex flex-1 min-w-0 items-center justify-center relative z-10">
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-[20px] bg-white" style={{ border: '2px solid #e6e8f5', boxShadow: '0px 4px 14px -6px rgba(30,40,120,0.2)' }}>
                  <span style={{ fontSize: '22px', lineHeight: 1 }}>😧</span>
                </div>
              </div>
            </div>
            {/* 말풍선 행 */}
            <div className="flex gap-[14px] items-start justify-center w-full min-w-[560px]">
              {/* T1 bubble */}
              <div className="flex-1 min-w-0 relative rounded-[12px] px-[14px] py-[13px]" style={{ backgroundColor: '#e6e0fb' }}>
                <div className="absolute left-[20px] top-[-6px] w-[11px] h-[11px] rotate-45 rounded-[2px]" style={{ backgroundColor: '#e6e0fb' }} />
                <p className="text-[10px] font-semibold leading-[15.5px] uppercase tracking-[0.5px] opacity-75 mb-[5px]" style={{ fontFamily: poppins, color: '#4a3b93' }}>Task 1</p>
                <p className="text-[14px] font-medium leading-[21px]" style={{ fontFamily: poppins, color: '#4a3b93' }}>"I can't find where to select a voice."</p>
              </div>
              {/* T2 bubbles (2개) */}
              <div className="flex flex-1 min-w-0 flex-col gap-[10px]">
                <div className="relative rounded-[12px] px-[14px] py-[13px]" style={{ backgroundColor: '#dcf3df' }}>
                  <div className="absolute left-[20px] top-[-6px] w-[11px] h-[11px] rotate-45 rounded-[2px]" style={{ backgroundColor: '#dcf3df' }} />
                  <p className="text-[10px] font-semibold leading-[15.5px] uppercase tracking-[0.5px] opacity-75 mb-[5px]" style={{ fontFamily: poppins, color: '#276637' }}>Task 2</p>
                  <p className="text-[14px] font-medium leading-[21px]" style={{ fontFamily: poppins, color: '#276637' }}>"I don't know which filters are applied."</p>
                </div>
                <div className="relative rounded-[12px] px-[14px] py-[13px]" style={{ backgroundColor: '#dcf3df' }}>
                  <div className="absolute left-[20px] top-[-6px] w-[11px] h-[11px] rotate-45 rounded-[2px]" style={{ backgroundColor: '#dcf3df' }} />
                  <p className="text-[10px] font-semibold leading-[15.5px] uppercase tracking-[0.5px] opacity-75 mb-[5px]" style={{ fontFamily: poppins, color: '#276637' }}>Task 2</p>
                  <p className="text-[14px] font-medium leading-[21px]" style={{ fontFamily: poppins, color: '#276637' }}>"Too many options, hard to choose."</p>
                </div>
              </div>
              {/* T3 bubble */}
              <div className="flex-1 min-w-0 relative rounded-[12px] px-[14px] py-[13px]" style={{ backgroundColor: '#fbedc4' }}>
                <div className="absolute left-[20px] top-[-6px] w-[11px] h-[11px] rotate-45 rounded-[2px]" style={{ backgroundColor: '#fbedc4' }} />
                <p className="text-[10px] font-semibold leading-[15.5px] uppercase tracking-[0.5px] opacity-75 mb-[5px]" style={{ fontFamily: poppins, color: '#8a660c' }}>Task 3</p>
                <p className="text-[14px] font-medium leading-[21px]" style={{ fontFamily: poppins, color: '#8a660c' }}>"The applied voice differs from what I expected, I want to change it."</p>
              </div>
              {/* T4 bubble */}
              <div className="flex-1 min-w-0 relative rounded-[12px] px-[14px] py-[13px]" style={{ backgroundColor: '#eceef4' }}>
                <div className="absolute left-[20px] top-[-6px] w-[11px] h-[11px] rotate-45 rounded-[2px]" style={{ backgroundColor: '#eceef4' }} />
                <p className="text-[10px] font-semibold leading-[15.5px] uppercase tracking-[0.5px] opacity-75 mb-[5px]" style={{ fontFamily: poppins, color: '#585c72' }}>Task 4</p>
                <p className="text-[14px] font-medium leading-[21px]" style={{ fontFamily: poppins, color: '#585c72' }}>"I don't feel the need to adjust speed or pitch."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="bg-[#a6daff] flex flex-col gap-[16px] items-center px-[24px] py-[24px] w-full text-center">
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>Key Insight</p>
          <p className="text-[24px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Primary pain points were concentrated in Tasks 1 and 2.
          </p>
        </div>

        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Taken together, these reactions reveal four core problems. Each corresponds to one of the four design solutions below.
        </p>

        {/* 4개 Problem 카드 — 2×2 그리드 */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="flex gap-[20px]">
            {PROBLEMS.slice(0, 2).map(({ num, title, tag, solution }) => (
              <div key={num} className="flex flex-col flex-1 min-w-0">
                <div className="bg-[#ffbfbf] flex flex-col gap-[16px] p-[24px]">
                  <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{num}</p>
                  <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{title}</p>
                </div>
                <div className="bg-white flex flex-col gap-[16px] p-[24px]">
                  <div className="bg-[#f7f4f0] flex items-center justify-center px-[12px] py-[6px] self-start">
                    <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{tag}</p>
                  </div>
                  <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{solution}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-[20px]">
            {PROBLEMS.slice(2, 4).map(({ num, title, tag, solution }) => (
              <div key={num} className="flex flex-col flex-1 min-w-0">
                <div className="bg-[#ffbfbf] flex flex-col gap-[16px] p-[24px]">
                  <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{num}</p>
                  <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{title}</p>
                </div>
                <div className="bg-white flex flex-col gap-[16px] p-[24px]">
                  <div className="bg-[#f7f4f0] flex items-center justify-center px-[12px] py-[6px] self-start">
                    <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{tag}</p>
                  </div>
                  <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 09 Design Solution 01 — 889:18895
// ─────────────────────────────────────────────────

/** "SOLVES PROBLEM XX" 배지 */
function SolvesBadge({ problemNum }: { problemNum: string }) {
  return (
    <div className="bg-[#1e1e1e] flex gap-[6px] items-center pl-[12px] pr-[16px] py-[8px] rounded-full shrink-0">
      <img src={icAvatarCheck} alt="" aria-hidden className="w-[18px] h-[18px] shrink-0" />
      <span className="text-[16px] font-medium leading-[24px] text-white whitespace-nowrap" style={{ fontFamily: poppins }}>
        SOLVES  PROBLEM {problemNum}
      </span>
    </div>
  )
}

/** Before → After 구분자 (검정 박스 + 아래 화살표) */
function BeforeAfterDivider() {
  return (
    <div className="flex items-center justify-center w-full py-[4px]">
      <div className="bg-[#1e1e1e] flex items-center justify-center w-[32px] h-[32px] rotate-90">
        <img src={icAvatarArrowDown} alt="" aria-hidden className="w-[30.72px] h-[30.72px]" />
      </div>
    </div>
  )
}

function DesignSolution01Section() {
  const stats = [
    { label: 'Task 1 success rate', value: '16%',   note: 'Lowest of all 5 tasks' },
    { label: 'Task 1 time',         value: '65s',   note: '2x+ the expected 30s' },
    { label: 'Task 1 errors',       value: '8',     note: 'Caused by missing the entry point' },
  ]
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={40}>
        {/* 섹션 레이블 + 배지 */}
        <div className="flex items-center gap-[4px] w-full">
          <div className="flex-1 min-w-0">
            <KTSectionLabel num="09" label="Design Solution 01" />
          </div>
          <SolvesBadge problemNum="01" />
        </div>

        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Making the Voice Selection Entry Point Clearly Visible
        </h2>

        {/* 3개 통계 카드 */}
        <div className="flex gap-[20px] w-full">
          {stats.map(({ label, value, note }) => (
            <div key={label} className="flex flex-col gap-[12px] flex-1 min-w-0 p-[24px]" style={{ border: '1px solid #ddd' }}>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
              <p className="text-[28px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Why? + Image Placeholder (Before) */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[24px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              In the original KT AI Voice Studio, the "AI Voice Selection" entry point had low visual prominence and poor placement, so users often overlooked voice settings during project setup. Task 1 in fact had the worst success rate and time of all five tasks.
            </p>
          </div>
          {/* Image Placeholder — Figma 889:18926 */}
          <div className="bg-[#bfbfbf] w-full shrink-0" style={{ height: '500px' }} aria-hidden />
          <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>
            * The red annotation on the original screen was added to illustrate the problem. It was not present in the actual interface, where the entry point was easy to miss.
          </p>
        </div>

        <BeforeAfterDivider />

        {/* What we changed! + Image Placeholder (After) */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[24px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We redesigned the entry as a persistent, visible UI that shows the selected voice and key settings at a glance, so users can confirm their configuration and continue without breaking the creation flow.
            </p>
          </div>
          {/* Image Placeholder — Figma 889:18935 */}
          <div className="bg-[#bfbfbf] w-full shrink-0" style={{ height: '500px' }} aria-hidden />
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 10 Design Solution 02 — 889:18936
// ─────────────────────────────────────────────────
function DesignSolution02Section() {
  const stats = [
    { label: 'Task 2 success rate', value: '33%',  note: 'Lowest after T1' },
    { label: 'Task 2 time',         value: '328s', note: '5.5x the expected time' },
    { label: 'Task 2 errors',       value: '12',   note: 'Highest of all 5 tasks' },
  ]
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={40}>
        {/* 섹션 레이블 + 배지 */}
        <div className="flex items-center gap-[4px] w-full">
          <div className="flex-1 min-w-0">
            <KTSectionLabel num="10" label="Design Solution 02" />
          </div>
          <SolvesBadge problemNum="02" />
        </div>

        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Making Applied Filters Easy to Scan and Modify
        </h2>

        {/* 3개 통계 카드 */}
        <div className="flex gap-[20px] w-full">
          {stats.map(({ label, value, note }) => (
            <div key={label} className="flex flex-col gap-[12px] flex-1 min-w-0 p-[24px]" style={{ border: '1px solid #ddd' }}>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
              <p className="text-[28px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Why? */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[24px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              In the original UI, users could apply filters across 6 categories (gender, age, style, language, tone, speed), but there was no clear visual summary of which filters were active. Once a filter was set, users had to re-open the filter panel to check what was selected, causing confusion and extra taps.
            </p>
          </div>
          {/* Image Placeholder — Figma 889:18958 (Before) */}
          <div className="bg-[#bfbfbf] w-full shrink-0" style={{ height: '500px' }} aria-hidden />
          <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>
            * The original filter panel made it difficult to see which options were currently applied.
          </p>
        </div>

        <BeforeAfterDivider />

        {/* What we changed! */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[24px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We redesigned the filter UI to a vertical layout with persistent filter chips, so users can see all applied values at a glance, remove individual filters with one tap, and re-enter the panel with current state clearly visible.
            </p>
          </div>
          {/* Image Placeholder — Figma 889:18975 (After) */}
          <div className="bg-[#bfbfbf] w-full shrink-0" style={{ height: '500px' }} aria-hidden />
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 11 Design Solution 03 — 889:18976
// ─────────────────────────────────────────────────
const MATCHING_STEPS = [
  { num: '01', title: 'AI Human Traits Keywords',  body: 'Each AI human character is tagged with personality and style keywords (e.g. "professional", "warm", "energetic").' },
  { num: '02', title: 'Voice Tone Keywords',        body: 'Each voice is tagged with matching tone and style keywords by the KT AI voice team.' },
  { num: '03', title: 'Keyword Matching',           body: 'The recommendation engine cross-references AI human traits with voice tone keywords to surface the most compatible voices.' },
  { num: '04', title: 'Default Voice',              body: "If a user hasn't selected a voice, the system auto-applies the highest-match voice so the creation flow never blocks." },
]

function DesignSolution03Section() {
  const stats = [
    { label: 'Voices available',  value: '300+', note: 'Across 6 filter categories' },
    { label: 'Avg. time on voice', value: '4min', note: 'Browsing without guidance' },
    { label: 'Re-selection rate',  value: 'High', note: 'Voice differed from expectation' },
  ]
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={40}>
        {/* 섹션 레이블 + 배지 */}
        <div className="flex items-center gap-[4px] w-full">
          <div className="flex-1 min-w-0">
            <KTSectionLabel num="11" label="Design Solution 03" />
          </div>
          <SolvesBadge problemNum="03" />
        </div>

        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Providing Recommended and Default Voices
        </h2>

        {/* 3개 통계 카드 */}
        <div className="flex gap-[20px] w-full">
          {stats.map(({ label, value, note }) => (
            <div key={label} className="flex flex-col gap-[12px] flex-1 min-w-0 p-[24px]" style={{ border: '1px solid #ddd' }}>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
              <p className="text-[28px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Why? */}
        <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[24px] w-full" style={{ border: '1px solid #ddd' }}>
          <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
          <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            With 300+ voices across 6 filter categories, users faced decision paralysis. Without a recommended starting point, they either spent excessive time browsing or picked a voice at random, often regretting the choice after previewing the final output.
          </p>
        </div>

        <BeforeAfterDivider />

        {/* What we changed! */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[24px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We introduced a "Recommended Voices" section that surfaces the top 3 voices matched to the selected AI human character, plus a "Default Voice" that auto-applies the best match so users can start creating immediately without any selection required.
            </p>
          </div>
          {/* Image Placeholder (After) */}
          <div className="bg-[#bfbfbf] w-full shrink-0" style={{ height: '500px' }} aria-hidden />
        </div>

        {/* Recommended Voice Matching Logic */}
        <div className="flex flex-col gap-[20px] w-full" style={{ border: '1px solid #ddd', padding: '24px' }}>
          {/* 제목 */}
          <div className="flex gap-[8px] items-center">
            <span className="text-[20px] leading-[30px]" aria-hidden>✱</span>
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              Recommended Voice Matching Logic
            </p>
          </div>
          <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Because this was a B2B2C integration, I couldn't just add a "favorites" feature — I had to define the criteria the AI would use to recommend voices automatically. Here's how the matching logic works:
          </p>
          {/* 4-step 그리드 2×2 */}
          <div className="grid gap-[16px]" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {MATCHING_STEPS.map(({ num, title, body }) => (
              <div key={num} className="flex flex-col gap-[12px] bg-[#f7f7f7] p-[20px]">
                <div className="flex items-center justify-center bg-[#1e1e1e] shrink-0" style={{ width: '28px', height: '28px' }}>
                  <span className="text-[14px] font-medium leading-[21px] text-white" style={{ fontFamily: poppins }}>{num}</span>
                </div>
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{title}</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 12 Design Solution 04 — 889:19029
// ─────────────────────────────────────────────────
function DesignSolution04Section() {
  const stats = [
    { label: 'Re-selection rate',   value: '59%', note: 'Users changed voice after first apply' },
    { label: 'Avg. extra taps',     value: '+14', note: 'Per re-selection round trip' },
    { label: 'Root cause',          value: 'Gap', note: 'Between preview and actual output' },
  ]
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={40}>
        {/* 섹션 레이블 + 배지 */}
        <div className="flex items-center gap-[4px] w-full">
          <div className="flex-1 min-w-0">
            <KTSectionLabel num="12" label="Design Solution 04" />
          </div>
          <SolvesBadge problemNum="04" />
        </div>

        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Preview Voices With Live Content
        </h2>

        {/* 3개 통계 카드 */}
        <div className="flex gap-[20px] w-full">
          {stats.map(({ label, value, note }) => (
            <div key={label} className="flex flex-col gap-[12px] flex-1 min-w-0 p-[24px]" style={{ border: '1px solid #ddd' }}>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
              <p className="text-[28px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Why? */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[24px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              The original KT AI Voice Studio offered only a generic voice sample for preview — a pre-recorded clip unrelated to the user's actual script. Users frequently discovered after applying a voice that it didn't match the tone or pacing of their content, requiring a full re-selection cycle.
            </p>
          </div>
          {/* Image Placeholder (Before) */}
          <div className="bg-[#bfbfbf] w-full shrink-0" style={{ height: '500px' }} aria-hidden />
          <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>
            * Preview used a fixed generic sample, not the user's actual script content.
          </p>
        </div>

        <BeforeAfterDivider />

        {/* What we changed! */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[24px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We added an "Enter example sentence" feature that lets users type their own content and immediately hear how any voice sounds with it. This closes the gap between preview and production, dramatically reducing the need to reselect after applying.
            </p>
          </div>
          {/* Image Placeholder (After) */}
          <div className="bg-[#bfbfbf] w-full shrink-0" style={{ height: '500px' }} aria-hidden />
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 13 Outcome (bottom) — 889:19055
// ─────────────────────────────────────────────────
function OutcomeBottomSection() {
  const outcomes = [
    {
      num:       '01',
      stat:      '50%',
      label:     'Faster voice selection',
      body:      'The redesigned entry point and recommended voices cut the average time users spent on voice selection in half.',
    },
    {
      num:       '02',
      stat:      '59%',
      label:     'Fewer voice re-selections',
      body:      'Live content preview and better filter visibility meant users committed to their first choice far more often.',
    },
    {
      num:       '03',
      stat:      'B2B2C',
      label:     'Extended business model',
      body:      'By integrating KT AI Voice Studio, CNAI STUDIO expanded from a pure B2B product to a B2B2C platform, unlocking a new segment of end-user creators.',
    },
  ]
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={40}>
        <KTSectionLabel num="13" label="Outcome" />
        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Three Measurable Wins
        </h2>
        <div className="flex flex-col gap-[20px] w-full">
          {outcomes.map(({ num, stat, label, body }) => (
            <div
              key={num}
              className="flex gap-[28px] items-start px-[32px] py-[28px] w-full"
              style={{ backgroundColor: '#a6daff' }}
            >
              <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                <span className="text-[16px] font-medium leading-[24px] text-white text-center" style={{ fontFamily: poppins }}>{num}</span>
              </div>
              <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                <p className="text-[32px] font-semibold leading-[40px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{stat}</p>
                <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
                <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 14 Reflection — 889:19073
// ─────────────────────────────────────────────────
const QUOTES = [
  {
    quote: '"Designing AI recommendation criteria is a product decision, not just a UX decision."',
    body:  'Deciding which keywords defined an AI human\'s "personality" — and how those matched voice tone — required alignment across design, AI engineering, and the KT partnership team. I learned that in AI-integrated products, the designer has to drive criteria definition, not just interface design.',
  },
  {
    quote: '"Speed of decision matters more than completeness of options."',
    body:  'We could have added more filter dimensions, but the research showed users were already overwhelmed. Reducing cognitive load by surfacing smart defaults and recommendations outperformed giving users more control. Sometimes the best UX is less choice.',
  },
]

function ReflectionSection() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f7f7f7' }}>
      <ContentWrap gap={40}>
        <KTSectionLabel num="14" label="Reflection" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            What I Learned From This Project
          </h2>
        </div>

        {/* 2개 인용 카드 */}
        <div className="flex gap-[20px] w-full">
          {QUOTES.map(({ quote, body }, i) => (
            <div
              key={i}
              className="flex flex-col gap-[20px] flex-1 min-w-0 p-[28px]"
              style={{ backgroundColor: '#f7f7f7', border: '1px solid #ddd' }}
            >
              {/* 오프닝 따옴표 */}
              <p
                className="text-[64px] leading-[48px] text-[#1e1e1e] select-none"
                style={{ fontFamily: 'Georgia, serif', lineHeight: '48px' }}
                aria-hidden
              >
                "
              </p>
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                {quote}
              </p>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* 본문 */}
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          This project pushed me to work at the intersection of product strategy, AI system logic, and interaction design. Collaborating with KT's engineering team to define matching criteria — rather than just designing around existing outputs — was a new kind of design challenge that I want to take further.
        </p>
        <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b] w-full" style={{ fontFamily: poppins }}>
          * Outcome metrics are based on internal usability testing conducted prior to and after the redesign with 6 participants.
        </p>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 15 Team · Closing — 889:19091
// ─────────────────────────────────────────────────
function TeamClosingSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <ContentWrap gap={40}>
        <KTSectionLabel num="15" label="Team · Closing" />
        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Built With a Small Team, Shipped at Scale
        </h2>

        {/* 540px 이미지 자리 — centered */}
        <div className="flex flex-col items-center gap-[16px] w-full">
          <div className="bg-[#c4c4c4] shrink-0" style={{ width: '540px', height: '360px' }} aria-hidden />
          <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b] text-center" style={{ fontFamily: poppins }}>
            KT AI Human Studio — shipped Q3 2026
          </p>
        </div>

        {/* 팀 설명 */}
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          This product was built by a cross-functional team of 2 developers and 6 program managers across CNAI STUDIO and KT. As the solo product designer, I was responsible for end-to-end UX and UI — from defining the information architecture and interaction model to delivering production-ready Figma specs and supporting developer handoff.
        </p>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          The KT partnership required navigating technical constraints, stakeholder reviews, and real-time design pivots — experience that sharpened my ability to design collaboratively under pressure and ship in fast-moving environments.
        </p>

        {/* 팀 그리드 */}
        <div
          className="w-full py-[20px] grid gap-[20px]"
          style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', borderTop: '1px solid #f7f7f7' }}
        >
          <div className="flex flex-col gap-[4px]">
            <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>Product Designer</p>
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>May Im (Solo)</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>Developers</p>
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>2 Engineers</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>Program Managers</p>
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>6 PMs (CNAI + KT)</p>
          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────
export default function AIAvatarPage() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  // 페이지 진입 시 스크롤 맨 위로 (fixed div 자체의 scrollTop 리셋)
  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0
  }, [])

  return (
    <motion.div
      ref={containerRef}
      data-scroll-id="ai-avatar"
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
      {/* Close button — fixed top-right */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="group fixed top-[48px] right-[48px] w-[48px] h-[48px] bg-[#1e1e1e] flex items-center justify-center z-50 border-0 outline-none cursor-pointer shrink-0"
        aria-label="Close"
      >
        <img src={icClose} alt="" aria-hidden className="block w-[24px] h-[24px] transition-transform duration-200 ease-out group-hover:rotate-90" />
      </button>

      {/* Side nav */}
      <SideNav />

      {/* Header */}
      <AIAvatarHeader />

      {/* Sections */}
      <div id="intro"><IntroSection /></div>
      <div id="project-goal"><ProjectGoalSection /></div>
      <div id="ai-thinking"><AIProductThinkingSection /></div>
      <div id="outcome-top"><OutcomeTopSection /></div>

      <div id="what-i-worked"><WhatIWorkedOnSection /></div>
      <div id="ux-research"><UXResearchSection /></div>
      <div id="analysis"><AnalysisSection /></div>
      <div id="problem-def"><ProblemDefinitionSection /></div>
      <div id="solution-01"><DesignSolution01Section /></div>
      <div id="solution-02"><DesignSolution02Section /></div>
      <div id="solution-03"><DesignSolution03Section /></div>
      <div id="solution-04"><DesignSolution04Section /></div>
      <div id="outcome-bottom"><OutcomeBottomSection /></div>
      <div id="reflection"><ReflectionSection /></div>
      <div id="team"><TeamClosingSection /></div>
    </motion.div>
  )
}
