// TabletCornerstonePage.tsx — Cornerstone College case study (Tablet 768–1023px)
// Figma: https://www.figma.com/design/fCphmFmQRkjF6EWKKqby8E/2026?node-id=827-1424
// ★ CornerstonePage.tsx(데스크톱 원본)는 절대 건드리지 않음. 이 파일만 편집.

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWindowWidth } from '../hooks/useWindowWidth'

// ── Videos ────────────────────────────────────────
import vidHero          from '../assets/videos/cornerstone-thumb-v2.mp4'
import vidBeforeS1      from '../assets/videos/solution3-before.mp4'
import vidBeforeS2      from '../assets/videos/solution2-before.mp4'
import vidAfterS1       from '../assets/videos/solution1-after.mp4'
import vidAfterS2       from '../assets/videos/solution2-after.mp4'

// ── Images ────────────────────────────────────────
import imgProblemHeroBg from '../assets/images/cornerstone-detail/problem-hero-bg.jpg'
import imgFormatConsistencyExample from '../assets/images/cornerstone-detail/format-consistency-example.png'
import imgFormatConsistencyMobile  from '../assets/images/cornerstone-detail/format-consistency-mobile.png'
import imgStitch        from '../assets/images/cornerstone-detail/stitch-screenshot.png'
import imgExtractScreen1 from '../assets/images/cornerstone-detail/ai-impact-3/extract-rules-screenshot-1.png'
import imgExtractScreen2 from '../assets/images/cornerstone-detail/ai-impact-3/extract-rules-screenshot-2.png'
import imgExtendMobile   from '../assets/images/cornerstone-detail/ai-impact-3/extend-mobile-screenshot.png'
import imgProgUiux       from '../assets/images/cornerstone-detail/programs/program-uiux.jpg'
import imgProgCyber      from '../assets/images/cornerstone-detail/programs/program-cybersecurity.jpg'
import imgProgDs         from '../assets/images/cornerstone-detail/programs/program-data-science.jpg'
import imgProgNss        from '../assets/images/cornerstone-detail/programs/program-nss.jpg'
import imgProgWeb        from '../assets/images/cornerstone-detail/programs/program-web-dev.jpg'
import imgProgEm         from '../assets/images/cornerstone-detail/programs/program-event-mgmt.jpg'
import imgProgIbm        from '../assets/images/cornerstone-detail/programs/program-ibm.jpg'
import imgProgHm         from '../assets/images/cornerstone-detail/programs/program-hospitality.jpg'
import imgProgDm         from '../assets/images/cornerstone-detail/programs/program-digital-marketing.jpg'
import imgProgSdm        from '../assets/images/cornerstone-detail/programs/program-strategic-dm.jpg'
import imgProgEsl        from '../assets/images/cornerstone-detail/programs/program-esl.jpg'
import imgProgCelpip     from '../assets/images/cornerstone-detail/programs/program-celpip.jpg'
import imgAi1BgDiagram   from '../assets/images/cornerstone-detail/ai-impact-1/background-diagram.png'
import imgAi1Proto1      from '../assets/images/cornerstone-detail/ai-impact-1/prototype-screenshot-1.png'
import imgAi1Proto2      from '../assets/images/cornerstone-detail/ai-impact-1/prototype-screenshot-2.png'
import imgAi1Checklist1  from '../assets/images/cornerstone-detail/ai-impact-1/checklist-screenshot-1.png'
import imgAi1Checklist2  from '../assets/images/cornerstone-detail/ai-impact-1/checklist-screenshot-2.png'
import imgAi1EmailBlurred from '../assets/images/cornerstone-detail/ai-impact-1/email-blurred.png'
import imgAi1ProtoMobile1    from '../assets/images/cornerstone-detail/ai-impact-1/proto-mobile-1.png'
import imgAi1ProtoMobile2    from '../assets/images/cornerstone-detail/ai-impact-1/proto-mobile-2.png'
import imgAi1ChecklistMobile1 from '../assets/images/cornerstone-detail/ai-impact-1/checklist-mobile-1.png'
import imgAi1ChecklistMobile2 from '../assets/images/cornerstone-detail/ai-impact-1/checklist-mobile-2.png'
import imgAi1EmailMobile     from '../assets/images/cornerstone-detail/ai-impact-1/email-mobile.png'

// ── Icons ─────────────────────────────────────────
import icClose           from '../assets/icons/close.svg'
import icCheckCircle     from '../assets/icons/cornerstone/check-circle.svg'
import icFlowArrow       from '../assets/icons/cornerstone/flow-arrow.svg'
import icSectionIcon     from '../assets/icons/cornerstone/section-icon.svg'
import icCheckFill       from '../assets/icons/cornerstone/check-fill.svg'
import icChecklist       from '../assets/icons/cornerstone/checklist.svg'
import icAttachEmail     from '../assets/icons/cornerstone/attach-email.svg'
import icCheckCircleUnread from '../assets/icons/cornerstone/check-circle-unread.svg'
import icSectionAsterisk from '../assets/icons/cornerstone/section-asterisk.svg'
import icArrowDown       from '../assets/icons/arrow-down.svg'
import icArrowSelectedDirection from '../assets/icons/arrow-selected-direction.svg'
import icArrowNote       from '../assets/icons/arrow-note.svg'
import icArrowRightBox   from '../assets/icons/cornerstone/arrow-right-box.svg'
import icDesktopWindows  from '../assets/icons/cornerstone/desktop-windows.svg'
import icArrowOutward    from '../assets/icons/cornerstone/arrow-outward.svg'
import icStep02PanelArrow   from '../assets/icons/cornerstone/step02-conn-left.svg'
import icConnDashedLeft  from '../assets/icons/cornerstone/connection-dashed-left.svg'
import icConnDashedRight from '../assets/icons/cornerstone/connection-dashed-right.svg'

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────
const poppins = "'Poppins', sans-serif"

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

// ─────────────────────────────────────────────────
// Shared layout wrapper — px-[32px] outer, py-[60px], gap-[32px]
// ─────────────────────────────────────────────────
function TContentWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-[32px] py-[60px]">
      <div className="w-full flex flex-col gap-[32px]">
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Shared primitive components (tablet-scaled)
// ─────────────────────────────────────────────────
function TSectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p className="text-[20px] font-medium leading-[30px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>{num}</p>
      <p className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

function TSolvesBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-[6px] pl-[12px] pr-[16px] py-[8px] bg-[#191919] rounded-full shrink-0">
      <img src={icCheckCircle} alt="" aria-hidden className="w-[18px] h-[18px]" />
      <span className="text-[14px] font-medium leading-[21px] text-white whitespace-nowrap" style={{ fontFamily: poppins }}>{text}</span>
    </div>
  )
}

function TKeyInsight({ text }: { text: React.ReactNode }) {
  return (
    <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[32px] py-[32px]">
      <div className="flex flex-col gap-[12px] items-center text-center text-[#1e1e1e]">
        <p className="text-[16px] font-medium leading-[24px]" style={{ fontFamily: poppins }}>KEY INSIGHT</p>
        <div className="text-[20px] font-medium leading-[30px] text-center" style={{ fontFamily: poppins }}>{text}</div>
      </div>
    </div>
  )
}

/** Step card: numbered header + divider + content */
function TStepCard({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#f7f7f7] flex flex-col w-full p-[24px]">
      <div className="flex items-center w-full">
        <div className="bg-white flex flex-1 gap-[12px] items-center px-[16px] py-[14px]">
          <div className="bg-[#1e1e1e] flex items-center justify-center w-[28px] h-[28px] shrink-0">
            <span className="text-[16px] font-medium leading-[24px] text-white text-center" style={{ fontFamily: poppins }}>{num}</span>
          </div>
          <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{title}</span>
        </div>
      </div>
      <div className="w-full border-t border-[#e5e5e5]" />
      {children}
    </div>
  )
}

function TStepNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white flex gap-[10px] items-center px-[16px] py-[14px] w-full">
      <img src={icArrowNote} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0 block" />
      <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e] flex-1" style={{ fontFamily: poppins }}>{children}</p>
    </div>
  )
}

function TSubHeading({ icon = icSectionIcon, label }: { icon?: string; label: string }) {
  return (
    <div className="flex gap-[6px] items-center w-full">
      <img src={icon} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
      <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

/** Viewport에 50% 이상 보이면 자동재생 */
function AutoplayVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause() },
      { threshold: 0.5 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])
  return <video ref={ref} src={src} controls playsInline muted className={className} />
}

