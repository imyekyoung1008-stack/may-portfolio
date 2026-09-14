// ProjectHero.tsx — Reusable hero section for project case study pages
// 구조: AIAvatarPage.tsx의 AIAvatarHeader와 동일한 레이아웃을 공용 컴포넌트로 추출
//
// Usage:
//   <ProjectHero
//     title="..."
//     subtitle="..."
//     status={{ label: 'Shipped' }}
//     heroNode={<img ... />}   // optional, 없으면 회색 플레이스홀더
//     descriptions={['paragraph 1', 'paragraph 2']}
//     meta={[
//       { label: 'Product',  value: '...' },
//       { label: 'My role',  value: '...' },
//       { label: 'Timeline', value: '...' },
//       { label: 'Skills',   value: '...' },
//     ]}
//     teamLines={['2 Designers · 1 PM · 5 Developers']}
//   />

import React from 'react'

const poppins = "'Poppins', sans-serif"

// ── Props ─────────────────────────────────────────────────────────────────
export interface ProjectHeroProps {
  title: string
  subtitle: string
  /** 오른쪽 상단 상태 배지. dotColor 기본값 '#00C950' */
  status?: { label: string; dotColor?: string }
  /** 히어로 영역 콘텐츠. 없으면 960×640 회색 플레이스홀더 */
  heroNode?: React.ReactNode
  /** 소개 문단 배열 (각 string → <p>) */
  descriptions: string[]
  /** 4열 메타 그리드 항목 (정확히 4개 권장) */
  meta: { label: string; value: string }[]
  /** Team 행 (전체 너비, 복수 줄 지원) */
  teamLines: string[]
}

// ── Component ─────────────────────────────────────────────────────────────
export function ProjectHero({
  title,
  subtitle,
  status,
  heroNode,
  descriptions,
  meta,
  teamLines,
}: ProjectHeroProps) {
  return (
    <section className="w-full bg-white pt-[80px] pb-[60px] px-[42px]">
      <div className="max-w-[960px] mx-auto w-full flex flex-col gap-[42px]">

        {/* 타이틀 행 */}
        <div className="flex gap-[40px] items-start w-full">
          <div className="flex flex-col gap-[12px] flex-1 min-w-0">
            <p
              className="text-[36px] font-medium leading-[47px] text-[#1e1e1e] w-full"
              style={{ fontFamily: poppins }}
            >
              {title}
            </p>
            <p
              className="text-[20px] font-normal leading-[30px] text-[#8b8b8b] w-full"
              style={{ fontFamily: poppins }}
            >
              {subtitle}
            </p>
          </div>

          {/* 상태 배지 */}
          {status && (
            <div className="bg-[#f7f4f0] flex gap-[12px] items-center justify-center px-[12px] py-[8px] shrink-0">
              <div
                className="w-[8px] h-[8px] rounded-full shrink-0"
                style={{ backgroundColor: status.dotColor ?? '#00C950' }}
              />
              <span
                className="text-[16px] font-normal leading-[24px] text-[#8b8b8b] whitespace-nowrap"
                style={{ fontFamily: poppins }}
              >
                {status.label}
              </span>
            </div>
          )}
        </div>

        {/* 히어로 이미지 / 콘텐츠 영역 (960×640) */}
        {heroNode ?? (
          <div className="w-full shrink-0 bg-[#bebebe]" style={{ height: '640px' }} />
        )}

        {/* 소개 문단 */}
        <div className="flex flex-col gap-[16px]">
          {descriptions.map((text, i) => (
            <p
              key={i}
              className="text-[18px] font-normal leading-[27px] text-[#1e1e1e] w-full"
              style={{ fontFamily: poppins }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* 메타정보 그리드 */}
        <div
          className="w-full py-[20px] grid gap-[20px]"
          style={{
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            borderTop: '1px solid #f7f7f7',
            borderBottom: '1px solid #f7f7f7',
          }}
        >
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col items-start">
              <p
                className="text-[14px] font-normal leading-[21px] text-[#8b8b8b] whitespace-nowrap"
                style={{ fontFamily: poppins }}
              >
                {item.label}
              </p>
              <p
                className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {item.value}
              </p>
            </div>
          ))}

          {/* Team — 전체 너비 */}
          <div className="flex flex-col items-start" style={{ gridColumn: '1 / span 4' }}>
            <p
              className="text-[14px] font-normal leading-[21px] text-[#8b8b8b] whitespace-nowrap"
              style={{ fontFamily: poppins }}
            >
              Team
            </p>
            {teamLines.map((line, i) => (
              <p
                key={i}
                className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
