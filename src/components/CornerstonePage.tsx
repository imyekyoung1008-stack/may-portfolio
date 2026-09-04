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
import imgBeforeS1       from '../assets/images/cornerstone-detail/before-s1.png'

// ── Images: section 08 (CONSISTENT) ──────────────
import imgFormatConsistency from '../assets/images/cornerstone-detail/format-consistency.png'

// ── Images: section 09 (AI IMPACT 2) ─────────────
import imgStitch         from '../assets/images/cornerstone-detail/stitch-screenshot.png'

// ── Images: section 10 (AI IMPACT 3) ─────────────
import imgTypographyScreen from '../assets/images/cornerstone-detail/typography-screen.png'
import imgTypographyFigma  from '../assets/images/cornerstone-detail/typography-figma.png'

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
import icDvr             from '../assets/icons/cornerstone/dvr.svg'
import icAttachEmail     from '../assets/icons/cornerstone/attach-email.svg'
import icCheckCircleUnread from '../assets/icons/cornerstone/check-circle-unread.svg'
import icCheckOutline    from '../assets/icons/cornerstone/check-outline.svg'
import icSectionAsterisk from '../assets/icons/cornerstone/section-asterisk.svg'
import icArrowDirection  from '../assets/icons/cornerstone/arrow-direction.svg'
import icStep02PanelArrow from '../assets/icons/cornerstone/step02-conn-left.svg'
import icStep02ConnLeft   from '../assets/icons/cornerstone/step02-arrow.svg'
import icStep02ConnRight  from '../assets/icons/cornerstone/step02-conn-right.svg'

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
      <p className="text-[28px] font-medium leading-[36px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>{num}</p>
      <p className="text-[24px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
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
        <div className="text-[24px] font-semibold leading-[36px] text-center" style={{ fontFamily: poppins }}>{text}</div>
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
      <img src={icArrowRightBox} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
      <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] flex-1" style={{ fontFamily: poppins }}>{children}</p>
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
  { id: 'ai-impact-3', label: 'AI IMPACT 03' },
  { id: 'consistent',  label: 'CONSISTENT ACROSS EVERY FORMAT' },
  { id: 'programs',    label: 'ACROSS 10 PROGRAMS' },
  { id: 'impact',      label: 'IMPACT' },
  { id: 'reflection',  label: 'Reflection' },
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
      style={{
        position: 'fixed',
        left: '48px',
        top: '100px',
        width: '160px',
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
              70%+ AI-assisted workflow, one scalable system across 10 program pages
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
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── 소개 문단 ── */}
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          I led the redesign of Cornerstone College's diploma program experience as the solo product designer, creating a shared information structure and visual system across multiple program pages. I connected UX, responsive design, AI-assisted workflows, and developer handoff into one scalable foundation.
        </p>

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
    { num: '01', label: 'Text-heavy Experience',   title: '핵심 정보가 한눈에 들어오지 않았습니다',             body: '긴 줄글과 비슷한 시각적 처리 때문에 정보의 우선순위를 빠르게 파악하기 어려웠습니다.' },
    { num: '02', label: 'Hard to Find Information', title: '원하는 정보의 위치를 예측하기 어려웠습니다',          body: '명확한 카테고리와 탐색 단서가 없어, 학비나 입학 조건 같은 정보를 찾으려면 페이지를 순서대로 읽어야 했습니다.' },
    { num: '03', label: 'Two Separate Websites',    title: '도메스틱·인터내셔널 사이트가 분리되어 있었습니다',    body: '국내와 해외 학생을 위한 사이트가 각각 운영되어, 하나의 브랜드 경험으로 통합하고 정보를 비교하기 어려웠습니다.' },
    { num: '04', label: 'Late Feedback',            title: '중요한 피드백이 너무 늦게 발생했습니다',             body: 'Figma 화면만으로 실제 웹 경험을 이해하기 어려워, 개발 이후에야 구체적인 피드백이 발생하는 경우가 있었습니다.' },
  ]
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="01" label="PROBLEM" />
        <h2 className="text-[32px] font-semibold leading-[42px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          막연한 불만을 구체적인 디자인 문제로 정의하기
        </h2>
        {/* Hero image — Figma: wrapper absolute left-[-244px] top-[-141px] 1435×956px, blur 16px, overflow-clip */}
        <div className="relative w-full overflow-hidden" style={{ height: '480px' }}>
          <div
            className="absolute"
            style={{
              left: '-244px', top: '-141px',
              width: '1435px', height: '956px',
              filter: 'blur(7px)',
            }}
          >
            <img
              src={imgProblemHeroBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ maxWidth: 'none' }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-[28px]" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="flex flex-col gap-[16px] items-center text-white text-center">
              <p className="text-[32px] font-medium leading-[42px]" style={{ fontFamily: poppins }}>"우리 웹사이트는 정말 별로에요."</p>
              <div className="text-[20px] font-normal leading-[30px]" style={{ fontFamily: poppins }}>
                <p>경영진의 한마디에서 시작된 프로젝트,</p>
                <p>불만은 분명했지만, 무엇이 문제인지는 정의되이 있지 않았습니다.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Problem items */}
        <div className="flex flex-col gap-[24px] w-full">
          {problems.map((p) => (
            <div key={p.num} className="bg-[#f7f7f7] flex flex-col gap-[12px] px-[32px] py-[28px] w-full">
              <div className="flex gap-[8px] items-center text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                <span className="shrink-0">{p.num}</span>
                <span>{p.label}</span>
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
  const personas = [
    { num: '01', label: '예비 학생',    question: '"무엇을 배우게 되나요?"' },
    { num: '02', label: '국제 학생',    question: '"비용은 얼마나 드나요?"' },
    { num: '03', label: '유학원 관계자', question: '"입학 조건은 무엇인가요?"' },
  ]
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="02" label="DISCOVERY" />
        <h2 className="text-[32px] font-semibold leading-[42px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          사용자는 페이지를 읽으러 오는 것이 아니라 답을 찾으러 왔습니다
        </h2>
        <div className="flex gap-[24px] items-start w-full">
          {personas.map((p) => (
            <div key={p.num} className="bg-[#f7f7f7] flex flex-1 flex-col gap-[12px] px-[32px] py-[28px]">
              <div className="flex gap-[8px] items-center text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                <span>{p.num}</span><span>{p.label}</span>
              </div>
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{p.question}</p>
            </div>
          ))}
        </div>
        {/* Design Principle */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[60px] py-[40px]">
          <div className="flex flex-col gap-[16px] items-center text-center text-[#1e1e1e]">
            <p className="text-[18px] font-medium leading-[27px]" style={{ fontFamily: poppins }}>DESIGN PRINCIPLE</p>
            <p className="text-[24px] font-semibold leading-[36px]" style={{ fontFamily: poppins }}>정보를 읽기 쉽게 만드는 것을 넘어, 찾기 쉽게 만든다.</p>
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
    { tab: 'About',      question: '이 프로그램은 무엇인가?' },
    { tab: 'Courses',    question: '무엇을 배우게 되는가?' },
    { tab: 'Admissions', question: '내가 지원할 수 있는가?' },
    { tab: 'Costs',      question: '얼마의 비용이 필요한가?' },
    { tab: 'Careers',    question: '어떤 커리어로 이어지는가?' },
  ]
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <div className="flex items-end justify-between w-full">
          <SectionLabel num="03" label="SOLUTION 1" />
          <SolvesBadge text="SOLVES  PROBLEM 01 · 02" />
        </div>
        <h2 className="text-[32px] font-semibold leading-[42px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          긴 페이지를 읽는 경험에서 목적 기반 탐색 경험으로
        </h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          사용자는 학비나 입학 조건처럼 특정 정보가 궁금해도 페이지를 계속 스크롤하며 직접 찾아야 했습니다. 학생이 실제로 궁금해하는 질문을 기준으로 프로그램 페이지를 재구성했습니다.
        </p>
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
// 섹션 5 — Before/After 비교 이미지 1
// ─────────────────────────────────────────────────
function BeforeAfter1() {
  return (
    <section className="w-full bg-[#f7f7f7] py-[80px] px-[40px]">
      <div className="max-w-[960px] mx-auto w-full flex flex-col gap-[60px]">

          {/* ── Before ── */}
          <div className="flex flex-col w-full">
            {/* Header: bg #F3F3F3, border #DDD, px-32 py-12, 24px Medium */}
            <div className="bg-[#f3f3f3] border border-[#ddd] flex items-center px-[32px] py-[12px] w-full">
              <p className="text-[24px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Before · Data Science</p>
            </div>
            {/* Video: 원본 비율 그대로, 가로 100% */}
            <div className="w-full">
              <AutoplayVideo src={vidBeforeS1} className="w-full h-auto block" />
            </div>
            {/* Caption: bg white, px-32 py-28, 20px Medium */}
            <div className="bg-white flex flex-col px-[32px] py-[28px] w-full">
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>긴 페이지와 약한 시각적 위계로 인해 중요한 정보를 지나치기 쉬웠고, 원하는 내용을 찾기 위해 반복적인 스크롤이 필요했습니다.</p>
            </div>
          </div>

          {/* ── After ── */}
          <div className="flex flex-col w-full">
            {/* Header: bg #B9CDFB, border #B9CDFB, 나머지 Before와 동일 */}
            <div className="bg-[#b9cdfb] border border-[#b9cdfb] flex items-center px-[32px] py-[12px] w-full">
              <p className="text-[24px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>After · Data Science</p>
            </div>
            {/* Video: 원본 비율 그대로, 가로 100% */}
            <div className="w-full">
              <AutoplayVideo src={vidAfterS1} className="w-full h-auto block" />
            </div>
            {/* Caption: bg white, px-32 py-28, 20px Medium */}
            <div className="bg-white flex flex-col px-[32px] py-[28px] w-full">
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>탭을 통해 정보를 목적별로 그룹화해, 사용자가 관심 있는 카테고리로 바로 이동하고 그 안에서 필요한 정보를 단계적으로 탐색하도록 개선했습니다.</p>
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
        <div className="flex items-end justify-between w-full">
          <SectionLabel num="04" label="SOLUTION 2" />
          <SolvesBadge text="SOLVES  PROBLEM 03" />
        </div>
        <h2 className="text-[32px] font-semibold leading-[42px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          공통 경험은 하나로, 차이가 필요한 순간에만 분기하기
        </h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          기존에는 Domestic과 International 사이트가 별도 URL로 운영됐고, 학비와 입학 조건도 프로그램 페이지 밖에 분산되어 있었습니다.
        </p>
        <KeyInsight text={
          <>
            <p>두 학생 그룹이 듣는 프로그램은 동일했고,</p>
            <p>실제로 달라지는 정보는 Admissions와 Costs뿐이었습니다.</p>
          </>
        } />
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 7 — Before/After 비교 이미지 2
// ─────────────────────────────────────────────────
// Figma node: 767:37725 (section) / 767:37726 (Container:margin)
function BeforeAfter2() {
  return (
    <section className="w-full bg-[#f7f7f7] py-[80px] px-[40px]">
      <div className="max-w-[960px] mx-auto w-full flex flex-col gap-[60px]">

          {/* ── Before ── */}
          <div className="flex flex-col w-full">
            <div className="bg-[#f3f3f3] border border-[#ddd] flex items-center px-[32px] py-[12px] w-full">
              <p className="text-[24px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Before · UI/UX Design</p>
            </div>
            {/* Video: 원본 비율 그대로, 가로 100% */}
            <div className="w-full">
              <AutoplayVideo src={vidBeforeS2} className="w-full h-auto block" />
            </div>
            <div className="bg-white flex flex-col px-[32px] py-[28px] w-full">
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>프로그램 정보, 학비, 입학 조건이 서로 다른 페이지에 흩어져 있었습니다.</p>
            </div>
          </div>

          {/* ── After ── */}
          <div className="flex flex-col w-full">
            <div className="bg-[#b9cdfb] border border-[#b9cdfb] flex items-center px-[32px] py-[12px] w-full">
              <p className="text-[24px] font-medium leading-[36px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>After · UI/UX Design</p>
            </div>
            {/* Video: 원본 비율 그대로, 가로 100% */}
            <div className="w-full">
              <AutoplayVideo src={vidAfterS2} className="w-full h-auto block" />
            </div>
            <div className="bg-white flex flex-col px-[32px] py-[28px] w-full">
              <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                사이트 전체를 분리하는 대신, 각 프로그램 페이지 안에서&nbsp; Admissions와 Costs만 도메스틱/인터내셔널로 구분했습니다.
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
function AIImpact1Section() {
  const checklistRow1 = ['Program Overview', 'Credential', 'Duration', 'Schedule']
  const checklistRow2 = ['Courses', 'Admission Req.', 'Tuition & Fees', 'Career Opp.']
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <div className="flex items-end justify-between w-full">
          <SectionLabel num="05" label="AI IMPACT 1 · Collaboration" />
          <SolvesBadge text="SOLVES  PROBLEM 04" />
        </div>
        <h2 className="text-[32px] font-semibold leading-[42px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          체크리스트와 라이브 프로토타입으로 콘텐츠 수집 구조화하기
        </h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          11개 프로그램의 콘텐츠를 여러 Program Manager에게 수집해야 했고, 필요한 정보와 작성 기준이 사전에 명확하게 정리되어 있지 않아 추가 질문과 확인이 반복되었습니다. 공통 체크리스트로 필요한 항목을 먼저 정의하고, Claude로 구현한 라이브 프로토타입으로 실제 적용 모습을 공유해 콘텐츠 수집부터 디자인 합의까지의 커뮤니케이션을 구조화했습니다.
        </p>

        {/* CONTENT CHECKLIST */}
        <div className="flex flex-col gap-[24px] w-full">
          <SubHeading label="CONTENT CHECKLIST" />
          <div className="flex flex-col gap-[16px] w-full">
            {[checklistRow1, checklistRow2].map((row, ri) => (
              <div key={ri} className="flex gap-[16px] w-full">
                {row.map((item) => (
                  <div key={item} className="bg-[#b9cdfb] flex flex-1 items-center px-[20px] py-[16px] gap-[12px]">
                    <img src={icCheckFill} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                    <span className="text-[16px] font-medium leading-[24px] text-[#121212]" style={{ fontFamily: poppins }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="bg-[#f7f7f7] p-[32px] w-full">
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                11개 프로그램의 정보 요구사항을 체크리스트로 명확히 전달해, 여러 Program Manager과의 반복 확인을 줄였습니다. 각 프로그램 매니저마다 다른 콘텐츠 어투는 GPT로 하나의 UX Writing 톤으로 통일했습니다.
              </p>
            </div>
          </div>
        </div>

        {/* AI PROTOTYPING WORKFLOW */}
        <div className="flex flex-col gap-[24px] w-full">
          <SubHeading label="AI PROTOTYPING WORKFLOW" />
          <div className="bg-[#f7f7f7] flex flex-col gap-[24px] p-[32px] w-full">
            {/* Flow diagram */}
            <div className="flex gap-[24px] items-center w-full">
              {[
                { icon: icChecklist, label: 'Content Checklist', bg: 'bg-white' },
                { icon: null, label: null, bg: null, isArrow: true },
                { icon: icDvr, label: 'Live Prototype', bg: 'bg-[#b9cdfb]' },
                { icon: null, label: null, bg: null, isArrow: true },
                { icon: icAttachEmail, label: 'Share & Request', bg: 'bg-white' },
                { icon: null, label: null, bg: null, isArrow: true },
                { icon: icCheckCircleUnread, label: 'Official Content', bg: 'bg-white' },
              ].map((item, i) => item.isArrow ? (
                <div key={i} className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px] shrink-0">
                  <img src={icArrowRightBox} alt="" aria-hidden className="w-[24px] h-[24px]" />
                </div>
              ) : (
                <div key={i} className={`${item.bg} flex flex-1 items-start px-[20px] py-[16px]`}>
                  <div className="flex flex-col gap-[8px] items-start">
                    <img src={item.icon!} alt="" aria-hidden className="w-[24px] h-[24px]" />
                    <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="w-full border-t border-[#e5e5e5]" />
            {/* Outcome checklist */}
            <div className="flex flex-col gap-[16px] w-full">
              {['01  필요한 정보를 명확하게 요청', '02  실제 적용 위치를 함께 공유', '03 콘텐츠 수집과 합의 과정을 단축'].map((item) => (
                <div key={item} className="flex gap-[12px] items-center w-full">
                  <img src={icCheckOutline} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                  <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Email section */}
          <div className="bg-[#f7f7f7] flex flex-col gap-[20px] p-[32px] w-full">
            <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              Actual Request Email to Program Managers
            </p>
            <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              "I've attached the PDF that outlines the information needed for the program detail page.<br />
              I'm also sharing the current design prototype below for your reference."
            </p>
            <div className="flex gap-[16px] items-center">
              {['Prototyoe Link', 'Content Checklist'].map((label) => (
                <div key={label} className="bg-[#b9cdfb] flex gap-[12px] h-[40px] items-center justify-center pl-[12px] pr-[8px]">
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{label}</span>
                  <div className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px]">
                    <img src={icArrowRightBox} alt="" aria-hidden className="w-[24px] h-[24px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom principle */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[60px] py-[40px]">
          <div className="text-[24px] font-semibold leading-[36px] text-center text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            <p>Checklist로 '무엇이 필요한지'를,</p>
            <p>Live Prototype으로 '어디에 어떻게 쓰이는지'를 함께 전달했습니다.</p>
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
        <div className="flex items-end justify-between w-full">
          <SectionLabel num="06" label="AI IMPACT 02 · EXPLORATION" />
          <SolvesBadge text="SOLVES  PROBLEM 04" />
        </div>
        <h2 className="text-[32px] font-semibold leading-[42px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          UX 가설을 비교 가능한 화면으로 빠르게 구체화하기
        </h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          GPT로 Careers 섹션에 필요한 정보와 서로 다른 UX 방향을 프롬프트로 구체화하고, Google Stitch로 3가지 구조를 빠르게 시각화했습니다. 실제 화면을 바탕으로 Management와 방향을 논의한 뒤, 선택된 안을 Figma에서 최종 디자인으로 발전시켰습니다.
        </p>
        <KeyInsight text={
          <>
            <p>AI는 정답을 만드는 도구가 아니라,</p>
            <p>탐색의 폭을 넓히고 빠르게 합의하기 위한 도구였습니다.</p>
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
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Careers 섹션에 필요한 정보</span>
                </div>
                <div className="flex gap-[8px] items-center w-full">
                  {['Alumni Story', 'Career Paths', 'Salary Range', 'CTA'].map((item) => (
                    <div key={item} className="bg-[#f7f7f7] flex flex-1 items-center justify-center px-[20px] py-[16px]">
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <StepNote>GPT로 Careers 섹션의 핵심 정보를 정리하고, 서로 다른 UX 방향을 위한 Stitch 프롬프트를 구성했습니다.</StepNote>
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
              <StepNote>동일한 정보를 세 가지 UX 구조로 시각화해, 정보 우선순위와 탐색 방식의 차이를 비교했습니다.</StepNote>
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
                  {/* Figma 767:38027 — exact crop: B(Story First) 컬럼 크롭, 그라데이션 75.459% */}
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
                      { num: '01', label: 'Real Voices First', body: '학생들이 가장 중요하게 보는 것은 실제 경험에 가까운 정보입니다.' },
                      { num: '02', label: 'Video over Text',   body: '긴 설명보다 영상이 시선을 더 빠르게 집중시킵니다.' },
                      { num: '03', label: 'Visual First, Consult for Details', body: '페이지는 비주얼 중심으로 간결하게, 자세한 설명은 상담으로 연결합니다.' },
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
              <StepNote>Management 피드백을 바탕으로, 졸업생의 실제 경험을 가장 먼저 보여주는 Story First 구조를 선택했습니다.</StepNote>
            </StepCard>

            {/* Step 04 */}
            <StepCard num="04" title="Refine in Figma">
              <div className="bg-white flex flex-col gap-[8px] items-start pt-[16px] px-[20px] pb-[0px] w-full">
                {/* Figma 767:38074 — "Selected UX Direction" + arrow icon + "Final Visual Design" */}
                <div className="bg-[#b9cdfb] flex items-center justify-center px-[20px] py-[16px] w-full">
                  <div className="flex gap-[8px] items-center shrink-0">
                    <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Selected UX Direction</span>
                    <div className="relative w-[20px] h-[20px] shrink-0 flex items-center justify-center">
                      <img src={icArrowDirection} alt="" aria-hidden className="absolute inset-0 w-full h-full block" />
                    </div>
                    <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Final Visual Design</span>
                  </div>
                </div>
                <div className="bg-[#c4c4c4] w-full" style={{ aspectRatio: '996 / 560' }} />
              </div>
              <StepNote>선택한 Stitch 컨셉을 Figma로 가져와 UX 구조의 출발점으로 활용하고, 비주얼과 UI는 최종 방향에 맞게 다시 설계했습니다.</StepNote>
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
        <SectionLabel num="07" label="AI IMPACT 03" />
        <h2 className="text-[32px] font-semibold leading-[42px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          AI로 실제 화면의 디자인 규칙을 추출하고 시스템화하기
        </h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          완성된 Desktop 화면에서 실제 사용된 Typography 규칙을 Figma MCP와 Claude로 추출해 Style Library로 구조화했습니다. 이후 Mobile까지 확장하고, 추후 제작되는 랜딩페이지에서도 동일한 스타일 기준을 디자인과 개발에 재사용할 수 있는 기반을 만들었습니다.
        </p>
        <KeyInsight text={
          <>
            <p>AI를 활용해 실제 화면의 규칙을 추출하고,</p>
            <p>재사용 가능한 스타일 시스템으로 빠르게 전환했습니다.</p>
          </>
        } />

        {/* AI ASSISTED TYPOGRAPHY SYSTEM */}
        <div className="flex flex-col gap-[24px] w-full">
          <SubHeading label="AI ASSISTED TYPOGRAPHY SYSTEM" />
          <div className="flex flex-col gap-[16px] w-full">

            {/* Step 01 */}
            <StepCard num="01" title="Extract with AI from Real UI">
              <div className="bg-white flex gap-[16px] items-center pt-[16px] px-[20px] pb-[0px] w-full">
                <div className="flex-1 min-w-0 overflow-hidden relative" style={{ height: '300px' }}>
                  <img src={imgTypographyScreen} alt="실제 Desktop 화면" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, white 100%)' }} />
                </div>
                <img src={icArrowRightBox} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                <div className="w-[200px] shrink-0 overflow-hidden relative" style={{ height: '300px' }}>
                  <img src={imgTypographyFigma} alt="Figma Typography panel" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, white 100%)' }} />
                </div>
                <div className="flex flex-1 flex-col gap-[16px] min-w-0">
                  <div className="border-b border-[#1e1e1e] pb-[12px] pt-[4px]">
                    <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Extracted Typography Attributes</p>
                  </div>
                  {['Font Size', 'Weight', 'Line Height', 'Line Spacing'].map((attr) => (
                    <div key={attr} className="bg-[#f7f7f7] flex items-center justify-center px-[20px] py-[16px] w-full">
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{attr}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white flex items-center px-[20px] py-[16px] w-full">
                <div className="flex gap-[8px] items-center w-full">
                  {[
                    { label: 'Figma MCP', bg: 'bg-[#f7f7f7]' },
                    { label: null, isArrow: true },
                    { label: 'Claude 분석', bg: 'bg-[#f7f7f7]' },
                    { label: null, isArrow: true },
                    { label: 'Typography 추출', bg: 'bg-[#b9cdfb]' },
                  ].map((item, i) => item.isArrow ? (
                    <img key={i} src={icArrowRightBox} alt="" aria-hidden className="w-[24px] h-[24px] shrink-0" />
                  ) : (
                    <div key={i} className={`${item.bg} flex flex-1 items-center justify-center px-[20px] py-[16px]`}>
                      <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <StepNote>일부 완성된 Desktop 화면을 기준으로, Figma MCP와 Claude를 활용해 실제 사용된 Typography 규칙을 추출했습니다.</StepNote>
            </StepCard>

            {/* Step 02 */}
            <StepCard num="02" title="Auto Apply in Figma">
              <div className="bg-white flex flex-col gap-[8px] pt-[16px] px-[20px] pb-[0] w-full">

                {/* ── 상단: AI Plugin → Text Style Auto Applied ── */}
                <div className="flex gap-[32px] items-stretch w-full">
                  {/* Left: Custom Figma Plugin */}
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="bg-[#b9cdfb] flex gap-[10px] items-center px-[20px] py-[10px] w-full">
                      <div className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <span className="text-[14px] font-medium leading-[21px] text-white text-center" style={{ fontFamily: poppins }}>AI</span>
                      </div>
                      <span className="text-[16px] font-semibold leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Custom Figma Plugin Built with Claude</span>
                    </div>
                    <div className="bg-[#f7f7f7] flex-1 px-[20px] py-[12px]">
                      <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                        Figma 파일의 텍스트 레이어를 스캔하고, 등록된 Text Style을 폰트 크기(Size)와 굵기(Weight) 기준으로 자동 매칭하도록 플러그인을 생성했습니다.
                      </p>
                    </div>
                  </div>
                  {/* → 아이콘 */}
                  <div className="flex items-center justify-center shrink-0">
                    <img src={icStep02PanelArrow} alt="" aria-hidden className="w-[24px] h-[24px]" />
                  </div>
                  {/* Right: Text Style Auto Applied */}
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="bg-[#b9cdfb] flex gap-[10px] items-center px-[20px] py-[10px] w-full">
                      <div className="bg-[#1e1e1e] flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <span className="text-[14px] font-medium leading-[21px] text-white text-center" style={{ fontFamily: poppins }}>02</span>
                      </div>
                      <span className="text-[16px] font-semibold leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Text Style Auto Applied</span>
                    </div>
                    <div className="bg-[#f7f7f7] flex-1 px-[20px] py-[12px]">
                      <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                        텍스트 레이어를 스캔해, 조건에 맞는 Text Style을 자동으로 연결했습니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── 하단: 3-panel 매칭 다이어그램 ── */}
                <div className="bg-white flex items-center justify-center py-[24px] w-full">
                  <div className="flex flex-1 gap-[40px] items-center">

                    {/* Left panel: Text Layers (Figma) */}
                    <div className="bg-white border border-[#ddd] flex flex-col flex-1 min-w-0 overflow-hidden">
                      <div className="bg-[#f7f7f7] border-b border-[#e2e8f0] px-[20px] pt-[10px] pb-[10px]">
                        <p className="text-[16px] font-semibold leading-[24px] text-[#1e293b]" style={{ fontFamily: poppins }}>Text Layers (Figma)</p>
                      </div>
                      <div className="flex flex-col p-[20px]">
                        {['Make work simpler,', 'create more impact.', 'AI IMPACT helps teams', 'automate repetitive tasks', 'Get Started'].map((line, i, arr) => (
                          <div key={line} className={i < arr.length - 1 ? 'border-b border-[#f3f4f6] pb-[10px] mb-[10px]' : ''}>
                            <p className="text-[14px] font-normal leading-[21px] text-[#1e293b]" style={{ fontFamily: poppins }}>{line}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connection: Left panel → Center (rotate 180 so curve opens rightward) */}
                    <img
                      src={icStep02ConnLeft}
                      alt="" aria-hidden
                      className="shrink-0"
                      style={{ width: '62px', height: '123px', transform: 'rotate(180deg)' }}
                    />

                    {/* Center panel: AI 기반 자동 매칭 */}
                    <div className="bg-[#b9cdfb] flex flex-col items-center justify-center py-[20px] shrink-0" style={{ width: '196px' }}>
                      <div className="flex flex-col gap-[3px] items-center" style={{ width: '133px' }}>
                        <div className="text-[20px] font-semibold leading-[30px] text-center text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
                          <p className="mb-0">AI 기반</p>
                          <p>자동 매칭</p>
                        </div>
                        <p className="text-[16px] font-medium leading-[24px] text-center text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>( Size + Weight )</p>
                      </div>
                    </div>

                    {/* Connection: Center → Right panel */}
                    <img
                      src={icStep02ConnRight}
                      alt="" aria-hidden
                      className="shrink-0"
                      style={{ width: '62px', height: '123px' }}
                    />

                    {/* Right panel: Registered Text Styles */}
                    <div className="bg-white border border-[#ddd] flex flex-col flex-1 min-w-0 overflow-hidden">
                      <div className="bg-[#f7f7f7] border-b border-[#ddd] px-[20px] pt-[10px] pb-[10px]">
                        <p className="text-[16px] font-semibold leading-[24px] text-[#1e293b]" style={{ fontFamily: poppins }}>Registered Text Styles</p>
                      </div>
                      <div className="flex flex-col p-[20px]">
                        {[
                          '8xl / SemiBold',
                          '7xl / SemiBold',
                          'lg / Regular',
                          'base / Regular',
                          'sm / Medium',
                        ].map((label, i, arr) => (
                          <div key={label} className={`flex gap-[12px] items-center ${i < arr.length - 1 ? 'border-b border-[#f3f4f6] pb-[10px] mb-[10px]' : ''}`}>
                            <div className="bg-[rgba(185,205,251,0.5)] flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                              <span className="text-[16px] font-semibold leading-[24px] text-[#5e8fff] text-center" style={{ fontFamily: poppins }}>Ag</span>
                            </div>
                            <span className="text-[14px] font-normal leading-[21px] text-[#334155] whitespace-nowrap" style={{ fontFamily: poppins }}>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <StepNote>정리한 Text Style을 자동 매칭 로직으로 연결해, 반복적인 수작업을 줄였습니다.</StepNote>
            </StepCard>

            {/* Step 03 */}
            <StepCard num="03" title="Extend to Mobile">
              <div className="bg-white flex flex-col gap-[8px] pt-[16px] px-[20px] pb-[0px] w-full">
                <div className="flex gap-[8px] items-start w-full">
                  <div className="bg-[#c4c4c4] flex-1 min-w-0" style={{ aspectRatio: '2292 / 1494' }} />
                  <div className="bg-[#858585] flex-1 min-w-0" style={{ aspectRatio: '2292 / 1494' }} />
                </div>
              </div>
              <StepNote>Desktop 스케일을 Mobile 스케일로 매핑하고, Mobile Text Style도 라이브러리화했습니다.</StepNote>
            </StepCard>

            {/* Step 04 */}
            <StepCard num="04" title="Bridge to Development & Reuse">
              <div className="bg-white flex items-center pt-[16px] px-[20px] pb-[0px] w-full" style={{ height: '421px' }}>
                <div className="bg-[#b7b7b7] flex-1 h-full min-w-0" />
              </div>
              <StepNote>00개의 Text Style 값을 개별 기준으로 연결하고, 이후 랜딩페이지 작업에도 같은 스타일 기준을 재사용했습니다.</StepNote>
            </StepCard>
          </div>
        </div>
      </ContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 11 — 08 CONSISTENT ACROSS EVERY FORMAT
// ─────────────────────────────────────────────────
function ConsistentSection() {
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="08" label="CONSISTENT ACROSS EVERY FORMAT" />
        <h2 className="text-[36px] font-medium leading-[47px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          웹부터 홍보물까지, 하나의 비주얼 언어로 연결하기
        </h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          각 프로그램의 Hero Visual을 기준으로 Desktop, Tablet, Mobile과 Flyer까지 포맷에 맞게 확장해, 프로그램별 정체성을 유지하면서 일관된 시각 경험을 만들었습니다.
        </p>

        {/* 2×2 카드 그리드 */}
        <div className="flex flex-col gap-[20px] w-full">
          {/* Row 1 */}
          <div className="flex gap-[20px] w-full" style={{ height: '380px' }}>
            {/* Card 1 */}
            <div className="flex-1 relative bg-[#f7f7f7] p-[32px]">
              {/* TODO: 카드별 다른 이미지로 교체 예정 */}
              <img
                src={imgFormatConsistency}
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            {/* Card 2 */}
            <div className="flex-1 relative bg-[#f7f7f7] p-[32px]">
              {/* TODO: 카드별 다른 이미지로 교체 예정 */}
              <img
                src={imgFormatConsistency}
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex gap-[20px] w-full" style={{ height: '380px' }}>
            {/* Card 3 */}
            <div className="flex-1 relative bg-[#f7f7f7] p-[32px]">
              {/* TODO: 카드별 다른 이미지로 교체 예정 */}
              <img
                src={imgFormatConsistency}
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            {/* Card 4 */}
            <div className="flex-1 relative bg-[#f7f7f7] p-[32px]">
              {/* TODO: 카드별 다른 이미지로 교체 예정 */}
              <img
                src={imgFormatConsistency}
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </ContentWrap>
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
  return (
    <section className="w-full bg-white">
      <ContentWrap>
        <SectionLabel num="09" label="ACROSS 10 PROGRAMS" />
        <h2 className="text-[32px] font-semibold leading-[42px] text-[#1e1e1e] w-full" style={{ fontFamily: poppins }}>
          하나의 시스템으로 확장한 10개 프로그램
        </h2>
      </ContentWrap>
      <div className="w-full overflow-x-auto pb-[40px] px-[40px] scrollbar-none">
        <div className="flex gap-[16px]" style={{ width: 'max-content' }}>
          {PROGRAMS.map((prog) => (
            <button
              key={prog.name}
              type="button"
              className="cursor-pointer border-0 p-0 bg-transparent"
              style={{ width: '304px' }}
              onClick={() => {
                // TODO: 각 프로그램 상세 페이지 라우팅 연결 예정
              }}
            >
              <img
                src={prog.img}
                alt={prog.name}
                style={{ width: '304px', height: '298px', display: 'block', objectFit: 'cover' }}
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
      <div id="solution-1"><Solution1Section /><BeforeAfter1 /></div>
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
