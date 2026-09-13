// MobileMainPage.tsx — Mobile layout (< 1024px)
// Figma: node 809-1325
// ★ MainPage.tsx(데스크톱)는 건드리지 않고 완전히 별도 컴포넌트로 분리

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// ── Images ──────────────────────────────────────
import imgHeroPhoto      from '../assets/images/hero-photo.jpeg'
import imgCnaiTh         from '../assets/images/cnai-thumb.png'

// ── Videos ──────────────────────────────────────
import vidCornerstoneDemo from '../assets/videos/cornerstone-thumb-v2.mp4'
import vidShelterDemo    from '../assets/videos/shelter-demo.mp4'

// ── Icons ────────────────────────────────────────
import { MayImLogo } from './MayImLogo'
import icArrowInsert     from '../assets/icons/arrow-insert.svg'
import icArrowNext       from '../assets/icons/arrow-next.svg'
import icExploreArrow    from '../assets/icons/icon-explore-arrow.svg'

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

// ─────────────────────────────────────────────────
// MobileMainPage
// 세로 1컬럼: [로고+헤드라인+리스트+버튼] → [카드 3개] → [About me]
// ─────────────────────────────────────────────────
export default function MobileMainPage() {
  const navigate = useNavigate()

  return (
    <div
      className="bg-[#F7F4F0] px-[24px] pb-[48px]"
      style={{ fontFamily: poppins }}
    >
      {/* 외부: flex-col, gap-48px (3개 섹션 사이) */}
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
          <button
            type="button"
            className="w-full flex items-center justify-between px-[14px] py-[10px] bg-[#1e1e1e] cursor-pointer border-0 outline-none"
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
          </button>
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
