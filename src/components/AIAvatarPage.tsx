// AIAvatarPage.tsx — AI Avatar Video Creation Platform case study
// Route: /projects/ai-avatar
// Figma: https://www.figma.com/design/fCphmFmQRkjF6EWKKqby8E/2026?node-id=889-18398
// ★ Desktop only (1440px+). 반응형은 별도 작업 예정.

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLottieAnimation } from '../hooks/useLottieAnimation'
import { LottieHeroPlayer } from './LottieHeroPlayer'
import { YouTubeEmbed } from './YouTubeEmbed'

// ── Images ────────────────────────────────────────
import imgIntroTabletPhoto from '../assets/images/ai-avatar/intro-tablet-photo.jpg'
import imgProjectGoalBg from '../assets/images/ai-avatar/project-goal-background.jpg'
import imgAIProductThinkingDiagram from '../assets/images/ai-avatar/ai-product-thinking-diagram.jpg'
import imgUXResearchTesting from '../assets/images/ai-avatar/ux-research-testing.jpg'
import imgSolution01Before from '../assets/images/ai-avatar/solution-01-before.jpg'
import imgSolution01After  from '../assets/images/ai-avatar/solution-01-after.jpg'
import imgSolution02Before from '../assets/images/ai-avatar/solution-02-before.jpg'
import imgSolution02After  from '../assets/images/ai-avatar/solution-02-after.jpg'
import imgSolution03Before from '../assets/images/ai-avatar/solution-03-before.jpg'
import imgSolution03After  from '../assets/images/ai-avatar/solution-03-after.jpg'
import imgSolution04Before from '../assets/images/ai-avatar/solution-04-before.jpg'
import imgSolution04After  from '../assets/images/ai-avatar/solution-04-after.jpg'
import imgTeamGroupPhoto    from '../assets/images/ai-avatar/team-group-photo.jpg'
import imgTeamPhoto01       from '../assets/images/ai-avatar/team-photo-01.jpg'
import imgTeamPhoto02       from '../assets/images/ai-avatar/team-photo-02.jpg'
import chartSuccessRate     from '../assets/images/ai-avatar/charts/chart-success-rate.png'
import chartTimeTaken       from '../assets/images/ai-avatar/charts/chart-time-taken.png'
import chartErrorCount      from '../assets/images/ai-avatar/charts/chart-error-count.png'
import chartSatisfaction    from '../assets/images/ai-avatar/charts/chart-satisfaction.png'

