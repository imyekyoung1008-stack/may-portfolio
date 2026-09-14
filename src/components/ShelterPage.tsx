// ShelterPage.tsx — Homeless Shelter Management System case study
// Route: /projects/shelter
// Desktop layout (≥1024px). 반응형은 추후 별도 작업.

import { useLottieAnimation } from '../hooks/useLottieAnimation'
import { LottieHeroPlayer } from './LottieHeroPlayer'
import { ProjectHero } from './ProjectHero'
import { ProjectPageWrapper } from './ProjectPageWrapper'

const poppins = "'Poppins', sans-serif"

// ─────────────────────────────────────────────────
// 섹션 레이블 — 번호(accent #CEE0D3) + 소제목
// ─────────────────────────────────────────────────
function ShelterSectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p
        className="text-[24px] font-medium leading-[36px]"
        style={{ fontFamily: poppins, color: '#CEE0D3' }}
      >
        {num}
      </p>
      <p
        className="text-[20px] font-medium leading-[30px] text-[#1e1e1e]"
        style={{ fontFamily: poppins }}
      >
        {label}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────
// 01 Introduction
// ─────────────────────────────────────────────────
function IntroSection() {
  return (
    <section className="w-full bg-white px-[170px]">
      <div
        className="max-w-[960px] mx-auto w-full flex flex-col"
        style={{ paddingTop: '60px', paddingBottom: '60px', gap: '24px' }}
      >
        <ShelterSectionLabel num="01" label="Introduction" />

        <h2
          className="text-[#1e1e1e] w-full m-0"
          style={{
            fontFamily: poppins,
            fontSize: '28px',
            fontWeight: 500,
            lineHeight: '36px',
          }}
        >
          A pilot platform for homeless shelters in Seoul
        </h2>

        <p
          className="text-[#1e1e1e] w-full m-0"
          style={{
            fontFamily: poppins,
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '27px',
          }}
        >
          As competition winners, we piloted a homeless shelter platform (web for admins, app for 79 residents) in two Seoul shelters. Joining as a product designer, I addressed the initial MVP's technical shortcomings by improving existing screens based on user feedback and designing new features.
        </p>

        {/* YouTube 임베드 — 1920/1080 (16:9) */}
        <div
          className="w-full overflow-hidden"
          style={{ aspectRatio: '1920/1080' }}
        >
          <iframe
            src="https://www.youtube.com/embed/dm4Zx-AYR5Y"
            title="Homeless Shelter Management System Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// ShelterPage
// ─────────────────────────────────────────────────
export default function ShelterPage() {
  const heroAnimation = useLottieAnimation('/lottie/wildflower-hero.json')

  return (
    <ProjectPageWrapper>
      <ProjectHero
        title="Homeless Shelter Management System"
        subtitle="94.3% NFC adoption and 30+ minutes faster response time"
        status={{ label: 'Shipped' }}
        heroNode={
          heroAnimation
            ? <LottieHeroPlayer
                animationData={heroAnimation}
                className="w-full shrink-0 block"
                style={{ height: '640px' }}
              />
            : <div className="w-full shrink-0 bg-[#bebebe]" style={{ height: '640px' }} />
        }
        descriptions={[
          'As the Product Designer for Wildflower Gardening, I improved an existing shelter management MVP through field research, usability testing, and iterative redesign. The product included a mobile app for residents and a web platform for shelter administrators.',
          'I worked closely with a PM and developers to simplify core flows such as leave requests, status tracking, notifications, and program participation. Based on research with real shelter residents, I redesigned the experience to make essential tasks easier to find and use for people with limited digital familiarity.',
        ]}
        meta={[
          { label: 'Product',  value: 'Mobile App + Admin Web' },
          { label: 'My role',  value: 'Product Designer · Mobile App Lead' },
          { label: 'Timeline', value: 'Q3 2024 to Q1 2025' },
          { label: 'Skills',   value: 'UX Research, Usability Testing, Information Architecture, Interaction Design, UI Design, Prototyping' },
        ]}
        teamLines={['2 Product Designers · 1 PM · 5 Developers']}
      />

      <IntroSection />
    </ProjectPageWrapper>
  )
}
