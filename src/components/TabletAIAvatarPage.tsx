// TabletAIAvatarPage.tsx — AI Avatar case study (Tablet 768–1023px)
// Figma: https://www.figma.com/design/fCphmFmQRkjF6EWKKqby8E/2026?node-id=944-1124
// ★ AIAvatarPage.tsx(데스크톱 원본)는 절대 건드리지 않음. 이 파일만 편집.

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import React from 'react'
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

// ── Icons ─────────────────────────────────────────
import icClose           from '../assets/icons/close.svg'
import icAvatarCheck     from '../assets/icons/ai-avatar/check-circle.svg'
import icAvatarArrowDown from '../assets/icons/ai-avatar/arrow-down-box.svg'
import icWhyItWorks      from '../assets/icons/ai-avatar/why-it-works.svg'

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────
const poppins = "'Poppins', sans-serif"

// ─────────────────────────────────────────────────
// Shared layout wrapper — px-[32px] outer, py-[60px], gap 기본 24px
// ─────────────────────────────────────────────────
function TContentWrap({ children, gap = 24 }: { children: React.ReactNode; gap?: number }) {
  return (
    <div className="w-full px-[32px]" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="w-full flex flex-col" style={{ gap: `${gap}px` }}>
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// 섹션 레이블 — num: 22px/32px #a6daff, label: 20px/30px #1e1e1e
// ─────────────────────────────────────────────────
function TSectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p className="text-[22px] font-medium leading-[32px] text-[#a6daff]" style={{ fontFamily: poppins }}>{num}</p>
      <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Header — Figma 944:1125
// ─────────────────────────────────────────────────
function TabletAIAvatarHeader() {
  const heroAnimation = useLottieAnimation('/lottie/ai-avatar-hero.json')
  const META = [
    { label: 'Product',   value: 'Web' },
    { label: 'My role',   value: 'Solo Product Designer' },
    { label: 'Timeline',  value: 'Q2 2026 to Q3 2026' },
    { label: 'Skills',    value: 'UX Strategy, Information Architecture, UI Design, Responsive Design, AI Assisted Workflow, Stakeholder Collaboration' },
  ]
  return (
    <section className="w-full bg-white pt-[64px] pb-[60px] px-[32px]">
      <div className="w-full flex flex-col gap-[32px]">

        {/* 타이틀 행 — Shipped badge absolute top-right */}
        <div className="relative flex items-start w-full">
          <div className="flex flex-col gap-[12px] flex-1 min-w-0 pr-[120px]">
            <p className="text-[28px] font-medium leading-[38px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              AI Avatar Video Creation Platform
            </p>
            <p className="text-[20px] font-normal leading-[30px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>
              Improved voice selection efficiency with 50% faster selection and 59% fewer reselections
            </p>
          </div>
          <div className="absolute right-0 top-0 bg-[#f7f4f0] flex gap-[12px] items-center px-[12px] py-[8px] shrink-0">
            <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: '#00C950' }} />
            <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>Shipped</span>
          </div>
        </div>

        {/* 히어로 — Lottie 애니메이션 (1800×1200 = 3:2) */}
        {heroAnimation
          ? <LottieHeroPlayer
              animationData={heroAnimation}
              className="w-full shrink-0 block"
              style={{ aspectRatio: '704 / 469.336' }}
            />
          : <div className="w-full shrink-0 bg-[#bebebe]" style={{ aspectRatio: '704 / 469.336' }} />
        }

        {/* 소개 문단 */}
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          {`As the product designer, I led the end-to-end UX/UI of KT AI Human Studio, integrating video generation and voice synthesis. I worked closely with KT's AI division to align technical feasibility and UX goals, and defined and optimized the voice feature through usability testing on KT AI Voice Studio. Using Figma, I designed the core flows, including the main interface, admin pages, and payment system, and validated them through rapid prototyping.`}
        </p>

        {/* 메타정보 그리드 — 2열 flex-wrap */}
        <div
          className="w-full py-[20px] flex flex-wrap gap-x-[24px] gap-y-[20px]"
          style={{ borderTop: '1px solid #f7f7f7', borderBottom: '1px solid #f7f7f7' }}
        >
          {META.map((item) => (
            <div key={item.label} className="flex flex-col items-start" style={{ width: 'calc(50% - 12px)' }}>
              <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>{item.label}</p>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item.value}</p>
            </div>
          ))}
          {/* Team — full width */}
          <div className="flex flex-col items-start w-full">
            <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>Team</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>2 Developers · 6 Program Managers</p>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 01 INTRODUCTION — Figma 945:1165
// ─────────────────────────────────────────────────
function TabletIntroSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="01" label="INTRODUTION" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Two Platforms in One: KT AI Human Studio Launch
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            {`CNAI STUDIO collaborated with KT, Korea's largest telecom carrier, to integrate KT's AI voice generation technology into our video creation platform. This partnership evolved CNAI STUDIO from a B2B to a B2B2C service, allowing users to create personalized AI human videos by customizing both visuals and voices.`}
          </p>
        </div>
        {/* 01 INTRODUCTION 유튜브 임베드 */}
        <YouTubeEmbed videoId="MGSxaNMiLwU" />
        {/* 실제 이미지 — Figma 942:19974 (Handing over phone) */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
          <img
            src={imgIntroTabletPhoto}
            alt="KT AI Human Studio interface on a tablet"
            className="w-full h-full object-cover"
          />
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 02 PROJECT GOAL — Figma 948:1124
// ─────────────────────────────────────────────────
function TabletProjectGoalSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="02" label="PROJECT GOAL" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Integrating AI Voice Customization Into the Creation Flow
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Our goal was to seamlessly integrate AI voice customization into the existing AI human video workflow. We designed a familiar yet intuitive creation experience, allowing users to easily personalize both voice and visuals within one unified platform.
          </p>
        </div>
        {/* 이미지 — Figma 942:19989 */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
          <img src={imgProjectGoalBg} alt="AI Voice Customization workflow" className="w-full h-full object-cover" />
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 03 AI PRODUCT THINKING — Figma 948:1154
// ─────────────────────────────────────────────────
function TabletAIProductThinkingSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={24}>
        <TSectionLabel num="03" label="AI Product Thinking" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Defining What the AI Should Use as Its Criteria
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            This project went beyond screen design. We defined the attributes of each AI avatar and voice as structured keywords, then established the criteria used to match them. These criteria became the foundation for the recommended voice logic in Design Solution 03.
          </p>
        </div>
        {/* 이미지 — Figma 942:19990 */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
          <img src={imgAIProductThinkingDiagram} alt="AI avatar and voice matching criteria diagram" className="w-full h-full object-cover" />
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 04 OUTCOME — Figma 950:1124
// ─────────────────────────────────────────────────
function TabletOutcomeTopSection() {
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
      <TContentWrap gap={32}>
        <TSectionLabel num="04" label="Outcome" />
        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Scaling the Product from B2B to B2B2C
        </h2>
        <div className="flex flex-col gap-[24px] w-full">
          {outcomes.map(({ num, text, highlight }) => (
            <div
              key={num}
              className="flex gap-[16px] items-center p-[24px] w-full"
              style={{ backgroundColor: '#a6daff' }}
            >
              <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                <span className="text-[20px] font-medium leading-[30px] text-white text-center" style={{ fontFamily: poppins }}>{num}</span>
              </div>
              <p className="text-[20px] font-normal leading-[30px] text-[#1e1e1e] flex-1" style={{ fontFamily: poppins }}>
                {text}
              </p>
              {highlight && (
                <span className="text-[22px] font-semibold leading-[32px] text-[#1e1e1e] shrink-0" style={{ fontFamily: poppins }}>
                  {highlight}
                </span>
              )}
            </div>
          ))}
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 05 WHAT DID I WORK ON? — Figma 950:19343
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

function TabletWhatIWorkedOnSection() {
  return (
    <section className="w-full bg-white" style={{ borderTop: '1px solid #f7f7f7' }}>
      <TContentWrap gap={32}>
        <TSectionLabel num="05" label="What did I work on?" />
        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          End-to-End UX/UI Design
        </h2>
        <div className="flex flex-col gap-[24px] w-full">
          {WORK_ITEMS.map(({ num, title, body }) => (
            <div key={num} className="bg-[#f7f7f7] flex flex-col gap-[12px] p-[24px] w-full">
              <div className="flex flex-col gap-[8px]">
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{num}</p>
                <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{title}</p>
              </div>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{body}</p>
            </div>
          ))}
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 UX RESEARCH — Figma 952:1124
// ─────────────────────────────────────────────────
function TabletUXResearchSection() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f7f7f7' }}>
      <TContentWrap gap={32}>
        <TSectionLabel num="06" label="UX Research" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Conducting a Usability Test on "KT AI Voice Studio"
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            To identify integration challenges and improve the voice selection experience, we conducted a usability test with six people using KT AI Voice Studio for the first time. Participants were split into two groups, with and without content creation experience, to compare behavior patterns. We designed five tasks covering the full voice selection and editing flow. The most critical usability issues appeared in Tasks 1 and 2, related to voice access and search efficiency.
          </p>
        </div>

        <img src={imgUXResearchTesting} alt="UX Research usability testing" className="w-full" />
        {/* Task 카드 — 2×2 + 1 full */}
        <div className="flex flex-col gap-[16px] w-full">

          {/* Row 1: T1 + T2 — #a6daff */}
          <div className="flex gap-[16px] w-full">
            {[
              { id: 'T1', label: 'Task 1', title: 'Access the AI voice selection screen after creating a project', expected: 'Expected 30s · 5 taps' },
              { id: 'T2', label: 'Task 2', title: 'Select a voice using filters and search (by project)',          expected: 'Expected 4 min · 8 taps' },
            ].map(({ id, label, title, expected }) => (
              <div key={id} className="flex flex-col gap-[10px] p-[20px] flex-1 min-w-0" style={{ backgroundColor: '#a6daff' }}>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] min-h-[56px]" style={{ fontFamily: poppins }}>{title}</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{expected}</p>
              </div>
            ))}
          </div>

          {/* Row 2: T3 + T4 — gray */}
          <div className="flex gap-[16px] w-full">
            {[
              { id: 'T3', label: 'Task 3', title: 'Write a sentence and select a voice (by sentence)',                    expected: 'Expected 6 min · 79 taps' },
              { id: 'T4', label: 'Task 4', title: 'Adjust detailed voice settings (emotion · language · speed · pitch)', expected: 'Expected 2 min · 34 taps' },
            ].map(({ id, label, title, expected }) => (
              <div key={id} className="flex flex-col gap-[10px] p-[20px] flex-1 min-w-0 bg-[#f3f3f3]" style={{ border: '1px solid #ddd' }}>
                <p className="text-[14px] font-normal leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>{label}</p>
                <p className="text-[16px] font-medium leading-[24px] text-[#666] min-h-[56px]" style={{ fontFamily: poppins }}>{title}</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>{expected}</p>
              </div>
            ))}
          </div>

          {/* T5 — full width gray */}
          <div className="flex flex-col gap-[10px] p-[20px] w-full bg-[#f3f3f3]" style={{ border: '1px solid #ddd' }}>
            <p className="text-[14px] font-normal leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>Task 5</p>
            <p className="text-[16px] font-medium leading-[24px] text-[#666] min-h-[56px]" style={{ fontFamily: poppins }}>Play the written sentence, add silence</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#666]" style={{ fontFamily: poppins }}>Expected 1 min · 12 taps</p>
          </div>
        </div>

        {/* Key Insight */}
        <div className="w-full bg-[#a6daff] flex flex-col gap-[16px] items-center p-[24px] text-center">
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Key Insight</p>
          <p className="text-[22px] font-medium leading-[32px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            Most usability issues occurred before users could confidently start selecting voices.
          </p>
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 09 Design Solution 01
// ─────────────────────────────────────────────────

function TSolvesBadge({ problemNum }: { problemNum: string }) {
  return (
    <div className="bg-[#1e1e1e] flex gap-[6px] items-center pl-[12px] pr-[16px] py-[8px] rounded-full shrink-0">
      <img src={icAvatarCheck} alt="" aria-hidden className="w-[18px] h-[18px] shrink-0" />
      <span className="text-[14px] font-medium leading-[21px] text-white whitespace-nowrap" style={{ fontFamily: poppins }}>
        SOLVES  PROBLEM {problemNum}
      </span>
    </div>
  )
}

function TBeforeAfterDivider() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-[#1e1e1e] flex items-center justify-center w-[32px] h-[32px] rotate-90">
        <img src={icAvatarArrowDown} alt="" aria-hidden className="w-[30.72px] h-[30.72px]" />
      </div>
    </div>
  )
}

const T_WHY_IT_WORKS_01 = [
  { num: '01', title: 'Works without extra setup', desc: 'A recommended voice is applied by default, so users can start without making additional adjustments.' },
  { num: '02', title: 'Keeps the current state visible', desc: "The selected voice and key settings stay visible, so users don't have to remember what they previously selected." },
  { num: '03', title: 'Makes voice settings easier to access', desc: 'The entry point clearly shows that AI Voice can be reviewed and adjusted whenever needed.' },
]

function TabletDesignSolution01Section() {
  return (
    <section className="w-full bg-white">
      <TContentWrap gap={32}>
        {/* 레이블 + 배지 */}
        <div className="flex items-center justify-between gap-[4px] w-full">
          <TSectionLabel num="09" label="Design Solution 01" />
          <TSolvesBadge problemNum="01" />
        </div>

        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Making the Voice Selection Entry Point Clearly Visible
        </h2>

        {/* 통계 카드 3개 */}
        <div className="flex gap-[16px] w-full">
          {[
            { label: 'Task 1 success rate', value: '16%', note: 'Lowest of all 5 tasks' },
            { label: 'Task 1 time',         value: '65s',  note: '2x+ the expected 30s' },
            { label: 'Task 1 errors',       value: '8',    note: 'Caused by missing the entry point' },
          ].map(({ label, value, note }) => (
            <div key={label} className="flex flex-col gap-[10px] flex-1 min-w-0 p-[20px]" style={{ border: '1px solid #ddd' }}>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
              <p className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
              <p className="text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Why? → Before → 화살표 → What we changed! → After */}
        <div className="flex flex-col gap-[16px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[20px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              In the original KT AI Voice Studio, the "AI Voice Selection" entry point had low visual prominence, so users often overlooked it during project setup. Task 1 had the lowest success rate at 16%, took more than twice the expected time, and resulted in 8 usability errors.
            </p>
          </div>
          <img src={imgSolution01Before} alt="Original KT AI Voice Studio — before redesign" className="w-full object-cover" style={{ height: '420px' }} />
          <p className="text-[13px] font-normal leading-[19px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>
            Red annotation added for clarity; it was not part of the original UI.
          </p>
        </div>

        <TBeforeAfterDivider />

        <div className="flex flex-col gap-[16px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[20px] w-full">
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We redesigned the entry point to show the selected voice and key settings directly in the creation flow, making the feature easier to notice and easier to adjust.
            </p>
          </div>
          <img src={imgSolution01After} alt="Redesigned KT AI Voice Studio — after redesign" className="w-full object-cover" style={{ height: '420px' }} />
        </div>

        {/* Why it works */}
        <div className="flex flex-col gap-[16px] w-full p-[20px]" style={{ border: '1px solid #ddd' }}>
          <div className="flex items-center gap-[6px] w-full">
            <img src={icWhyItWorks} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Why it works</p>
          </div>
          <div className="flex gap-[16px] items-stretch w-full">
            {T_WHY_IT_WORKS_01.slice(0, 2).map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col gap-[10px] flex-1 min-w-0 p-[16px] bg-[#f7f7f7]">
                <div className="bg-[#1e1e1e] flex items-center justify-center w-[28px] h-[28px] shrink-0">
                  <p className="text-[16px] font-medium leading-[24px] text-white text-center whitespace-nowrap" style={{ fontFamily: poppins }}>{num}</p>
                </div>
                <div className="flex flex-col gap-[6px] w-full">
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{title}</p>
                  <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[10px] w-full p-[16px] bg-[#f7f7f7]">
            <div className="bg-[#1e1e1e] flex items-center justify-center w-[28px] h-[28px] shrink-0">
              <p className="text-[16px] font-medium leading-[24px] text-white text-center whitespace-nowrap" style={{ fontFamily: poppins }}>03</p>
            </div>
            <div className="flex flex-col gap-[6px] w-full">
              <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{T_WHY_IT_WORKS_01[2].title}</p>
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{T_WHY_IT_WORKS_01[2].desc}</p>
            </div>
          </div>
        </div>

      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 10 Design Solution 02
// ─────────────────────────────────────────────────
function TabletDesignSolution02Section() {
  return (
    <section className="w-full bg-white">
      <TContentWrap gap={32}>
        <div className="flex items-center justify-between gap-[4px] w-full">
          <TSectionLabel num="10" label="Design Solution 02" />
          <TSolvesBadge problemNum="02" />
        </div>

        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Making Applied Filters Easier to Scan and Modify
        </h2>

        <div className="flex gap-[16px] w-full">
          {[
            { label: 'Task 2 success rate', value: '33%',  note: 'Finding a voice via filter/search' },
            { label: 'Task 2 time',         value: '328s', note: '+88s over the expected 240s' },
            { label: 'Task 2 errors',       value: '12',   note: 'Highest of all tasks' },
          ].map(({ label, value, note }) => (
            <div key={label} className="flex flex-col gap-[10px] flex-1 min-w-0 p-[20px]" style={{ border: '1px solid #ddd' }}>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
              <p className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{value}</p>
              <p className="text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{note}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[16px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[20px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              When multiple filter values were selected, users struggled to tell which values were actually applied. Because filter states were condensed into numeric indicators, they were difficult to scan and modify. This directly contributed to Task 2 recording 12 usability errors — the highest of all five tasks.
            </p>
          </div>
          <img src={imgSolution02Before} alt="Original filter UI — before redesign" className="w-full object-cover" style={{ height: '420px' }} />
        </div>

        <TBeforeAfterDivider />

        <div className="flex flex-col gap-[16px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[20px] w-full">
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We replaced the horizontal filter chips with a vertical layout that shows every category and selected value at once, so users can scan, modify, and remove filters without opening extra dropdowns.
            </p>
          </div>
          <img src={imgSolution02After} alt="Redesigned filter UI — after redesign" className="w-full object-cover" style={{ height: '420px' }} />
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 11 Design Solution 03
// ─────────────────────────────────────────────────
const T_MATCHING_STEPS = [
  { num: '01', desc: "AI extracts trait keywords (age range, mood, tone) from the AI human's image" },
  { num: '02', desc: "Automatically matches them against each voice's existing tags (#warm #lively #calm, etc.)" },
  { num: '03', desc: 'Surfaces the top 3 matches as recommended voices and automatically applies the top match as the default' },
  { num: '04', desc: 'Rather than trusting the AI match blindly, a designer listens through and filters out any awkward pairings' },
]

function TabletDesignSolution03Section() {
  return (
    <section className="w-full bg-white">
      <TContentWrap gap={32}>
        <div className="flex items-center justify-between gap-[4px] w-full">
          <TSectionLabel num="11" label="Design Solution 03" />
          <TSolvesBadge problemNum="03" />
        </div>

        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Providing Recommended and Default Voices
        </h2>

        <div className="flex flex-col gap-[16px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[20px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              With over 110 voice options, users experienced decision fatigue, especially when they were unfamiliar with the available voices. We needed a way to surface relevant options without requiring users to preview them one by one.
            </p>
          </div>
          <img src={imgSolution03Before} alt="Original voice selection — before redesign" className="w-full object-cover" style={{ height: '420px' }} />
        </div>

        <TBeforeAfterDivider />

        <div className="flex flex-col gap-[16px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[20px] w-full">
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We defined the AI avatar and each voice using structured keywords, then used those attributes to generate recommended voice matches and apply the best match as the default.
            </p>
          </div>
          <img src={imgSolution03After} alt="Redesigned voice selection — after redesign" className="w-full object-cover" style={{ height: '420px' }} />
        </div>

        {/* Recommended Voice Matching Logic */}
        <div className="flex flex-col gap-[16px] w-full p-[20px]" style={{ border: '1px solid #ddd' }}>
          <div className="flex items-center gap-[6px] w-full">
            <img src={icWhyItWorks} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Recommended Voice Matching Logic</p>
          </div>
          <div className="flex gap-[16px] items-stretch w-full">
            {T_MATCHING_STEPS.slice(0, 2).map(({ num, desc }) => (
              <div key={num} className="flex flex-col gap-[10px] flex-1 min-w-0 p-[16px] bg-[#f7f7f7]">
                <div className="bg-[#1e1e1e] flex items-center justify-center w-[28px] h-[28px] shrink-0">
                  <p className="text-[16px] font-medium leading-[24px] text-white text-center whitespace-nowrap" style={{ fontFamily: poppins }}>{num}</p>
                </div>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-[16px] items-stretch w-full">
            {T_MATCHING_STEPS.slice(2).map(({ num, desc }) => (
              <div key={num} className="flex flex-col gap-[10px] flex-1 min-w-0 p-[16px] bg-[#f7f7f7]">
                <div className="bg-[#1e1e1e] flex items-center justify-center w-[28px] h-[28px] shrink-0">
                  <p className="text-[16px] font-medium leading-[24px] text-white text-center whitespace-nowrap" style={{ fontFamily: poppins }}>{num}</p>
                </div>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 12 Design Solution 04
// ─────────────────────────────────────────────────
function TabletDesignSolution04Section() {
  return (
    <section className="w-full bg-white">
      <TContentWrap gap={32}>
        <div className="flex items-center justify-between gap-[4px] w-full">
          <TSectionLabel num="12" label="Design Solution 04" />
          <TSolvesBadge problemNum="04" />
        </div>

        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Preview Voices With Live Content
        </h2>

        <div className="flex flex-col gap-[16px] w-full">
          <div className="bg-[#f7f7f7] flex flex-col gap-[16px] p-[20px] w-full" style={{ border: '1px solid #ddd' }}>
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Why?</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              Users could only preview voices with fixed sample sentences, not their own scripts. As a result, the selected voice often felt different when applied to real content, forcing users to switch repeatedly between writing and voice selection.
            </p>
          </div>
          <img src={imgSolution04Before} alt="Original voice preview — before redesign" className="w-full object-cover" style={{ height: '420px' }} />
        </div>

        <TBeforeAfterDivider />

        <div className="flex flex-col gap-[16px] w-full">
          <div className="bg-[#a6daff] flex flex-col gap-[16px] p-[20px] w-full">
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What we changed!</p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              We added an example sentence input so users could preview their own scripts with the selected voice on the same screen. This allowed them to evaluate how the voice fit their real content before applying it.
            </p>
          </div>
          <img src={imgSolution04After} alt="Redesigned voice preview — after redesign" className="w-full object-cover" style={{ height: '420px' }} />
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 14 Reflection
// ─────────────────────────────────────────────────
function TabletReflectionSection() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f7f7f7' }}>
      <TContentWrap gap={32}>
        <TSectionLabel num="14" label="Reflection" />

        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          What This Project Left Me, in Data and Feedback
        </h2>

        <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Looking at the low success rate and high error rate from Tasks 1 and 2 alongside the feedback we got after shipping the changes:
        </p>

        {/* 2개 인용 카드 — 가로 배치 */}
        <div className="flex gap-[16px] w-full">
          {[
            'Even users coming from the old voice studio could use this naturally, without having to learn anything new.',
            "Recommended voices wasn't something I'd even considered. It'll clearly make selection faster and more satisfying.",
          ].map((quote, i) => (
            <div
              key={i}
              className="flex flex-col gap-[12px] flex-1 min-w-0 p-[20px]"
              style={{ backgroundColor: '#f7f7f7', border: '1px solid #ddd' }}
            >
              <p className="text-[20px] leading-none text-[#1e1e1e] select-none" aria-hidden>"</p>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{quote}</p>
            </div>
          ))}
        </div>

        <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          This project showed me that combining video and voice generation into one experience requires more than screen design. Defining the criteria that guide the AI's output matters just as much. I validated four solutions using usability data and client feedback. The matching criteria we established became a lasting principle for designing AI human output.
        </p>

        <p className="text-[14px] font-normal leading-[21px] w-full" style={{ fontFamily: poppins, color: '#8b8b8b' }}>
          * Content created with KT AI Human Studio
        </p>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 15 Team · Closing
// ─────────────────────────────────────────────────
function TabletTeamClosingSection() {
  return (
    <section className="w-full bg-white">
      <TContentWrap gap={20}>
        {/* 태블릿: 비율 유지 — 왼쪽 flex-1, 오른쪽 shrink-0 */}
        <div className="flex gap-[16px] w-full">
          <img
            src={imgTeamGroupPhoto}
            alt="CNAI STUDIO team group photo"
            className="object-cover object-bottom shrink-0"
            style={{ flex: '1 1 0', minWidth: 0, height: '300px', border: '1px solid rgba(30,30,30,0.1)' }}
          />
          <div className="flex flex-col gap-[16px] shrink-0" style={{ width: '260px' }}>
            <img
              src={imgTeamPhoto01}
              alt="CNAI STUDIO team photo 01"
              className="w-full object-cover"
              style={{ height: '142px', border: '1px solid rgba(30,30,30,0.1)' }}
            />
            <img
              src={imgTeamPhoto02}
              alt="CNAI STUDIO team photo 02"
              className="w-full object-cover"
              style={{ height: '142px', border: '1px solid rgba(30,30,30,0.1)' }}
            />
          </div>
        </div>
        <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] w-full text-center" style={{ fontFamily: poppins }}>
          The CNAI STUDIO team that built KT AI Human Studio together
        </p>
        <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full text-center" style={{ fontFamily: poppins }}>
          I started my career at a startup right after graduating. Working with a small team toward one shared goal let me own a product from planning through launch. I handled problem definition, UI/UX design, and client communication. The habit of defining scope quickly and validating as I go has stayed with me in every product I've worked on since.
        </p>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 13 Outcome (bottom)
// ─────────────────────────────────────────────────
function TabletOutcomeBottomSection() {
  return (
    <section className="w-full bg-white">
      <TContentWrap gap={32}>
        <TSectionLabel num="13" label="Outcome" />
        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          What These Four Changes Made Possible
        </h2>
        <div className="flex flex-row gap-[16px] w-full">
          {[
            { stat: '50%↓',  label: 'Voice selection time' },
            { stat: '59%↓',  label: 'Voice reselection rate' },
            { stat: 'B2B2C', label: 'Expansion, built and launched' },
          ].map(({ stat, label }) => (
            <div
              key={stat}
              className="flex-1 flex flex-col gap-[8px] p-[20px] bg-[#a6daff]"
              style={{ minHeight: '108px' }}
            >
              <p className="text-[24px] font-medium leading-[32px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{stat}</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
            </div>
          ))}
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 07 ANALYSIS OF RESULTS — Figma 955:1124
// ─────────────────────────────────────────────────

/** 바 컬럼 — 재사용 헬퍼 */
function TBarCol({
  value, barH, barColor, isGradient, label, barW = '56px',
}: {
  value: string; barH: string | 'flex'; barColor: string
  isGradient?: boolean; label: string; barW?: string
}) {
  const barStyle: React.CSSProperties = isGradient
    ? { background: 'linear-gradient(to bottom, #3d5afb, #1c2a78)', borderRadius: '6px 6px 0 0', flexShrink: 0 }
    : { backgroundColor: barColor, borderRadius: '6px 6px 0 0', flexShrink: 0 }

  return (
    <div className="flex flex-col items-center justify-end h-[180px] shrink-0" style={{ width: barW }}>
      <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>{value}</p>
      {barH === 'flex'
        ? <div className="flex-1 min-h-0 w-full" style={barStyle} />
        : <div style={{ ...barStyle, height: barH, width: '100%' }} />
      }
      <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

/** 차트 카드 래퍼 — w-[344px] h-[340px] */
function TChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div
      className="bg-white flex flex-col gap-[16px] items-center px-[16px] py-[20px] shrink-0"
      style={{ width: '344px', height: '340px', border: '1px solid #ddd' }}
    >
      <div className="flex flex-col items-start w-full shrink-0">
        <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{title}</p>
      </div>
      {subtitle && (
        <div className="w-full shrink-0">
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{subtitle}</p>
        </div>
      )}
      {children}
    </div>
  )
}

function TabletAnalysisSection() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f7f7f7' }}>
      <TContentWrap gap={32}>
        <TSectionLabel num="07" label="Analysis of Results" />
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Key Challenges Identified in Tasks 1 and 2
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            We analyzed four metrics: success rate, time on task, error rate, and satisfaction. Tasks 1 and 2 had the lowest success rates and the highest error rates.
          </p>
        </div>

        {/* 2×2 차트 그리드 */}
        <div className="flex flex-col gap-[16px] w-full">

          {/* Row 1 */}
          <div className="flex gap-[16px] w-full overflow-x-auto pb-[4px]">

            {/* Success rate */}
            <TChartCard title="Success rate">
              <div className="flex gap-[8px] items-end justify-center h-[180px] w-full">
                <TBarCol value="16"  barH="28.785px" barColor="#3d5afb" isGradient label="T1" />
                <TBarCol value="33"  barH="59.385px" barColor="#3d5afb" isGradient label="T2" />
                <TBarCol value="83"  barH="flex"     barColor="#e7e9f5" label="T3" />
                <TBarCol value="100" barH="flex"     barColor="#e7e9f5" label="T4" />
                <TBarCol value="100" barH="flex"     barColor="#e7e9f5" label="T5" />
              </div>
            </TChartCard>

            {/* Time taken */}
            <TChartCard title="Time taken (s)" subtitle="Expected Task Time">
              <div className="flex gap-[8px] items-end justify-center h-[180px] w-full">
                <TBarCol value="65"  barH="32.49px"  barColor="#3d5afb" isGradient label="T1" />
                <TBarCol value="328" barH="flex"     barColor="#3d5afb" isGradient label="T2" />
                <TBarCol value="283" barH="flex"     barColor="#e7e9f5" label="T3" />
                <TBarCol value="91"  barH="45.495px" barColor="#e7e9f5" label="T4" />
                <TBarCol value="42"  barH="21px"     barColor="#e7e9f5" label="T5" />
              </div>
            </TChartCard>
          </div>

          {/* Row 2 */}
          <div className="flex gap-[16px] w-full overflow-x-auto pb-[4px]">

            {/* Error rate — stacked */}
            <TChartCard title="Error rate">
              {/* 범례 */}
              <div className="flex flex-wrap gap-x-[8px] items-center w-full shrink-0">
                {[
                  { color: '#8fd9d9', label: 'Interaction' },
                  { color: '#f4d98a', label: 'Labeling' },
                  { color: '#c9b8f5', label: 'IA' },
                  { color: '#b7e8c4', label: 'UI' },
                ].map(({ color, label }) => (
                  <div key={label} className="flex gap-[6px] items-center py-[1px]">
                    <div style={{ width: 12, height: 12, backgroundColor: color, flexShrink: 0 }} />
                    <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-[8px] items-end justify-center h-[180px] w-full">
                {/* T1: 8 — teal+yellow */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '56px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>8</p>
                  <div className="flex flex-col w-full" style={{ flex: '1 0 0' }}>
                    <div style={{ flex: '1 0 0' }} />
                    <div style={{ height: '23.76px', backgroundColor: '#8fd9d9', flexShrink: 0 }} />
                    <div style={{ height: '39.63px', backgroundColor: '#f4d98a', flexShrink: 0 }} />
                  </div>
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T1</p>
                </div>
                {/* T2: 12 — teal+yellow+purple */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '56px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>12</p>
                  <div className="flex flex-col w-full" style={{ flex: '1 0 0' }}>
                    <div style={{ flex: '1 0 0' }} />
                    <div style={{ height: '23.76px', backgroundColor: '#8fd9d9', flexShrink: 0 }} />
                    <div style={{ height: '59.46px', backgroundColor: '#f4d98a', flexShrink: 0 }} />
                    <div style={{ height: '11.88px', backgroundColor: '#c9b8f5', flexShrink: 0 }} />
                  </div>
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T2</p>
                </div>
                {/* T3: 4 — teal+purple */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '56px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>4</p>
                  <div className="flex flex-col w-full" style={{ flex: '1 0 0' }}>
                    <div style={{ flex: '1 0 0' }} />
                    <div style={{ height: '19.8px', backgroundColor: '#8fd9d9', flexShrink: 0 }} />
                    <div style={{ height: '11.88px', backgroundColor: '#c9b8f5', flexShrink: 0 }} />
                  </div>
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T3</p>
                </div>
                {/* T4: 0 */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '56px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>0</p>
                  <div className="flex-1 min-h-0 w-full" />
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T4</p>
                </div>
                {/* T5: 1 — yellow (tiny) */}
                <div className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '56px' }}>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>1</p>
                  <div className="flex flex-col w-full" style={{ flex: '1 0 0' }}>
                    <div style={{ flex: '1 0 0' }} />
                    <div style={{ height: '7.92px', backgroundColor: '#f4d98a', flexShrink: 0 }} />
                  </div>
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>T5</p>
                </div>
              </div>
            </TChartCard>

            {/* Satisfaction (/5) */}
            <TChartCard title="Satisfaction (/5)" subtitle="Average: 2.67">
              <div className="flex gap-[8px] items-end justify-center h-[180px] w-full">
                {[
                  { val: '2.9', h: '104.385px', isGrad: false, label: 'P1' },
                  { val: '2.9', h: '104.385px', isGrad: false, label: 'P2' },
                  { val: '4',   h: 'flex',      isGrad: false, label: 'P3' },
                  { val: '1',   h: '36px',      isGrad: true,  label: 'P4' },
                  { val: '3.5', h: 'flex',      isGrad: false, label: 'P5' },
                  { val: '2',   h: '72px',      isGrad: false, label: 'P6' },
                ].map(({ val, h, isGrad, label }) => (
                  <div key={label} className="flex flex-col items-center justify-end h-full shrink-0" style={{ width: '45.333px' }}>
                    <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] pb-[9px]" style={{ fontFamily: poppins }}>{val}</p>
                    {h === 'flex'
                      ? <div className="flex-1 min-h-0 w-full" style={{ backgroundColor: '#e7e9f5', borderRadius: '6px 6px 0 0' }} />
                      : <div style={{ height: h, width: '100%', borderRadius: '6px 6px 0 0', background: isGrad ? 'linear-gradient(to bottom, #3d5afb, #1c2a78)' : '#e7e9f5', flexShrink: 0 }} />
                    }
                    <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] pt-[10.5px]" style={{ fontFamily: poppins }}>{label}</p>
                  </div>
                ))}
              </div>
            </TChartCard>
          </div>
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────
export default function TabletAIAvatarPage() {
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
      {/* Close button — 태블릿: 24px offset, 40×40px */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="group fixed top-[24px] right-[24px] w-[40px] h-[40px] bg-[#1e1e1e] flex items-center justify-center z-50 border-0 outline-none cursor-pointer shrink-0"
        aria-label="Close"
      >
        <img src={icClose} alt="" aria-hidden className="block w-[20px] h-[20px] transition-transform duration-200 ease-out group-hover:rotate-90" />
      </button>

      {/* Header */}
      <TabletAIAvatarHeader />

      {/* Sections 01–07 */}
      <div id="intro"><TabletIntroSection /></div>
      <div id="project-goal"><TabletProjectGoalSection /></div>
      <div id="ai-thinking"><TabletAIProductThinkingSection /></div>
      <div id="outcome-top"><TabletOutcomeTopSection /></div>
      <div id="what-i-worked"><TabletWhatIWorkedOnSection /></div>
      <div id="ux-research"><TabletUXResearchSection /></div>
      <div id="analysis"><TabletAnalysisSection /></div>
      <div id="solution-01"><TabletDesignSolution01Section /></div>
      <div id="solution-02"><TabletDesignSolution02Section /></div>
      <div id="solution-03"><TabletDesignSolution03Section /></div>
      <div id="solution-04"><TabletDesignSolution04Section /></div>
      <div id="outcome-bottom"><TabletOutcomeBottomSection /></div>
      <div id="reflection"><TabletReflectionSection /></div>
      <div id="team"><TabletTeamClosingSection /></div>

    </motion.div>
  )
}