// ─────────────────────────────────────────────────
// 섹션 1 — HEADER
//   ≥768px : 태블릿 (Figma 827:1425)
//   <768px : 모바일 (Figma 827:2526)
// ─────────────────────────────────────────────────
function TabletHeader() {
  const width = useWindowWidth()
  const isTablet = width >= 768

  const META = [
    { label: 'Product',   value: 'Responsive Web' },
    { label: 'My role',   value: 'Solo Product Designer' },
    { label: 'Timeline',  value: 'Q2 2026 - Q3 2026' },
    { label: 'Skills',    value: 'UX Strategy, Information Architecture, UI Design, Responsive Design, AI Assisted Workflow, Stakeholder Collaboration' },
  ]

  // ── 태블릿 (≥768px) — Figma 827:1425 원본 ────────
  if (isTablet) {
    return (
      <section className="w-full bg-white pt-[64px] pb-[60px] px-[32px]">
        <div className="w-full flex flex-col gap-[32px]">

          {/* 타이틀 행 — Shipped badge absolute top-right */}
          <div className="relative flex items-start w-full pb-[2px]">
            <div className="flex flex-col gap-[12px] flex-1 min-w-0 pr-[140px]">
              <p className="text-[28px] font-medium leading-[38px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                Cornerstone College Website
              </p>
              <p className="text-[20px] font-normal leading-[30px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>
                70%+ AI assisted workflow across 10 college diploma program pages
              </p>
            </div>
            <div className="absolute right-0 top-0 bg-[#f7f4f0] flex gap-[12px] items-center px-[12px] py-[8px]">
              <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: '#00C950' }} />
              <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>Shipped</span>
            </div>
          </div>

          {/* 히어로 영상 — 704×469.336 비율 */}
          <div className="w-full overflow-hidden" style={{ aspectRatio: '704 / 469' }}>
            <video src={vidHero} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>

          {/* 소개 문단 — 18px/27px Regular */}
          <div className="flex flex-col gap-[27px] text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            <p>I led the end to end redesign of Cornerstone College's diploma program pages as the solo product designer, from information architecture and content structure to responsive UI and developer handoff.</p>
            <p>While building the website, I developed AI assisted workflows using Claude Code and Figma MCP to accelerate visual exploration, systemize typography, automate repetitive design tasks, and translate design decisions into front end code for development.</p>
          </div>

          {/* 메타정보 그리드 — 2열 flex-wrap */}
          <div className="w-full py-[20px] flex flex-wrap gap-x-[24px] gap-y-[20px]" style={{ borderTop: '1px solid #f7f7f7', borderBottom: '1px solid #f7f7f7' }}>
            {META.map((item) => (
              <div key={item.label} className="flex flex-col items-start" style={{ width: 'calc(50% - 12px)' }}>
                <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>{item.label}</p>
                <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item.value}</p>
              </div>
            ))}
            <div className="flex flex-col items-start w-full">
              <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>Team</p>
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>2 Developers · 6 Program Managers</p>
            </div>
          </div>

        </div>
      </section>
    )
  }

  // ── 모바일 (<768px) — Figma 827:2526 ─────────────
  return (
    <section className="w-full bg-white px-[16px] pt-[48px] pb-[60px]">
      <div className="w-full flex flex-col gap-[20px]">

        {/* 뱃지 → 타이틀 → 설명 (세로 스택) */}
        <div className="flex flex-col gap-[16px] pb-[12px]">
          <div className="bg-[#f7f4f0] flex items-center gap-[12px] px-[10px] py-[6px] self-start shrink-0">
            <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: '#00C950' }} />
            <span className="text-[14px] font-normal leading-[21px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>Shipped</span>
          </div>
          <div className="flex flex-col gap-[12px]">
            <p className="text-[24px] font-medium leading-[32px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              Cornerstone College Website
            </p>
            <p className="text-[16px] font-normal leading-[24px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>
              70%+ AI assisted workflow across 10 college diploma program pages
            </p>
          </div>
        </div>

        {/* 히어로 영상 — 704/469 비율 유지 */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '704 / 469' }}>
          <video src={vidHero} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>

        {/* 소개 문단 — 15px/22px Regular */}
        <div className="flex flex-col gap-[22px] text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          <p>I led the end to end redesign of Cornerstone College's diploma program pages as the solo product designer, from information architecture and content structure to responsive UI and developer handoff.</p>
          <p>While building the website, I developed AI assisted workflows using Claude Code and Figma MCP to accelerate visual exploration, systemize typography, automate repetitive design tasks, and translate design decisions into front end code for development.</p>
        </div>

        {/* 메타정보 그리드 — Figma 827:2539
            Row1: Product(163px) + My role(163px) + gap(24px) = 350px (행 가득)
            Row2: Timeline(163px) 혼자
            Row3: Skills(w-full)
            Row4: Team(w-full)
        */}
        <div className="w-full py-[20px] flex flex-wrap gap-x-[24px] gap-y-[20px]" style={{ borderTop: '1px solid #f7f7f7', borderBottom: '1px solid #f7f7f7' }}>
          {/* Product — 163px (row1 col1) */}
          <div className="flex flex-col items-start shrink-0" style={{ width: 'calc(50% - 12px)' }}>
            <p className="text-[13px] font-normal leading-[19px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>Product</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Responsive Web</p>
          </div>
          {/* My role — 163px (row1 col2) */}
          <div className="flex flex-col items-start shrink-0" style={{ width: 'calc(50% - 12px)' }}>
            <p className="text-[13px] font-normal leading-[19px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>My role</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Solo Product Designer</p>
          </div>
          {/* Timeline — 163px (row2, 혼자) */}
          <div className="flex flex-col items-start shrink-0" style={{ width: 'calc(50% - 12px)' }}>
            <p className="text-[13px] font-normal leading-[19px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>Timeline</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Q2 2026 - Q3 2026</p>
          </div>
          {/* Skills — 전체폭 (row3) */}
          <div className="flex flex-col items-start w-full">
            <p className="text-[13px] font-normal leading-[19px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>Skills</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>UX Strategy, Information Architecture, UI Design, Responsive Design, AI Assisted Workflow, Stakeholder Collaboration</p>
          </div>
          {/* Team — 전체폭 (row4) */}
          <div className="flex flex-col items-start w-full">
            <p className="text-[13px] font-normal leading-[19px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>Team</p>
            <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>2 Developers · 6 Program Managers</p>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 2 — 01 PROBLEM
// ─────────────────────────────────────────────────
const PROBLEMS = [
  { num: '01', label: 'Text-heavy Experience',    title: 'Key information was difficult to scan.',               body: 'Long pages and weak visual hierarchy made key information easy to miss.' },
  { num: '02', label: 'Hard to Find Information', title: 'Users could not easily predict where information lived.', body: 'Without clear categories or navigation cues, they had to read through the page to find tuition, admissions, and program details.' },
  { num: '03', label: 'Separate Domestic & International Experiences', title: 'Domestic and international experiences were split across separate sites.', body: 'This created an inconsistent brand experience and made both comparison and content management more difficult.' },
  { num: '04', label: 'Outdated Program Content', title: 'Some pages did not reflect the latest course offerings.', body: 'Because content was collected across multiple program stakeholders, updates were not always reflected consistently or on time.' },
]

