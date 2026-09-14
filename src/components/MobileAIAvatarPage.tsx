// MobileAIAvatarPage.tsx — AI Avatar case study (Mobile <768px)
// Figma: https://www.figma.com/design/fCphmFmQRkjF6EWKKqby8E/2026?node-id=945-1125
// ★ AIAvatarPage.tsx(데스크톱) / TabletAIAvatarPage.tsx(태블릿)는 절대 건드리지 않음.

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLottieAnimation } from '../hooks/useLottieAnimation'
import { LottieHeroPlayer } from './LottieHeroPlayer'
import { YouTubeEmbed } from './YouTubeEmbed'

// ── Next Project assets ───────────────────────────
import vidCornerstoneDemo from '../assets/videos/cornerstone-thumb-v2.mp4'
import vidShelterDemo     from '../assets/videos/shelter-demo.mp4'

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
import chartSuccessRate     from '../assets/images/ai-avatar/charts/chart-success-rate.png'
import chartTimeTaken       from '../assets/images/ai-avatar/charts/chart-time-taken.png'
import chartErrorCount      from '../assets/images/ai-avatar/charts/chart-error-count.png'
import chartSatisfaction    from '../assets/images/ai-avatar/charts/chart-satisfaction.png'

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
          {`As the solo product designer, I led the end-to-end UX/UI for an AI avatar creation platform, integrating video generation with a client's AI voice technology. I worked directly with the client's AI team, product owner, and developers to define requirements, run usability testing, and design the main creation flow, voice selection experience, admin pages, and payment flow. The resulting experience reduced voice selection time by 48.2% and improved the overall voice discovery and selection process.`}
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
        <SectionLabel num="01" label="Introduction" />

        <div className="flex flex-col gap-[12px] w-full">
          <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Two Platforms in One: KT AI Human Studio Launch
          </p>
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            {`CNAI STUDIO collaborated with KT, Korea's largest telecom carrier, to integrate KT's AI voice generation technology into our video creation platform. This partnership evolved CNAI STUDIO from a B2B to a B2B2C service, allowing users to create personalized AI human videos by customizing both visuals and voices.`}
          </p>
        </div>

        {/* 01 INTRODUCTION 유튜브 임베드 */}
        <YouTubeEmbed videoId="MGSxaNMiLwU" />

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
        <SectionLabel num="02" label="Project Goal" />

        <div className="flex flex-col gap-[12px] w-full">
          <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Integrating AI Voice Customization Into the Creation Flow
          </p>
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Our goal was to seamlessly integrate AI voice customization into the existing AI human video workflow. We designed a familiar yet intuitive creation experience, allowing users to easily personalize both voice and visuals within one unified platform.
          </p>
        </div>

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
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="04" label="Outcome" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Scaling the Product from B2B to B2B2C
        </p>

        <div className="flex flex-col gap-[16px] w-full">
          {outcomes.map(({ num, text, highlight }) => (
            <div
              key={num}
              className="flex gap-[16px] items-center px-[20px] py-[24px] w-full"
              style={{ backgroundColor: '#a6daff' }}
            >
              <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                <span className="text-[16px] font-medium leading-[24px] text-white text-center" style={{ fontFamily: poppins }}>{num}</span>
              </div>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] flex-1" style={{ fontFamily: poppins }}>
                {text}
              </p>
              {highlight && (
                <span className="text-[18px] font-semibold leading-[26px] text-[#1e1e1e] shrink-0" style={{ fontFamily: poppins }}>
                  {highlight}
                </span>
              )}
            </div>
          ))}
        </div>
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

  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="05" label="What did I work on?" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          UX/UI Design From Concept to Delivery
        </p>

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
          <div className="flex flex-col gap-[4px] w-full">
            <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              Conducting a Usability Test on "KT AI Voice Studio"
            </p>
            <p className="text-[14px] font-normal leading-[21px]" style={{ fontFamily: poppins, color: '#999' }}>
              Existing live AI voice product from the client
            </p>
          </div>
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            To understand how prior content creation experience affected voice selection behavior, we conducted usability testing with six first-time users of KT AI Voice Studio. Participants were split into two groups: three with content creation experience and three without. We designed five tasks covering the full voice selection and editing flow, then compared how each group navigated, selected, and adjusted voices.
          </p>
        </div>

        <img src={imgUXResearchTesting} alt="UX Research usability testing" className="w-full" />

        {/* Task 카드 — 세로 스택, all #f3f3f3 */}
        {MOBILE_TASKS.map(({ id, label, title, expected }) => (
          <div
            key={id}
            className="w-full flex flex-col gap-[12px] px-[16px] pt-[16px] pb-[18px]"
            style={{ backgroundColor: '#f3f3f3', border: '1px solid #ddd' }}
          >
            <p className="text-[14px] font-normal leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>{label}</p>
            <p className="text-[14px] font-medium leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>{title}</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>{expected}</p>
          </div>
        ))}

        {/* Research Setup */}
        <div className="w-full flex flex-col gap-[20px] items-center px-[20px] py-[24px]" style={{ backgroundColor: '#a6daff' }}>
          <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] text-center" style={{ fontFamily: poppins }}>Research Setup</p>
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex flex-col gap-[4px]">
              <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>6 Participants</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>First-time KT AI Voice Studio users</p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>2 Groups</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                3 with content creation experience<br />3 without content creation experience
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>5 Tasks</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Covering voice access, search, selection, editing, and playback</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// ─────────────────────────────────────────────────
// 08 Problem Definition — Figma 965-1229
// ─────────────────────────────────────────────────