// ── Icons ─────────────────────────────────────────
import icClose           from '../assets/icons/close.svg'
import icAvatarCheck     from '../assets/icons/ai-avatar/check-circle.svg'
import icAvatarArrowDown from '../assets/icons/ai-avatar/arrow-down-box.svg'
import icProblemFlow     from '../assets/icons/ai-avatar/problem-flow-lines.svg'
import icWhyItWorks      from '../assets/icons/ai-avatar/why-it-works.svg'

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
    { label: 'Product',  value: 'Web (SaaS)' },
    { label: 'My role',  value: 'Solo Product Designer' },
    { label: 'Timeline', value: 'Q1 2023 to Q3 2023' },
    { label: 'Skills',   value: 'UX Research, Usability Testing, Interaction Design, UI Design, Prototyping, AI Recommendation Logic, Cross functional Collaboration' },
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
          As the solo product designer, I led the end-to-end UX/UI for an AI avatar creation platform, integrating video generation with a client's AI voice technology. I worked directly with the client's AI team, product owner, and developers to define requirements, run usability testing, and design the main creation flow, voice selection experience, admin pages, and payment flow. The resulting experience reduced voice selection time by 48.2% and improved the overall voice discovery and selection process.
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
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>1 Product Owner · 3 Developers</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Client collaboration with KT AI Voice Studio team</p>
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
        <KTSectionLabel num="01" label="Introduction" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Two Platforms in One: KT AI Human Studio Launch
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            CNAI STUDIO collaborated with KT, Korea's largest telecom carrier, to integrate KT's AI voice generation technology into our video creation platform. This partnership evolved CNAI STUDIO from a B2B to a B2B2C service, allowing users to create personalized AI human videos by customizing both visuals and voices.
          </p>
        </div>
        {/* 01 INTRODUCTION 유튜브 임베드 */}
        <YouTubeEmbed videoId="MGSxaNMiLwU" />
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
        <KTSectionLabel num="02" label="Project Goal" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Integrating AI Voice Customization Into the Creation Flow
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Our goal was to seamlessly integrate AI voice customization into the existing AI human video workflow. We designed a familiar yet intuitive creation experience, allowing users to easily personalize both voice and visuals within one unified platform.
          </p>
        </div>
        {/* 이미지 — Figma 942:19989 */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={imgProjectGoalBg} alt="AI Voice Customization workflow" className="w-full h-full object-cover" />
        </div>
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
            This project went beyond screen design. We defined the attributes of each AI avatar and voice as structured keywords, then established the criteria used to match them. These criteria became the foundation for the recommended voice logic in Design Solution 03.
          </p>
        </div>
        {/* 이미지 — Figma 942:19990 */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={imgAIProductThinkingDiagram} alt="AI avatar and voice matching criteria diagram" className="w-full h-full object-cover" />
        </div>
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
          <div className="flex flex-col gap-[4px] w-full">
            <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              Conducting a Usability Test on "KT AI Voice Studio"
            </h2>
            <p className="text-[14px] font-normal leading-[21px]" style={{ fontFamily: poppins, color: '#999' }}>
              Existing live AI voice product from the client
            </p>
          </div>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            To understand how prior content creation experience affected voice selection behavior, we conducted usability testing with six first-time users of KT AI Voice Studio. Participants were split into two groups: three with content creation experience and three without. We designed five tasks covering the full voice selection and editing flow, then compared how each group navigated, selected, and adjusted voices.
          </p>
        </div>
        <img src={imgUXResearchTesting} alt="UX Research usability testing" className="w-full" />
        {/* Task 카드 5개 */}
        <div className="flex gap-[12px] items-stretch w-full">
          {TASKS.map(({ id, label, title, expected }) => (
            <div
              key={id}
              className="flex flex-col gap-[12px] flex-1 min-w-0 px-[16px] pt-[16px] pb-[18px]"
              style={{ backgroundColor: '#f3f3f3', border: '1px solid #ddd' }}
            >
              <p className="text-[14px] font-normal leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>{label}</p>
              <p className="text-[14px] font-medium leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>{title}</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>{expected}</p>
            </div>
          ))}
        </div>
        {/* Research Setup */}
        <div className="w-full flex flex-col gap-[24px] items-center px-[40px] py-[32px]" style={{ backgroundColor: '#a6daff', minHeight: '195px' }}>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] text-center" style={{ fontFamily: poppins }}>Research Setup</p>
          <div className="flex gap-[24px] w-full">
            <div className="flex flex-col gap-[8px] flex-1">
              <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>6 Participants</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>First-time KT AI Voice Studio users</p>
            </div>
            <div className="flex flex-col gap-[8px] flex-1">
              <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>2 Groups</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                3 with content creation experience<br />3 without content creation experience
              </p>
            </div>
            <div className="flex flex-col gap-[8px] flex-1">
              <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>5 Tasks</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Covering voice access, search, selection, editing, and playback</p>
            </div>
          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 07 Analysis of Results — 889:18616
// ─────────────────────────────────────────────────

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
            We analyzed four metrics: task success, time on task, error count, and participant satisfaction. Tasks 1 and 2 showed the most significant usability issues, with the lowest success rates and highest error counts.
          </p>
        </div>

        {/* 2×2 차트 그리드 — Figma export 이미지 */}
        <div className="flex flex-col gap-[20px] w-full">
          {/* Row 1 */}
          <div className="flex gap-[20px] w-full">
            <img src={chartSuccessRate} alt="Success rate chart" className="flex-1 min-w-0 h-auto" />
            <img src={chartTimeTaken} alt="Time taken chart" className="flex-1 min-w-0 h-auto" />
          </div>

          {/* Row 2 */}
          <div className="flex gap-[20px] w-full">
            <img src={chartErrorCount} alt="Error count chart" className="flex-1 min-w-0 h-auto" />
            <img src={chartSatisfaction} alt="Participant satisfaction chart" className="flex-1 min-w-0 h-auto" />
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
              {/* T4: 😧 (T3과 동일한 높이) */}
              <div className="flex flex-1 min-w-0 items-start justify-center relative z-10" style={{ paddingBottom: '40px' }}>
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

const SOLUTION_01_STATS = [
  { label: 'Task 1 success rate', value: '16%', note: 'Lowest of all 5 tasks' },
  { label: 'Task 1 time',         value: '65s',  note: '2x+ the expected 30s' },
  { label: 'Task 1 errors',       value: '8',    note: 'Caused by missing the entry point' },
]

const WHY_IT_WORKS_01 = [
  {
    num: '01',
    title: 'Works without extra setup',
    desc: 'A recommended voice is applied by default, so users can start without making additional adjustments.',
  },
  {
    num: '02',
    title: 'Keeps the current state visible',
    desc: "The selected voice and key settings stay visible, so users don't have to remember what they previously selected.",
  },
  {
    num: '03',
    title: 'Makes voice settings easier to access',
    desc: 'The entry point clearly shows that AI Voice can be reviewed and adjusted whenever needed.',
  },
]

function DesignSolution01Section() {
  return (
    <section className="w-full bg-white">
      <ContentWrap gap={40}>
        {/* 섹션 레이블 + 배지 */}
        <div className="flex items-center justify-between gap-[4px] w-full">
          <KTSectionLabel num="09" label="Design Solution 01" />
          <SolvesBadge problemNum="01" />
        </div>

        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Making the Voice Selection Entry Point Clearly Visible
        </h2>

        {/* 통계 카드 3개 */}
        <div className="flex gap-[20px] w-full">
          {SOLUTION_01_STATS.map(({ label, value, note }) => (
            <div key={label} className="flex flex-col gap-[12px] flex-1 min-w-0 p-[24px]" style={{ border: '1px solid #ddd' }}>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
              <p className="text-[28px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Why? → Before image → 화살표 → What we changed! → After image */}
        <div className="flex flex-col gap-[20px] w-full">
          {/* Why? */}
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[24px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              In the original KT AI Voice Studio, the "AI Voice Selection" entry point had low visual prominence, so users often overlooked it during project setup. Task 1 had the lowest success rate at 16%, took more than twice the expected time, and resulted in 8 usability errors.
            </p>
          </div>
          {/* Before image */}
          <img src={imgSolution01Before} alt="Original KT AI Voice Studio — before redesign" className="w-full object-cover" style={{ height: '530px' }} />
          <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>
            Red annotation added for clarity; it was not part of the original UI.
          </p>
        </div>

        {/* 구분자 */}
        <BeforeAfterDivider />

        {/* What we changed! → After image */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[24px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We redesigned the entry point to show the selected voice and key settings directly in the creation flow, making the feature easier to notice and easier to adjust.
            </p>
          </div>
          {/* After image */}
          <img src={imgSolution01After} alt="Redesigned KT AI Voice Studio — after redesign" className="w-full object-cover" style={{ height: '530px' }} />
        </div>

        {/* Why it works */}
        <div className="flex flex-col gap-[20px] w-full p-[20px]" style={{ border: '1px solid #ddd' }}>
          {/* 헤더 */}
          <div className="flex items-center gap-[6px] w-full">
            <img src={icWhyItWorks} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Why it works</p>
          </div>
          {/* 카드 01 + 02 (가로) */}
          <div className="flex gap-[20px] items-stretch w-full">
            {WHY_IT_WORKS_01.slice(0, 2).map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col gap-[12px] flex-1 min-w-0 p-[20px] bg-[#f7f7f7]">
                <div className="bg-[#1e1e1e] flex items-center justify-center w-[28px] h-[28px] shrink-0">
                  <p className="text-[18px] font-medium leading-[27px] text-white text-center whitespace-nowrap" style={{ fontFamily: poppins }}>{num}</p>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{title}</p>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 카드 03 (전체폭) */}
          <div className="flex flex-col gap-[12px] w-full p-[20px] bg-[#f7f7f7]">
            <div className="bg-[#1e1e1e] flex items-center justify-center w-[28px] h-[28px] shrink-0">
              <p className="text-[18px] font-medium leading-[27px] text-white text-center whitespace-nowrap" style={{ fontFamily: poppins }}>03</p>
            </div>
            <div className="flex flex-col gap-[8px] w-full">
              <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{WHY_IT_WORKS_01[2].title}</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{WHY_IT_WORKS_01[2].desc}</p>
            </div>
          </div>
        </div>

      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 10 Design Solution 02 — 889:18936
// ─────────────────────────────────────────────────
const SOLUTION_02_STATS = [
  { label: 'Task 2 success rate', value: '33%',  note: 'Finding a voice via filter/search' },
  { label: 'Task 2 time',         value: '328s', note: '+88s over the expected 240s' },
  { label: 'Task 2 errors',       value: '12',   note: 'Highest of all tasks' },
]

function DesignSolution02Section() {
  return (
    <section className="w-full bg-white">
      <ContentWrap gap={40}>
        {/* 섹션 레이블 + 배지 */}
        <div className="flex items-center justify-between gap-[4px] w-full">
          <KTSectionLabel num="10" label="Design Solution 02" />
          <SolvesBadge problemNum="02" />
        </div>

        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Making Applied Filters Easier to Scan and Modify
        </h2>

        {/* 통계 카드 3개 */}
        <div className="flex gap-[20px] w-full">
          {SOLUTION_02_STATS.map(({ label, value, note }) => (
            <div key={label} className="flex flex-col gap-[12px] flex-1 min-w-0 p-[24px]" style={{ border: '1px solid #ddd' }}>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
              <p className="text-[28px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Why? → Before image → 화살표 → What we changed! → After image */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[24px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              When multiple filter values were selected, users struggled to tell which values were actually applied. Because filter states were condensed into numeric indicators, they were difficult to scan and modify. This directly contributed to Task 2 recording 12 usability errors — the highest of all five tasks.
            </p>
          </div>
          <img src={imgSolution02Before} alt="Original filter UI — before redesign" className="w-full object-cover" style={{ height: '530px' }} />
        </div>

        <BeforeAfterDivider />

        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[24px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We replaced the horizontal filter chips with a vertical layout that shows every category and selected value at once, so users can scan, modify, and remove filters without opening extra dropdowns.
            </p>
          </div>
          <img src={imgSolution02After} alt="Redesigned filter UI — after redesign" className="w-full object-cover" style={{ height: '530px' }} />
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 11 Design Solution 03 — 889:18976
// ─────────────────────────────────────────────────
const MATCHING_STEPS = [
  { num: '01', desc: "AI extracts trait keywords (age range, mood, tone) from the AI human's image" },
  { num: '02', desc: "Automatically matches them against each voice's existing tags (#warm #lively #calm, etc.)" },
  { num: '03', desc: 'Surfaces the top 3 matches as recommended voices and automatically applies the top match as the default' },
  { num: '04', desc: 'Rather than trusting the AI match blindly, a designer listens through and filters out any awkward pairings' },
]

function DesignSolution03Section() {
  return (
    <section className="w-full bg-white">
      <ContentWrap gap={40}>
        {/* 섹션 레이블 + 배지 */}
        <div className="flex items-center justify-between gap-[4px] w-full">
          <KTSectionLabel num="11" label="Design Solution 03" />
          <SolvesBadge problemNum="03" />
        </div>

        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Providing Recommended and Default Voices
        </h2>

        {/* Why? → Before image → 화살표 → What we changed! → After image → Logic */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[24px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              With over 110 voice options, users experienced decision fatigue, especially when they were unfamiliar with the available voices. We needed a way to surface relevant options without requiring users to preview them one by one.
            </p>
          </div>
          <img src={imgSolution03Before} alt="Original voice selection — before redesign" className="w-full object-cover" style={{ height: '530px' }} />
        </div>

        <BeforeAfterDivider />

        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[24px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We defined the AI avatar and each voice using structured keywords, then used those attributes to generate recommended voice matches and apply the best match as the default.
            </p>
          </div>
          <img src={imgSolution03After} alt="Redesigned voice selection — after redesign" className="w-full object-cover" style={{ height: '530px' }} />
        </div>

        {/* Recommended Voice Matching Logic */}
        <div className="flex flex-col gap-[20px] w-full p-[20px]" style={{ border: '1px solid #ddd' }}>
          <div className="flex items-center gap-[6px] w-full">
            <img src={icWhyItWorks} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Recommended Voice Matching Logic</p>
          </div>
          {/* Row 1: 01 + 02 */}
          <div className="flex gap-[20px] items-stretch w-full">
            {MATCHING_STEPS.slice(0, 2).map(({ num, desc }) => (
              <div key={num} className="flex flex-col gap-[12px] flex-1 min-w-0 p-[20px] bg-[#f7f7f7]">
                <div className="bg-[#1e1e1e] flex items-center justify-center w-[28px] h-[28px] shrink-0">
                  <p className="text-[18px] font-medium leading-[27px] text-white text-center whitespace-nowrap" style={{ fontFamily: poppins }}>{num}</p>
                </div>
                <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{desc}</p>
              </div>
            ))}
          </div>
          {/* Row 2: 03 + 04 */}
          <div className="flex gap-[20px] items-stretch w-full">
            {MATCHING_STEPS.slice(2).map(({ num, desc }) => (
              <div key={num} className="flex flex-col gap-[12px] flex-1 min-w-0 p-[20px] bg-[#f7f7f7]">
                <div className="bg-[#1e1e1e] flex items-center justify-center w-[28px] h-[28px] shrink-0">
                  <p className="text-[18px] font-medium leading-[27px] text-white text-center whitespace-nowrap" style={{ fontFamily: poppins }}>{num}</p>
                </div>
                <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{desc}</p>
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
  return (
    <section className="w-full bg-white">
      <ContentWrap gap={40}>
        <div className="flex items-center justify-between gap-[4px] w-full">
          <KTSectionLabel num="12" label="Design Solution 04" />
          <SolvesBadge problemNum="04" />
        </div>

        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Preview Voices With Live Content
        </h2>

        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[24px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              Users could only preview voices with fixed sample sentences, not their own scripts. As a result, the selected voice often felt different when applied to real content, forcing users to switch repeatedly between writing and voice selection.
            </p>
          </div>
          <img src={imgSolution04Before} alt="Original voice preview — before redesign" className="w-full object-cover" style={{ height: '530px' }} />
        </div>

        <BeforeAfterDivider />

        <div className="flex flex-col gap-[20px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[24px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We added an example sentence input so users could preview their own scripts with the selected voice on the same screen. This allowed them to evaluate how the voice fit their real content before applying it.
            </p>
          </div>
          <img src={imgSolution04After} alt="Redesigned voice preview — after redesign" className="w-full object-cover" style={{ height: '530px' }} />
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 13 Outcome (bottom) — 889:19055
// ─────────────────────────────────────────────────
const OUTCOME_CARDS = [
  { stat: '50%↓',  label: 'Voice selection time' },
  { stat: '59%↓',  label: 'Voice reselection rate' },
  { stat: 'B2B2C', label: 'Expansion, built and launched' },
]

function OutcomeBottomSection() {
  return (
    <section className="w-full bg-white">
      <ContentWrap gap={40}>
        <KTSectionLabel num="13" label="Outcome" />
        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          What These Four Changes Made Possible
        </h2>
        <div className="flex flex-row gap-[20px] w-full">
          {OUTCOME_CARDS.map(({ stat, label }) => (
            <div
              key={stat}
              className="flex-1 flex flex-col gap-[8px] p-[24px] bg-[#a6daff]"
              style={{ height: '124px' }}
            >
              <p className="text-[28px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{stat}</p>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
            </div>
          ))}
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 14 Reflection — 942:20600
// ─────────────────────────────────────────────────
const REFLECTION_QUOTES = [
  'Even users coming from the old voice studio could use this naturally, without having to learn anything new.',
  "Recommended voices wasn't something I'd even considered. It'll clearly make selection faster and more satisfying.",
]

function ReflectionSection() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f7f7f7' }}>
      <ContentWrap gap={40}>
        <KTSectionLabel num="14" label="Reflection" />

        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          What This Project Left Me, in Data and Feedback
        </h2>

        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Looking at the low success rate and high error rate from Tasks 1 and 2 alongside the feedback we got after shipping the changes:
        </p>

        {/* 2개 인용 카드 — 가로 배치 */}
        <div className="flex gap-[20px] w-full">
          {REFLECTION_QUOTES.map((quote, i) => (
            <div
              key={i}
              className="flex flex-col gap-[16px] flex-1 min-w-0 p-[24px]"
              style={{ backgroundColor: '#f7f7f7', border: '1px solid #ddd', height: '177px' }}
            >
              <p className="text-[20px] leading-none text-[#1e1e1e] select-none" aria-hidden>
                "
              </p>
              <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                {quote}
              </p>
            </div>
          ))}
        </div>

        {/* 마무리 본문 */}
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          This project showed me that combining video and voice generation into one experience requires more than screen design. Defining the criteria that guide the AI's output matters just as much. I validated four solutions using usability data and client feedback. The matching criteria we established became a lasting principle for designing AI human output.
        </p>

        {/* 캡션 */}
        <p className="text-[14px] font-normal leading-[21px] w-full" style={{ fontFamily: poppins, color: '#8b8b8b' }}>
          * Content created with KT AI Human Studio
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
    <section className="w-full bg-white">
      <ContentWrap gap={24}>
        {/* 3장 사진 — 576px(그룹) + gap 24px + 360px(스택 2장) = 960px */}
        <div className="flex gap-[24px] w-full">
          {/* 왼쪽: Group Photo 576×420 */}
          <img
            src={imgTeamGroupPhoto}
            alt="CNAI STUDIO team group photo"
            className="object-cover object-bottom shrink-0"
            style={{ width: '576px', height: '420px', border: '1px solid rgba(30,30,30,0.1)' }}
          />
          {/* 오른쪽: Team Photo 01 + 02 세로 스택 */}
          <div className="flex flex-col gap-[24px]" style={{ width: '360px' }}>
            <img
              src={imgTeamPhoto01}
              alt="CNAI STUDIO team photo 01"
              className="w-full object-cover"
              style={{ height: '198px', border: '1px solid rgba(30,30,30,0.1)' }}
            />
            <img
              src={imgTeamPhoto02}
              alt="CNAI STUDIO team photo 02"
              className="w-full object-cover"
              style={{ height: '198px', border: '1px solid rgba(30,30,30,0.1)' }}
            />
          </div>
        </div>
        <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] w-full text-center" style={{ fontFamily: poppins }}>
          The CNAI STUDIO team that built KT AI Human Studio together
        </p>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full text-center" style={{ fontFamily: poppins }}>
          I started my career at a startup right after graduating. Working with a small team toward one shared goal let me own a product from planning through launch. I handled problem definition, UI/UX design, and client communication. The habit of defining scope quickly and validating as I go has stayed with me in every product I've worked on since.
        </p>
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
