// MobileAIAvatarPage.tsx — AI Avatar case study (Mobile <768px)
// Figma: https://www.figma.com/design/fCphmFmQRkjF6EWKKqby8E/2026?node-id=945-1125
// ★ AIAvatarPage.tsx(데스크톱) / TabletAIAvatarPage.tsx(태블릿)는 절대 건드리지 않음.

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLottieAnimation } from '../hooks/useLottieAnimation'
import { LottieHeroPlayer } from './LottieHeroPlayer'
import { YouTubeEmbed } from './YouTubeEmbed'

// ── Icons ─────────────────────────────────────────
import icClose           from '../assets/icons/close.svg'
import icAvatarCheck     from '../assets/icons/ai-avatar/check-circle.svg'
import icAvatarArrowDown from '../assets/icons/ai-avatar/arrow-down-box.svg'
import icWhyItWorks      from '../assets/icons/ai-avatar/why-it-works.svg'

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

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────
const poppins = "'Poppins', sans-serif"

// ─────────────────────────────────────────────────
// Shared: Section Label (num + label)
// ─────────────────────────────────────────────────
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p className="text-[18px] font-medium leading-[26px]" style={{ fontFamily: poppins, color: '#a6daff' }}>{num}</p>
      <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Header — Figma 945:1125 (Mobile 390px)
// ─────────────────────────────────────────────────
function MobileAIAvatarHeader() {
  const heroAnimation = useLottieAnimation('/lottie/ai-avatar-hero.json')
  const META = [
    { label: 'Product',  value: 'Web (SaaS)',            width: '163px' },
    { label: 'My role',  value: 'Solo Product Designer', width: '163px' },
    { label: 'Timeline', value: 'Q1 2023 to Q3 2023',   width: '163px' },
    { label: 'Skills',   value: 'UX Research, Usability Testing, Interaction Design, UI Design, Prototyping, AI Recommendation Logic, Cross functional Collaboration', width: '100%' },
  ]

  return (
    <section className="w-full bg-white px-[16px] py-[48px]">

      {/* ── 상단 블록: Shipped 칩 + 타이틀/서브텍스트 ── */}
      <div className="flex flex-col gap-[16px] pb-[32px] w-full">

        {/* Shipped 칩 */}
        <div
          className="flex items-center gap-[12px] self-start"
          style={{ backgroundColor: '#f7f4f0', paddingLeft: '10px', paddingRight: '10px', paddingTop: '6px', paddingBottom: '6px' }}
        >
          <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: '#00C950' }} />
          <span
            className="text-[14px] font-normal leading-[21px] whitespace-nowrap"
            style={{ fontFamily: poppins, color: '#8b8b8b' }}
          >
            Shipped
          </span>
        </div>

        {/* 타이틀 + 서브텍스트 */}
        <div className="flex flex-col gap-[8px] w-full">
          <p
            className="text-[24px] font-medium leading-[32px] text-[#1e1e1e] w-full"
            style={{ fontFamily: poppins }}
          >
            AI Avatar Video Creation Platform
          </p>
          <p
            className="text-[16px] font-normal leading-[24px] w-full"
            style={{ fontFamily: poppins, color: '#8b8b8b' }}
          >
            Improved voice selection efficiency with 50% faster selection and 59% fewer reselections
          </p>
        </div>
      </div>

      {/* ── 하단 블록: 히어로 + 본문 + 메타 ── */}
      <div className="flex flex-col gap-[20px] w-full">

        {/* 히어로 — Lottie 애니메이션 (1800×1200 = 3:2) */}
        {heroAnimation
          ? <LottieHeroPlayer
              animationData={heroAnimation}
              className="w-full shrink-0 block"
              style={{ aspectRatio: '358 / 238.668' }}
            />
          : <div className="w-full shrink-0 bg-[#bebebe]" style={{ aspectRatio: '358 / 238.668' }} />
        }

        {/* 소개 문단 */}
        <p
          className="text-[15px] font-normal leading-[22px] text-[#1e1e1e] w-full"
          style={{ fontFamily: poppins }}
        >
          {`As the product designer, I led the end-to-end UX/UI of KT AI Human Studio, integrating video generation and voice synthesis. I worked closely with KT's AI division to align technical feasibility and UX goals, and defined and optimized the voice feature through usability testing on KT AI Voice Studio. Using Figma, I designed the core flows, including the main interface, admin pages, and payment system, and validated them through rapid prototyping.`}
        </p>

        {/* 메타정보 */}
        <div
          className="flex flex-wrap gap-[24px] py-[20px] w-full"
          style={{
            borderTop: '1px solid #f7f7f7',
            borderBottom: '1px solid #f7f7f7',
          }}
        >
          {META.map(({ label, value, width }) => (
            <div key={label} className="flex flex-col items-start" style={{ width }}>
              <p
                className="text-[13px] font-normal leading-[19px]"
                style={{ fontFamily: poppins, color: '#8b8b8b' }}
              >
                {label}
              </p>
              <p
                className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {value}
              </p>
            </div>
          ))}
          {/* Team — 두 줄 처리 */}
          <div className="flex flex-col items-start w-full">
            <p className="text-[13px] font-normal leading-[19px]" style={{ fontFamily: poppins, color: '#8b8b8b' }}>Team</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>1 Product Owner · 3 Developers</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Client collaboration with KT AI Voice Studio team</p>
          </div>
        </div>
      </div>

    </section>
  )
}