const M_PROBLEMS = [
  { num: 'Problem 1', title: 'AI Voice Selection button UI, hard to notice',                                    tag: 'Usability',         solution: 'Stronger UI prominence and user awareness' },
  { num: 'Problem 2', title: 'Hard to check applied values when multiple filters are selected',                 tag: 'Usability',         solution: 'Switched to an intuitive vertical filter layout' },
  { num: 'Problem 3', title: 'Voice variety causes user selection overload',                                    tag: 'Connected Insight', solution: 'Recommended voices and a Default Voice' },
  { num: 'Problem 4', title: 'Applying a voice to the script often differs from expectation, causing rework',  tag: 'Usage Pattern',     solution: 'Added an "enter example sentence" feature' },
]

const M_BUBBLE_CARDS = [
  { bg: '#e6e0fb', color: '#4a3b93', label: 'Task 1', emoji: '😰', quote: '"I can\'t find where to select a voice."' },
  { bg: '#dcf3df', color: '#276637', label: 'Task 2', emoji: '😰', quote: '"I don\'t know which filters are applied."' },
  { bg: '#dcf3df', color: '#276637', label: 'Task 2', emoji: '😰', quote: '"Too many options, hard to choose."' },
  { bg: '#fbedc4', color: '#8a660c', label: 'Task 3', emoji: '😧', quote: '"The applied voice differs from what I expected, I want to change it."' },
  { bg: '#eceef4', color: '#585c72', label: 'Task 4', emoji: '😧', quote: '"I don\'t feel the need to adjust speed or pitch."' },
]

