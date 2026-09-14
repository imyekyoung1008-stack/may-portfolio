// MobileMainPage.tsx — Mobile layout (< 1024px)
// Figma: node 809-1325
// ★ MainPage.tsx(데스크톱)는 건드리지 않고 완전히 별도 컴포넌트로 분리

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'

// ── Images ──────────────────────────────────────
import imgHeroPhoto      from '../assets/images/hero-photo.jpeg'
import imgCnaiTh         from '../assets/images/cnai-thumb.png'
import imgEduvisa        from '../assets/images/eduvisa-thumb.webp'
import imgAiEdge         from '../assets/images/ai-edge-thumb.webp'
import lottieCornerstone from '../assets/lottie/cornerstone-marketing.json'

// ── Videos ──────────────────────────────────────
import vidCornerstoneDemo from '../assets/videos/cornerstone-thumb-v2.mp4'
import vidShelterDemo    from '../assets/videos/shelter-demo.mp4'
import vidTwinflame      from '../assets/videos/twinflame-thumb.mp4'

// ── Icons ────────────────────────────────────────
import { MayImLogo } from './MayImLogo'
import icArrowInsert     from '../assets/icons/arrow-insert.svg'
import icArrowNext       from '../assets/icons/arrow-next.svg'
import resumePdf         from '../assets/documents/May_Im_Resume.pdf'
import icExploreArrow    from '../assets/icons/icon-explore-arrow.svg'
import icViewMoreArrow   from '../assets/icons/view-more-arrow.svg'

// ─────────────────────────────────────────────────
// CornerstoneLottie — lottie-web 직접 구동 컴포넌트
// ─────────────────────────────────────────────────
function CornerstoneLottie() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieCornerstone,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    })
    return () => animRef.current?.destroy()
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

// ─────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────

const poppins = "'Poppins', sans-serif"


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
    route: '/projects/cornerstone' as string | null,
  },
  {
    img:   imgCnaiTh,
    alt:   'AI Avatar Video Creation Platform screenshot',
    title: 'AI Avatar Video Creation Platform',
    desc:  '50% faster voice selection, 59% fewer voice re-selections',
    route: '/projects/ai-avatar' as string | null,
  },
  {
    video: vidShelterDemo,
    alt:   'Homeless Shelter Life Management System demo',
    title: 'Homeless Shelter Life Management System',
    desc:  '94.3% NFC adoption and 30+ minutes faster response time',
    route: null as string | null,
  },
]

const ADDITIONAL_CARDS = [
  { title: 'TwinFlame',             category: 'AI-assisted Motion & Marketing',                  video: vidTwinflame as string | undefined,    img: undefined as string | undefined, lottie: undefined as unknown, href: 'https://lnkd.in/p/gcsm_WEZ' as string | undefined },
  { title: 'AI Edge Workshop',      category: 'UX/UI, Marketing Design & AI-generated Visuals', video: undefined as string | undefined,        img: imgAiEdge as string | undefined,  lottie: undefined as unknown, href: 'https://bc.ciccc.ca/lp/ai-edge/' as string | undefined },
  { title: 'Eduvisa',               category: 'Landing Page UX/UI & Development',               video: undefined as string | undefined,        img: imgEduvisa as string | undefined, lottie: undefined as unknown, href: 'https://eduvisa.ai/' as string | undefined },
  { title: 'Cornerstone Marketing', category: 'Marketing Design & Visual Content',               video: undefined as string | undefined,        img: undefined as string | undefined,  lottie: lottieCornerstone as unknown, href: undefined as string | undefined },
] as { title: string; category: string; video?: string; img?: string; lottie?: unknown; href?: string }[]

