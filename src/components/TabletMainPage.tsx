// TabletMainPage.tsx — Tablet layout (1024px–1439px)
// Figma: node 809-1202
// ★ MainPage.tsx(데스크톱)는 건드리지 않고 완전히 별도 컴포넌트로 분리

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// ── Images ──────────────────────────────────────
import imgHeroPhoto      from '../assets/images/hero-photo.jpeg'
import imgCnaiTh         from '../assets/images/cnai-thumb.png'

// ── Videos ──────────────────────────────────────
import vidCornerstoneDemo from '../assets/videos/cornerstone-thumb-v2.mp4'
import vidShelterDemo    from '../assets/videos/shelter-demo.mp4'

// ── Icons ────────────────────────────────────────
import icLogo            from '../assets/icons/logo.svg'
import icArrowInsert     from '../assets/icons/arrow-insert.svg'
import icArrowNext       from '../assets/icons/arrow-next.svg'
import icExploreArrow    from '../assets/icons/icon-explore-arrow.svg'
import icViewProject     from '../assets/icons/arrow-view-project.svg'

// ─────────────────────────────────────────────────
// Data (데스크톱과 동일한 내용, 별도 선언)
// ─────────────────────────────────────────────────

const poppins = "'Poppins', sans-serif"

// ── Card animation variants ──────────────────────
const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const PROJECT_LIST = [
  { title: 'Cornerstone College(CICCC)', sub: 'Education Website' },
  { title: 'Wildflower-Gardening',       sub: 'Shelter Management Platform' },
  { title: 'TmaxGAIA',                  sub: 'No-Code Platform' },
  { title: 'CNAI',                       sub: 'AI Avatar Platform' },
]

const PROJECT_CARDS = [
  {
    video: vidCornerstoneDemo,
    alt:   'Cornerstone College Website demo',
    title: 'Cornerstone College Website',
    desc:  '70%+ AI-assisted workflow, one scalable system across 10 program pages',
    route: '/projects/cornerstone',
  },
  {
    img:   imgCnaiTh,
    alt:   'AI Avatar Video Creation Platform screenshot',
    title: 'AI Avatar Video Creation Platform',
    desc:  '50% faster voice selection, 59% fewer voice re-selections',
    route: '/projects/ai-avatar',
  },
  {
    video: vidShelterDemo,
    alt:   'Homeless Shelter Life Management System demo',
    title: 'Homeless Shelter Life Management System',
    desc:  '94.3% NFC adoption and 30+ minutes faster response time',
    route: null,
  },
]

