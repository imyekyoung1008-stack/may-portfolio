// CornerstonePage.tsx — Cornerstone College case study
// Route: /projects/cornerstone
// Figma: https://www.figma.com/design/fCphmFmQRkjF6EWKKqby8E/2026?node-id=767-37494

import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// ── Videos ────────────────────────────────────────
import vidHero          from '../assets/videos/cornerstone-thumb-v2.mp4'
import vidBeforeS1      from '../assets/videos/solution3-before.mp4'
import vidBeforeS2      from '../assets/videos/solution2-before.mp4'
import vidAfterS1       from '../assets/videos/solution1-after.mp4'
import vidAfterS2       from '../assets/videos/solution2-after.mp4'

// ── Images: problem / solutions ───────────────────
import imgProblemHeroBg  from '../assets/images/cornerstone-detail/problem-hero-bg.jpg'

// ── Images: section 08 (VISUAL SYSTEM) ──────────────
import imgFormatConsistencyExample from '../assets/images/cornerstone-detail/format-consistency-example.png'

// ── Images: section 09 (AI IMPACT 2) ─────────────
import imgStitch         from '../assets/images/cornerstone-detail/stitch-screenshot.png'

// ── Images: section 10 (AI IMPACT 3) ─────────────
import imgExtractScreen1  from '../assets/images/cornerstone-detail/ai-impact-3/extract-rules-screenshot-1.png'
import imgExtractScreen2  from '../assets/images/cornerstone-detail/ai-impact-3/extract-rules-screenshot-2.png'
import imgExtendMobile    from '../assets/images/cornerstone-detail/ai-impact-3/extend-mobile-screenshot.png'

// ── Images: section 12 (ACROSS 10 PROGRAMS) ──────
import imgProgUiux          from '../assets/images/cornerstone-detail/programs/program-uiux.jpg'
import imgProgCyber         from '../assets/images/cornerstone-detail/programs/program-cybersecurity.jpg'
import imgProgDs            from '../assets/images/cornerstone-detail/programs/program-data-science.jpg'
import imgProgNss           from '../assets/images/cornerstone-detail/programs/program-nss.jpg'
import imgProgWeb           from '../assets/images/cornerstone-detail/programs/program-web-dev.jpg'
import imgProgEm            from '../assets/images/cornerstone-detail/programs/program-event-mgmt.jpg'
import imgProgIbm           from '../assets/images/cornerstone-detail/programs/program-ibm.jpg'
import imgProgHm            from '../assets/images/cornerstone-detail/programs/program-hospitality.jpg'
import imgProgDm            from '../assets/images/cornerstone-detail/programs/program-digital-marketing.jpg'
import imgProgSdm           from '../assets/images/cornerstone-detail/programs/program-strategic-dm.jpg'
import imgProgEsl           from '../assets/images/cornerstone-detail/programs/program-esl.jpg'
import imgProgCelpip        from '../assets/images/cornerstone-detail/programs/program-celpip.jpg'

// ── Icons ─────────────────────────────────────────
import icClose           from '../assets/icons/close.svg'
import icCheckCircle     from '../assets/icons/cornerstone/check-circle.svg'
import icFlowArrow       from '../assets/icons/cornerstone/flow-arrow.svg'
import icSectionIcon     from '../assets/icons/cornerstone/section-icon.svg'
import icCheckFill       from '../assets/icons/cornerstone/check-fill.svg'
import icChecklist       from '../assets/icons/cornerstone/checklist.svg'
import icArrowRightBox   from '../assets/icons/cornerstone/arrow-right-box.svg'
import icAttachEmail     from '../assets/icons/cornerstone/attach-email.svg'
import icCheckCircleUnread from '../assets/icons/cornerstone/check-circle-unread.svg'
import icSectionAsterisk from '../assets/icons/cornerstone/section-asterisk.svg'
import icArrowDown              from '../assets/icons/arrow-down.svg'
import icArrowSelectedDirection from '../assets/icons/arrow-selected-direction.svg'
import icArrowNote              from '../assets/icons/arrow-note.svg'
import icDesktopWindows   from '../assets/icons/cornerstone/desktop-windows.svg'
import icArrowOutward     from '../assets/icons/cornerstone/arrow-outward.svg'

// ── Images: section AI IMPACT 1 ──────────────────
import imgAi1BgDiagram    from '../assets/images/cornerstone-detail/ai-impact-1/background-diagram.png'
import imgAi1Proto1       from '../assets/images/cornerstone-detail/ai-impact-1/prototype-screenshot-1.png'
import imgAi1Proto2       from '../assets/images/cornerstone-detail/ai-impact-1/prototype-screenshot-2.png'
import imgAi1Checklist1   from '../assets/images/cornerstone-detail/ai-impact-1/checklist-screenshot-1.png'
import imgAi1Checklist2   from '../assets/images/cornerstone-detail/ai-impact-1/checklist-screenshot-2.png'
import imgAi1EmailBlurred from '../assets/images/cornerstone-detail/ai-impact-1/email-blurred.png'
import icStep02PanelArrow    from '../assets/icons/cornerstone/step02-conn-left.svg'
import icConnDashedLeft     from '../assets/icons/cornerstone/connection-dashed-left.svg'
import icConnDashedRight    from '../assets/icons/cornerstone/connection-dashed-right.svg'

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────
const poppins = "'Poppins', sans-serif"

// ─────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p className="text-[24px] font-medium leading-[36px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>{num}</p>
      <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

function SolvesBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-[6px] pl-[12px] pr-[16px] py-[8px] bg-[#191919] rounded-full shrink-0">
      <img src={icCheckCircle} alt="" aria-hidden className="w-[18px] h-[18px]" />
      <span className="text-[16px] font-medium leading-[24px] text-white whitespace-nowrap" style={{ fontFamily: poppins }}>{text}</span>
    </div>
  )
}

function KeyInsight({ text }: { text: React.ReactNode }) {
  return (
    <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[60px] py-[40px]">
      <div className="flex flex-col gap-[16px] items-center text-center text-[#1e1e1e]">
        <p className="text-[18px] font-medium leading-[27px]" style={{ fontFamily: poppins }}>KEY INSIGHT</p>
        <div className="text-[24px] font-medium leading-[36px] text-center" style={{ fontFamily: poppins }}>{text}</div>
      </div>
    </div>
  )
}

