// MainPage.tsx — Portfolio main page
// Layout: desktop-first, 1440px baseline. Mobile to be added in a future pass.
//
// LOCAL ASSETS:
//   Images → src/assets/images/
//     hero-photo.jpeg        : May's photo (About me card, left half)
//     cnai-thumb.png         : CNAI AI Avatar thumbnail
//   Videos → src/assets/videos/
//     cornerstone-thumb-v2.mp4 : CICCC project demo
//     shelter-demo.mp4         : Homeless Shelter demo
//   Icons → src/assets/icons/
//     arrow-insert.svg       : diagonal NE arrow (project list items)
//     icon-arrow-next.svg    : right arrow (Download Resume button)
//     icon-explore-arrow.svg : diagonal NE arrow on dark bg (Explore button)

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
// Data
// ─────────────────────────────────────────────────

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
    route: null,
  },
  {
    video: vidShelterDemo,
    alt:   'Homeless Shelter Life Management System demo',
    title: 'Homeless Shelter Life Management System',
    desc:  '94.3% NFC adoption and 30+ minutes faster response time',
    route: null,
  },
]

// Logo: src/assets/icons/logo.svg (72×72px, dot grid 52×52px + 10px padding)

// ─────────────────────────────────────────────────
// ProjectCard — cursor-following badge
// ─────────────────────────────────────────────────
function ProjectCard({ img, video, alt, title, desc, onClick }: { img?: string; video?: string; alt: string; title: string; desc: string; onClick?: () => void }) {
  const [pos, setPos]         = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div className="flex flex-col gap-[24px] items-start w-full cursor-pointer" onClick={onClick}>
      {/* Thumbnail */}
      <div
        className="relative w-full shrink-0 overflow-hidden cursor-none"
        style={{ aspectRatio: '886.84 / 591.23' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <img
            src={img}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        />
        {/* View Project badge — follows cursor */}
        <div
          className="absolute pointer-events-none transition-opacity duration-200"
          style={{
            left: pos.x + 16,
            top:  pos.y + 16,
            opacity: visible ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-[4px] pl-[16px] pr-[12px] py-[6px] bg-[#fbf27e] rounded-[16777200px] whitespace-nowrap">
            <p
              className="text-[#1e1e1e] text-[14px] leading-[21px] not-italic m-0 shrink-0"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
            >
              View Project
            </p>
            <div className="relative shrink-0 w-[14px] h-[14px]">
              <img
                src={icViewProject}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full block"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Text block */}
      <div className="flex flex-col gap-[2px] items-start w-full">
        <p
          className="text-[#1e1e1e] text-[24px] leading-[36px] font-medium not-italic w-full break-words"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {title}
        </p>
        <p
          className="text-[#8b8b8b] text-[16px] leading-[24px] font-normal not-italic w-full break-words"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {desc}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────
export default function MainPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col bg-[#F7F4F0]" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* 1440px 가운데 정렬 컨테이너 */}
      <div className="w-[1440px] mx-auto">

          {/* ════════════════════════════════════
              LEFT COLUMN — 464px, viewport에 fixed 고정
              fixed이므로 문서 흐름에서 빠짐 →
              오른쪽 컬럼에 ml-[604px](464+140) 보정
              Figma: node 741:33981
          ════════════════════════════════════ */}
          <div className="fixed top-0 w-[464px] h-screen overflow-hidden flex flex-col items-start z-10 bg-[#F7F4F0]" style={{ left: 'calc((100vw - 1440px) / 2)' }}>
            {/* 741:33982 — pt-104 pb-80 + gap-56, matching Figma layout */}
            <div className="flex flex-col gap-[56px] items-start pt-[80px] pb-[80px] w-full shrink-0">

              {/* ── 741:33983: Inner group — Logo+Headline / Project list, gap-56px ── */}
              <div className="flex flex-col gap-[56px] items-start w-full">

                {/* 741:34277: Logo + Headline, gap-32px */}
                <div className="flex flex-col gap-[32px] items-start w-full">

                  {/* may im logo — 72×72px SVG (dot grid 52×52px + 10px padding) */}
                  <img
                    src={icLogo}
                    alt="May Im logo"
                    className="w-[72px] h-[72px] shrink-0 block"
                  />

                  {/* Headline — Figma: leading-[0] wrapper, 3 <p> each leading-[58px] mb-0 */}
                  <div className="flex flex-col items-start w-full">
                    <div className="w-full text-[48px] leading-[0] text-[#1e1e1e] not-italic"
                      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
                      <p className="leading-[58px] mb-0">I'm May,</p>
                      <p className="leading-[58px] mb-0">a product designer</p>
                      <p className="leading-[58px] mb-0">who listens first.</p>
                    </div>
                  </div>
                </div>

                {/* 741:33991: Project list — gap-8px between rows */}
                <div className="flex flex-col gap-[8px] items-start w-full">
                  {PROJECT_LIST.map((p) => (
                    <div key={p.title} className="flex gap-[12px] items-center w-full">

                      {/* Arrow icon (20×20) + title (w-206px, 14px Medium) — gap-4px */}
                      <div className="flex gap-[4px] items-center shrink-0">
                        <div className="w-[20px] h-[20px] shrink-0 relative">
                          <img
                            src={icArrowInsert}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 w-full h-full block"
                          />
                        </div>
                        <p
                          className="text-[#1e1e1e] text-[14px] leading-[21px] not-italic shrink-0"
                          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, width: '206px' }}
                        >
                          {p.title}
                        </p>
                      </div>

                      {/* Sub-text — 14px Regular, gray-1 #8B8B8B */}
                      <p
                        className="text-[#8b8b8b] text-[14px] leading-[21px] not-italic whitespace-nowrap"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
                      >
                        {p.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 741:34012: Download Resume CTA ── */}
              {/* Figma: bg #1E1E1E, px-14 py-10, justify-between, full width */}
              <button
                type="button"
                className="w-full flex items-center justify-between px-[14px] py-[10px] bg-[#1e1e1e] cursor-pointer border-0 outline-none"
              >
                {/* 18px Medium, #F7F4F0 */}
                <span
                  className="text-[#f7f4f0] text-[18px] leading-[27px] not-italic whitespace-nowrap"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
                >
                  View Resume
                </span>
                {/* 32×32px white (#F7F4F0) box, arrow icon 22×22px centered */}
                <div
                  className="flex items-center justify-center size-[32px] shrink-0 bg-[#f7f4f0]"
                >
                  <img
                    src={icArrowNext}
                    alt=""
                    aria-hidden
                    className="block w-[22px] h-[22px]"
                  />
                </div>
              </button>

              {/* ── 741:34013: About me card ── */}
              {/* Figma: h-180px, flex-row, flex-[438_0_0] each half */}
              <div
                className="flex h-[180px] items-start w-full shrink-0 cursor-pointer"
                onClick={() => navigate('/about')}
              >

                {/* Left half — hero photo, object-cover. Figma: flex-[438_0_0] min-w-px */}
                <div className="flex-[438_0_0] h-full min-w-px relative">
                  <img
                    src={imgHeroPhoto}
                    alt="May Im"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                </div>

                {/* Right half — yellow panel #FBF27E. Figma: flex-[438_0_0] min-w-px */}
                <div className="flex-[438_0_0] h-full min-w-px bg-[#fbf27e] relative">
                  {/* Figma: flex-col items-start justify-between p-24px size-full */}
                  <div className="absolute inset-0 flex flex-col items-start justify-between p-[24px]">

                    {/* Top: "About me" (14px Regular) + "What inspires me." (20px Medium), gap-4px */}
                    <div className="flex flex-col gap-[4px] items-start w-full shrink-0">
                      <p
                        className="text-[#1e1e1e] text-[14px] leading-[21px] not-italic w-full m-0"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
                      >
                        About me
                      </p>
                      <p
                        className="text-[#1e1e1e] text-[20px] leading-[30px] not-italic w-full m-0"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
                      >
                        What inspires me.
                      </p>
                    </div>

                    {/* Bottom: Explore pill button */}
                    {/* Figma: bg #1E1E1E, rounded-[16777200px], pl-16 pr-12 py-6, gap-4 */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); navigate('/about') }}
                      className="flex items-center gap-[4px] pl-[16px] pr-[12px] py-[6px] bg-[#1e1e1e] rounded-[16777200px] shrink-0 cursor-pointer border-0 outline-none"
                    >
                      <p
                        className="text-[#f7f4f0] text-[14px] leading-[21px] not-italic whitespace-nowrap m-0"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
                      >
                        Explore
                      </p>
                      {/* 14×14px right-pointing arrow icon, white fill */}
                      <div className="w-[14px] h-[14px] relative shrink-0">
                        <img
                          src={icExploreArrow}
                          alt=""
                          aria-hidden
                          className="absolute inset-0 w-full h-full block"
                        />
                      </div>
                    </button>

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ════════════════════════════════════
              RIGHT COLUMN — fixed 왼쪽 컬럼(464px) + gap(140px) = 604px 보정
          ════════════════════════════════════ */}
          <div className="ml-[604px]">
            <div className="flex flex-col gap-[72px] items-start w-full pt-[80px] pb-[80px]">
              {PROJECT_CARDS.map((card) => (
                <ProjectCard
                  key={card.title}
                  {...card}
                  onClick={card.route ? () => navigate(card.route!) : undefined}
                />
              ))}
            </div>

          </div>

        </div>

</div>
  )
}