// ─────────────────────────────────────────────────
// MobileMainPage
// 세로 1컬럼: [로고+헤드라인+리스트+버튼] → [카드 3개] → [View More / Additional Projects] → [About me]
// ─────────────────────────────────────────────────
export default function MobileMainPage() {
  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false)

  return (
    <div
      className="bg-[#F7F4F0] px-[24px] pb-[48px]"
      style={{ fontFamily: poppins }}
    >
      {/* 외부: flex-col, gap-48px (섹션 사이) */}
      <div className="flex flex-col gap-[48px] items-start w-full">

        {/* ══ 섹션 1: 로고 + 헤드라인 + 리스트 + 버튼 ══ */}
        <div className="flex flex-col gap-[32px] items-start pt-[32px] w-full">

          {/* 로고 + 헤드라인 + 프로젝트 리스트 — gap-28px */}
          <div className="flex flex-col gap-[28px] items-start w-full">

            {/* 로고 + 헤드라인 — gap-24px */}
            <div className="flex flex-col gap-[24px] items-start w-full">

              {/* 로고 72×72px — animated */}
              <MayImLogo />

              {/* 헤드라인: 24px/32px Medium */}
              <div
                className="w-full text-[#1e1e1e] not-italic"
                style={{ fontFamily: poppins, fontWeight: 500 }}
              >
                <p className="text-[24px] leading-[32px] mb-0">I'm May,</p>
                <p className="text-[24px] leading-[32px] mb-0">a product designer</p>
                <p className="text-[24px] leading-[32px]">who listens first.</p>
              </div>
            </div>

            {/* 프로젝트 리스트 — 아이템 gap-16px, 각 항목 flex-col gap-2px */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              {PROJECT_LIST.map((p) => (
                <div key={p.title} className="flex flex-col gap-[2px] items-start w-full">
                  {/* 화살표 + 타이틀: gap-4px, 13px/19px Medium */}
                  <div className="flex gap-[4px] items-center shrink-0">
                    <div className="w-[20px] h-[20px] shrink-0 relative">
                      <img src={icArrowInsert} alt="" aria-hidden className="absolute inset-0 w-full h-full block" />
                    </div>
                    <p
                      className="text-[#1e1e1e] text-[13px] leading-[19px] font-medium not-italic shrink-0"
                      style={{ fontFamily: poppins, width: '206px' }}
                    >
                      {p.title}
                    </p>
                  </div>
                  {/* 서브텍스트: 13px/19px Regular */}
                  <p
                    className="text-[#8b8b8b] text-[13px] leading-[19px] font-normal not-italic whitespace-nowrap"
                    style={{ fontFamily: poppins }}
                  >
                    {p.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* View Resume — px-14 py-10, 15px/22px */}
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-[14px] py-[10px] bg-[#1e1e1e] cursor-pointer no-underline"
          >
            <span
              className="text-[#f7f4f0] text-[15px] leading-[22px] font-medium not-italic whitespace-nowrap"
              style={{ fontFamily: poppins }}
            >
              View Resume
            </span>
            <div className="flex items-center justify-center size-[32px] shrink-0 bg-[#f7f4f0]">
              <img src={icArrowNext} alt="" aria-hidden className="block w-[22px] h-[22px]" />
            </div>
          </a>
        </div>

        {/* ══ 섹션 2: 프로젝트 카드 3개 — gap-40px ══ */}
        <div className="flex flex-col gap-[40px] items-start w-full">
          {PROJECT_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="flex flex-col gap-[16px] items-start w-full cursor-pointer"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.12 }}
              onClick={card.route ? () => navigate(card.route!) : undefined}
            >
              {/* 썸네일 — 342/228 비율 (모바일 전용) */}
              <div className="relative w-full shrink-0 overflow-hidden aspect-[342/228]">
                {card.video ? (
                  <video
                    src={card.video} autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <img
                    src={card.img} alt={card.alt}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                )}
              </div>
              {/* 텍스트: 타이틀 18px/26px, desc 13px/19px */}
              <div className="flex flex-col gap-[2px] items-start w-full">
                <p
                  className="text-[#1e1e1e] text-[18px] leading-[26px] font-medium not-italic w-full break-words"
                  style={{ fontFamily: poppins }}
                >
                  {card.title}
                </p>
                <p
                  className="text-[#8b8b8b] text-[13px] leading-[19px] font-normal not-italic w-full break-words"
                  style={{ fontFamily: poppins }}
                >
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ══ Additional Projects (View More) ══ */}
        {/* gap-[48px] 컨테이너 안에 있으므로 위아래 섹션과 동일한 48px 간격 유지 */}
        <div className="flex flex-col gap-[24px] w-full">

          {/* 타이틀 — showAll true일 때만 표시 */}
          {showAll && (
            <p
              className="text-[20px] font-medium leading-[28px] text-[#212121]"
              style={{ fontFamily: poppins }}
            >
              Additional Projects
            </p>
          )}

          {/* 카드 4개 — showAll true일 때만 표시, fade+slide-up 애니메이션 */}
          {showAll && (
            <motion.div
              className="flex flex-col gap-[24px] w-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {ADDITIONAL_CARDS.map(({ title, category, video, img, lottie, href }) => (
                <a
                  key={title}
                  {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex flex-col gap-[12px] w-full no-underline"
                  style={{ cursor: href ? 'pointer' : 'default', color: 'inherit' }}
                >
                  {video ? (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <video
                        src={video}
                        autoPlay loop muted playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ) : img ? (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <img
                        src={img} alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ) : lottie ? (
                    <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <div className="absolute inset-0">
                        <CornerstoneLottie />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-[#e7e4df]" />
                  )}
                  <div className="flex flex-col gap-[2px]">
                    <p
                      className="text-[18px] font-medium leading-[26px] text-[#212121]"
                      style={{ fontFamily: poppins }}
                    >
                      {title}
                    </p>
                    <p
                      className="text-[13px] font-normal leading-[19px] text-[#8c8c8c]"
                      style={{ fontFamily: poppins }}
                    >
                      {category}
                    </p>
                  </div>
                </a>
              ))}
            </motion.div>
          )}

          {/* View More 버튼 — showAll false일 때만 표시 (Figma node 1014:42659) */}
          {!showAll && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="w-full flex items-center justify-between px-[14px] py-[10px] bg-[#e7e4de] cursor-pointer border-0 outline-none"
            >
              <span
                className="text-[#1e1e1e] text-[15px] leading-[22px] font-medium not-italic whitespace-nowrap"
                style={{ fontFamily: poppins }}
              >
                View More
              </span>
              <div className="flex items-center justify-center w-[32px] h-[32px] shrink-0 bg-[#f7f4f0]">
                <img
                  src={icViewMoreArrow}
                  alt=""
                  aria-hidden
                  width={22}
                  height={22}
                />
              </div>
            </button>
          )}
        </div>

        {/* ══ 섹션 3: About me 카드 — 맨 아래 ══ */}
        {/* h-180px, 노란쪽 px-16 py-20 */}
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
          {/* 오른쪽: 노란 패널 — 모바일 padding: px-16 py-20 */}
          <div className="flex-[438_0_0] h-full min-w-px bg-[#fbf27e] relative">
            <div className="absolute inset-0 flex flex-col items-start justify-between px-[16px] py-[20px]">
              <div className="flex flex-col gap-[4px] items-start w-full shrink-0">
                {/* About me: 13px/19px Regular */}
                <p
                  className="text-[#1e1e1e] text-[13px] leading-[19px] font-normal not-italic w-full m-0"
                  style={{ fontFamily: poppins }}
                >
                  About me
                </p>
                {/* What inspires me.: 16px/24px Medium */}
                <p
                  className="text-[#1e1e1e] text-[16px] leading-[24px] font-medium not-italic w-full m-0"
                  style={{ fontFamily: poppins }}
                >
                  What inspires me.
                </p>
              </div>
              {/* Explore 버튼: 13px/19px */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); navigate('/about') }}
                className="flex items-center gap-[4px] pl-[16px] pr-[12px] py-[6px] bg-[#1e1e1e] rounded-[16777200px] shrink-0 cursor-pointer border-0 outline-none"
              >
                <p
                  className="text-[#f7f4f0] text-[13px] leading-[19px] font-medium not-italic whitespace-nowrap m-0"
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
  )
}