function Section08ProblemDefinition() {
  return (
    <section className="w-full px-[16px] py-[48px]" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="08" label="Problem Definition" />
        <div className="flex flex-col gap-[8px] w-full">
          <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Four Problems Identified Through Research Data
          </p>
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Users struggled to discover due to high complexity and lack of preview.
          </p>
        </div>

        {/* 말풍선 카드 — 세로 스택, gap 16px */}
        <div className="bg-white flex flex-col gap-[16px] px-[16px] py-[24px] w-full" style={{ border: '1px solid #ddd' }}>
          <p className="text-[15px] font-normal leading-[22px] text-[#8b8b8b] text-center w-full" style={{ fontFamily: poppins }}>
            Here's what drove the low success rates and high error rates in Tasks 1 and 2, task by task.
          </p>
          <div className="flex flex-col gap-[16px] w-full">
            {M_BUBBLE_CARDS.map(({ bg, color, label, emoji, quote }, i) => (
              <div key={i} className="relative rounded-[12px] pt-[12px] pb-[14px] px-[14px] w-full" style={{ backgroundColor: bg }}>
                {/* 말풍선 꼬리 */}
                <div className="absolute rotate-45 rounded-[2px]" style={{ left: '19.72px', top: '-8.28px', width: '15.556px', height: '15.556px', backgroundColor: bg }} />
                <span style={{ fontSize: '37.701px', lineHeight: 1, display: 'block', marginBottom: '8px' }}>{emoji}</span>
                <p className="text-[13px] font-semibold leading-[20px] uppercase tracking-[0.5px] mb-[4px]" style={{ fontFamily: poppins, color }}>{label}</p>
                <p className="text-[14px] font-medium leading-[21px]" style={{ fontFamily: poppins, color }}>{quote}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div className="bg-[#a6daff] flex flex-col gap-[16px] px-[16px] py-[24px] w-full">
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>Key Insight</p>
          <p className="text-[18px] font-medium leading-[26px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Primary pain points were concentrated in Tasks 1 and 2.
          </p>
        </div>

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Taken together, these reactions reveal four core problems. Each corresponds to one of the four design solutions below.
        </p>

        {/* Problem 카드 — 세로 스택, gap 16px */}
        <div className="flex flex-col gap-[16px] w-full">
          {M_PROBLEMS.map(({ num, title, tag, solution }) => (
            <div key={num} className="flex flex-col w-full">
              <div className="bg-[#ffbfbf] flex flex-col gap-[12px] px-[16px] py-[24px]">
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{num}</p>
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{title}</p>
              </div>
              <div className="bg-white flex flex-col gap-[12px] px-[16px] py-[24px]">
                <div className="bg-[#f7f4f0] flex items-center justify-center px-[12px] py-[6px] self-start">
                  <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{tag}</p>
                </div>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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

        <div className="flex flex-col gap-[12px] w-full">
          <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Key Challenges Identified in Tasks 1 and 2
          </p>
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            We analyzed four metrics: task success, time on task, error count, and participant satisfaction. Tasks 1 and 2 showed the most significant usability issues, with the lowest success rates and highest error counts.
          </p>
        </div>

        {/* 차트 4개 — Figma export 이미지, 세로 스택 */}
        <div className="flex flex-col gap-[16px] w-full">
          <img src={chartSuccessRate} alt="Success rate chart" className="w-full h-auto" />
          <img src={chartTimeTaken} alt="Time taken chart" className="w-full h-auto" />
          <img src={chartErrorCount} alt="Error count chart" className="w-full h-auto" />
          <img src={chartSatisfaction} alt="Participant satisfaction chart" className="w-full h-auto" />
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
        {/* 그룹 사진 — full width, 비율 유지 */}
        <img
          src={imgTeamGroupPhoto}
          alt="CNAI STUDIO team group photo"
          className="w-full h-auto block"
          style={{ border: '1px solid rgba(30,30,30,0.1)' }}
        />
        {/* 나머지 2장 — 가로 배치, 비율 유지 */}
        <div className="flex gap-[12px] w-full items-start">
          <img
            src={imgTeamPhoto01}
            alt="CNAI STUDIO team photo 01"
            className="flex-1 min-w-0 h-auto block"
            style={{ border: '1px solid rgba(30,30,30,0.1)' }}
          />
          <img
            src={imgTeamPhoto02}
            alt="CNAI STUDIO team photo 02"
            className="flex-1 min-w-0 h-auto block"
            style={{ border: '1px solid rgba(30,30,30,0.1)' }}
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
// Next Project 섹션
// ─────────────────────────────────────────────────
function MobileNextProjectSection() {
  const navigate = useNavigate()
  return (
    <section className="w-full bg-[#f7f7f7]">
      <div className="w-full px-[20px] py-[40px] flex flex-col gap-[24px]">
        <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Next Project</p>
        <div className="flex flex-col gap-[20px] w-full">

          {/* Cornerstone — 클릭 가능 */}
          <div className="flex flex-col gap-[12px] cursor-pointer group" onClick={() => navigate('/projects/cornerstone')}>
            <div className="relative overflow-hidden w-full" style={{ aspectRatio: '886.84/591.23' }}>
              <video src={vidCornerstoneDemo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Cornerstone College Website</p>
              <p className="text-[12px] font-normal leading-[18px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>70%+ AI-assisted workflow, one scalable system across 10 program pages</p>
            </div>
          </div>

          {/* Homeless Shelter — 비활성 */}
          <div className="flex flex-col gap-[12px] opacity-60 cursor-not-allowed">
            <div className="relative overflow-hidden w-full" style={{ aspectRatio: '886.84/591.23' }}>
              <video src={vidShelterDemo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-[8px] left-[8px] bg-[#1e1e1e] px-[8px] py-[3px]">
                <span className="text-white text-[11px] font-medium leading-[16px]" style={{ fontFamily: poppins }}>Coming Soon</span>
              </div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Homeless Shelter Life Management System (Wildflower-Gardening)</p>
              <p className="text-[12px] font-normal leading-[18px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>94.3% NFC adoption and 30+ minutes faster response time</p>
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

      {/* 08 Problem Definition */}
      <Section08ProblemDefinition />

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

      {/* Next Project */}
      <MobileNextProjectSection />

    </motion.div>
  )
}