function TabletProblemSection() {
  const width = useWindowWidth()
  const isTablet = width >= 768

  // ── 태블릿 (768px+) — 기존 코드 그대로 ──
  if (isTablet) {
    return (
      <section id="problem" className="w-full bg-white">
        <TContentWrap>
          <TSectionLabel num="01" label="PROBLEM" />
          <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            What started as a visual redesign brief revealed a deeper information problem.
          </h2>
          <div className="relative w-full overflow-hidden" style={{ height: '280px' }}>
            <div className="absolute" style={{ left: '-160px', top: '-90px', width: '1024px', height: '680px', filter: 'blur(8px)' }}>
              <img src={imgProblemHeroBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ maxWidth: 'none' }} />
            </div>
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center text-white text-center" style={{ gap: '8.8px' }}>
                <p className="text-[14px] font-normal leading-[21px]" style={{ fontFamily: poppins }}>INITIAL BRIEF</p>
                <p className="text-[22px] font-medium leading-[32px] whitespace-pre-wrap" style={{ fontFamily: poppins, maxWidth: '469px' }}>{`"Make the website feel\nmore professional and credible."`}</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[32px] py-[32px]">
            <div className="flex flex-col gap-[12px] items-center text-center text-[#1e1e1e]">
              <p className="text-[16px] font-medium leading-[24px]" style={{ fontFamily: poppins }}>WHAT I FOUND</p>
              <p className="text-[20px] font-medium leading-[30px]" style={{ fontFamily: poppins }}>The deeper issue was how program information was structured, found, and kept up to date.</p>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] w-full">
            {PROBLEMS.map((p) => (
              <div key={p.num} className="bg-[#f7f7f7] flex flex-col gap-[8px] px-[24px] py-[20px]">
                <div className="flex gap-[8px] items-center">
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] shrink-0" style={{ fontFamily: poppins }}>{p.num}</span>
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{p.label}</span>
                </div>
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{p.title}</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{p.body}</p>
              </div>
            ))}
          </div>
        </TContentWrap>
      </section>
    )
  }

  // ── 모바일 (<768px) — Figma 827:2568 ──
  return (
    <section id="problem" className="w-full bg-white">
      <div className="w-full flex flex-col gap-[20px] px-[16px] py-[48px]">
        {/* 섹션 레이블 */}
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-medium leading-[24px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>01</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>PROBLEM</p>
        </div>
        {/* 헤딩 */}
        <h2 className="text-[18px] font-medium leading-[26px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          What started as a visual redesign brief revealed a deeper information problem.
        </h2>
        {/* 이미지 오버레이 */}
        <div className="relative w-full overflow-hidden" style={{ height: '180px' }}>
          <div className="absolute" style={{ left: '-160px', top: '-60px', width: '1024px', height: '460px', filter: 'blur(8px)' }}>
            <img src={imgProblemHeroBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ maxWidth: 'none' }} />
          </div>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center text-white text-center" style={{ gap: '4.375px' }}>
              <p className="text-[13px] font-normal leading-[19px]" style={{ fontFamily: poppins }}>INITIAL BRIEF</p>
              <p className="text-[15px] font-medium leading-[22px] whitespace-pre-wrap" style={{ fontFamily: poppins }}>{`"Make the website feel\nmore professional and credible."`}</p>
            </div>
          </div>
        </div>
        {/* 하이라이트 박스 */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[16px] py-[24px]">
          <div className="flex flex-col gap-[8px] items-center text-center text-[#1e1e1e]">
            <p className="text-[13px] font-medium leading-[19px]" style={{ fontFamily: poppins }}>WHAT I FOUND</p>
            <p className="text-[15px] font-medium leading-[22px]" style={{ fontFamily: poppins }}>The deeper issue was how program information was structured, found, and kept up to date.</p>
          </div>
        </div>
        {/* 문제 카드 리스트 — Figma 843:11754 (소제목 제거, 번호→문장→설명) */}
        <div className="flex flex-col gap-[24px] w-full">
          {PROBLEMS.map((p) => (
            <div key={p.num} className="bg-[#f7f7f7] flex flex-col gap-[8px] px-[16px] py-[24px]">
              <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{p.num}</p>
              <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{p.title}</p>
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 3 — 02 DISCOVERY
// ─────────────────────────────────────────────────
function TabletDiscoverySection() {
  const width = useWindowWidth()
  const isTablet = width >= 768

  // ── 태블릿 (768px+) — 기존 코드 그대로 ──
  if (isTablet) {
    return (
      <section id="discovery" className="w-full bg-white">
        <TContentWrap>
          <TSectionLabel num="02" label="DISCOVERY" />
          <div className="flex flex-col gap-[12px]">
            <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Users came to find answers, not read pages.</h2>
            <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>After reviewing the existing site and speaking with internal stakeholders, I reframed the program pages around the questions prospective students and partners were actually trying to answer.</p>
          </div>
          <div className="flex flex-col gap-[12px]">
            {[
              { num: '01', role: 'Prospective Students',  quote: '"What will I learn?"' },
              { num: '02', role: 'International Students', quote: '"How much will it cost?"' },
              { num: '03', role: 'Education Agents',       quote: '"What are the admission requirements?"' },
            ].map((card) => (
              <div key={card.num} className="bg-[#f7f7f7] flex flex-col gap-[12px] px-[24px] py-[20px]">
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.num}</p>
                  <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.role}</p>
                </div>
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.quote}</p>
              </div>
            ))}
            <p className="text-[14px] font-normal leading-[21px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>I used these recurring questions to create a shared structure across 10 college diploma program pages.</p>
          </div>
          <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[32px] py-[32px]">
            <div className="flex flex-col gap-[12px] items-center text-center text-[#1e1e1e]">
              <p className="text-[16px] font-medium leading-[24px]" style={{ fontFamily: poppins }}>DESIGN PRINCIPLE</p>
              <p className="text-[20px] font-medium leading-[30px]" style={{ fontFamily: poppins }}>Make information easy to find, not just easy to read.</p>
            </div>
          </div>
        </TContentWrap>
      </section>
    )
  }

  // ── 모바일 (<768px) — Figma 827:2624 ──
  return (
    <section id="discovery" className="w-full bg-white">
      <div className="w-full flex flex-col gap-[20px] px-[16px] py-[48px]">
        {/* 섹션 레이블 */}
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-medium leading-[24px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>02</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>DISCOVERY</p>
        </div>
        {/* 헤딩 + 본문 */}
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Users came to find answers, not read pages.</h2>
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>After reviewing the existing site and speaking with internal stakeholders, I reframed the program pages around the questions prospective students and partners were actually trying to answer.</p>
        </div>
        {/* 3개 질문 카드 — Figma 843:11788 */}
        <div className="flex flex-col gap-[24px]">
          {/* 카드 01 */}
          <div className="bg-[#f7f7f7] flex flex-col gap-[8px] px-[16px] py-[24px]">
            <div className="flex items-center gap-[8px]">
              <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e] shrink-0" style={{ fontFamily: poppins }}>01</p>
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Prospective Students</p>
            </div>
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>"What will I learn?"</p>
          </div>
          {/* 카드 02 */}
          <div className="bg-[#f7f7f7] flex flex-col gap-[8px] px-[16px] py-[24px]">
            <div className="flex items-center gap-[8px]">
              <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e] shrink-0" style={{ fontFamily: poppins }}>02</p>
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>International Students</p>
            </div>
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>"How much will it cost?"</p>
          </div>
          {/* 카드 03 — 인용구 15px Medium (2줄) */}
          <div className="bg-[#f7f7f7] flex flex-col gap-[8px] px-[16px] py-[24px]">
            <div className="flex items-center gap-[8px]">
              <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e] shrink-0" style={{ fontFamily: poppins }}>03</p>
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Education Agents</p>
            </div>
            <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>"What are the admission requirements?"</p>
          </div>
          {/* 카드 하단 설명 텍스트 */}
          <p className="text-[13px] font-normal leading-[19px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>I used these recurring questions to create a shared structure across 10 college diploma program pages.</p>
        </div>
        {/* 하이라이트 박스 */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[16px] py-[24px]">
          <div className="flex flex-col gap-[8px] items-center text-center text-[#1e1e1e]">
            <p className="text-[13px] font-normal leading-[19px]" style={{ fontFamily: poppins }}>DESIGN PRINCIPLE</p>
            <p className="text-[16px] font-medium leading-[24px]" style={{ fontFamily: poppins }}>Make information easy to find, not just easy to read.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 4 — 03 SOLUTION 1
// ─────────────────────────────────────────────────
const SOLUTION1_AFTER = [
  { tab: 'About',      question: 'What is this program?' },
  { tab: 'Courses',    question: 'What will I learn?' },
  { tab: 'Admissions', question: 'Am I eligible to apply?' },
  { tab: 'Costs',      question: 'How much will it cost?' },
  { tab: 'Careers',    question: 'Where can this program lead?' },
]

function TabletSolution1Section() {
  const width = useWindowWidth()
  const isTablet = width >= 768

  // ── 태블릿 (768px+) — 기존 코드 그대로 ──
  if (isTablet) {
    return (
      <section id="solution-1" className="w-full bg-white">
        <TContentWrap>
          <div className="flex items-start justify-between gap-[12px]">
            <TSectionLabel num="03" label="SOLUTION 1" />
            <TSolvesBadge text="SOLVES  PROBLEM 01 · 02" />
          </div>
          <div className="flex flex-col gap-[12px]">
            <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>From passive scrolling to purpose-driven navigation</h2>
            <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>I reorganized the program pages around the questions students were actually trying to answer, then applied the same structure across 10 college diploma program pages.</p>
          </div>
          <div className="flex flex-col gap-[16px]">
            {/* BEFORE */}
            <div className="bg-[#f7f7f7] flex flex-col gap-[28px] px-[24px] py-[20px]">
              <div className="flex flex-col gap-[8px]">
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>BEFORE</p>
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Long Page, Passive Scroll</p>
              </div>
              <div className="flex flex-col gap-[12px] items-center">
                {['Long page', 'Scroll', 'Scroll', 'Find Information'].map((label, i, arr) => (
                  <div key={i} className="flex flex-col items-center gap-[12px] w-full">
                    <div className="w-full border border-[#ddd] bg-[#f3f3f3] flex items-center px-[16px] py-[10px]">
                      <span className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] text-center w-full" style={{ fontFamily: poppins }}>{label}</span>
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
            <div className="bg-[#b9cdfb] flex flex-col gap-[28px] px-[24px] py-[20px]">
              <div className="flex flex-col gap-[8px]">
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>AFTER</p>
                <p className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Purpose-Driven Navigation</p>
              </div>
              <div className="flex flex-col gap-[14px]">
                {SOLUTION1_AFTER.map((item) => (
                  <div key={item.tab} className="flex items-center gap-[20px] border-b border-black/10 py-[10px]">
                    <span className="w-[90px] shrink-0 text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item.tab}</span>
                    <span className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item.question}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TContentWrap>
      </section>
    )
  }

  // ── 모바일 (<768px) — Figma 827:2667 ──
  return (
    <section id="solution-1" className="w-full bg-white">
      <div className="w-full flex flex-col gap-[20px] px-[16px] py-[48px]">
        {/* 섹션 레이블 */}
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-medium leading-[24px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>03</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>SOLUTION 1</p>
        </div>
        {/* SOLVES 배지 */}
        <div className="flex items-center gap-[6px] pl-[12px] pr-[16px] py-[8px] bg-[#191919] rounded-full self-start">
          <img src={icCheckCircle} alt="" aria-hidden className="w-[18px] h-[18px] shrink-0" />
          <span className="text-[13px] font-medium leading-[19px] text-white whitespace-nowrap" style={{ fontFamily: poppins }}>SOLVES  PROBLEM 01 · 02</span>
        </div>
        {/* 소제목 + 본문 */}
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-[18px] font-medium leading-[26px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>From passive scrolling to purpose-driven navigation</h2>
          <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>I reorganized the program pages around the questions students were actually trying to answer, then applied the same structure across 10 college diploma program pages.</p>
        </div>
        {/* BEFORE 박스 */}
        <div className="bg-[#f7f7f7] flex flex-col gap-[24px] px-[16px] py-[24px]">
          <div className="flex flex-col gap-[12px]">
            <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>BEFORE</p>
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Long Page, Passive Scroll</p>
          </div>
          <div className="flex flex-col gap-[12px] items-center">
            {['Long page', 'Scroll', 'Scroll', 'Find Information'].map((label, i, arr) => (
              <div key={i} className="flex flex-col items-center gap-[12px] w-full">
                <div className="w-full border border-[#ddd] bg-[#f3f3f3] flex items-center justify-center px-[16px] py-[10px]">
                  <span className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] text-center" style={{ fontFamily: poppins }}>{label}</span>
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
        {/* AFTER 박스 */}
        <div className="bg-[#b9cdfb] flex flex-col gap-[24px] px-[16px] py-[24px]">
          <div className="flex flex-col gap-[12px]">
            <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>AFTER</p>
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Purpose-Driven Navigation</p>
          </div>
          <div className="flex flex-col gap-[16px]">
            {SOLUTION1_AFTER.map((item) => (
              <div key={item.tab} className="flex items-center gap-[12px] pb-[16px]" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <span className="shrink-0 text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins, width: '100px' }}>{item.tab}</span>
                <span className="flex-1 min-w-0 text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item.question}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TabletSolution1BeforeAfter() {
  const width = useWindowWidth()
  const isTablet = width >= 768

  // ── 태블릿 (768px+) — 기존 코드 그대로 ──
  if (isTablet) {
    return (
      <section className="w-full bg-[#f7f7f7] py-[60px] px-[32px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
            <div className="bg-[#f3f3f3] flex items-center gap-[8px] px-[24px] py-[10px]">
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Before</span>
              <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· Data Science Program</span>
            </div>
            <div className="w-full aspect-[1920/1080]"><AutoplayVideo src={vidBeforeS1} className="w-full h-full block object-cover" /></div>
            <div className="bg-[#f3f3f3] px-[24px] py-[20px]">
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Long pages and weak visual hierarchy made important information easy to miss, forcing users to scroll repeatedly to find what they needed.</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center rotate-90" style={{ width: '32px', height: '32px', background: '#101010', flexShrink: 0 }}>
              <img src={icArrowDown} alt="" aria-hidden className="block" style={{ width: '30.72px', height: '30.72px' }} />
            </div>
          </div>
          <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
            <div className="bg-white flex items-center gap-[8px] px-[24px] py-[10px]">
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>After</span>
              <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· Data Science Program</span>
            </div>
            <div className="w-full aspect-[1920/1080]"><AutoplayVideo src={vidAfterS1} className="w-full h-full block object-cover" /></div>
            <div className="bg-white px-[24px] py-[20px]">
              <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>I grouped information by user intent, allowing students to jump directly to the category they cared about and explore the details step by step.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── 모바일 (<768px) — Figma 843:13020 ──
  return (
    <section className="w-full bg-[#f7f7f7] px-[16px] py-[48px]">
      <div className="flex flex-col gap-[24px]">
        {/* Before 블록 */}
        <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
          <div className="bg-[#f3f3f3] flex items-center gap-[10px] px-[16px] py-[10px]">
            <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Before</span>
            <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· Data Science Program</span>
          </div>
          <div className="w-full aspect-[1920/1080]">
            <AutoplayVideo src={vidBeforeS1} className="w-full h-full block object-cover" />
          </div>
          <div className="bg-[#f3f3f3] px-[16px] py-[24px]">
            <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Long pages and weak visual hierarchy made important information easy to miss, forcing users to scroll repeatedly to find what they needed.</p>
          </div>
        </div>
        {/* 중앙 화살표 */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center rotate-90 shrink-0" style={{ width: '30.72px', height: '30.72px', background: '#101010' }}>
            <img src={icArrowDown} alt="" aria-hidden className="block" style={{ width: '30.72px', height: '30.72px' }} />
          </div>
        </div>
        {/* After 블록 */}
        <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
          <div className="bg-white flex items-center gap-[10px] px-[16px] py-[10px]">
            <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>After</span>
            <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· Data Science Program</span>
          </div>
          <div className="w-full aspect-[1920/1080]">
            <AutoplayVideo src={vidAfterS1} className="w-full h-full block object-cover" />
          </div>
          <div className="bg-white px-[16px] py-[24px]">
            <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>I grouped information by user intent, allowing students to jump directly to the category they cared about and explore the details step by step.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 5 — 04 SOLUTION 2
// ─────────────────────────────────────────────────
function TabletSolution2Section() {
  const width = useWindowWidth()
  const isTablet = width >= 768

  // ── 태블릿 (768px+) — 기존 코드 그대로 ──
  if (isTablet) {
    return (
      <section id="solution-2" className="w-full bg-white">
        <TContentWrap>
          <div className="flex items-start justify-between gap-[12px]">
            <TSectionLabel num="04" label="SOLUTION 2" />
            <TSolvesBadge text="SOLVES  PROBLEM 03" />
          </div>
          <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Unify the shared experience, separate only what truly differs.</h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Domestic and International students were previously served through separate sites, creating duplicated content and unnecessary maintenance even though most program information was shared.</p>
          <TKeyInsight text={<><p>The core program experience was the same for both student groups.</p><p>Only Admissions and Costs needed to differ.</p></>} />
        </TContentWrap>
      </section>
    )
  }

  // ── 모바일 (<768px) — Figma 827:2761 ──
  return (
    <section id="solution-2" className="w-full bg-white">
      <div className="w-full flex flex-col gap-[20px] px-[20px] py-[48px]">
        {/* 섹션 레이블 */}
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-medium leading-[24px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>04</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>SOLUTION 2</p>
        </div>
        {/* SOLVES 배지 */}
        <div className="flex items-center gap-[6px] pl-[12px] pr-[16px] py-[8px] bg-[#191919] rounded-full self-start">
          <img src={icCheckCircle} alt="" aria-hidden className="w-[18px] h-[18px] shrink-0" />
          <span className="text-[13px] font-medium leading-[19px] text-white whitespace-nowrap" style={{ fontFamily: poppins }}>SOLVES  PROBLEM 03</span>
        </div>
        {/* 소제목 */}
        <h2 className="text-[18px] font-medium leading-[26px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Unify the shared experience, separate only what truly differs.</h2>
        {/* 본문 */}
        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Domestic and International students were previously served through separate sites, creating duplicated content and unnecessary maintenance even though most program information was shared.</p>
        {/* KEY INSIGHT 박스 */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[16px] py-[24px]">
          <div className="flex flex-col gap-[8px] items-center text-center text-[#1e1e1e]">
            <p className="text-[13px] font-normal leading-[19px]" style={{ fontFamily: poppins }}>KEY INSIGHT</p>
            <p className="text-[16px] font-medium leading-[24px]" style={{ fontFamily: poppins }}>The core program experience was the same for both student groups. Only Admissions and Costs needed to differ.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TabletSolution2BeforeAfter() {
  const width = useWindowWidth()
  const isTablet = width >= 768

  // ── 태블릿 (768px+) — 기존 코드 그대로 ──
  if (isTablet) {
    return (
      <section className="w-full bg-[#f7f7f7] py-[60px] px-[32px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
            <div className="bg-[#f3f3f3] flex items-center gap-[8px] px-[24px] py-[10px]">
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Before</span>
              <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· UI/UX Design Program</span>
            </div>
            <div className="w-full aspect-[1920/1080]"><AutoplayVideo src={vidBeforeS2} className="w-full h-full block object-cover" /></div>
            <div className="bg-[#f3f3f3] flex flex-col gap-[8px] px-[24px] py-[20px]">
              <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Users had to move between multiple screens to find the information they needed.</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Key information such as Tuition and Admissions was spread across different locations, forcing users to repeatedly navigate back and forth.</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center rotate-90" style={{ width: '32px', height: '32px', background: '#101010', flexShrink: 0 }}>
              <img src={icArrowDown} alt="" aria-hidden className="block" style={{ width: '30.72px', height: '30.72px' }} />
            </div>
          </div>
          <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
            <div className="bg-white flex items-center gap-[8px] px-[24px] py-[10px]">
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>After</span>
              <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· UI/UX Design Program</span>
            </div>
            <div className="w-full aspect-[1920/1080]"><AutoplayVideo src={vidAfterS2} className="w-full h-full block object-cover" /></div>
            <div className="bg-white flex flex-col gap-[8px] px-[24px] py-[20px]">
              <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>One shared page, with differences shown only where needed.</p>
              <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Domestic and International content was combined into one program experience, while sections such as Admissions and Costs use tabs to surface student-specific information without sending users to separate pages.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── 모바일 (<768px) — Figma 843:14247 ──
  return (
    <section className="w-full bg-[#f7f7f7] px-[16px] py-[48px]">
      <div className="flex flex-col gap-[24px]">
        {/* Before 블록 */}
        <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
          <div className="bg-[#f3f3f3] flex items-center gap-[10px] px-[16px] py-[10px]">
            <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Before</span>
            <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· UI/UX Design Program</span>
          </div>
          <div className="w-full aspect-[1920/1080]">
            <AutoplayVideo src={vidBeforeS2} className="w-full h-full block object-cover" />
          </div>
          <div className="bg-[#f3f3f3] flex flex-col gap-[8px] px-[16px] py-[24px]">
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Users had to move between multiple screens to find the information they needed.</p>
            <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Key information such as Tuition and Admissions was spread across different locations, forcing users to repeatedly navigate back and forth.</p>
          </div>
        </div>
        {/* 중앙 화살표 */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center rotate-90 shrink-0" style={{ width: '30.72px', height: '30.72px', background: '#101010' }}>
            <img src={icArrowDown} alt="" aria-hidden className="block" style={{ width: '30.72px', height: '30.72px' }} />
          </div>
        </div>
        {/* After 블록 */}
        <div className="flex flex-col w-full" style={{ border: '1px solid #DDD' }}>
          <div className="bg-white flex items-center gap-[10px] px-[16px] py-[10px]">
            <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>After</span>
            <span className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap" style={{ fontFamily: poppins }}>· UI/UX Design Program</span>
          </div>
          <div className="w-full aspect-[1920/1080]">
            <AutoplayVideo src={vidAfterS2} className="w-full h-full block object-cover" />
          </div>
          <div className="bg-white flex flex-col gap-[12px] px-[16px] py-[24px]">
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>One shared page, with differences shown only where needed.</p>
            <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Domestic and International content was combined into one program experience, while sections such as Admissions and Costs use tabs to surface student-specific information without sending users to separate pages.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 6 — 05 AI IMPACT 1 · Collaboration  (Figma 827:1713)
// ─────────────────────────────────────────────────
const CHECKLIST_ROW1 = ['Program Overview', 'Credential', 'Duration', 'Schedule']
const CHECKLIST_ROW2 = ['Courses', 'Admission Req.', 'Tuition & Fees', 'Career Opp.']

function TabletAIImpact1Section() {
  const width = useWindowWidth()
  const isTablet = width >= 768

  // ── 태블릿 (768px+) — 기존 코드 그대로 ──
  if (isTablet) return <TabletAIImpact1SectionTablet />

  // ── 모바일 (<768px) — Figma 827:2805 ──
  return (
    <section id="ai-impact-1" className="w-full bg-white">
      <div className="w-full flex flex-col gap-[20px] px-[16px] py-[48px]">
        {/* 섹션 레이블 */}
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-medium leading-[24px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>05</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>AI IMPACT 1 · Collaboration</p>
        </div>
        {/* SOLVES 배지 */}
        <div className="flex items-center gap-[6px] pl-[12px] pr-[16px] py-[8px] bg-[#191919] rounded-full self-start">
          <img src={icCheckCircle} alt="" aria-hidden className="w-[18px] h-[18px] shrink-0" />
          <span className="text-[13px] font-medium leading-[19px] text-white whitespace-nowrap" style={{ fontFamily: poppins }}>SOLVES  PROBLEM 04</span>
        </div>
        {/* 소제목 */}
        <h2 className="text-[18px] font-medium leading-[26px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Structuring Content Collaboration Across Multiple Program Managers</h2>

        <div className="flex flex-col gap-[40px]">

          {/* 01 BACKGROUND */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px] items-center">
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>01</span>
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>BACKGROUND</span>
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="bg-[#f7f7f7] flex flex-col gap-[8px] px-[16px] py-[20px]">
                <p className="text-[14px] font-medium leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Each program was managed by a different Program Manager.</p>
                <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Because they knew the latest curriculum and operational details best, I had to confirm the latest information directly with each of them.</p>
              </div>
              <div className="w-full" style={{ aspectRatio: '350/218.9' }}>
                <img src={imgAi1BgDiagram} alt="Background diagram — 10 programs across multiple Program Managers" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* 02 WHY THIS WAS CHALLENGING */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px] items-center">
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>02</span>
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>WHY THIS WAS CHALLENGING</span>
            </div>
            <div className="flex flex-col gap-[12px]">
              {[
                { num: '01', title: 'No Single Source',               body: 'The latest program information was scattered across different Program Managers and materials.' },
                { num: '02', title: 'Website vs. Actual Program Gap', body: 'Some existing website content no longer reflected the current curriculum.' },
                { num: '03', title: 'Asynchronous Communication',     body: 'Program Managers were teaching and not always in the office, so most updates had to be confirmed by email.' },
              ].map((card) => (
                <div key={card.num} className="bg-[#f7f7f7] flex flex-col gap-[8px] px-[16px] py-[20px]">
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.num}</span>
                  <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.title}</p>
                  <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 03 SOLUTION */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex gap-[8px] items-center">
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>03</span>
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>SOLUTION</span>
            </div>

            {/* Content Checklist */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[6px] items-center">
                  <img src={icSectionIcon} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
                  <span className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Content Checklist</span>
                </div>
                <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Standardized what information was needed across all program pages.</p>
              </div>
              {/* 2개씩 4줄 (Figma 843:15059) */}
              <div className="flex flex-col gap-[8px]">
                {[
                  ['Program Overview', 'Credential'],
                  ['Duration', 'Schedule'],
                  ['Courses', 'Admission Req.'],
                  ['Tuition & Fees', 'Career Opp.'],
                ].map((row, ri) => (
                  <div key={ri} className="flex gap-[8px]">
                    {row.map((item) => (
                      <div key={item} className="bg-[#b9cdfb] flex flex-1 items-center gap-[8px] px-[10px] py-[12px] min-w-0">
                        <img src={icCheckFill} alt="" aria-hidden style={{ width: '17.6px', height: '17.6px', flexShrink: 0 }} />
                        <span className="text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Prototype */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[6px] items-center">
                  <img src={icSectionIcon} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
                  <span className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Live Prototype</span>
                </div>
                <p className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Showed where and how each piece of information would be used.</p>
              </div>
              {/* 플로우 다이어그램 — 세로 스택 Figma 843:15120 */}
              <div className="bg-[#f7f7f7] flex flex-col px-[16px] py-[24px]" style={{ gap: '17.6px' }}>
                {/* 박스 4개 + 화살표 3개 세로 스택, 중앙 정렬 */}
                <div className="flex flex-col items-center gap-[16px]">
                  {[
                    { icon: icChecklist,         label: 'Content Checklist', bg: 'bg-white' },
                    { icon: icDesktopWindows,    label: 'Live Prototype',    bg: 'bg-[#b9cdfb]' },
                    { icon: icAttachEmail,       label: 'Share & Request',   bg: 'bg-white' },
                    { icon: icCheckCircleUnread, label: 'Verified Content',  bg: 'bg-white' },
                  ].map((item, i, arr) => (
                    <div key={item.label} className="flex flex-col items-center gap-[16px] w-full">
                      <div className={`${item.bg} flex items-center gap-[8px] w-full`} style={{ padding: '11.733px 14.667px' }}>
                        <img src={item.icon} alt="" aria-hidden style={{ width: '17.6px', height: '17.6px', flexShrink: 0 }} />
                        <span className="font-medium text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19px' }}>{item.label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0 rotate-90" style={{ width: '17.6px', height: '17.6px' }}>
                          <img src={icArrowRightBox} alt="" aria-hidden style={{ width: '17.6px', height: '17.6px' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* 구분선 */}
                <div className="w-full border-t border-[#e5e5e5]" />
                {/* Tools — 라벨 중앙 + 2×2 그리드 */}
                <div className="flex flex-col items-center gap-[8px]">
                  <span className="font-medium text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19px' }}>Tools</span>
                  <div className="flex flex-col gap-[8px] w-full">
                    {[['Figma MCP', 'Claude'], ['GitHub', 'Vercel']].map((row, ri) => (
                      <div key={ri} className="flex gap-[8px]">
                        {row.map((tool) => (
                          <div key={tool} className="bg-[#f3f3f3] flex flex-1 items-center justify-center min-w-0" style={{ border: '1px solid #ddd', padding: '6px 12px' }}>
                            <span className="font-medium text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19px' }}>{tool}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 04 ACTUAL REQUEST EMAIL — Figma 888:17052 */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px] items-center">
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>04</span>
              <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>ACTUAL REQUEST EMAIL to Program Managers</span>
            </div>
            {/* 새 세로 구조 */}
            <div className="bg-[#f7f7f7] flex flex-col gap-[16px] px-[16px] py-[24px] w-full">
              {/* 제목 */}
              <p className="text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Actual Content Request</p>
              {/* What I Shared */}
              <div className="flex flex-col gap-[12px] w-full">
                <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>What I Shared</p>
                {/* View Live Prototype */}
                <div className="flex flex-col gap-[8px] w-full">
                  <div className="bg-[#b9cdfb] flex items-center gap-[8.8px] p-[10px] w-full">
                    <span className="flex-1 min-w-0 text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>View Live Prototype</span>
                    <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '17.6px', height: '17.6px' }}>
                      <img src={icArrowOutward} alt="" aria-hidden style={{ width: '17.6px', height: '17.6px' }} />
                    </div>
                  </div>
                  <div className="flex items-center w-full" style={{ height: '102.942px' }}>
                    <div className="relative flex-1 min-w-0" style={{ aspectRatio: '468/303', height: '100%' }}>
                      <img src={imgAi1ProtoMobile1} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="relative flex-1 min-w-0" style={{ aspectRatio: '468/303', height: '100%' }}>
                      <img src={imgAi1ProtoMobile2} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                {/* View Content Checklist */}
                <div className="flex flex-col gap-[8px] w-full">
                  <div className="bg-[#b9cdfb] flex items-center gap-[8.8px] p-[10px] w-full">
                    <span className="flex-1 min-w-0 text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>View Content Checklist</span>
                    <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '17.6px', height: '17.6px' }}>
                      <img src={icArrowOutward} alt="" aria-hidden style={{ width: '17.6px', height: '17.6px' }} />
                    </div>
                  </div>
                  <div className="flex items-center w-full" style={{ height: '91.388px', border: '0.733px solid #ddd' }}>
                    <div className="relative flex-1 min-w-0" style={{ aspectRatio: '568.5/323', height: '100%' }}>
                      <img src={imgAi1ChecklistMobile1} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="relative flex-1 min-w-0" style={{ aspectRatio: '568.5/323', height: '100%' }}>
                      <img src={imgAi1ChecklistMobile2} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              {/* 이메일 이미지 — Figma 888:17074 완성본 (블러+그라데이션 포함) */}
              <div className="w-full overflow-hidden" style={{ height: '257px' }}>
                <img src={imgAi1EmailMobile} alt="" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>

        </div>

        {/* 하단 파란 박스 */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[16px] py-[24px]">
          <p className="text-[16px] font-medium leading-[24px] text-center text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            The checklist clarified what information was needed, while the live prototype showed where and how it would be used.
          </p>
        </div>
      </div>
    </section>
  )
}

function TabletAIImpact1SectionTablet() {
  return (
    <section id="ai-impact-1" className="w-full bg-white">
      <TContentWrap>
        <div className="flex items-start justify-between gap-[12px]">
          <TSectionLabel num="05" label="AI IMPACT 1 · Collaboration" />
          <TSolvesBadge text="SOLVES  PROBLEM 04" />
        </div>
        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Structuring Content Collaboration Across Multiple Program Managers</h2>

        <div className="flex flex-col gap-[40px]">

          {/* 01 BACKGROUND */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px] items-center">
              <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>01</span>
              <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>BACKGROUND</span>
            </div>
            {/* 태블릿: 텍스트 위, 이미지 아래 (세로 스택) */}
            <div className="flex flex-col gap-[12px]">
              <div className="bg-[#f7f7f7] flex flex-col gap-[12px] px-[24px] py-[24px]">
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Each program was managed by a different Program Manager.</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Because they knew the latest curriculum and operational details best, I had to confirm the latest information directly with each of them.</p>
              </div>
              <div className="w-full" style={{ aspectRatio: '1586/992' }}>
                <img src={imgAi1BgDiagram} alt="Background diagram — 10 programs across multiple Program Managers" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* 02 WHY THIS WAS CHALLENGING */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px] items-center">
              <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>02</span>
              <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>WHY THIS WAS CHALLENGING</span>
            </div>
            <div className="flex flex-col gap-[12px]">
              {/* 2-column row */}
              <div className="flex gap-[12px]">
                {[
                  { num: '01', title: 'No Single Source', body: 'The latest program information was scattered across different Program Managers and materials.' },
                  { num: '02', title: 'Website vs. Actual Program Gap', body: 'Some existing website content no longer reflected the current curriculum.' },
                ].map((card) => (
                  <div key={card.num} className="bg-[#f7f7f7] flex flex-1 flex-col gap-[8px] px-[20px] py-[20px] min-w-0">
                    <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.num}</span>
                    <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.title}</p>
                    <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{card.body}</p>
                  </div>
                ))}
              </div>
              {/* full-width row */}
              <div className="bg-[#f7f7f7] flex flex-col gap-[8px] px-[20px] py-[20px]">
                <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>03</span>
                <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Asynchronous Communication</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Program Managers were teaching and not always in the office, so most updates had to be confirmed by email.</p>
              </div>
            </div>
          </div>

          {/* 03 SOLUTION */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex gap-[8px] items-center">
              <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>03</span>
              <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>SOLUTION</span>
            </div>

            {/* Content Checklist */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[6px] items-center">
                  <img src={icSectionIcon} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Content Checklist</span>
                </div>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Standardized what information was needed across all program pages.</p>
              </div>
              {/* 2행 × 2열 그리드 (태블릿 공간 고려) */}
              <div className="flex flex-col gap-[8px]">
                {[CHECKLIST_ROW1, CHECKLIST_ROW2].map((row, ri) => (
                  <div key={ri} className="flex gap-[8px]">
                    {row.map((item) => (
                      <div key={item} className="bg-[#b9cdfb] flex flex-1 items-center gap-[8px] px-[12px] py-[12px] min-w-0">
                        <img src={icCheckFill} alt="" aria-hidden className="w-[16px] h-[16px] shrink-0" />
                        <span className="text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Prototype */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[6px] items-center">
                  <img src={icSectionIcon} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
                  <span className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Live Prototype</span>
                </div>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Showed where and how each piece of information would be used.</p>
              </div>
              {/* 플로우 다이어그램 — Figma 854:1532: 4박스+3화살표 한 줄, gap 17.6px */}
              <div className="bg-[#f7f7f7] flex flex-col p-[23.467px]" style={{ gap: '17.6px' }}>
                {/* 플로우 행: 박스4 + 검정화살표3, flex-nowrap */}
                <div className="flex items-center w-full" style={{ gap: '17.6px' }}>
                  {[
                    { icon: icChecklist,         label: 'Content Checklist', bg: 'bg-white' },
                    { icon: icDesktopWindows,    label: 'Live Prototype',    bg: 'bg-[#b9cdfb]' },
                    { icon: icAttachEmail,       label: 'Share & Request',   bg: 'bg-white' },
                    { icon: icCheckCircleUnread, label: 'Verified Content',  bg: 'bg-white' },
                  ].map((item, i, arr) => (
                    <>
                      <div key={item.label} className={`${item.bg} flex items-start min-w-0`} style={{ flex: '1 0 0', padding: '11.733px 14.667px' }}>
                        <div className="flex flex-col items-start justify-center" style={{ gap: '5.867px' }}>
                          <img src={item.icon} alt="" aria-hidden style={{ width: '17.6px', height: '17.6px', flexShrink: 0 }} />
                          <span className="font-medium text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '10.267px', lineHeight: '15.4px', whiteSpace: 'nowrap' }}>{item.label}</span>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <div key={`arrow-${i}`} className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '17.6px', height: '17.6px' }}>
                          <img src={icArrowRightBox} alt="" aria-hidden style={{ width: '17.6px', height: '17.6px' }} />
                        </div>
                      )}
                    </>
                  ))}
                </div>
                {/* 구분선 */}
                <div className="w-full border-t border-[#e5e5e5]" />
                {/* Tools 행 */}
                <div className="flex items-center" style={{ gap: '11.733px' }}>
                  <span className="font-medium text-[#1e1e1e] whitespace-nowrap shrink-0" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>Tools</span>
                  <div className="flex items-center" style={{ gap: '14.667px' }}>
                    {['Figma MCP', 'Claude', 'GitHub', 'Vercel'].map((tool) => (
                      <div key={tool} className="bg-[#f3f3f3] flex items-center justify-center shrink-0" style={{ border: '0.733px solid #ddd', padding: '5.867px 11.733px' }}>
                        <span className="font-medium text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 04 ACTUAL REQUEST EMAIL */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px] items-center">
              <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>04</span>
              <span className="text-[18px] font-medium leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>ACTUAL REQUEST EMAIL to Program Managers</span>
            </div>
            {/* Figma 847:1478 — 좌우 2컬럼 가로 배치 */}
            <div className="flex items-start" style={{ gap: '11.733px' }}>

              {/* Left panel */}
              <div className="bg-[#f7f7f7] flex flex-col" style={{ flex: '1 0 0', gap: '17.6px', padding: '23.467px' }}>
                <p className="font-medium text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '14.667px', lineHeight: '22px' }}>Actual Content Request</p>
                <div className="flex flex-col" style={{ gap: '17.6px' }}>
                  <p className="font-normal text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>What I Shared</p>
                  {/* View Live Prototype */}
                  <div className="flex flex-col" style={{ gap: '8.8px' }}>
                    <div className="bg-[#b9cdfb] flex items-center justify-between" style={{ height: '29.333px', paddingLeft: '8.8px', paddingRight: '5.867px' }}>
                      <span className="font-medium text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>View Live Prototype</span>
                      <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '17.6px', height: '17.6px' }}>
                        <img src={icArrowOutward} alt="" aria-hidden style={{ width: '17.6px', height: '17.6px' }} />
                      </div>
                    </div>
                    <div className="flex">
                      <div style={{ flex: '1 0 0', aspectRatio: '468/303' }}>
                        <img src={imgAi1Proto1} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div style={{ flex: '1 0 0', aspectRatio: '468/303' }}>
                        <img src={imgAi1Proto2} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  {/* View Content Checklist */}
                  <div className="flex flex-col" style={{ gap: '8.8px' }}>
                    <div className="bg-[#b9cdfb] flex items-center justify-between" style={{ height: '29.333px', paddingLeft: '8.8px', paddingRight: '5.867px' }}>
                      <span className="font-medium text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>View Content Checklist</span>
                      <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '17.6px', height: '17.6px' }}>
                        <img src={icArrowOutward} alt="" aria-hidden style={{ width: '17.6px', height: '17.6px' }} />
                      </div>
                    </div>
                    <div className="flex" style={{ border: '0.733px solid #ddd' }}>
                      <div style={{ flex: '1 0 0', aspectRatio: '568.5/323' }}>
                        <img src={imgAi1Checklist1} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div style={{ flex: '1 0 0', aspectRatio: '568.5/323' }}>
                        <img src={imgAi1Checklist2} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel — 이메일 이미지 + gradient + blur overlays */}
              <div className="relative shrink-0 overflow-hidden" style={{ width: '322.667px' }}>
                <img src={imgAi1EmailBlurred} alt="" className="w-full object-cover object-top" style={{ height: '412.766px' }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 72.46%, white 100%)' }} />
                <div className="absolute" style={{ left: '49.87px', top: '48.28px',  width: '50.6px',  height: '9.533px', backdropFilter: 'blur(1.1px)', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute" style={{ left: '49.87px', top: '60.01px',  width: '44.733px', height: '9.533px', backdropFilter: 'blur(1.1px)', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute" style={{ left: '103.4px', top: '60.01px',  width: '19.067px', height: '9.533px', backdropFilter: 'blur(1.1px)', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute" style={{ left: '39.6px',  top: '113.55px', width: '19.8px',   height: '9.533px', backdropFilter: 'blur(1.1px)', backgroundColor: 'rgba(255,255,255,0.5)' }} />
              </div>

            </div>
          </div>

        </div>

        {/* 하단 파란 박스 */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[32px] py-[32px]">
          <div className="text-[20px] font-medium leading-[30px] text-center text-[#1e1e1e]" style={{ fontFamily: poppins }}>
            <p>The checklist clarified what information was needed,</p>
            <p>while the live prototype showed where and how it would be used.</p>
          </div>
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 7 — 06 AI IMPACT 02 · EXPLORATION  (Figma 827:1921 / 827:3014)
// ─────────────────────────────────────────────────

/** 모바일 전용 스텝 카드 (Figma 827:3014 기준 — 13px 본 스케일) */
function MStepCard({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full" style={{ background: '#f7f7f7', border: '1px solid rgba(221,221,221,0.87)' }}>
      {/* 헤더 */}
      <div className="flex items-center bg-white" style={{ gap: '11.733px', padding: '11.733px 14px' }}>
        <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '24px', height: '24px' }}>
          <span className="text-white font-medium" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: 1 }}>{num}</span>
        </div>
        <span className="font-medium text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19.5px' }}>{title}</span>
      </div>
      <div className="w-full border-t border-[#e5e5e5]" />
      {children}
    </div>
  )
}

/** 모바일 전용 스텝 노트 (Figma 827:3014 기준 — 13px 본 스케일) */
function MStepNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white flex items-center w-full" style={{ gap: '8.8px', padding: '11.733px 14.667px' }}>
      <img src={icArrowNote} alt="" aria-hidden className="shrink-0 block" style={{ width: '17.6px', height: '17.6px' }} />
      <p className="flex-1 font-normal text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19.5px' }}>{children}</p>
    </div>
  )
}

function TabletAIImpact2Section() {
  const width = useWindowWidth()
  const isTablet = width >= 768

  // ── 모바일 (<768px) — Figma 827:3014 ──
  if (!isTablet) return (
    <section id="ai-impact-2" className="w-full bg-white">
      <div className="w-full flex flex-col gap-[20px] px-[16px] py-[48px]">
        {/* 섹션 레이블 */}
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-medium leading-[24px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>06</p>
          <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>AI IMPACT 02 · EXPLORATION</p>
        </div>
        {/* 소제목 */}
        <h2 className="text-[18px] font-medium leading-[26px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Turning UX Hypotheses into Comparable Screens, Fast</h2>
        {/* 본문 */}
        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>I explored three UX directions with GPT and Stitch, aligned with Management, and refined the selected concept in Figma.</p>
        {/* KEY INSIGHT */}
        <div className="w-full bg-[#b9cdfb] flex items-center justify-center px-[16px] py-[24px]">
          <div className="flex flex-col gap-[8px] items-center text-center text-[#1e1e1e]">
            <p className="text-[13px] font-normal leading-[19px]" style={{ fontFamily: poppins }}>KEY INSIGHT</p>
            <p className="text-[16px] font-medium leading-[24px]" style={{ fontFamily: poppins }}>AI was not a tool for finding the "right" answer. It helped me explore more directions and align faster.</p>
          </div>
        </div>
        {/* AI ASSISTED UX EXPLORATION 소제목 */}
        <div className="flex gap-[6px] items-center w-full">
          <img src={icSectionIcon} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
          <p className="text-[18px] font-medium leading-[26px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>AI ASSISTED UX EXPLORATION</p>
        </div>

        {/* 카드 리스트 */}
        <div className="flex flex-col gap-[16px]">

          {/* 카드 01 */}
          <MStepCard num="01" title="Define & Prompt the UX Direction">
            <div className="bg-white flex flex-col" style={{ padding: '11.733px 14.667px', gap: '11.733px' }}>
              <div className="bg-[#b9cdfb] flex items-center justify-center" style={{ padding: '10px 12px' }}>
                <span className="font-normal text-[#1e1e1e] text-center" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19.5px' }}>Information needed for the Careers section</span>
              </div>
              {['Alumni Story', 'Career Paths', 'Salary Range', 'CTA'].map((item) => (
                <div key={item} className="bg-[#f7f7f7] flex items-center justify-center" style={{ padding: '11.733px 14.667px' }}>
                  <span className="font-medium text-[#1e1e1e] text-center" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19.5px' }}>{item}</span>
                </div>
              ))}
            </div>
            <MStepNote>Used GPT to structure the content and explore different UX directions in Stitch.</MStepNote>
          </MStepCard>

          {/* 카드 02 */}
          <MStepCard num="02" title="Explore in Google Stitch">
            <div className="bg-white flex flex-col" style={{ padding: '11.733px 14.667px', gap: '11.733px' }}>
              <div className="flex" style={{ gap: '2.917px' }}>
                {['A : Data First', 'B : Story First', 'C : Explore First'].map((item) => (
                  <div key={item} className="bg-[#b9cdfb] flex flex-1 items-center justify-center min-w-0" style={{ padding: '5.833px 7.292px' }}>
                    <span className="font-normal text-[#1e1e1e] text-center" style={{ fontFamily: poppins, fontSize: '8px', lineHeight: '12px' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="w-full" style={{ aspectRatio: '2292 / 1494' }}>
                <img src={imgStitch} alt="Google Stitch UX exploration — 3 directions" className="w-full h-full object-cover" />
              </div>
            </div>
            <MStepNote>Visualized three UX structures to compare content priority and flow.</MStepNote>
          </MStepCard>

          {/* 카드 03 */}
          <MStepCard num="03" title="Align on Direction">
            <div className="bg-white flex flex-col" style={{ padding: '11.733px 14.667px', gap: '11.733px' }}>
              {/* 배지 행: Selected(black) | B:Story First(blue flex-1) */}
              <div className="flex items-start" style={{ gap: '5.867px' }}>
                <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ padding: '10px 12px' }}>
                  <span className="font-medium text-white whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19.5px' }}>Selected</span>
                </div>
                <div className="bg-[#b9cdfb] flex items-center justify-center" style={{ flex: '1 0 0', padding: '10px 12px' }}>
                  <span className="font-medium text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19.5px' }}>B : Story First</span>
                </div>
              </div>
              {/* 스티치 이미지 크롭 */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '360 / 453' }}>
                <img src={imgStitch} alt="" aria-hidden className="absolute max-w-none" style={{ left: '-115.04%', top: '-4.88%', width: '330.07%', height: '170.98%' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 75%, white 100%)' }} />
              </div>
              {/* Management Feedback 헤더 */}
              <div className="bg-[#b9cdfb] flex items-center justify-center w-full" style={{ padding: '10px 12px' }}>
                <span className="font-medium text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19.5px' }}>Management Feedback</span>
              </div>
              {/* 피드백 리스트 */}
              <div className="flex flex-col bg-[#f7f7f7]" style={{ gap: '11.733px', padding: '14.667px' }}>
                {[
                  { num: '01', label: 'Real Voices First',                body: 'Students value information grounded in real graduate experiences.', bodySize: '14px' },
                  { num: '02', label: 'Video over Text',                   body: 'Video communicates outcomes faster than long copy.',              bodySize: '13px' },
                  { num: '03', label: 'Visual First, Consult for Details', body: 'Lead with visual proof, then connect students to details.',      bodySize: '14px' },
                ].map((row) => (
                  <div key={row.num} className="flex flex-col w-full">
                    <div className="bg-[#f3f3f3] flex items-center w-full" style={{ gap: '7.333px', padding: '7.333px 14.667px', borderTop: '0.733px solid #DDD', borderLeft: '0.733px solid #DDD', borderRight: '0.733px solid #DDD' }}>
                      <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '19px', height: '19px' }}>
                        <span className="font-medium text-white text-center" style={{ fontFamily: poppins, fontSize: '11px', lineHeight: 1 }}>{row.num}</span>
                      </div>
                      <span className="font-medium text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19.5px' }}>{row.label}</span>
                    </div>
                    <div className="bg-white w-full" style={{ padding: '8.8px 14.667px', border: '0.733px solid #DDD' }}>
                      <p className="font-normal text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: row.bodySize, lineHeight: '21px' }}>{row.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <MStepNote>Based on Management feedback, we selected the Story First direction to lead with real graduate experiences.</MStepNote>
          </MStepCard>

          {/* 카드 04 */}
          <MStepCard num="04" title="Refine in Figma">
            <div className="bg-white flex flex-col" style={{ padding: '11.733px 14.667px', gap: '11.733px' }}>
              <div className="bg-[#b9cdfb] flex items-center justify-center" style={{ padding: '10px 12px' }}>
                <span className="font-medium text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '13px', lineHeight: '19.5px' }}>Final Visual Design</span>
              </div>
              <div className="bg-[#c4c4c4] w-full" style={{ aspectRatio: '2292 / 1494' }} />
            </div>
            <MStepNote>Refined the selected Stitch concept into the final UI in Figma.</MStepNote>
          </MStepCard>

        </div>
      </div>
    </section>
  )

  // ── 태블릿 (768px+) — 기존 코드 그대로 ──
  return (
    <section id="ai-impact-2" className="w-full bg-white">
      <TContentWrap>
        <TSectionLabel num="06" label="AI IMPACT 02 · EXPLORATION" />
        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Turning UX Hypotheses into Comparable Screens, Fast</h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>I explored three UX directions with GPT and Stitch, aligned with Management, and refined the selected concept in Figma.</p>
        <TKeyInsight text={<><p>AI was not a tool for finding the "right" answer.</p><p>It helped me explore more directions and align faster.</p></>} />

        <div className="flex flex-col gap-[24px]">
          <TSubHeading label="AI ASSISTED UX EXPLORATION" />
          <div className="flex flex-col gap-[16px]">

            {/* Step 01 */}
            <TStepCard num="01" title="Define & Prompt the UX Direction">
              <div className="bg-white flex flex-col gap-[8px] pt-[14px] px-[16px] pb-[0]">
                <div className="bg-[#b9cdfb] flex items-center justify-center px-[16px] py-[14px]">
                  <span className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] text-center" style={{ fontFamily: poppins }}>Information needed for the Careers section</span>
                </div>
                <div className="flex gap-[8px]">
                  {['Alumni Story', 'Career Paths', 'Salary Range', 'CTA'].map((item) => (
                    <div key={item} className="bg-[#f7f7f7] flex flex-1 items-center justify-center px-[8px] py-[12px]">
                      <span className="text-[12px] font-medium leading-[18px] text-[#1e1e1e] text-center" style={{ fontFamily: poppins }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <TStepNote>Used GPT to structure the content and explore different UX directions in Stitch.</TStepNote>
            </TStepCard>

            {/* Step 02 */}
            <TStepCard num="02" title="Explore in Google Stitch">
              <div className="bg-white flex flex-col gap-[8px] pt-[14px] px-[16px] pb-[0]">
                <div className="flex gap-[8px]">
                  {['A : Data First', 'B : Story First', 'C : Explore First'].map((item) => (
                    <div key={item} className="bg-[#b9cdfb] flex flex-1 items-center justify-center px-[8px] py-[12px]">
                      <span className="text-[12px] font-medium leading-[18px] text-[#1e1e1e] text-center" style={{ fontFamily: poppins }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full" style={{ aspectRatio: '2292 / 1494' }}>
                  <img src={imgStitch} alt="Google Stitch UX exploration — 3 directions" className="w-full h-full object-cover" />
                </div>
              </div>
              <TStepNote>Visualized three UX structures to compare content priority and flow.</TStepNote>
            </TStepCard>

            {/* Step 03 — Figma 847:1588: 좌우 2컬럼 가로 배치 */}
            <TStepCard num="03" title="Align on Direction">
              <div className="bg-white flex items-start pb-[0]" style={{ gap: '11.733px', paddingTop: '11.733px', paddingLeft: '14.667px', paddingRight: '14.667px' }}>

                {/* 왼쪽: 264px 고정 — Selected 배지 행 + 스크린샷 */}
                <div className="flex flex-col items-center shrink-0" style={{ width: '264px', gap: '5.867px' }}>
                  {/* 배지 행 */}
                  <div className="flex items-start w-full" style={{ gap: '5.867px' }}>
                    <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0 px-[14.667px]" style={{ height: '23.467px' }}>
                      <span className="font-medium text-white whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>Selected</span>
                    </div>
                    <div className="bg-[#b9cdfb] flex items-center justify-center px-[14.667px] py-[11.733px]" style={{ flex: '1 0 0', height: '32px' }}>
                      <span className="font-medium text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>B : Story First</span>
                    </div>
                  </div>
                  {/* 스크린샷 */}
                  <div className="relative w-full shrink-0 overflow-hidden" style={{ aspectRatio: '360/453' }}>
                    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
                      <img src={imgStitch} alt="" className="absolute max-w-none" style={{ left: '-115.04%', top: '-4.88%', width: '330.07%', height: '170.98%' }} />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 75.459%, white 100%)' }} />
                    </div>
                  </div>
                </div>

                {/* 오른쪽: flex-1 — 파란 헤더 + 피드백 리스트 */}
                <div className="flex flex-col items-start self-stretch" style={{ flex: '1 0 0' }}>
                  {/* 파란 헤더 */}
                  <div className="bg-[#b9cdfb] flex items-center justify-center w-full" style={{ padding: '11.733px 14.667px' }}>
                    <span className="font-medium text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>Management Feedback</span>
                  </div>
                  {/* 피드백 리스트 */}
                  <div className="bg-[#f7f7f7] flex flex-col w-full" style={{ gap: '11.733px', padding: '14.667px' }}>
                    {[
                      { num: '01', label: 'Real Voices First',                body: 'Students value information grounded in real graduate experiences.' },
                      { num: '02', label: 'Video over Text',                   body: 'Video communicates outcomes faster than long copy.' },
                      { num: '03', label: 'Visual First, Consult for Details', body: 'Lead with visual proof, then connect students to details.' },
                    ].map((row) => (
                      <div key={row.num} className="flex flex-col w-full">
                        {/* 헤더 셀 */}
                        <div className="bg-[#f3f3f3] flex items-center w-full" style={{ gap: '7.333px', padding: '7.333px 14.667px', border: '0.733px solid #ddd', borderBottom: 'none' }}>
                          <div className="bg-[#1e1e1e] flex items-center justify-center shrink-0" style={{ width: '17.6px', height: '17.6px' }}>
                            <span className="font-medium text-white text-center" style={{ fontFamily: poppins, fontSize: '10.267px', lineHeight: '15.4px' }}>{row.num}</span>
                          </div>
                          <span className="font-medium text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>{row.label}</span>
                        </div>
                        {/* 바디 셀 */}
                        <div className="bg-white w-full" style={{ padding: '8.8px 14.667px', border: '0.733px solid #ddd' }}>
                          <p className="font-normal text-[#1e1e1e]" style={{ fontFamily: poppins, fontSize: '11.733px', lineHeight: '17.6px' }}>{row.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              <TStepNote>Based on Management feedback, we selected the Story First direction to lead with real graduate experiences.</TStepNote>
            </TStepCard>

            {/* Step 04 */}
            <TStepCard num="04" title="Refine in Figma">
              <div className="bg-white flex flex-col gap-[8px] pt-[14px] px-[16px] pb-[0]">
                <div className="bg-[#b9cdfb] flex items-center justify-center px-[16px] py-[14px]">
                  <div className="flex gap-[8px] items-center">
                    <span className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Selected UX Direction</span>
                    <img src={icArrowSelectedDirection} alt="" aria-hidden className="w-[16px] h-[16px] shrink-0 block" />
                    <span className="text-[14px] font-medium leading-[21px] text-[#1e1e1e] whitespace-nowrap" style={{ fontFamily: poppins }}>Final Visual Design</span>
                  </div>
                </div>
                <div className="bg-[#c4c4c4] w-full" style={{ aspectRatio: '996/560' }} />
              </div>
              <TStepNote>Refined the selected Stitch concept into the final UI in Figma.</TStepNote>
            </TStepCard>

          </div>
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 8 — 07 AI IMPACT 03 · System Building  (Figma 827:2096)
// ─────────────────────────────────────────────────
function TabletAIImpact3Section() {
  return (
    <section id="ai-impact-3" className="w-full bg-white">
      <TContentWrap>
        <TSectionLabel num="07" label="AI IMPACT 03 · System Building" />
        <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Turning real UI rules into a reusable typography system</h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>I extracted typography rules from a finished desktop interface using Figma MCP and Claude. Then I built a Figma plugin to apply the corresponding text styles across desktop, tablet, and mobile. The system can be reused for future landing pages and development work.</p>

        <div className="flex flex-col gap-[24px]">
          <TSubHeading label="AI ASSISTED TYPOGRAPHY SYSTEM" />
          <div className="flex flex-col gap-[16px]">

            {/* Step 01 — 태블릿: 이미지 나란히 위, 속성 아래 세로 */}
            <TStepCard num="01" title="Extract Typography Rules from a Real UI">
              <div className="bg-white flex flex-col gap-[14px] pt-[14px] px-[16px] pb-[0]">
                {/* 이미지 두 장 나란히 */}
                <div className="flex gap-[12px] items-center">
                  <div className="relative shrink-0 overflow-hidden" style={{ width: '180px', height: '296px' }}>
                    <img src={imgExtractScreen1} alt="Desktop UI screenshot" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, white 98.6%)' }} />
                  </div>
                  <img src={icStep02PanelArrow} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
                  <div className="relative shrink-0 overflow-hidden" style={{ width: '100px', height: '296px' }}>
                    <img src={imgExtractScreen2} alt="Typography panel close-up" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, white 98.6%)' }} />
                  </div>
                  {/* Extracted Typography Attributes — 오른쪽 */}
                  <div className="flex flex-1 flex-col gap-[10px] min-w-0">
                    <div className="border-b border-[#1e1e1e] pb-[8px]">
                      <p className="text-[12px] font-medium leading-[18px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Extracted Typography Attributes</p>
                    </div>
                    {[
                      { attr: 'Font Size',      val: '64px' },
                      { attr: 'Weight',         val: 'SemiBold' },
                      { attr: 'Line Height',    val: '80px' },
                      { attr: 'Letter Spacing', val: '0px' },
                    ].map(({ attr, val }) => (
                      <div key={attr} className="bg-[#f7f7f7] flex items-center justify-between px-[10px] py-[8px]">
                        <span className="text-[11px] font-medium leading-[16px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{attr}</span>
                        <span className="text-[11px] font-normal leading-[16px] text-[#8b8b8b]" style={{ fontFamily: poppins }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Flow badges */}
                <div className="flex gap-[8px] items-center">
                  {[
                    { label: 'Figma MCP',             bg: 'bg-[#f7f7f7]', isArrow: false },
                    { label: null,                    bg: '',              isArrow: true  },
                    { label: 'Claude Analysis',       bg: 'bg-[#f7f7f7]', isArrow: false },
                    { label: null,                    bg: '',              isArrow: true  },
                    { label: 'Typography Extraction', bg: 'bg-[#b9cdfb]', isArrow: false },
                  ].map((item, i) => item.isArrow ? (
                    <img key={i} src={icStep02PanelArrow} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
                  ) : (
                    <div key={i} className={`${item.bg} flex flex-1 items-center justify-center px-[8px] py-[10px]`}>
                      <span className="text-[11px] font-medium leading-[16px] text-[#1e1e1e] text-center whitespace-nowrap" style={{ fontFamily: poppins }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <TStepNote>Using Figma MCP and Claude, I extracted the typography rules from a completed desktop interface.</TStepNote>
            </TStepCard>

            {/* Step 02 — 3-panel diagram (calc positioning reused from desktop) */}
            <TStepCard num="02" title="Auto Apply Text Styles in Figma">
              <div className="bg-white flex flex-col gap-[8px] pt-[14px] pb-[0]">
                {/* Top 2-column */}
                <div className="flex gap-[20px] items-stretch px-[16px]">
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="bg-[#b9cdfb] flex gap-[8px] items-center px-[14px] py-[8px]">
                      <div className="bg-[#1e1e1e] flex items-center justify-center w-[20px] h-[20px] shrink-0">
                        <span className="text-[11px] font-medium leading-[16px] text-white text-center" style={{ fontFamily: poppins }}>AI</span>
                      </div>
                      <span className="text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Custom Figma Plugin Built with Claude</span>
                    </div>
                    <div className="bg-[#f7f7f7] flex-1 px-[14px] py-[10px]">
                      <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Scans all text layers in the Figma file and auto-matches them to registered text styles by font size and weight.</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center shrink-0">
                    <img src={icStep02PanelArrow} alt="" aria-hidden className="w-[20px] h-[20px]" />
                  </div>
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="bg-[#b9cdfb] flex gap-[8px] items-center px-[14px] py-[8px]">
                      <div className="bg-[#1e1e1e] flex items-center justify-center w-[20px] h-[20px] shrink-0">
                        <span className="text-[11px] font-medium leading-[16px] text-white text-center" style={{ fontFamily: poppins }}>02</span>
                      </div>
                      <span className="text-[13px] font-medium leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Text Styles Automatically Applied</span>
                    </div>
                    <div className="bg-[#f7f7f7] flex-1 px-[14px] py-[10px]">
                      <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Scanned text layers and automatically linked matching text styles.</p>
                    </div>
                  </div>
                </div>

                {/* Bottom 3-panel diagram — absolute connectors */}
                <div className="bg-white py-[20px] px-[16px]">
                  <div className="relative flex gap-[28px] items-center w-full">
                    {/* Left panel */}
                    <div style={{ flex: '1 0 0' }} className="bg-white border border-[#ddd] flex flex-col overflow-hidden">
                      <div className="bg-[#f7f7f7] border-b border-[#e2e8f0] px-[14px] py-[8px]">
                        <p className="text-[13px] font-semibold leading-[19px] text-[#1e293b]" style={{ fontFamily: poppins }}>Text Layers (Figma)</p>
                      </div>
                      <div className="flex flex-col gap-[12px] p-[14px]">
                        {['Make work simpler,', 'create more impact.', 'AI IMPACT helps teams', 'automate repetitive tasks', 'Get Started'].map((line, i, arr) => (
                          <div key={line} className={i < arr.length - 1 ? 'border-b border-[#f3f4f6] pb-[8px]' : ''}>
                            <p className="text-[12px] font-normal leading-[18px] text-[#1e293b]" style={{ fontFamily: poppins }}>{line}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Center */}
                    <div className="bg-[#b9cdfb] flex flex-col items-center justify-center py-[16px] shrink-0" style={{ width: '140px' }}>
                      <div className="flex flex-col gap-[2px] items-center px-[8px]">
                        <p className="text-[14px] font-semibold leading-[20px] text-center text-[#1e1e1e]" style={{ fontFamily: poppins }}>AI Assisted Matching</p>
                        <p className="text-[12px] font-medium leading-[18px] text-center text-[#1e1e1e]" style={{ fontFamily: poppins }}>( Size + Weight )</p>
                      </div>
                    </div>
                    {/* Right panel */}
                    <div style={{ flex: '1 0 0' }} className="bg-white border border-[#ddd] flex flex-col overflow-hidden">
                      <div className="bg-[#f7f7f7] border-b border-[#ddd] px-[14px] py-[8px]">
                        <p className="text-[13px] font-semibold leading-[19px] text-[#1e293b]" style={{ fontFamily: poppins }}>Registered Text Styles</p>
                      </div>
                      <div className="flex flex-col gap-[8px] p-[14px]">
                        {['8xl / SemiBold', '7xl / SemiBold', 'lg / Regular', 'base / Regular', 'sm / Medium'].map((label, i, arr) => (
                          <div key={label} className={`flex gap-[10px] items-center ${i < arr.length - 1 ? 'border-b border-[#f3f4f6] pb-[8px]' : ''}`}>
                            <div className="bg-[rgba(185,205,251,0.5)] flex items-center justify-center shrink-0" style={{ width: '26px', height: '26px' }}>
                              <span className="text-[13px] font-semibold leading-[19px] text-[#5e8fff] text-center" style={{ fontFamily: poppins }}>Ag</span>
                            </div>
                            <span className="text-[12px] font-normal leading-[18px] text-[#334155] whitespace-nowrap" style={{ fontFamily: poppins }}>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Left connector — calc 기반 (center=140px) */}
                    {/* panel=(W-196)/2, left gap center=panel+14=50%-56px, SVG left=50%-56-36=50%-92px */}
                    <img src={icConnDashedLeft} alt="" aria-hidden style={{ position: 'absolute', left: 'calc(50% - 106px)', top: '50%', transform: 'translateY(-50%)', width: '60px', height: '103px', pointerEvents: 'none' }} />
                    {/* Right connector */}
                    <img src={icConnDashedRight} alt="" aria-hidden style={{ position: 'absolute', left: 'calc(50% + 46px)', top: '50%', transform: 'translateY(-50%)', width: '60px', height: '103px', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>
              <TStepNote>The plugin replaced repetitive manual updates with one-click style application.</TStepNote>
            </TStepCard>

            {/* Step 03 */}
            <TStepCard num="03" title="Extend to Mobile">
              <div className="bg-white pt-[14px] px-[16px] pb-[0]">
                <div className="w-full overflow-hidden" style={{ aspectRatio: '856/540' }}>
                  <img src={imgExtendMobile} alt="Mobile typography extension" className="w-full h-full object-cover" />
                </div>
              </div>
              <TStepNote>Mapped the desktop scale to mobile and created reusable mobile text styles.</TStepNote>
            </TStepCard>

            {/* Step 04 */}
            <TStepCard num="04" title="Bridge to Development & Reuse">
              <div className="bg-white flex items-center pt-[14px] px-[16px] pb-[0]" style={{ height: '320px' }}>
                <div className="bg-[#b7b7b7] flex-1 h-full min-w-0" />
              </div>
              <TStepNote>Connected Figma text styles to development for reuse across future pages.</TStepNote>
            </TStepCard>

          </div>
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 9 — 08 VISUAL SYSTEM  (Figma 827:2326)
// ─────────────────────────────────────────────────
function TabletVisualSystemSection() {
  const width = useWindowWidth()
  const isTablet = width >= 768
  const [paused, setPaused] = useState(false)

  return (
    <section id="consistent" className="w-full bg-white">
      {isTablet ? (
        /* ── 태블릿 (768px+) — 기존 코드 그대로 ── */
        <div className="w-full px-[32px] pt-[60px]">
          <div className="flex flex-col gap-[32px]">
            <TSectionLabel num="08" label="VISUAL SYSTEM" />
            <h2 className="text-[24px] font-medium leading-[34px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Scaling One Visual System Across Formats and Programs</h2>
            <p className="text-[18px] font-normal leading-[27px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>I extended each program's hero visual across digital and print formats, then applied the same system across 10 diploma programs.</p>
            <div className="flex gap-[6px] items-center">
              <img src={icSectionAsterisk} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
              <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>One Program, Multiple Formats</p>
            </div>
            <div className="w-full bg-[#f7f7f7] overflow-hidden flex items-center justify-center" style={{ height: '280px' }}>
              <img src={imgFormatConsistencyExample} alt="One program across Flyer, Desktop, iPad Pro, and iPhone formats" className="w-full h-full object-contain" />
            </div>
            <div className="flex gap-[6px] items-center">
              <img src={icSectionAsterisk} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
              <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Across 10 Programs</p>
            </div>
          </div>
        </div>
      ) : (
        /* ── 모바일 (<768px) — Figma 827:3418 ── */
        <div className="w-full px-[16px] pt-[48px]">
          <div className="flex flex-col gap-[32px]">
            {/* 라벨 + 소제목/본문 — gap 20px */}
            <div className="flex flex-col gap-[20px]">
              {/* 섹션 레이블 */}
              <div className="flex flex-col gap-[4px]">
                <p className="text-[14px] font-medium leading-[21px] text-[#b9cdfb]" style={{ fontFamily: poppins }}>08</p>
                <p className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>VISUAL SYSTEM</p>
              </div>
              {/* 소제목 + 본문 */}
              <div className="flex flex-col gap-[12px]">
                <h2 className="text-[18px] font-medium leading-[26px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Scaling One Visual System Across Formats and Programs</h2>
                <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>I extended each program's hero visual across digital and print formats, then applied the same system across 10 diploma programs.</p>
              </div>
            </div>
            {/* One Program, Multiple Formats 서브라벨 */}
            <div className="flex gap-[6px] items-center">
              <img src={icSectionAsterisk} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
              <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>One Program, Multiple Formats</p>
            </div>
            {/* 포맷 이미지 — Figma 827:3438 완성본, 원본 비율 유지 */}
            <img src={imgFormatConsistencyMobile} alt="One program across Flyer, Desktop, iPad Pro, and iPhone formats" className="w-full h-auto block" />
            {/* Across 10 Programs 서브라벨 */}
            <div className="flex gap-[6px] items-center">
              <img src={icSectionAsterisk} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
              <p className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Across 10 Programs</p>
            </div>
          </div>
        </div>
      )}

      {/* 마퀴 — px 없이 풀폭 */}
      <div
        className="w-full overflow-hidden relative mt-[24px] pb-[60px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute left-0 top-0 h-full z-10 pointer-events-none" style={{ width: '60px', background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 h-full z-10 pointer-events-none" style={{ width: '60px', background: 'linear-gradient(to left, white, transparent)' }} />
        <div
          className="flex gap-[10px] items-start"
          style={{ width: 'max-content', animation: 'marquee 40s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}
        >
          {[...PROGRAMS, ...PROGRAMS].map((prog, i) => (
            <button key={`${prog.name}-${i}`} type="button" className="cursor-pointer border-0 p-0 bg-transparent shrink-0" style={{ width: '180px' }}>
              <img src={prog.img} alt={prog.name} style={{ width: '180px', height: '175px', display: 'block', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 10 — 09 IMPACT  (Figma 827:2490)
// ─────────────────────────────────────────────────
function TabletImpactSection() {
  return (
    <section id="impact" className="w-full bg-white">
      <TContentWrap>
        <TSectionLabel num="09" label="IMPACT" />
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[6px] items-center">
            <img src={icSectionAsterisk} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Coming Soon</p>
          </div>
          <div className="bg-[#f7f7f7] w-full" style={{ height: '320px' }} />
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 섹션 11 — 10 Reflection  (Figma 827:2511)
// ─────────────────────────────────────────────────
function TabletReflectionSection() {
  return (
    <section id="reflection" className="w-full bg-white">
      <TContentWrap>
        <TSectionLabel num="10" label="Reflection" />
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[6px] items-center">
            <img src={icSectionAsterisk} alt="" aria-hidden className="w-[20px] h-[20px] shrink-0" />
            <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>Coming Soon</p>
          </div>
          <div className="bg-[#f7f7f7] w-full" style={{ height: '320px' }} />
        </div>
      </TContentWrap>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────
export default function TabletCornerstonePage() {
  const navigate = useNavigate()

  return (
    <motion.div
      style={{ fontFamily: poppins, position: 'fixed', inset: 0, overflowY: 'auto', zIndex: 20, backgroundColor: 'white' }}
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

      {/* 섹션 1: Header */}
      <TabletHeader />

      {/* 섹션 2: 01 PROBLEM */}
      <div id="problem"><TabletProblemSection /></div>

      {/* 섹션 3: 02 DISCOVERY */}
      <div id="discovery"><TabletDiscoverySection /></div>

      {/* 섹션 4: 03 SOLUTION 1 */}
      <div id="solution-1">
        <TabletSolution1Section />
        <TabletSolution1BeforeAfter />
      </div>

      {/* 섹션 5: 04 SOLUTION 2 */}
      <div id="solution-2">
        <TabletSolution2Section />
        <TabletSolution2BeforeAfter />
      </div>

      {/* 섹션 6: 05 AI IMPACT 1 */}
      <div id="ai-impact-1"><TabletAIImpact1Section /></div>

      {/* 섹션 7: 06 AI IMPACT 02 */}
      <div id="ai-impact-2"><TabletAIImpact2Section /></div>

      {/* 섹션 8: 07 AI IMPACT 03 */}
      <div id="ai-impact-3"><TabletAIImpact3Section /></div>

      {/* 섹션 9: 08 VISUAL SYSTEM + Across 10 Programs */}
      <div id="consistent"><TabletVisualSystemSection /></div>

      {/* 섹션 10: 09 IMPACT */}
      <div id="impact"><TabletImpactSection /></div>

      {/* 섹션 11: 10 Reflection */}
      <div id="reflection"><TabletReflectionSection /></div>

    </motion.div>
  )
}