function SubHeading({ icon = icSectionIcon, label }: { icon?: string; label: string }) {
  return (
    <div className="flex gap-[6px] items-center w-full">
      <img src={icon} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
      <p className="text-[24px] font-medium leading-[36px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

/** Step card: numbered header + horizontal line + content
 *  Figma: outer bg-[#f7f7f7] p-[32px] → 32px gray frame around white inner boxes */
function StepCard({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#f7f7f7] flex flex-col w-full p-[32px]">
      {/* Step header */}
      <div className="flex items-center w-full">
        <div className="bg-white flex flex-1 gap-[16px] items-center px-[20px] py-[16px]">
          <div className="bg-[#1e1e1e] flex items-center justify-center w-[32px] h-[32px] shrink-0">
            <span className="text-[20px] font-medium leading-[30px] text-white text-center" style={{ fontFamily: poppins }}>{num}</span>
          </div>
          <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{title}</span>
        </div>
      </div>
      {/* Horizontal divider */}
      <div className="w-full border-t border-[#e5e5e5]" />
      {children}
    </div>
  )
}

function StepNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white flex gap-[12px] items-center px-[20px] py-[16px] w-full">
      <img src={icArrowNote} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0 block" />
      <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] flex-1" style={{ fontFamily: poppins }}>{children}</p>
    </div>
  )
}

/** 화면에 50% 이상 보이면 자동재생, 벗어나면 일시정지. controls/muted 유지. */
function AutoplayVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return <video ref={ref} src={src} controls playsInline muted className={className} />
}

/** Inner content wrapper: responsive container
 *  viewport > 1180px → content 1100px fixed, margins absorb rest
 *  viewport ≤ 1180px → padding 40px fixed, content shrinks with viewport */
function ContentWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-[40px] py-[60px]">
      <div className="max-w-[960px] mx-auto w-full flex flex-col gap-[32px]">
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// 사이드 네비게이션
// ─────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'problem',     label: 'PROBLEM' },
  { id: 'discovery',   label: 'DISCOVERY' },
  { id: 'solution-1',  label: 'SOLUTION 1' },
  { id: 'solution-2',  label: 'SOLUTION 2' },
  { id: 'ai-impact-1', label: 'AI IMPACT 1 · Collaboration' },
  { id: 'ai-impact-2', label: 'AI IMPACT 02 · Exploration' },
  { id: 'ai-impact-3', label: 'AI IMPACT 03 · System Building' },
  { id: 'consistent',  label: 'VISUAL SYSTEM' },
  { id: 'impact',      label: 'IMPACT' },
  { id: 'reflection',  label: 'REFLECTION' },
] as const