// ─────────────────────────────────────────────────
// 01 INTRODUCTION
// ─────────────────────────────────────────────────
function Section01Introduction() {
  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[20px] w-full">
        <SectionLabel num="01" label="INTRODUCTION" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          KT AI Human Studio is a B2B platform for creating AI-powered video content with AI avatars and synthetic voices.
        </p>

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          KT AI Human Studio enables businesses to create professional-quality video content using AI avatars and synthetic voices without requiring cameras, actors, or recording studios. Users select an AI avatar, choose a voice profile, input a script, and generate a complete video — significantly reducing production time and cost for corporate training, marketing, and communications.
        </p>

        {/* 01 INTRODUCTION 유튜브 임베드 */}
        <YouTubeEmbed videoId="MGSxaNMiLwU" />

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          The platform serves enterprise clients across industries including education, finance, retail, and media, with a particular focus on content teams that need to produce multilingual video content at scale.
        </p>

        {/* 실제 이미지 — Figma 942:19974 (Handing over phone) */}
        <img
          src={imgIntroTabletPhoto}
          alt="AI Avatar platform interface"
          className="w-full object-cover"
          style={{ aspectRatio: '16 / 9' }}
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 02 PROJECT GOAL
// ─────────────────────────────────────────────────
function Section02ProjectGoal() {
  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[20px] w-full">
        <SectionLabel num="02" label="PROJECT GOAL" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Redesign the voice selection experience to reduce friction and improve confidence in voice choice.
        </p>

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          The original voice selection interface required users to navigate a long list of voice profiles with limited preview options, leading to high rates of reselection after video generation. Our goal was to redesign the voice selection flow to help users find the right voice faster, preview it more effectively, and commit to their choice with greater confidence — ultimately reducing post-generation reselection and improving overall production efficiency.
        </p>

        {/* 이미지 — Figma 942:19989 */}
        <img
          src={imgProjectGoalBg}
          alt="AI Voice Customization workflow"
          className="w-full object-cover"
          style={{ aspectRatio: '16 / 9' }}
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 03 AI Product Thinking
// ─────────────────────────────────────────────────
function Section03AIProductThinking() {
  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[20px] w-full">
        <SectionLabel num="03" label="AI Product Thinking" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Defining What the AI Should Use as Its Criteria
        </p>

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          This project went beyond screen design. We defined the attributes of each AI avatar and voice as structured keywords, then established the criteria used to match them. These criteria became the foundation for the recommended voice logic in Design Solution 03.
        </p>

        {/* 이미지 — Figma 942:19990 */}
        <img
          src={imgAIProductThinkingDiagram}
          alt="AI avatar and voice matching criteria diagram"
          className="w-full object-cover"
          style={{ aspectRatio: '16 / 9' }}
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 04 Outcome
// ─────────────────────────────────────────────────
function Section04Outcome() {
  const CARDS = [
    {
      num: '01',
      body: 'Reduced voice selection time with faster preview and filtering',
      stat: '50%',
      statLabel: 'faster voice selection',
    },
    {
      num: '02',
      body: 'Significantly fewer voice reselections after video generation',
      stat: '59%',
      statLabel: 'fewer reselections',
    },
    {
      num: '03',
      body: 'Higher user satisfaction with the redesigned voice selection flow',
      stat: '4.6',
      statLabel: 'out of 5 satisfaction score',
    },
  ]

  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="04" label="Outcome" />

        {CARDS.map((card) => (
          <div
            key={card.num}
            className="w-full flex flex-col gap-[16px] px-[20px] py-[24px]"
            style={{ backgroundColor: '#a6daff' }}
          >
            {/* Badge */}
            <div
              className="flex items-center justify-center shrink-0"
              style={{ width: '32px', height: '32px', backgroundColor: '#1e1e1e' }}
            >
              <span
                className="text-[16px] font-normal leading-[24px] text-white"
                style={{ fontFamily: poppins }}
              >
                {card.num}
              </span>
            </div>

            {/* Body */}
            <p
              className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]"
              style={{ fontFamily: poppins }}
            >
              {card.body}
            </p>

            {/* Stat */}
            <div className="flex flex-col gap-[2px]">
              <p
                className="text-[18px] font-semibold leading-[26px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {card.stat}
              </p>
              <p
                className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {card.statLabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 05 What did I work on?
// ─────────────────────────────────────────────────
function Section05WhatDidIWorkOn() {
  const CARDS = [
    {
      num: '01',
      title: 'Voice Selection Redesign',
      body: 'Redesigned the end-to-end voice selection flow including filtering, preview, and confirmation states to reduce cognitive load and increase selection confidence.',
    },
    {
      num: '02',
      title: 'AI Voice Studio Integration',
      body: 'Collaborated with the AI team to define how voice profile metadata should be surfaced in the UI, ensuring technical capabilities were accurately communicated to users.',
    },
    {
      num: '03',
      title: 'Usability Testing & Iteration',
      body: 'Conducted multiple rounds of usability testing with enterprise users to identify friction points and validate design decisions through rapid prototyping cycles.',
    },
  ]

  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="05" label="What did I work on?" />

        {CARDS.map((card) => (
          <div
            key={card.num}
            className="w-full flex flex-col gap-[12px] px-[20px] py-[24px]"
            style={{ backgroundColor: '#f7f7f7' }}
          >
            <p
              className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]"
              style={{ fontFamily: poppins }}
            >
              {card.num}
            </p>
            <p
              className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]"
              style={{ fontFamily: poppins }}
            >
              {card.title}
            </p>
            <p
              className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]"
              style={{ fontFamily: poppins }}
            >
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 UX Research
// ─────────────────────────────────────────────────
const MOBILE_TASKS = [
  { id: 'T1', label: 'Task 1', title: 'Access the AI voice selection screen after creating a project', expected: 'Expected 30s · 5 taps', highlight: true },
  { id: 'T2', label: 'Task 2', title: 'Select a voice using filters and search (by project)', expected: 'Expected 4 min · 8 taps', highlight: true },
  { id: 'T3', label: 'Task 3', title: 'Write a sentence and select a voice (by sentence)', expected: 'Expected 6 min · 79 taps', highlight: false },
  { id: 'T4', label: 'Task 4', title: 'Adjust detailed voice settings (emotion · language · speed · pitch)', expected: 'Expected 2 min · 34 taps', highlight: false },
  { id: 'T5', label: 'Task 5', title: 'Play the written sentence, add silence', expected: 'Expected 1 min · 12 taps', highlight: false },
]

function Section06UXResearch() {
  return (
    <section className="w-full px-[16px] py-[48px]" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="06" label="UX Research" />

        <div className="flex flex-col gap-[12px] w-full">
          <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Conducting a Usability Test on "KT AI Voice Studio"
          </p>
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            To identify integration challenges and improve the voice selection experience, we conducted a usability test with six people using KT AI Voice Studio for the first time. Participants were split into two groups, with and without content creation experience, to compare behavior patterns. We designed five tasks covering the full voice selection and editing flow. The most critical usability issues appeared in Tasks 1 and 2, related to voice access and search efficiency.
          </p>
        </div>

        <img src={imgUXResearchTesting} alt="UX Research usability testing" className="w-full" />

        {/* Task 카드 */}
        {MOBILE_TASKS.map(({ id, label, title, expected, highlight }) => (
          <div
            key={id}
            className="w-full flex flex-col gap-[10px] p-[16px]"
            style={{
              backgroundColor: highlight ? '#a6daff' : '#f3f3f3',
              border: highlight ? 'none' : '1px solid #ddd',
            }}
          >
            <p className="text-[13px] font-normal leading-[19px]" style={{ fontFamily: poppins, color: highlight ? '#1e1e1e' : '#666' }}>{label}</p>
            <p className="text-[14px] font-medium leading-[21px]" style={{ fontFamily: poppins, color: highlight ? '#1e1e1e' : '#666', minHeight: '42px' }}>{title}</p>
            <p className="text-[13px] font-normal leading-[19px]" style={{ fontFamily: poppins, color: highlight ? '#1e1e1e' : '#666' }}>{expected}</p>
          </div>
        ))}

        {/* Key Insight */}
        <div className="w-full flex flex-col items-center gap-[16px] p-[24px] text-center" style={{ backgroundColor: '#a6daff' }}>
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Key Insight</p>
          <p className="text-[18px] font-medium leading-[26px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Most usability issues occurred before users could confidently start selecting voices.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 07 Analysis of Results — Chart components
// ─────────────────────────────────────────────────

/** 단일 색상 막대 차트 (Success rate / Time taken / Satisfaction) */
function BarChart({
  title,
  bars,
  maxValue,
  unit = '%',
  showExpectedLine = false,
  averageLabel,
}: {
  title: string
  bars: { label: string; value: number; highlight?: boolean }[]
  maxValue: number
  unit?: string
  showExpectedLine?: boolean
  averageLabel?: string
}) {
  const barWidth = bars.length <= 5 ? '58.8px' : '47.667px'
  const BAR_AREA_H = 180 // px

  return (
    <div
      className="w-full flex flex-col px-[16px] py-[20px]"
      style={{ backgroundColor: 'white', border: '1px solid #dddddd', height: '340px', boxSizing: 'border-box' }}
    >
      {/* 제목 */}
      <p
        className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] shrink-0"
        style={{ fontFamily: poppins }}
      >
        {title}
      </p>

      {/* Average 라벨 (Satisfaction 차트) */}
      {averageLabel && (
        <p
          className="text-[13px] font-normal leading-[19px] shrink-0 mt-[4px]"
          style={{ fontFamily: poppins, color: '#8b8b8b' }}
        >
          {averageLabel}
        </p>
      )}

      {/* Bar area — 하단 정렬 */}
      <div
        className="relative flex items-end gap-[8px] mt-auto shrink-0"
        style={{ height: `${BAR_AREA_H}px` }}
      >
        {/* Expected Task Time 점선 (Time taken 차트) */}
        {showExpectedLine && (
          <div
            className="absolute left-0 right-0 flex items-center gap-[4px]"
            style={{ bottom: `${(40 / maxValue) * BAR_AREA_H * 0.7}px`, pointerEvents: 'none' }}
          >
            <div className="flex-1" style={{ borderTop: '1px dashed #8b8b8b' }} />
            <p className="text-[11px] font-normal shrink-0" style={{ fontFamily: poppins, color: '#8b8b8b' }}>
              Expected Task Time
            </p>
          </div>
        )}

        {bars.map((bar) => {
          const barH = Math.round((bar.value / maxValue) * BAR_AREA_H * 0.7)
          return (
            <div key={bar.label} className="flex flex-col items-center gap-[4px] shrink-0" style={{ width: barWidth }}>
              {/* 값 라벨 */}
              <p
                className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {bar.value}{unit}
              </p>
              {/* 막대 */}
              <div
                className="w-full shrink-0"
                style={{
                  height: `${barH}px`,
                  background: bar.highlight
                    ? 'linear-gradient(180deg, #3d5afb 0%, #1c2a78 100%)'
                    : '#e7e9f5',
                }}
              />
              {/* 막대 라벨 */}
              <p
                className="text-[13px] font-normal leading-[19px] text-[#1e1e1e] text-center"
                style={{ fontFamily: poppins }}
              >
                {bar.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** 누적 막대 차트 + 범례 (Error rate) */
function StackedBarChart({
  title,
  bars,
}: {
  title: string
  bars: { label: string; total: number; segments: { value: number; color: string }[] }[]
}) {
  const LEGEND = [
    { label: 'Interaction', color: '#8fd9d9' },
    { label: 'Labeling',    color: '#f4d98a' },
    { label: 'IA',          color: '#c9b8f5' },
    { label: 'UI',          color: '#b7e8c4' },
  ]
  const BAR_AREA_H = 148 // px
  const barWidth = '58.8px'
  const maxTotal = Math.max(...bars.map(b => b.total), 1)

  return (
    <div
      className="w-full flex flex-col px-[16px] py-[20px]"
      style={{ backgroundColor: 'white', border: '1px solid #dddddd', height: '340px', boxSizing: 'border-box' }}
    >
      {/* 제목 */}
      <p
        className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] shrink-0"
        style={{ fontFamily: poppins }}
      >
        {title}
      </p>

      {/* 범례 */}
      <div className="flex flex-wrap gap-x-[12px] gap-y-[4px] shrink-0 mt-[8px]">
        {LEGEND.map(item => (
          <div key={item.label} className="flex items-center gap-[4px]">
            <div className="w-[10px] h-[10px] shrink-0" style={{ backgroundColor: item.color }} />
            <p className="text-[11px] font-normal leading-[16px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Bar area */}
      <div
        className="flex items-end gap-[8px] mt-auto shrink-0"
        style={{ height: `${BAR_AREA_H}px` }}
      >
        {bars.map((bar) => {
          const totalH = Math.round((bar.total / maxTotal) * BAR_AREA_H * 0.88)
          const segSum = bar.segments.reduce((s, seg) => s + seg.value, 0)
          return (
            <div key={bar.label} className="flex flex-col items-center gap-[4px] shrink-0" style={{ width: barWidth }}>
              {/* 값 라벨 */}
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                {bar.total}
              </p>
              {/* 누적 막대 */}
              <div className="w-full flex flex-col-reverse shrink-0" style={{ height: `${totalH}px` }}>
                {bar.segments.map((seg, i) => (
                  <div
                    key={i}
                    className="w-full shrink-0"
                    style={{
                      height: segSum > 0 ? `${Math.round((seg.value / segSum) * totalH)}px` : '0px',
                      backgroundColor: seg.color,
                    }}
                  />
                ))}
              </div>
              {/* 막대 라벨 */}
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e] text-center" style={{ fontFamily: poppins }}>
                {bar.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// 09 Design Solution 01
// ─────────────────────────────────────────────────

function MSolvesBadge({ problemNum }: { problemNum: string }) {
  return (
    <div className="bg-[#1e1e1e] flex gap-[6px] items-center pl-[10px] pr-[14px] py-[6px] rounded-full shrink-0">
      <img src={icAvatarCheck} alt="" aria-hidden className="w-[16px] h-[16px] shrink-0" />
      <span className="text-[13px] font-medium leading-[19px] text-white whitespace-nowrap" style={{ fontFamily: poppins }}>
        SOLVES  PROBLEM {problemNum}
      </span>
    </div>
  )
}

function MBeforeAfterDivider() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-[#1e1e1e] flex items-center justify-center w-[32px] h-[32px] rotate-90">
        <img src={icAvatarArrowDown} alt="" aria-hidden className="w-[30.72px] h-[30.72px]" />
      </div>
    </div>
  )
}

const M_WHY_IT_WORKS_01 = [
  { num: '01', title: 'Works without extra setup', desc: 'A recommended voice is applied by default, so users can start without making additional adjustments.' },
  { num: '02', title: 'Keeps the current state visible', desc: "The selected voice and key settings stay visible, so users don't have to remember what they previously selected." },
  { num: '03', title: 'Makes voice settings easier to access', desc: 'The entry point clearly shows that AI Voice can be reviewed and adjusted whenever needed.' },
]

function Section09DesignSolution01() {
  return (
    <section className="w-full px-[16px] py-[48px] bg-white">
      <div className="flex flex-col gap-[24px] w-full">
        {/* 레이블 + 배지 */}
        <div className="flex items-start justify-between gap-[8px] w-full">
          <SectionLabel num="09" label="Design Solution 01" />
          <MSolvesBadge problemNum="01" />
        </div>

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Making the Voice Selection Entry Point Clearly Visible
        </p>

        {/* 통계 카드 3개 (세로 스택) */}
        {[
          { label: 'Task 1 success rate', value: '16%', note: 'Lowest of all 5 tasks' },
          { label: 'Task 1 time',         value: '65s',  note: '2x+ the expected 30s' },
          { label: 'Task 1 errors',       value: '8',    note: 'Caused by missing the entry point' },
        ].map(({ label, value, note }) => (
          <div key={label} className="flex flex-col gap-[8px] w-full p-[16px]" style={{ border: '1px solid #ddd' }}>
            <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
            <p className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
            <p className="text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
          </div>
        ))}

        {/* Why? */}
        <div className="bg-[#f7f7f7] flex flex-col gap-[12px] p-[16px] w-full" style={{ border: '1px solid #ddd' }}>
          <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            In the original KT AI Voice Studio, the "AI Voice Selection" entry point had low visual prominence, so users often overlooked it during project setup. Task 1 had the lowest success rate at 16%, took more than twice the expected time, and resulted in 8 usability errors.
          </p>
        </div>

        {/* Before image */}
        <img src={imgSolution01Before} alt="Original KT AI Voice Studio" className="w-full object-cover" style={{ height: '220px' }} />
        <p className="text-[12px] font-normal leading-[18px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>
          Red annotation added for clarity; it was not part of the original UI.
        </p>

        <MBeforeAfterDivider />

        {/* What we changed! */}
        <div className="bg-[#a6daff] flex flex-col gap-[12px] p-[16px] w-full">
          <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            We redesigned the entry point to show the selected voice and key settings directly in the creation flow, making the feature easier to notice and easier to adjust.
          </p>
        </div>

        {/* After image */}
        <img src={imgSolution01After} alt="Redesigned KT AI Voice Studio" className="w-full object-cover" style={{ height: '220px' }} />

        {/* Why it works */}
        <div className="flex flex-col gap-[16px] w-full p-[16px]" style={{ border: '1px solid #ddd' }}>
          <div className="flex items-center gap-[6px]">
            <img src={icWhyItWorks} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Why it works</p>
          </div>
          {M_WHY_IT_WORKS_01.map(({ num, title, desc }) => (
            <div key={num} className="flex flex-col gap-[10px] w-full p-[14px] bg-[#f7f7f7]">
              <div className="bg-[#1e1e1e] flex items-center justify-center w-[26px] h-[26px] shrink-0">
                <p className="text-[14px] font-medium leading-[21px] text-white text-center" style={{ fontFamily: poppins }}>{num}</p>
              </div>
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{title}</p>
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 10 Design Solution 02
// ─────────────────────────────────────────────────
function Section10DesignSolution02() {
  return (
    <section className="w-full px-[16px] py-[48px] bg-white">
      <div className="flex flex-col gap-[24px] w-full">
        <div className="flex items-start justify-between gap-[8px] w-full">
          <SectionLabel num="10" label="Design Solution 02" />
          <MSolvesBadge problemNum="02" />
        </div>

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Making Applied Filters Easier to Scan and Modify
        </p>

        {[
          { label: 'Task 2 success rate', value: '33%',  note: 'Finding a voice via filter/search' },
          { label: 'Task 2 time',         value: '328s', note: '+88s over the expected 240s' },
          { label: 'Task 2 errors',       value: '12',   note: 'Highest of all tasks' },
        ].map(({ label, value, note }) => (
          <div key={label} className="flex flex-col gap-[8px] w-full p-[16px]" style={{ border: '1px solid #ddd' }}>
            <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
            <p className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
            <p className="text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
          </div>
        ))}

        <div className="bg-[#f7f7f7] flex flex-col gap-[12px] p-[16px] w-full" style={{ border: '1px solid #ddd' }}>
          <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            When multiple filter values were selected, users struggled to tell which values were actually applied. Because filter states were condensed into numeric indicators, they were difficult to scan and modify. This directly contributed to Task 2 recording 12 usability errors — the highest of all five tasks.
          </p>
        </div>

        <img src={imgSolution02Before} alt="Original filter UI — before redesign" className="w-full object-cover" style={{ height: '220px' }} />

        <MBeforeAfterDivider />

        <div className="bg-[#a6daff] flex flex-col gap-[12px] p-[16px] w-full">
          <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            We replaced the horizontal filter chips with a vertical layout that shows every category and selected value at once, so users can scan, modify, and remove filters without opening extra dropdowns.
          </p>
        </div>

        <img src={imgSolution02After} alt="Redesigned filter UI — after redesign" className="w-full object-cover" style={{ height: '220px' }} />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 11 Design Solution 03
// ─────────────────────────────────────────────────
const M_MATCHING_STEPS = [
  { num: '01', desc: "AI extracts trait keywords (age range, mood, tone) from the AI human's image" },
  { num: '02', desc: "Automatically matches them against each voice's existing tags (#warm #lively #calm, etc.)" },
  { num: '03', desc: 'Surfaces the top 3 matches as recommended voices and automatically applies the top match as the default' },
  { num: '04', desc: 'Rather than trusting the AI match blindly, a designer listens through and filters out any awkward pairings' },
]

function Section11DesignSolution03() {
  return (
    <section className="w-full px-[16px] py-[48px] bg-white">
      <div className="flex flex-col gap-[24px] w-full">
        <div className="flex items-start justify-between gap-[8px] w-full">
          <SectionLabel num="11" label="Design Solution 03" />
          <MSolvesBadge problemNum="03" />
        </div>

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Providing Recommended and Default Voices
        </p>

        <div className="bg-[#f7f7f7] flex flex-col gap-[12px] p-[16px] w-full" style={{ border: '1px solid #ddd' }}>
          <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            With over 110 voice options, users experienced decision fatigue, especially when they were unfamiliar with the available voices. We needed a way to surface relevant options without requiring users to preview them one by one.
          </p>
        </div>

        <img src={imgSolution03Before} alt="Original voice selection — before redesign" className="w-full object-cover" style={{ height: '220px' }} />

        <MBeforeAfterDivider />

        <div className="bg-[#a6daff] flex flex-col gap-[12px] p-[16px] w-full">
          <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            We defined the AI avatar and each voice using structured keywords, then used those attributes to generate recommended voice matches and apply the best match as the default.
          </p>
        </div>

        <img src={imgSolution03After} alt="Redesigned voice selection — after redesign" className="w-full object-cover" style={{ height: '220px' }} />

        {/* Recommended Voice Matching Logic */}
        <div className="flex flex-col gap-[16px] w-full p-[16px]" style={{ border: '1px solid #ddd' }}>
          <div className="flex items-center gap-[6px]">
            <img src={icWhyItWorks} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Recommended Voice Matching Logic</p>
          </div>
          {M_MATCHING_STEPS.map(({ num, desc }) => (
            <div key={num} className="flex flex-col gap-[10px] w-full p-[14px] bg-[#f7f7f7]">
              <div className="bg-[#1e1e1e] flex items-center justify-center w-[26px] h-[26px] shrink-0">
                <p className="text-[14px] font-medium leading-[21px] text-white text-center" style={{ fontFamily: poppins }}>{num}</p>
              </div>
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 12 Design Solution 04
// ─────────────────────────────────────────────────
function Section12DesignSolution04() {
  return (
    <section className="w-full px-[16px] py-[48px] bg-white">
      <div className="flex flex-col gap-[24px] w-full">
        <div className="flex items-start justify-between gap-[8px] w-full">
          <SectionLabel num="12" label="Design Solution 04" />
          <MSolvesBadge problemNum="04" />
        </div>

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Preview Voices With Live Content
        </p>

        <div className="bg-[#f7f7f7] flex flex-col gap-[12px] p-[16px] w-full" style={{ border: '1px solid #ddd' }}>
          <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Users could only preview voices with fixed sample sentences, not their own scripts. As a result, the selected voice often felt different when applied to real content, forcing users to switch repeatedly between writing and voice selection.
          </p>
        </div>

        <img src={imgSolution04Before} alt="Original voice preview — before redesign" className="w-full object-cover" style={{ height: '220px' }} />

        <MBeforeAfterDivider />

        <div className="bg-[#a6daff] flex flex-col gap-[12px] p-[16px] w-full">
          <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            We added an example sentence input so users could preview their own scripts with the selected voice on the same screen. This allowed them to evaluate how the voice fit their real content before applying it.
          </p>
        </div>

        <img src={imgSolution04After} alt="Redesigned voice preview — after redesign" className="w-full object-cover" style={{ height: '220px' }} />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 13 Outcome
// ─────────────────────────────────────────────────
function Section13Outcome() {
  return (
    <section className="w-full px-[16px] py-[48px] bg-white">
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="13" label="Outcome" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          What These Four Changes Made Possible
        </p>

        <div className="flex flex-col gap-[12px] w-full">
          {[
            { stat: '50%↓',  label: 'Voice selection time' },
            { stat: '59%↓',  label: 'Voice reselection rate' },
            { stat: 'B2B2C', label: 'Expansion, built and launched' },
          ].map(({ stat, label }) => (
            <div
              key={stat}
              className="flex flex-col gap-[8px] p-[20px] bg-[#a6daff] w-full"
            >
              <p className="text-[24px] font-medium leading-[32px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{stat}</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Section07AnalysisOfResults() {
  return (
    <section className="w-full px-[16px] py-[48px]" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="07" label="Analysis of Results" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Quantitative results confirmed significant improvements across all key metrics.
        </p>

        {/* 차트 4개 — 세로 스택, gap 16px */}
        <div className="flex flex-col gap-[16px] w-full">

          {/* Chart 1: Success rate — T1/T2 그라디언트, T3/T4/T5 연보라 */}
          <BarChart
            title="Success rate"
            bars={[
              { label: 'T1', value: 16,  highlight: true },
              { label: 'T2', value: 33,  highlight: true },
              { label: 'T3', value: 83,  highlight: false },
              { label: 'T4', value: 100, highlight: false },
              { label: 'T5', value: 100, highlight: false },
            ]}
            maxValue={100}
          />

          {/* Chart 2: Time taken — T1/T2 그라디언트, T3/T4/T5 연보라, Expected Task Time 점선 */}
          <BarChart
            title="Time taken (s)"
            bars={[
              { label: 'T1', value: 65,  highlight: true },
              { label: 'T2', value: 328, highlight: true },
              { label: 'T3', value: 283, highlight: false },
              { label: 'T4', value: 91,  highlight: false },
              { label: 'T5', value: 42,  highlight: false },
            ]}
            maxValue={328}
            unit=""
            showExpectedLine
          />

          {/* Chart 3: Error rate — 누적 막대 (Interaction/Labeling/IA) */}
          {/* T1: 8 (Interaction+Labeling), T2: 12 (Interaction+Labeling+IA), T3: 4 (Interaction+IA), T4: 0, T5: 1 (Labeling) */}
          <StackedBarChart
            title="Error rate"
            bars={[
              { label: 'T1', total: 8,  segments: [{ value: 3,   color: '#8fd9d9' }, { value: 5,   color: '#f4d98a' }] },
              { label: 'T2', total: 12, segments: [{ value: 3,   color: '#8fd9d9' }, { value: 7.5, color: '#f4d98a' }, { value: 1.5, color: '#c9b8f5' }] },
              { label: 'T3', total: 4,  segments: [{ value: 2.5, color: '#8fd9d9' }, { value: 1.5, color: '#c9b8f5' }] },
              { label: 'T4', total: 0,  segments: [] },
              { label: 'T5', total: 1,  segments: [{ value: 1,   color: '#f4d98a' }] },
            ]}
          />

          {/* Chart 4: Satisfaction — Average 2.67, P1~P6, P4만 그라디언트 */}
          <BarChart
            title="Satisfaction (/5)"
            bars={[
              { label: 'P1', value: 2.9, highlight: false },
              { label: 'P2', value: 2.9, highlight: false },
              { label: 'P3', value: 4,   highlight: false },
              { label: 'P4', value: 1,   highlight: true },
              { label: 'P5', value: 3.5, highlight: false },
              { label: 'P6', value: 2,   highlight: false },
            ]}
            maxValue={5}
            unit=""
            averageLabel="Average: 2.67"
          />

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 14 Reflection
// ─────────────────────────────────────────────────
function Section14Reflection() {
  return (
    <section className="w-full px-[16px] py-[48px]" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="14" label="Reflection" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          What This Project Left Me, in Data and Feedback
        </p>

        <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Looking at the low success rate and high error rate from Tasks 1 and 2 alongside the feedback we got after shipping the changes:
        </p>

        {/* 2개 인용 카드 — 세로 배치 */}
        <div className="flex flex-col gap-[12px] w-full">
          {[
            'Even users coming from the old voice studio could use this naturally, without having to learn anything new.',
            "Recommended voices wasn't something I'd even considered. It'll clearly make selection faster and more satisfying.",
          ].map((quote, i) => (
            <div
              key={i}
              className="flex flex-col gap-[10px] p-[16px] w-full"
              style={{ backgroundColor: '#f7f7f7', border: '1px solid #ddd' }}
            >
              <p className="text-[18px] leading-none text-[#1e1e1e] select-none" aria-hidden>"</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{quote}</p>
            </div>
          ))}
        </div>

        <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          This project showed me that combining video and voice generation into one experience requires more than screen design. Defining the criteria that guide the AI's output matters just as much. I validated four solutions using usability data and client feedback. The matching criteria we established became a lasting principle for designing AI human output.
        </p>

        <p className="text-[14px] font-normal leading-[21px]" style={{ fontFamily: poppins, color: '#8b8b8b' }}>
          * Content created with KT AI Human Studio
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 15 Team · Closing
// ─────────────────────────────────────────────────
function Section15TeamClosing() {
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col gap-[16px] px-[16px] py-[32px] w-full">
        {/* 그룹 사진 — full width */}
        <img
          src={imgTeamGroupPhoto}
          alt="CNAI STUDIO team group photo"
          className="w-full object-cover object-bottom"
          style={{ height: '220px', border: '1px solid rgba(30,30,30,0.1)' }}
        />
        {/* 나머지 2장 — 가로 배치 */}
        <div className="flex gap-[12px] w-full">
          <img
            src={imgTeamPhoto01}
            alt="CNAI STUDIO team photo 01"
            className="flex-1 object-cover"
            style={{ height: '110px', border: '1px solid rgba(30,30,30,0.1)' }}
          />
          <img
            src={imgTeamPhoto02}
            alt="CNAI STUDIO team photo 02"
            className="flex-1 object-cover"
            style={{ height: '110px', border: '1px solid rgba(30,30,30,0.1)' }}
          />
        </div>
        <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] w-full text-center" style={{ fontFamily: poppins }}>
          The CNAI STUDIO team that built KT AI Human Studio together
        </p>
        <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] w-full text-center" style={{ fontFamily: poppins }}>
          I started my career at a startup right after graduating. Working with a small team toward one shared goal let me own a product from planning through launch. I handled problem definition, UI/UX design, and client communication. The habit of defining scope quickly and validating as I go has stayed with me in every product I've worked on since.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────
export default function MobileAIAvatarPage() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

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
      {/* Close button — 모바일: 16px offset, 40×40px */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="group fixed top-[16px] right-[16px] w-[40px] h-[40px] bg-[#1e1e1e] flex items-center justify-center z-50 border-0 outline-none cursor-pointer shrink-0"
        aria-label="Close"
      >
        <img
          src={icClose}
          alt=""
          aria-hidden
          className="block w-[20px] h-[20px] transition-transform duration-200 ease-out group-hover:rotate-90"
        />
      </button>

      {/* Header */}
      <MobileAIAvatarHeader />

      {/* 01 INTRODUCTION */}
      <Section01Introduction />

      {/* 02 PROJECT GOAL */}
      <Section02ProjectGoal />

      {/* 03 AI Product Thinking */}
      <Section03AIProductThinking />

      {/* 04 Outcome */}
      <Section04Outcome />

      {/* 05 What did I work on? */}
      <Section05WhatDidIWorkOn />

      {/* 06 UX Research */}
      <Section06UXResearch />

      {/* 07 Analysis of Results */}
      <Section07AnalysisOfResults />

      {/* 09 Design Solution 01 */}
      <Section09DesignSolution01 />

      {/* 10 Design Solution 02 */}
      <Section10DesignSolution02 />

      {/* 11 Design Solution 03 */}
      <Section11DesignSolution03 />

      {/* 12 Design Solution 04 */}
      <Section12DesignSolution04 />

      {/* 13 Outcome */}
      <Section13Outcome />

      {/* 14 Reflection */}
      <Section14Reflection />

      {/* 15 Team · Closing */}
      <Section15TeamClosing />

    </motion.div>
  )
}