// ─────────────────────────────────────────────────
// ProjectCard — cursor badge 포함 (태블릿은 마우스 지원)
// 썸네일 비율: 612/408  /  타이틀: 22px/32px  /  desc: 16px/24px
// ─────────────────────────────────────────────────
function ProjectCard({
  img, video, alt, title, desc, onClick,
}: {
  img?: string; video?: string; alt: string
  title: string; desc: string; onClick?: () => void
}) {
  const [pos, setPos]         = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  return (
    <div
      className="flex flex-col gap-[16px] items-start w-full cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail — 612/408 (Figma 태블릿 비율) */}
      <div
        className="relative w-full shrink-0 overflow-hidden cursor-none aspect-[612/408]"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {video ? (
          <video
            src={video} autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <img
            src={img} alt={alt}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
        {/* 어두운 오버레이 */}
        <div
          className="absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        />
        {/* View Project 배지 */}
        <div
          className="absolute pointer-events-none transition-opacity duration-200"
          style={{ left: pos.x + 16, top: pos.y + 16, opacity: visible ? 1 : 0 }}
        >
          <div className="flex items-center gap-[4px] pl-[16px] pr-[12px] py-[6px] bg-[#fbf27e] rounded-[16777200px] whitespace-nowrap">
            <p
              className="text-[#1e1e1e] text-[14px] leading-[21px] not-italic m-0 shrink-0"
              style={{ fontFamily: poppins, fontWeight: 500 }}
            >
              View Project
            </p>
            <div className="relative shrink-0 w-[14px] h-[14px]">
              <img src={icViewProject} alt="" aria-hidden className="absolute inset-0 w-full h-full block" />
            </div>
          </div>
        </div>
      </div>

      {/* 텍스트: 타이틀 22px/32px, desc 16px/24px */}
      <div className="flex flex-col gap-[2px] items-start w-full">
        <p
          className="text-[#1e1e1e] text-[22px] leading-[32px] font-medium not-italic w-full break-words"
          style={{ fontFamily: poppins }}
        >
          {title}
        </p>
        <p
          className="text-[#8b8b8b] text-[16px] leading-[24px] font-normal not-italic w-full break-words"
          style={{ fontFamily: poppins }}
        >
          {desc}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// TabletMainPage
// ─────────────────────────────────────────────────
export default function TabletMainPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#F7F4F0]" style={{ fontFamily: poppins }}>

      {/* 외부 레이아웃: px-40px, flex-row, gap-32px */}
      <div className="flex flex-row gap-[32px] px-[40px]">

        {/* ══ 왼쪽 컬럼 — sticky, w-300px, h-screen ══ */}
        <div className="shrink-0 sticky top-0 h-screen overflow-hidden bg-[#F7F4F0]" style={{ width: 'clamp(300px, calc(-103.69px + 39.42vw), 464px)' }}>

          {/* 내부 콘텐츠: py-48px, gap-32px */}
          <div className="flex flex-col gap-[32px] items-start py-[48px] w-full shrink-0">

            {/* 로고 + 헤드라인 + 프로젝트 리스트 — gap-28px */}
            <div className="flex flex-col gap-[28px] items-start w-full">

              {/* 로고 + 헤드라인 — gap-24px */}
              <div className="flex flex-col gap-[24px] items-start w-full">

                {/* 로고 72×72px */}
                <img
                  src={icLogo}
                  alt="May Im logo"
                  className="w-[72px] h-[72px] shrink-0 block"
                />

                {/* 헤드라인: 28px/38px Medium */}
                <div
                  className="w-full text-[#1e1e1e] not-italic"
                  style={{ fontFamily: poppins, fontWeight: 500 }}
                >
                  <p className="text-[28px] leading-[38px] mb-0">I'm May,</p>
                  <p className="text-[28px] leading-[38px] mb-0">a product designer</p>
                  <p className="text-[28px] leading-[38px]">who listens first.</p>
                </div>
              </div>

              {/* 프로젝트 리스트 — 아이템 gap-16px, 각 항목 flex-col gap-2px */}
              <div className="flex flex-col gap-[16px] items-start w-full">
                {PROJECT_LIST.map((p) => (
                  <div key={p.title} className="flex flex-col gap-[2px] items-start w-full">
                    {/* 화살표 + 타이틀: gap-4px, 14px/21px Medium */}
                    <div className="flex gap-[4px] items-center shrink-0">
                      <div className="w-[20px] h-[20px] shrink-0 relative">
                        <img src={icArrowInsert} alt="" aria-hidden className="absolute inset-0 w-full h-full block" />
                      </div>
                      <p
                        className="text-[#1e1e1e] text-[14px] leading-[21px] font-medium not-italic shrink-0"
                        style={{ fontFamily: poppins, width: '206px' }}
                      >
                        {p.title}
                      </p>
                    </div>
                    {/* 서브텍스트: 14px/21px Regular */}
                    <p
                      className="text-[#8b8b8b] text-[14px] leading-[21px] font-normal not-italic whitespace-nowrap"
                      style={{ fontFamily: poppins }}
                    >
                      {p.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* View Resume — px-14 py-10, 18px/27px */}
            <button
              type="button"
              className="w-full flex items-center justify-between px-[14px] py-[10px] bg-[#1e1e1e] cursor-pointer border-0 outline-none"
            >
              <span
                className="text-[#f7f4f0] text-[18px] leading-[27px] font-medium not-italic whitespace-nowrap"
                style={{ fontFamily: poppins }}
              >
                View Resume
              </span>
              <div className="flex items-center justify-center size-[32px] shrink-0 bg-[#f7f4f0]">
                <img src={icArrowNext} alt="" aria-hidden className="block w-[22px] h-[22px]" />
              </div>
            </button>

            {/* About me 카드 — h-180px, 노란쪽 px-16 py-20 */}
            <div
              className="flex h-[180px] items-start w-full shrink-0 cursor-pointer"
              onClick={() => navigate('/about')}
            >
              {/* 왼쪽: 사진 */}
              <div className="flex-[438_0_0] h-full min-w-px relative">
                <img
                  src={imgHeroPhoto} alt="May Im"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              </div>
              {/* 오른쪽: 노란 패널 — 태블릿 padding: px-16 py-20 */}
              <div className="flex-[438_0_0] h-full min-w-px bg-[#fbf27e] relative">
                <div className="absolute inset-0 flex flex-col items-start justify-between px-[16px] py-[20px]">
                  <div className="flex flex-col gap-[4px] items-start w-full shrink-0">
                    {/* About me: 14px/21px Regular */}
                    <p
                      className="text-[#1e1e1e] text-[14px] leading-[21px] font-normal not-italic w-full m-0"
                      style={{ fontFamily: poppins }}
                    >
                      About me
                    </p>
                    {/* What inspires me.: 18px/27px Medium (태블릿 전용) */}
                    <p
                      className="text-[#1e1e1e] text-[18px] leading-[27px] font-medium not-italic w-full m-0"
                      style={{ fontFamily: poppins }}
                    >
                      What inspires me.
                    </p>
                  </div>
                  {/* Explore 버튼: 14px/21px */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); navigate('/about') }}
                    className="flex items-center gap-[4px] pl-[16px] pr-[12px] py-[6px] bg-[#1e1e1e] rounded-[16777200px] shrink-0 cursor-pointer border-0 outline-none"
                  >
                    <p
                      className="text-[#f7f4f0] text-[14px] leading-[21px] font-medium not-italic whitespace-nowrap m-0"
                      style={{ fontFamily: poppins }}
                    >
                      Explore
                    </p>
                    <div className="w-[14px] h-[14px] relative shrink-0">
                      <img src={icExploreArrow} alt="" aria-hidden className="absolute inset-0 w-full h-full block" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ══ 오른쪽 컬럼 — flex-1, py-48px, gap-48px ══ */}
        <div className="flex-1 min-w-0">
          <motion.div
            className="flex flex-col gap-[48px] items-start w-full py-[48px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={cardContainerVariants}
          >
            {PROJECT_CARDS.map((card) => (
              <motion.div key={card.title} className="w-full" variants={cardVariants}>
                <ProjectCard
                  {...card}
                  onClick={card.route ? () => navigate(card.route!) : undefined}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