function SideNav() {
  const [activeId, setActiveId] = useState<string>('problem')

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
// 헤더 섹션 — Figma node 777:42395
// ─────────────────────────────────────────────────
function CornerstoneHeader() {
  const META = [
    { label: 'Product',  value: 'Responsive Web' },
    { label: 'My role',  value: 'Solo Product Designer' },
    { label: 'Timeline', value: 'Q2 2026 - Q3 2026' },
    { label: 'Skills',   value: 'UX Strategy, Information Architecture, UI Design, Responsive Design, AI Assisted Workflow, Stakeholder Collaboration' },
  ]
  return (
    <section className="w-full bg-white pt-[80px] pb-[60px] px-[42px]">
      <div className="max-w-[960px] mx-auto w-full flex flex-col gap-[42px]">

        {/* ── 타이틀 행 ── */}
        <div className="flex gap-[32px] items-start w-full">
          {/* 제목 + 부제 */}
          <div className="flex flex-col gap-[12px] flex-1 min-w-0">
            <p className="text-[36px] font-medium leading-[47px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              Cornerstone College Website
            </p>
            <p className="text-[20px] font-normal leading-[30px] text-[#8b8b8b] w-full" style={{ fontFamily: poppins }}>
              70%+ AI assisted workflow across 10 college diploma program pages
            </p>
          </div>
          {/* Shipped 배지 */}
          <div className="bg-[#f7f4f0] flex gap-[12px] items-center justify-center px-[12px] py-[8px] shrink-0">
            {/* 초록 dot #00C950 (Figma: Ellipse 2965) */}
            <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: '#00C950' }} />
            <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>
              Shipped
            </span>
          </div>
        </div>

        {/* ── 히어로 영상 (640px, object-cover) ── */}
        <div className="w-full overflow-hidden" style={{ height: '640px' }}>
          <video
            src={vidHero}
            autoPlay
            loop
            muted
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── 소개 문단 ── */}
        <div className="flex flex-col gap-[27px] text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          <p>I led the end to end redesign of Cornerstone College's diploma program pages as the solo product designer, from information architecture and content structure to responsive UI and developer handoff.</p>
          <p>While building the website, I developed AI assisted workflows using Claude Code and Figma MCP to accelerate visual exploration, systemize typography, automate repetitive design tasks, and translate design decisions into front end code for development.</p>
        </div>

        {/* ── 메타정보 그리드 ── */}
        {/* border-t/b #F7F7F7, py-20, 4열 grid, gap-20 */}
        <div
          className="w-full py-[20px] grid gap-[20px]"
          style={{
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            borderTop: '1px solid #f7f7f7',
            borderBottom: '1px solid #f7f7f7',
          }}
        >
          {/* Row 1: 4개 항목 */}
          {META.map((item) => (
            <div key={item.label} className="flex flex-col items-start">
              <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>{item.label}</p>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item.value}</p>
            </div>
          ))}
          {/* Row 2: Team — 4열 전체 */}
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
// 섹션 2 — 01 PROBLEM
// ─────────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    {
      num: '01', label: 'Text-heavy Experience',
      title: 'Key information was difficult to scan.',
      body: 'Long pages and weak visual hierarchy made key information easy to miss.',
    },
    {
      num: '02', label: 'Hard to Find Information',
      title: 'Users could not easily predict where information lived.',
      body: 'Without clear categories or navigation cues, they had to read through the page to find tuition, admissions, and program details.',
    },
    {
      num: '03', label: 'Separate Domestic & International Experiences',
      title: 'Domestic and international experiences were split across separate sites.',
      body: 'This created an inconsistent brand experience and made both comparison and content management more difficult.',
    },
    {
      num: '04', label: 'Outdated Program Content',
      title: 'Some pages did not reflect the latest course offerings.',
      body: 'Because content was collected across multiple program stakeholders, updates were not always reflected consistently or on time.',
    },
  ]
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="01" label="PROBLEM" />
        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          What started as a visual redesign brief revealed a deeper information problem.
        </h2>
        {/* Hero image — blur + overlay + centered text, 400px */}
        <div className="relative w-full overflow-hidden" style={{ height: '400px' }}>
          <div
            className="absolute"
            style={{
              left: '-244px', top: '-141px',
              width: '1435px', height: '956px',
              filter: 'blur(8px)',
            }}
          >
            <img
              src={imgProblemHeroBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ maxWidth: 'none' }}
            />
          </div>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col gap-[12px] items-center text-white text-center" style={{ maxWidth: '640px' }}>
              <p className="text-[18px] font-normal leading-[27px]" style={{ fontFamily: poppins }}>INITIAL BRIEF</p>
              <p className="text-[32px] font-medium leading-[42px]" style={{ fontFamily: poppins }}>"Make the website feel more professional and credible."</p>
            </div>
          </div>
        </div>
        {/* WHAT I FOUND 파란 박스 — 이미지 바로 아래, 카드 위 */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[60px] py-[40px]">
          <div className="flex flex-col gap-[12px] items-center text-center text-[#1e1e1e]">
            <p className="text-[18px] font-medium leading-[27px]" style={{ fontFamily: poppins }}>WHAT I FOUND</p>
            <p className="text-[24px] font-medium leading-[36px]" style={{ fontFamily: poppins }}>
              The deeper issue was how program information was structured, found, and kept up to date.
            </p>
          </div>
        </div>
        {/* Problem cards */}
        <div className="flex flex-col gap-[24px] w-full">
          {problems.map((p) => (
            <div key={p.num} className="bg-[#f7f7f7] flex flex-col gap-[8px] px-[32px] py-[28px] w-full">
              <div className="flex gap-[8px] items-center" style={{ fontFamily: poppins }}>
                <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] shrink-0">{p.num}</span>
                <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]">{p.label}</span>
              </div>
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{p.title}</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{p.body}</p>
            </div>
          ))}
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 3 — 02 DISCOVERY
// ─────────────────────────────────────────────────
function DiscoverySection() {
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="02" label="DISCOVERY" />

        {/* 소제목 + 본문 — gap 12px */}
        <div className="flex flex-col gap-[12px] items-start w-full">
          <div className="flex flex-col gap-[32px] items-start w-full">
            <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
              Users came to find answers, not read pages.
            </h2>
          </div>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            After reviewing the existing site and speaking with internal stakeholders, I reframed the program pages around the questions prospective students and partners were actually trying to answer.
          </p>
        </div>

        {/* 카드 3개 + 캡션 */}
        <div className="flex flex-col gap-[12px] items-start w-full">
          <div className="flex gap-[24px] items-stretch w-full">
            {/* 카드 1 */}
            <div className="bg-[#f7f7f7] flex flex-1 flex-col gap-[16px] px-[32px] py-[28px]">
              <div className="flex flex-col gap-[4px]">
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>01</p>
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Prospective Students</p>
              </div>
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>"What will I learn?"</p>
            </div>
            {/* 카드 2 */}
            <div className="bg-[#f7f7f7] flex flex-1 flex-col gap-[16px] px-[32px] py-[28px]">
              <div className="flex flex-col gap-[4px]">
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>02</p>
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>International Students</p>
              </div>
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>"How much will it cost?"</p>
            </div>
            {/* 카드 3 */}
            <div className="bg-[#f7f7f7] flex flex-1 flex-col gap-[16px] px-[32px] py-[28px]">
              <div className="flex flex-col gap-[4px]">
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>03</p>
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Education Agents</p>
              </div>
              <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>"What are the admission requirements?"</p>
            </div>
          </div>
          <p className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] w-full" style={{ fontFamily: poppins }}>
            I used these recurring questions to create a shared structure across 10 college diploma program pages.
          </p>
        </div>

        {/* Design Principle */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[60px] py-[40px]">
          <div className="flex flex-col gap-[16px] items-center text-center text-[#1e1e1e]">
            <p className="text-[18px] font-medium leading-[27px]" style={{ fontFamily: poppins }}>DESIGN PRINCIPLE</p>
            <p className="text-[24px] font-medium leading-[36px]" style={{ fontFamily: poppins }}>Make information easy to find, not just easy to read.</p>
          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 4 — 03 SOLUTION 1
// ─────────────────────────────────────────────────
function Solution1Section() {
  const afterItems = [
    { tab: 'About',      question: 'What is this program?' },
    { tab: 'Courses',    question: 'What will I learn?' },
    { tab: 'Admissions', question: 'Am I eligible to apply?' },
    { tab: 'Costs',      question: 'How much will it cost?' },
    { tab: 'Careers',    question: 'Where can this program lead?' },
  ]
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <div className="flex items-center justify-between w-full">
          <SectionLabel num="03" label="SOLUTION 1" />
          <SolvesBadge text="SOLVES  PROBLEM 01 · 02" />
        </div>
        <div className="flex flex-col gap-[12px] w-full">
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            From passive scrolling to purpose-driven navigation
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            I reorganized the program pages around the questions students were actually trying to answer, then applied the same structure across 10 college diploma program pages.
          </p>
        </div>
        <div className="flex gap-[24px] items-stretch w-full">
          {/* BEFORE */}
          <div className="flex-1 min-w-0 bg-[#f7f7f7] flex flex-col gap-[40px] px-[32px] py-[28px]">
            <div className="flex flex-col gap-[12px]">
              <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>BEFORE</p>
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Long Page, Passive Scroll</p>
            </div>
            <div className="flex flex-col gap-[12px] items-center w-full">
              {['Long page', 'Scroll', 'Scroll', 'Find Information'].map((label, i, arr) => (
                <div key={i} className="flex flex-col items-center gap-[12px] w-full">
                  <div className="w-full border border-[#ddd] bg-[#f3f3f3] flex items-center justify-center px-[16px] py-[12px]">
                    <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-[24px] h-[24px] flex items-center justify-center bg-[#ddd] rotate-90">
                      <img src={icFlowArrow} alt="" aria-hidden className="w-[24px] h-[24px]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* AFTER */}
          <div className="flex-1 min-w-0 bg-[#b9cdfb] flex flex-col gap-[40px] px-[32px] py-[28px]">
            <div className="flex flex-col gap-[12px]">
              <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>AFTER</p>
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Purpose-Driven Navigation</p>
            </div>
            <div className="flex flex-col gap-[20px] w-full">
              {afterItems.map((item) => (
                <div key={item.tab} className="flex items-center gap-[24px] border-b border-black/10 py-[12px]">
                  <span className="w-[100px] shrink-0 text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item.tab}</span>
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item.question}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 5 — 03 SOLUTION 1 Before/After 영상 비교
// ─────────────────────────────────────────────────
function Solution1BeforeAfter() {
  return (
    <section className="w-full bg-[#f7f7f7] py-[80px] px-[40px]">
      <div className="flex flex-col gap-[30px] max-w-[960px] mx-auto w-full">
        {/* Before */}
        <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
          <div className="bg-[#f3f3f3] flex items-center gap-[10px] px-[32px] py-[12px] w-full">
            <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Before</span>
            <span className="text-[20px] font-normal leading-[30px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· Data Science Program</span>
          </div>
          <div className="w-full aspect-[1920/1080]">
            <AutoplayVideo src={vidBeforeS1} className="w-full h-full block object-cover" />
          </div>
          <div className="bg-[#f3f3f3] flex flex-col px-[32px] py-[28px] w-full">
            <p className="text-[20px] font-normal leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              Long pages and weak visual hierarchy made important information easy to miss, forcing users to scroll repeatedly to find what they needed.
            </p>
          </div>
        </div>
        {/* 화살표 */}
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center rotate-90" style={{ width: '32px', height: '32px', background: '#101010', flexShrink: 0 }}>
            <img src={icArrowDown} alt="" aria-hidden className="block" style={{ width: '30.72px', height: '30.72px' }} />
          </div>
        </div>
        {/* After */}
        <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
          <div className="bg-white flex items-center gap-[10px] px-[32px] py-[12px] w-full">
            <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>After</span>
            <span className="text-[20px] font-normal leading-[30px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· Data Science Program</span>
          </div>
          <div className="w-full aspect-[1920/1080]">
            <AutoplayVideo src={vidAfterS1} className="w-full h-full block object-cover" />
          </div>
          <div className="bg-white flex flex-col px-[32px] py-[28px] w-full">
            <p className="text-[20px] font-normal leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              I grouped information by user intent, allowing students to jump directly to the category they cared about and explore the details step by step.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 6 — 04 SOLUTION 2
// ─────────────────────────────────────────────────
function Solution2Section() {
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <div className="flex items-center justify-between w-full">
          <SectionLabel num="04" label="SOLUTION 2" />
          <SolvesBadge text="SOLVES  PROBLEM 03" />
        </div>
        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Unify the shared experience, separate only what truly differs.
        </h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Domestic and International students were previously served through separate sites, creating duplicated content and unnecessary maintenance even though most program information was shared.
        </p>
        <KeyInsight text={
          <>
            <p>The core program experience was the same for both student groups.</p>
            <p>Only Admissions and Costs needed to differ.</p>
          </>
        } />
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 7 — 04 SOLUTION 2 Before/After 영상 비교
// ─────────────────────────────────────────────────
function BeforeAfter2() {
  return (
    <section className="w-full bg-[#f7f7f7] py-[80px] px-[40px]">
      <div className="flex flex-col gap-[30px] max-w-[960px] mx-auto w-full">

        {/* Before */}
        <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
          <div className="bg-[#f3f3f3] flex items-center gap-[10px] px-[32px] py-[12px] w-full">
            <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Before</span>
            <span className="text-[20px] font-normal leading-[30px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· UI/UX Design Program</span>
          </div>
          <div className="w-full aspect-[1920/1080]">
            <AutoplayVideo src={vidBeforeS2} className="w-full h-full block object-cover" />
          </div>
          <div className="bg-[#f3f3f3] flex flex-col gap-[8px] px-[32px] py-[28px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              Users had to move between multiple screens to find the information they needed.
            </p>
            <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              Key information such as Tuition and Admissions was spread across different locations, forcing users to repeatedly navigate back and forth.
            </p>
          </div>
        </div>

        {/* 화살표 */}
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center rotate-90" style={{ width: '32px', height: '32px', background: '#101010', flexShrink: 0 }}>
            <img src={icArrowDown} alt="" aria-hidden className="block" style={{ width: '30.72px', height: '30.72px' }} />
          </div>
        </div>

        {/* After */}
        <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
          <div className="bg-white flex items-center gap-[10px] px-[32px] py-[12px] w-full">
            <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>After</span>
            <span className="text-[20px] font-normal leading-[30px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· UI/UX Design Program</span>
          </div>
          <div className="w-full aspect-[1920/1080]">
            <AutoplayVideo src={vidAfterS2} className="w-full h-full block object-cover" />
          </div>
          <div className="bg-white flex flex-col gap-[12px] px-[32px] py-[28px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              One shared page, with differences shown only where needed.
            </p>
            <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              Domestic and International content was combined into one program experience, while sections such as Admissions and Costs use tabs to surface student-specific information without sending users to separate pages.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 8 — 05 AI IMPACT 1 · Collaboration
// ─────────────────────────────────────────────────
const CHECKLIST_ROW1 = ['Program Overview', 'Credential', 'Duration', 'Schedule']
const CHECKLIST_ROW2 = ['Courses', 'Admission Req.', 'Tuition & Fees', 'Career Opp.']

function AIImpact1Section() {
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        {/* ── 헤더 ── */}
        <div className="flex items-center justify-between w-full">
          <SectionLabel num="05" label="AI IMPACT 1 · Collaboration" />
          <SolvesBadge text="SOLVES  PROBLEM 04" />
        </div>

        {/* ── 소제목 ── */}
        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Structuring Content Collaboration Across Multiple Program Managers
        </h2>

        <div className="flex flex-col gap-[40px] w-full">

          {/* ── 01 BACKGROUND ── */}
          <div className="flex flex-col gap-[12px] w-full">
            <div className="flex gap-[8px] items-center">
              <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>01</span>
              <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>BACKGROUND</span>
            </div>
            <div className="flex gap-[12px] items-stretch w-full">
              {/* 좌: 텍스트 */}
              <div className="flex flex-1 flex-col justify-center min-w-0">
                <div className="bg-[#f7f7f7] flex flex-col gap-[12px] items-start justify-center h-full px-[32px] py-[32px] w-full">
                  <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
                    Each program was managed by a different Program Manager.
                  </p>
                  <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
                    Because they knew the latest curriculum and operational details best, I had to confirm the latest information directly with each of them.
                  </p>
                </div>
              </div>
              {/* 우: 이미지 */}
              <div className="flex-1 min-w-0 relative" style={{ aspectRatio: '1586/992' }}>
                <img src={imgAi1BgDiagram} alt="Background diagram — 10 programs across multiple Program Managers" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* ── 02 WHY THIS WAS CHALLENGING ── */}
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex gap-[8px] items-center">
              <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>02</span>
              <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>WHY THIS WAS CHALLENGING</span>
            </div>
            <div className="flex flex-col gap-[16px] w-full">
              {/* 카드 2개 나란히 */}
              <div className="flex gap-[16px] w-full">
                {[
                  { num: '01', title: 'No Single Source', body: 'The latest program information was scattered across different Program Managers and materials.' },
                  { num: '02', title: 'Website vs. Actual Program Gap', body: 'Some existing website content no longer reflected the current curriculum.' },
                ].map((card) => (
                  <div key={card.num} className="bg-[#f7f7f7] flex flex-1 flex-col gap-[8px] items-start pb-[28px] pt-[24px] px-[32px] min-w-0">
                    <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{card.num}</span>
                    <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.title}</p>
                    <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>{card.body}</p>
                  </div>
                ))}
              </div>
              {/* 카드 1개 전체폭 */}
              <div className="bg-[#f7f7f7] flex flex-col gap-[8px] items-start pb-[28px] pt-[24px] px-[32px] w-full">
                <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>03</span>
                <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Asynchronous Communication</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
                  Program Managers were teaching and not always in the office, so most updates had to be confirmed by email.
                </p>
              </div>
            </div>
          </div>

          {/* ── 03 SOLUTION ── */}
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex gap-[8px] items-center">
              <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>03</span>
              <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>SOLUTION</span>
            </div>

            {/* Content Checklist */}
            <div className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col gap-[8px] w-full">
                <div className="flex gap-[6px] items-center">
                  <img src={icSectionIcon} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                  <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Content Checklist</span>
                </div>
                <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
                  Standardized what information was needed across all program pages.
                </p>
              </div>
              {/* 배지 그리드 2행 × 4열 */}
              <div className="flex flex-col gap-[16px] w-full">
                {[CHECKLIST_ROW1, CHECKLIST_ROW2].map((row, ri) => (
                  <div key={ri} className="flex gap-[16px] w-full">
                    {row.map((item) => (
                      <div key={item} className="bg-[#b9cdfb] flex flex-1 items-center gap-[12px] px-[20px] py-[16px] min-w-0">
                        <img src={icCheckFill} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                        <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Prototype */}
            <div className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col gap-[8px] w-full">
                <div className="flex gap-[6px] items-center">
                  <img src={icSectionIcon} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                  <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Live Prototype</span>
                </div>
                <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
                  Showed where and how each piece of information would be used.
                </p>
              </div>
              {/* 플로우 다이어그램 */}
              <div className="bg-[#f7f7f7] flex flex-col gap-[24px] p-[32px] w-full">
                <div className="flex gap-[24px] items-center w-full">
                  {[
                    { icon: icChecklist,        label: 'Content Checklist', bg: 'bg-white' },
                    { isArrow: true },
                    { icon: icDesktopWindows,   label: 'Live Prototype',   bg: 'bg-[#b9cdfb]' },
                    { isArrow: true },
                    { icon: icAttachEmail,      label: 'Share & Request',  bg: 'bg-white' },
                    { isArrow: true },
                    { icon: icCheckCircleUnread, label: 'Verified Content', bg: 'bg-white' },
                  ].map((item, i) =>
                    'isArrow' in item ? (
                      <div key={i} className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <img src={icArrowRightBox} alt="" aria-hidden className="w-[24px] h-[24px]" />
                      </div>
                    ) : (
                      <div key={i} className={`${item.bg} flex flex-1 flex-col gap-[8px] items-start justify-center px-[20px] py-[16px] min-w-0`}>
                        <img src={item.icon} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                        <span className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{item.label}</span>
                      </div>
                    )
                  )}
                </div>
                {/* 구분선 */}
                <div className="w-full border-t border-[#e5e5e5]" />
                {/* Tools */}
                <div className="flex gap-[16px] items-center">
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] shrink-0" style={{ fontFamily: poppins }}>Tools</span>
                  <div className="flex gap-[20px] items-center">
                    {['Figma MCP', 'Claude', 'GitHub', 'Vercel'].map((tool) => (
                      <div key={tool} className="bg-[#f3f3f3] border border-[#ddd] flex items-center justify-center px-[16px] py-[8px]">
                        <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 04 ACTUAL REQUEST EMAIL ── */}
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex gap-[8px] items-center">
              <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>04</span>
              <span className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>ACTUAL REQUEST EMAIL to Program Managers</span>
            </div>
            <div className="flex gap-[16px] items-start w-full">
              {/* 좌: 콘텐츠 패널 */}
              <div className="bg-[#f7f7f7] flex flex-1 flex-col gap-[24px] items-start p-[32px] min-w-0">
                <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>Actual Content Request</p>
                <div className="flex flex-col gap-[20px] w-full">
                  <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>What I Shared</p>
                  {/* View Live Prototype */}
                  <div className="flex flex-col gap-[16px] w-full">
                    <div className="bg-[#b9cdfb] flex items-center justify-between pl-[12px] pr-[8px] w-full" style={{ height: '40px' }}>
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>View Live Prototype</span>
                      <div className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <img src={icArrowOutward} alt="" aria-hidden className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                    <div className="flex items-center w-full">
                      <div className="flex-1 min-w-0 relative" style={{ aspectRatio: '468/303' }}>
                        <img src={imgAi1Proto1} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 relative" style={{ aspectRatio: '468/303' }}>
                        <img src={imgAi1Proto2} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  {/* View Content Checklist */}
                  <div className="flex flex-col gap-[16px] w-full">
                    <div className="bg-[#b9cdfb] flex items-center justify-between pl-[12px] pr-[8px] w-full" style={{ height: '40px' }}>
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>View Content Checklist</span>
                      <div className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <img src={icArrowOutward} alt="" aria-hidden className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                    <div className="flex items-center w-full" style={{ border: '1px solid #DDD' }}>
                      <div className="flex-1 min-w-0 relative" style={{ aspectRatio: '568.5/323' }}>
                        <img src={imgAi1Checklist1} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 relative" style={{ aspectRatio: '568.5/323' }}>
                        <img src={imgAi1Checklist2} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 우: 블러 처리된 이메일 이미지 + 하단 그라디언트 */}
              <div className="flex-1 min-w-0 relative self-stretch">
                <img src={imgAi1EmailBlurred} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 72.46%, white 100%)' }} />
              </div>
            </div>
          </div>

        </div>

        {/* ── 하단 파란 박스 ── */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[60px] py-[40px]">
          <div className="text-[24px] font-medium leading-[36px] text-center text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            <p>The checklist clarified what information was needed,</p>
            <p>while the live prototype showed where and how it would be used.</p>
          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 9 — 06 AI IMPACT 02 · Exploration
// ─────────────────────────────────────────────────
function AIImpact2Section() {
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="06" label="AI IMPACT 02 · EXPLORATION" />
        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Turning UX Hypotheses into Comparable Screens, Fast
        </h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          I explored three UX directions with GPT and Stitch, aligned with Management, and refined the selected concept in Figma.
        </p>
        <KeyInsight text={
          <>
            <p>AI was not a tool for finding the "right" answer.</p>
            <p>It helped me explore more directions and align faster.</p>
          </>
        } />

        {/* AI ASSISTED UX EXPLORATION */}
        <div className="flex flex-col gap-[24px] w-full">
          <SubHeading label="AI ASSISTED UX EXPLORATION" />
          <div className="flex flex-col gap-[16px] w-full">

            {/* Step 01 */}
            <StepCard num="01" title="Define & Prompt the UX Direction">
              <div className="bg-white flex flex-col gap-[8px] items-start pt-[16px] px-[20px] pb-[0px] w-full">
                <div className="bg-[#b9cdfb] flex items-center justify-center px-[20px] py-[16px] w-full">
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Information needed for the Careers section</span>
                </div>
                <div className="flex gap-[8px] items-center w-full">
                  {['Alumni Story', 'Career Paths', 'Salary Range', 'CTA'].map((item) => (
                    <div key={item} className="bg-[#f7f7f7] flex flex-1 items-center justify-center px-[20px] py-[16px]">
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <StepNote>Used GPT to structure the content and explore different UX directions in Stitch.</StepNote>
            </StepCard>

            {/* Step 02 */}
            <StepCard num="02" title="Explore in Google Stitch">
              <div className="bg-white flex flex-col gap-[8px] items-start pt-[16px] px-[20px] pb-[0px] w-full">
                <div className="flex gap-[8px] items-center w-full">
                  {['A : Data First', 'B : Story First', 'C : Explore First'].map((item) => (
                    <div key={item} className="bg-[#b9cdfb] flex flex-1 items-center justify-center px-[20px] py-[16px]">
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full" style={{ aspectRatio: '2292 / 1494' }}>
                  <img src={imgStitch} alt="Google Stitch UX exploration — 3 directions" className="w-full h-full object-cover" />
                </div>
              </div>
              <StepNote>Visualized three UX structures to compare content priority and flow.</StepNote>
            </StepCard>

            {/* Step 03 */}
            <StepCard num="03" title="Align on Direction">
              <div className="bg-white flex gap-[16px] items-start pt-[16px] px-[20px] pb-[0px] w-full">
                {/* Selected preview */}
                <div className="flex flex-col gap-[8px] items-center w-[360px] shrink-0">
                  <div className="flex gap-[8px] items-start w-full">
                    <div className="bg-[#1e1e1e] flex h-[32px] items-center justify-center px-[20px]">
                      <span className="text-[16px] font-medium leading-[24px] text-white whitespace-nowrap" style={{ fontFamily: poppins }}>Selected</span>
                    </div>
                    <div className="bg-[#b9cdfb] flex flex-1 h-[32px] items-center justify-center px-[20px]">
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>B : Story First</span>
                    </div>
                  </div>
                  <div className="relative w-full shrink-0" style={{ aspectRatio: '360 / 381' }}>
                    <div aria-hidden className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={imgStitch}
                          alt=""
                          className="absolute max-w-none"
                          style={{ left: '-115.04%', top: '-5.8%', width: '330.07%', height: '203.29%' }}
                        />
                      </div>
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 75.459%, white 100%)' }} />
                    </div>
                  </div>
                </div>
                {/* Feedback table */}
                <div className="flex flex-1 flex-col gap-[8px] min-w-0">
                  <div className="bg-[#b9cdfb] flex items-center justify-center px-[20px] py-[16px] w-full">
                    <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Management Feedback</span>
                  </div>
                  <div className="bg-[#f7f7f7] flex flex-col gap-[16px] justify-center p-[20px] w-full">
                    {[
                      { num: '01', label: 'Real Voices First',               body: 'Students value information grounded in real graduate experiences.' },
                      { num: '02', label: 'Video over Text',                  body: 'Video communicates outcomes faster than long copy.' },
                      { num: '03', label: 'Visual First, Consult for Details', body: 'Lead with visual proof, then connect students to details.' },
                    ].map((row) => (
                      <div key={row.num} className="flex flex-col">
                        <div className="bg-[#f3f3f3] border-l border-r border-t border-[#ddd] flex gap-[10px] items-center px-[20px] py-[10px]">
                          <div className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px]">
                            <span className="text-[14px] font-medium leading-[21px] text-white text-center" style={{ fontFamily: poppins }}>{row.num}</span>
                          </div>
                          <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{row.label}</span>
                        </div>
                        <div className="bg-white border border-[#ddd] flex flex-col px-[20px] py-[12px]">
                          <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{row.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <StepNote>Based on Management feedback, we selected the Story First direction to lead with real graduate experiences.</StepNote>
            </StepCard>

            {/* Step 04 */}
            <StepCard num="04" title="Refine in Figma">
              <div className="bg-white flex flex-col gap-[8px] items-start pt-[16px] px-[20px] pb-[0px] w-full">
                <div className="bg-[#b9cdfb] flex items-center justify-center px-[20px] py-[16px] w-full">
                  <div className="flex gap-[8px] items-center shrink-0">
                    <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Selected UX Direction</span>
                    <img src={icArrowSelectedDirection} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0 block" />
                    <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Final Visual Design</span>
                  </div>
                </div>
                <div className="bg-[#c4c4c4] w-full" style={{ aspectRatio: '996 / 560' }} />
              </div>
              <StepNote>Refined the selected Stitch concept into the final UI in Figma.</StepNote>
            </StepCard>
          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 10 — 07 AI IMPACT 03
// ─────────────────────────────────────────────────
function AIImpact3Section() {
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="07" label="AI IMPACT 03 · System Building" />
        <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          Turning real UI rules into a reusable typography system
        </h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          I extracted typography rules from a finished desktop interface using Figma MCP and Claude. Then I built a Figma plugin to apply the corresponding text styles across desktop, tablet, and mobile. The system can be reused for future landing pages and development work.
        </p>

        {/* AI ASSISTED TYPOGRAPHY SYSTEM */}
        <div className="flex flex-col gap-[24px] w-full">
          <SubHeading label="AI ASSISTED TYPOGRAPHY SYSTEM" />
          <div className="flex flex-col gap-[16px] w-full">

            {/* Step 01 */}
            <StepCard num="01" title="Extract Typography Rules from a Real UI">
              <div className="bg-white flex gap-[16px] items-center pt-[16px] px-[20px] pb-[0px] w-full">
                {/* Left: full-page screenshot (271×444) */}
                <div className="relative shrink-0 overflow-hidden" style={{ width: '271px', height: '444px' }}>
                  <img src={imgExtractScreen1} alt="Desktop UI screenshot" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, white 98.6%)' }} />
                </div>
                {/* Arrow — 24×24 black-box white-arrow (same as Step 02) */}
                <img src={icStep02PanelArrow} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                {/* Middle: zoomed panel screenshot (146×444) */}
                <div className="relative shrink-0 overflow-hidden" style={{ width: '146px', height: '444px' }}>
                  <img src={imgExtractScreen2} alt="Typography panel close-up" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, white 98.6%)' }} />
                </div>
                {/* Right: Extracted Typography Attributes */}
                <div className="flex flex-1 flex-col gap-[16px] min-w-0">
                  <div className="border-b border-[#1e1e1e] pb-[12px] pt-[4px]">
                    <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Extracted Typography Attributes</p>
                  </div>
                  {[
                    { attr: 'Font Size',      val: '64px' },
                    { attr: 'Weight',         val: 'SemiBold' },
                    { attr: 'Line Height',    val: '80px' },
                    { attr: 'Letter Spacing', val: '0px' },
                  ].map(({ attr, val }) => (
                    <div key={attr} className="bg-[#f7f7f7] flex items-center justify-between px-[20px] py-[16px] w-full">
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{attr}</span>
                      <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Flow badges */}
              <div className="bg-white flex items-center px-[20px] py-[16px] w-full">
                <div className="flex gap-[8px] items-center w-full">
                  {[
                    { label: 'Figma MCP',             bg: 'bg-[#f7f7f7]', isArrow: false },
                    { label: null,                    bg: '',              isArrow: true  },
                    { label: 'Claude Analysis',       bg: 'bg-[#f7f7f7]', isArrow: false },
                    { label: null,                    bg: '',              isArrow: true  },
                    { label: 'Typography Extraction', bg: 'bg-[#b9cdfb]', isArrow: false },
                  ].map((item, i) => item.isArrow ? (
                    <img key={i} src={icStep02PanelArrow} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                  ) : (
                    <div key={i} className={`${item.bg} flex flex-1 items-center justify-center px-[20px] py-[16px]`}>
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <StepNote>Using Figma MCP and Claude, I extracted the typography rules from a completed desktop interface.</StepNote>
            </StepCard>

            {/* Step 02 */}
            <StepCard num="02" title="Auto Apply Text Styles in Figma">
              <div className="bg-white flex flex-col gap-[8px] pt-[16px] pb-[0] w-full">

                {/* Top 2-column */}
                <div className="flex gap-[32px] items-stretch w-full px-[20px]">
                  {/* Left: Custom Figma Plugin */}
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="bg-[#b9cdfb] flex gap-[10px] items-center px-[20px] py-[10px] w-full">
                      <div className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <span className="text-[14px] font-medium leading-[21px] text-white text-center" style={{ fontFamily: poppins }}>AI</span>
                      </div>
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Custom Figma Plugin Built with Claude</span>
                    </div>
                    <div className="bg-[#f7f7f7] flex-1 px-[20px] py-[12px]">
                      <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                        Scans all text layers in the Figma file and auto-matches them to registered text styles by font size and weight.
                      </p>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="flex items-center justify-center shrink-0">
                    <img src={icStep02PanelArrow} alt="" aria-hidden className="w-[24px] h-[24px]" />
                  </div>
                  {/* Right: Text Styles Automatically Applied */}
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="bg-[#b9cdfb] flex gap-[10px] items-center px-[20px] py-[10px] w-full">
                      <div className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <span className="text-[14px] font-medium leading-[21px] text-white text-center" style={{ fontFamily: poppins }}>02</span>
                      </div>
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Text Styles Automatically Applied</span>
                    </div>
                    <div className="bg-[#f7f7f7] flex-1 px-[20px] py-[12px]">
                      <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                        Scanned text layers and automatically linked matching text styles.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom 3-panel matching diagram — full StepCard width, connectors are absolute overlays */}
                <div className="bg-white py-[24px] px-[20px] w-full">
                  {/* Flex row: only 3 items (left panel, center, right panel). Connectors are absolute. */}
                  <div className="relative flex gap-[40px] items-center w-full">

                    {/* Left panel: flex-[1_0_0] — grows to fill half remaining space */}
                    <div style={{ flex: '1 0 0' }} className="bg-white border border-[#ddd] flex flex-col overflow-hidden">
                      <div className="bg-[#f7f7f7] border-b border-[#e2e8f0] px-[20px] pt-[10px] pb-[10px]">
                        <p className="text-[16px] font-semibold leading-[24px] text-[#1e293b]" style={{ fontFamily: poppins }}>Text Layers (Figma)</p>
                      </div>
                      <div className="flex flex-col gap-[19px] p-[20px]">
                        {['Make work simpler,', 'create more impact.', 'AI IMPACT helps teams', 'automate repetitive tasks', 'Get Started'].map((line, i, arr) => (
                          <div key={line} className={i < arr.length - 1 ? 'border-b border-[#f3f4f6] pb-[11px]' : ''}>
                            <p className="text-[14px] font-normal leading-[21px] text-[#1e293b]" style={{ fontFamily: poppins }}>{line}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Center: 196px fixed, no flex-grow */}
                    <div className="bg-[#b9cdfb] flex flex-col items-center justify-center py-[20px] shrink-0" style={{ width: '196px' }}>
                      <div className="flex flex-col gap-[3px] items-center" style={{ width: '133px' }}>
                        <p className="text-[20px] font-semibold leading-[30px] text-center text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>AI Assisted Matching</p>
                        <p className="text-[16px] font-medium leading-[24px] text-center text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>( Size + Weight )</p>
                      </div>
                    </div>

                    {/* Right panel: flex-[1_0_0] — grows to fill half remaining space */}
                    <div style={{ flex: '1 0 0' }} className="bg-white border border-[#ddd] flex flex-col overflow-hidden">
                      <div className="bg-[#f7f7f7] border-b border-[#ddd] px-[20px] pt-[10px] pb-[10px]">
                        <p className="text-[16px] font-semibold leading-[24px] text-[#1e293b]" style={{ fontFamily: poppins }}>Registered Text Styles</p>
                      </div>
                      <div className="flex flex-col gap-[10px] p-[20px]">
                        {[
                          '8xl / SemiBold',
                          '7xl / SemiBold',
                          'lg / Regular',
                          'base / Regular',
                          'sm / Medium',
                        ].map((label, i, arr) => (
                          <div key={label} className={`flex gap-[13px] items-center ${i < arr.length - 1 ? 'border-b border-[#f3f4f6] pb-[11px]' : ''}`}>
                            <div className="bg-[rgba(185,205,251,0.5)] flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                              <span className="text-[16px] font-semibold leading-[24px] text-[#5e8fff] text-center" style={{ fontFamily: poppins }}>Ag</span>
                            </div>
                            <span className="text-[14px] font-normal leading-[21px] text-[#334155] whitespace-nowrap" style={{ fontFamily: poppins }}>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Left connector: centered in left gap (between left panel and center box)
                        Both panels are flex:1 0 0 → each panel = (total - 276) / 2
                        Left gap center from left = panel + 20 = 50% - 118px
                        SVG is 72px wide → left = 50% - 118 - 36 = 50% - 154px */}
                    <img
                      src={icConnDashedLeft}
                      alt="" aria-hidden
                      style={{
                        position: 'absolute',
                        left: 'calc(50% - 154px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '72px',
                        height: '123px',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Right connector: centered in right gap (between center box and right panel)
                        Right gap center from left = 50% + 118px
                        SVG is 72px wide → left = 50% + 118 - 36 = 50% + 82px */}
                    <img
                      src={icConnDashedRight}
                      alt="" aria-hidden
                      style={{
                        position: 'absolute',
                        left: 'calc(50% + 82px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '72px',
                        height: '123px',
                        pointerEvents: 'none',
                      }}
                    />

                  </div>
                </div>
              </div>
              <StepNote>The plugin replaced repetitive manual updates with one-click style application.</StepNote>
            </StepCard>

            {/* Step 03 */}
            <StepCard num="03" title="Extend to Mobile">
              <div className="bg-white pt-[16px] px-[20px] pb-[0px] w-full">
                <div className="w-full overflow-hidden" style={{ aspectRatio: '856/540' }}>
                  <img src={imgExtendMobile} alt="Mobile typography extension" className="w-full h-full object-cover" />
                </div>
              </div>
              <StepNote>Mapped the desktop scale to mobile and created reusable mobile text styles.</StepNote>
            </StepCard>

            {/* Step 04 */}
            {/* TODO: 실제 이미지 나오면 교체 예정 */}
            <StepCard num="04" title="Bridge to Development & Reuse">
              <div className="bg-white flex items-center pt-[16px] px-[20px] pb-[0px] w-full" style={{ height: '421px' }}>
                <div className="bg-[#b7b7b7] flex-1 h-full min-w-0" />
              </div>
              <StepNote>Connected Figma text styles to development for reuse across future pages.</StepNote>
            </StepCard>

          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 11 — 08 VISUAL SYSTEM
// ─────────────────────────────────────────────────
function ConsistentSection() {
  return (
    <section className="w-full bg-white">
      {/* pt-60px, pb-0 — 아래 Across10Programs(pt-24px)와 합쳐 24px 간격 */}
      <div className="w-full px-[40px] pt-[60px]">
        <div className="max-w-[960px] mx-auto w-full flex flex-col gap-[32px]">
          <SectionLabel num="08" label="VISUAL SYSTEM" />
          <h2 className="text-[28px] font-medium leading-[36px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            Scaling One Visual System Across Formats and Programs
          </h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
            I extended each program's hero visual across digital and print formats, then applied the same system across 10 diploma programs.
          </p>

          {/* Sub-section: One Program, Multiple Formats */}
          <div className="flex gap-[6px] items-center w-full">
            <img src={icSectionAsterisk} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>One Program, Multiple Formats</p>
          </div>

          {/* Format consistency example — #F7F7F7 박스 386px */}
          <div className="w-full bg-[#f7f7f7] overflow-hidden flex items-center justify-center" style={{ height: '386px' }}>
            <img src={imgFormatConsistencyExample} alt="One program across Flyer, Desktop, iPad Pro, and iPhone formats" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 12 — 09 ACROSS 10 PROGRAMS
// ─────────────────────────────────────────────────

const PROGRAMS: { name: string; img: string }[] = [
  { name: 'UI/UX Design',                      img: imgProgUiux    },
  { name: 'Cybersecurity',                      img: imgProgCyber   },
  { name: 'Data Science',                       img: imgProgDs      },
  { name: 'Network Systems Solutions',          img: imgProgNss     },
  { name: 'Web Development',                    img: imgProgWeb     },
  { name: 'Event Management',                   img: imgProgEm      },
  { name: 'International Business Management',  img: imgProgIbm     },
  { name: 'Hospitality Management',             img: imgProgHm      },
  { name: 'Digital Marketing',                  img: imgProgDm      },
  { name: 'Strategic Digital Marketing',        img: imgProgSdm     },
  { name: 'English as a Second Language (ESL)', img: imgProgEsl     },
  { name: 'CELPIP',                             img: imgProgCelpip  },
]

function Across10Programs() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="w-full bg-white flex flex-col py-[24px] gap-[24px]">
      {/* Sub-section label: Across 10 Programs — px-40 constrained */}
      <div className="w-full px-[40px]">
        <div className="max-w-[960px] mx-auto w-full">
          <div className="flex gap-[6px] items-center">
            <img src={icSectionAsterisk} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
            <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Across 10 Programs</p>
          </div>
        </div>
      </div>

      {/* 마퀴 래퍼 — overflow hidden + 좌우 페이드 + hover 멈춤 */}
      <div
        className="w-full overflow-hidden relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* 왼쪽 페이드 */}
        <div className="absolute left-0 top-0 h-full z-10 pointer-events-none" style={{ width: '100px', background: 'linear-gradient(to right, white, transparent)' }} />
        {/* 오른쪽 페이드 */}
        <div className="absolute right-0 top-0 h-full z-10 pointer-events-none" style={{ width: '100px', background: 'linear-gradient(to left, white, transparent)' }} />
        <div
          className="flex gap-[12px] items-start"
          style={{
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {[...PROGRAMS, ...PROGRAMS].map((prog, i) => (
            <button
              key={`${prog.name}-${i}`}
              type="button"
              className="cursor-pointer border-0 p-0 bg-transparent shrink-0"
              style={{ width: '247px' }}
              onClick={() => {
                // TODO: 각 프로그램 상세 페이지 라우팅 연결 예정
              }}
            >
              <img
                src={prog.img}
                alt={prog.name}
                style={{ width: '247px', height: '241px', display: 'block', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 13 — 10 IMPACT (placeholder)
// ─────────────────────────────────────────────────
function ImpactSection() {
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="10" label="IMPACT" />
        <div className="flex flex-col gap-[24px] w-full">
          <SubHeading icon={icSectionAsterisk} label="Coming Soon" />
          <div className="bg-[#f7f7f7] w-full" style={{ height: '416px' }} />
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 14 — 11 Reflection (placeholder)
// ─────────────────────────────────────────────────
function ReflectionSection() {
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="11" label="Reflection" />
        <div className="flex flex-col gap-[24px] w-full">
          <SubHeading icon={icSectionAsterisk} label="Coming Soon" />
          <div className="bg-[#f7f7f7] w-full" style={{ height: '416px' }} />
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────
export default function CornerstonePage() {
  const navigate = useNavigate()

  return (
    <motion.div
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

      {/* ─── Header (full-width) ─────────────────── */}
      <CornerstoneHeader />

      {/* ─── Side nav — 뷰포트 왼쪽 고정 ───────────── */}
      <SideNav />

      {/* ─── Sections — 중앙 정렬 그대로 유지 ──────── */}
      <div id="problem"><ProblemSection /></div>
      <div id="discovery"><DiscoverySection /></div>
      <div id="solution-1"><Solution1Section /><Solution1BeforeAfter /></div>
      <div id="solution-2"><Solution2Section /><BeforeAfter2 /></div>
      <div id="ai-impact-1"><AIImpact1Section /></div>
      <div id="ai-impact-2"><AIImpact2Section /></div>
      <div id="ai-impact-3"><AIImpact3Section /></div>
      <div id="consistent"><ConsistentSection /></div>
      <div id="programs"><Across10Programs /></div>
      <div id="impact"><ImpactSection /></div>
      <div id="reflection"><ReflectionSection /></div>
    </motion.div>
  )
}
