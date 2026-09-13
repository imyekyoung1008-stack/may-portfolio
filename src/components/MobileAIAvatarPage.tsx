// MobileAIAvatarPage.tsx — AI Avatar case study (Mobile <768px)
// Figma: https://www.figma.com/design/fCphmFmQRkjF6EWKKqby8E/2026?node-id=945-1125
// ★ AIAvatarPage.tsx(데스크톱) / TabletAIAvatarPage.tsx(태블릿)는 절대 건드리지 않음.

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import React from 'react'
import LottieLib from 'lottie-react'
import { useLottieAnimation } from '../hooks/useLottieAnimation'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Lottie = ((LottieLib as any).default ?? LottieLib) as React.ComponentType<any>

// ── Icons ─────────────────────────────────────────
import icClose from '../assets/icons/close.svg'

// ── Images ────────────────────────────────────────
import imgIntroHandingPhone from '../assets/images/ai-avatar/intro-handing-phone.png'

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────
const poppins = "'Poppins', sans-serif"

// ─────────────────────────────────────────────────
// Shared: Section Label (num + label)
// ─────────────────────────────────────────────────
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p className="text-[18px] font-medium leading-[26px]" style={{ fontFamily: poppins, color: '#a6daff' }}>{num}</p>
      <p className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Header — Figma 945:1125 (Mobile 390px)
// ─────────────────────────────────────────────────
function MobileAIAvatarHeader() {
  const heroAnimation = useLottieAnimation('/lottie/ai-avatar-hero.json')
  const META = [
    { label: 'Product',  value: 'Web',                  width: '163px' },
    { label: 'My role',  value: 'Solo Product Designer', width: '163px' },
    { label: 'Timeline', value: 'Q2 2026 to Q3 2026',   width: '163px' },
    { label: 'Skills',   value: 'UX Strategy, Information Architecture, UI Design, Responsive Design, AI Assisted Workflow, Stakeholder Collaboration', width: '100%' },
    { label: 'Team',     value: '2 Developers · 6 Program Managers', width: '100%' },
  ]

  return (
    <section className="w-full bg-white px-[16px] py-[48px]">

      {/* ── 상단 블록: Shipped 칩 + 타이틀/서브텍스트 ── */}
      <div className="flex flex-col gap-[16px] pb-[32px] w-full">

        {/* Shipped 칩 */}
        <div
          className="flex items-center gap-[12px] self-start"
          style={{ backgroundColor: '#f7f4f0', paddingLeft: '10px', paddingRight: '10px', paddingTop: '6px', paddingBottom: '6px' }}
        >
          <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: '#00C950' }} />
          <span
            className="text-[14px] font-normal leading-[21px] whitespace-nowrap"
            style={{ fontFamily: poppins, color: '#8b8b8b' }}
          >
            Shipped
          </span>
        </div>

        {/* 타이틀 + 서브텍스트 */}
        <div className="flex flex-col gap-[8px] w-full">
          <p
            className="text-[24px] font-medium leading-[32px] text-[#1e1e1e] w-full"
            style={{ fontFamily: poppins }}
          >
            AI Avatar Video Creation Platform
          </p>
          <p
            className="text-[16px] font-normal leading-[24px] w-full"
            style={{ fontFamily: poppins, color: '#8b8b8b' }}
          >
            Improved voice selection efficiency with 50% faster selection and 59% fewer reselections
          </p>
        </div>
      </div>

      {/* ── 하단 블록: 히어로 + 본문 + 메타 ── */}
      <div className="flex flex-col gap-[20px] w-full">

        {/* 히어로 — Lottie 애니메이션 (1800×1200 = 3:2) */}
        {heroAnimation
          ? <Lottie animationData={heroAnimation} loop autoplay className="w-full shrink-0 block" style={{ aspectRatio: '358 / 238.668' }} />
          : <div className="w-full shrink-0 bg-[#bebebe]" style={{ aspectRatio: '358 / 238.668' }} />
        }

        {/* 소개 문단 */}
        <p
          className="text-[15px] font-normal leading-[22px] text-[#1e1e1e] w-full"
          style={{ fontFamily: poppins }}
        >
          {`As the product designer, I led the end-to-end UX/UI of KT AI Human Studio, integrating video generation and voice synthesis. I worked closely with KT's AI division to align technical feasibility and UX goals, and defined and optimized the voice feature through usability testing on KT AI Voice Studio. Using Figma, I designed the core flows, including the main interface, admin pages, and payment system, and validated them through rapid prototyping.`}
        </p>

        {/* 메타정보 */}
        <div
          className="flex flex-wrap gap-[24px] py-[20px] w-full"
          style={{
            borderTop: '1px solid #f7f7f7',
            borderBottom: '1px solid #f7f7f7',
          }}
        >
          {META.map(({ label, value, width }) => (
            <div key={label} className="flex flex-col items-start" style={{ width }}>
              <p
                className="text-[13px] font-normal leading-[19px]"
                style={{ fontFamily: poppins, color: '#8b8b8b' }}
              >
                {label}
              </p>
              <p
                className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

// ─────────────────────────────────────────────────
// 01 INTRODUCTION
// ─────────────────────────────────────────────────
function Section01Introduction() {
  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[20px] w-full">
        <SectionLabel num="01" label="INTRODUCTION" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          KT AI Human Studio is a B2B platform for creating AI-powered video content with AI avatars and synthetic voices.
        </p>

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          KT AI Human Studio enables businesses to create professional-quality video content using AI avatars and synthetic voices without requiring cameras, actors, or recording studios. Users select an AI avatar, choose a voice profile, input a script, and generate a complete video — significantly reducing production time and cost for corporate training, marketing, and communications.
        </p>

        {/* Video placeholder */}
        <div
          className="w-full bg-[#c4c4c4] flex items-center justify-center"
          style={{ aspectRatio: '1920 / 1080' }}
        >
          <span className="text-[14px] font-normal" style={{ fontFamily: poppins, color: '#ff0000' }}>
            Video placeholder
          </span>
        </div>

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          The platform serves enterprise clients across industries including education, finance, retail, and media, with a particular focus on content teams that need to produce multilingual video content at scale.
        </p>

        {/* Intro handing phone image */}
        <img
          src={imgIntroHandingPhone}
          alt="AI Avatar platform interface"
          className="w-full object-cover"
          style={{ aspectRatio: '1920 / 1080' }}
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 02 PROJECT GOAL
// ─────────────────────────────────────────────────
function Section02ProjectGoal() {
  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[20px] w-full">
        <SectionLabel num="02" label="PROJECT GOAL" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Redesign the voice selection experience to reduce friction and improve confidence in voice choice.
        </p>

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          The original voice selection interface required users to navigate a long list of voice profiles with limited preview options, leading to high rates of reselection after video generation. Our goal was to redesign the voice selection flow to help users find the right voice faster, preview it more effectively, and commit to their choice with greater confidence — ultimately reducing post-generation reselection and improving overall production efficiency.
        </p>

        {/* Placeholder */}
        <div
          className="w-full bg-[#c4c4c4]"
          style={{ aspectRatio: '1920 / 1080' }}
          aria-hidden
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 03 AI Product Thinking
// ─────────────────────────────────────────────────
function Section03AIProductThinking() {
  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[20px] w-full">
        <SectionLabel num="03" label="AI Product Thinking" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Designing for AI means designing for uncertainty — users need to trust what they can't fully predict.
        </p>

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          AI-generated voice output is inherently variable — the same voice profile can sound different depending on the script, tone, and pacing. This created a fundamental UX challenge: how do you help users select a voice when the final output is difficult to preview accurately? I approached this by anchoring the design around reducing uncertainty through progressive disclosure, richer previews, and clearer voice profile metadata — giving users the information they need to make confident decisions before committing to a generation.
        </p>

        {/* Placeholder */}
        <div
          className="w-full bg-[#c4c4c4]"
          style={{ aspectRatio: '1920 / 1080' }}
          aria-hidden
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 04 Outcome
// ─────────────────────────────────────────────────
function Section04Outcome() {
  const CARDS = [
    {
      num: '01',
      body: 'Reduced voice selection time with faster preview and filtering',
      stat: '50%',
      statLabel: 'faster voice selection',
    },
    {
      num: '02',
      body: 'Significantly fewer voice reselections after video generation',
      stat: '59%',
      statLabel: 'fewer reselections',
    },
    {
      num: '03',
      body: 'Higher user satisfaction with the redesigned voice selection flow',
      stat: '4.6',
      statLabel: 'out of 5 satisfaction score',
    },
  ]

  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="04" label="Outcome" />

        {CARDS.map((card) => (
          <div
            key={card.num}
            className="w-full flex flex-col gap-[16px] px-[20px] py-[24px]"
            style={{ backgroundColor: '#a6daff' }}
          >
            {/* Badge */}
            <div
              className="flex items-center justify-center shrink-0"
              style={{ width: '32px', height: '32px', backgroundColor: '#1e1e1e' }}
            >
              <span
                className="text-[16px] font-normal leading-[24px] text-white"
                style={{ fontFamily: poppins }}
              >
                {card.num}
              </span>
            </div>

            {/* Body */}
            <p
              className="text-[16px] font-normal leading-[24px] text-[#1e1e1e]"
              style={{ fontFamily: poppins }}
            >
              {card.body}
            </p>

            {/* Stat */}
            <div className="flex flex-col gap-[2px]">
              <p
                className="text-[18px] font-semibold leading-[26px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {card.stat}
              </p>
              <p
                className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {card.statLabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 05 What did I work on?
// ─────────────────────────────────────────────────
function Section05WhatDidIWorkOn() {
  const CARDS = [
    {
      num: '01',
      title: 'Voice Selection Redesign',
      body: 'Redesigned the end-to-end voice selection flow including filtering, preview, and confirmation states to reduce cognitive load and increase selection confidence.',
    },
    {
      num: '02',
      title: 'AI Voice Studio Integration',
      body: 'Collaborated with the AI team to define how voice profile metadata should be surfaced in the UI, ensuring technical capabilities were accurately communicated to users.',
    },
    {
      num: '03',
      title: 'Usability Testing & Iteration',
      body: 'Conducted multiple rounds of usability testing with enterprise users to identify friction points and validate design decisions through rapid prototyping cycles.',
    },
  ]

  return (
    <section className="w-full bg-white px-[16px] py-[48px]">
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="05" label="What did I work on?" />

        {CARDS.map((card) => (
          <div
            key={card.num}
            className="w-full flex flex-col gap-[12px] px-[20px] py-[24px]"
            style={{ backgroundColor: '#f7f7f7' }}
          >
            <p
              className="text-[15px] font-medium leading-[22px] text-[#1e1e1e]"
              style={{ fontFamily: poppins }}
            >
              {card.num}
            </p>
            <p
              className="text-[16px] font-medium leading-[24px] text-[#1e1e1e]"
              style={{ fontFamily: poppins }}
            >
              {card.title}
            </p>
            <p
              className="text-[14px] font-normal leading-[21px] text-[#1e1e1e]"
              style={{ fontFamily: poppins }}
            >
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 06 UX Research
// ─────────────────────────────────────────────────
function Section06UXResearch() {
  const TASKS_PRIMARY = [
    {
      label: 'Task 01',
      title: 'Select a voice profile that matches a professional tone for a corporate training video',
      meta: '5 participants · Think-aloud protocol',
      bg: '#a6daff',
      textColor: '#1e1e1e',
      borderStyle: {},
    },
    {
      label: 'Task 02',
      title: 'Preview and compare two different voice profiles before making a final selection',
      meta: '5 participants · Think-aloud protocol',
      bg: '#a6daff',
      textColor: '#1e1e1e',
      borderStyle: {},
    },
  ]

  const TASKS_SECONDARY = [
    {
      label: 'Task 03',
      title: 'Filter voices by language and gender to narrow down options',
      meta: '5 participants · Task completion rate',
      bg: '#f3f3f3',
      textColor: '#666666',
      borderStyle: { border: '1px solid #dddddd' },
    },
    {
      label: 'Task 04',
      title: 'Identify the voice used in a previously generated video',
      meta: '5 participants · Task completion rate',
      bg: '#f3f3f3',
      textColor: '#666666',
      borderStyle: { border: '1px solid #dddddd' },
    },
    {
      label: 'Task 05',
      title: 'Adjust voice speed and pitch settings before finalizing the voice selection',
      meta: '5 participants · Task completion rate',
      bg: '#f3f3f3',
      textColor: '#666666',
      borderStyle: { border: '1px solid #dddddd' },
    },
  ]

  return (
    <section className="w-full px-[16px] py-[48px]" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="06" label="UX Research" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Usability testing revealed key friction points in voice selection and preview flows.
        </p>

        <p className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          I conducted moderated usability testing sessions with 5 enterprise users across two rounds to evaluate the redesigned voice selection experience. Participants were given scenario-based tasks and asked to think aloud while completing them. Sessions were recorded and analyzed for task completion rates, time-on-task, and qualitative feedback patterns.
        </p>

        {/* Primary tasks (T1, T2) */}
        {TASKS_PRIMARY.map((task) => (
          <div
            key={task.label}
            className="w-full flex flex-col gap-[10px] p-[20px]"
            style={{ backgroundColor: task.bg, ...task.borderStyle }}
          >
            <p
              className="text-[13px] font-normal leading-[19px]"
              style={{ fontFamily: poppins, color: task.textColor }}
            >
              {task.label}
            </p>
            <p
              className="text-[14px] font-medium leading-[21px]"
              style={{ fontFamily: poppins, color: task.textColor, minHeight: '56px' }}
            >
              {task.title}
            </p>
            <p
              className="text-[13px] font-normal leading-[19px]"
              style={{ fontFamily: poppins, color: task.textColor }}
            >
              {task.meta}
            </p>
          </div>
        ))}

        {/* Secondary tasks (T3–T5) */}
        {TASKS_SECONDARY.map((task) => (
          <div
            key={task.label}
            className="w-full flex flex-col gap-[10px] p-[20px]"
            style={{ backgroundColor: task.bg, ...task.borderStyle }}
          >
            <p
              className="text-[13px] font-normal leading-[19px]"
              style={{ fontFamily: poppins, color: task.textColor }}
            >
              {task.label}
            </p>
            <p
              className="text-[14px] font-medium leading-[21px]"
              style={{ fontFamily: poppins, color: task.textColor, minHeight: '56px' }}
            >
              {task.title}
            </p>
            <p
              className="text-[13px] font-normal leading-[19px]"
              style={{ fontFamily: poppins, color: task.textColor }}
            >
              {task.meta}
            </p>
          </div>
        ))}

        {/* Key Insight */}
        <div
          className="w-full flex flex-col items-center gap-[16px] p-[24px]"
          style={{ backgroundColor: '#a6daff' }}
        >
          <p
            className="text-[15px] font-normal leading-[22px] text-[#1e1e1e]"
            style={{ fontFamily: poppins }}
          >
            Key Insight
          </p>
          <p
            className="text-[18px] font-medium leading-[26px] text-[#1e1e1e] text-center"
            style={{ fontFamily: poppins }}
          >
            Users struggled most with comparing voices — they needed a side-by-side preview capability that the original interface lacked entirely.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// 07 Analysis of Results — Chart components
// ─────────────────────────────────────────────────

/** 단일 색상 막대 차트 (Success rate / Time taken / Satisfaction) */
function BarChart({
  title,
  bars,
  maxValue,
  unit = '%',
  showExpectedLine = false,
  averageLabel,
}: {
  title: string
  bars: { label: string; value: number; highlight?: boolean }[]
  maxValue: number
  unit?: string
  showExpectedLine?: boolean
  averageLabel?: string
}) {
  const barWidth = bars.length <= 5 ? '58.8px' : '47.667px'
  const BAR_AREA_H = 180 // px

  return (
    <div
      className="w-full flex flex-col px-[16px] py-[20px]"
      style={{ backgroundColor: 'white', border: '1px solid #dddddd', height: '340px', boxSizing: 'border-box' }}
    >
      {/* 제목 */}
      <p
        className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] shrink-0"
        style={{ fontFamily: poppins }}
      >
        {title}
      </p>

      {/* Average 라벨 (Satisfaction 차트) */}
      {averageLabel && (
        <p
          className="text-[13px] font-normal leading-[19px] shrink-0 mt-[4px]"
          style={{ fontFamily: poppins, color: '#8b8b8b' }}
        >
          {averageLabel}
        </p>
      )}

      {/* Bar area — 하단 정렬 */}
      <div
        className="relative flex items-end gap-[8px] mt-auto shrink-0"
        style={{ height: `${BAR_AREA_H}px` }}
      >
        {/* Expected Task Time 점선 (Time taken 차트) */}
        {showExpectedLine && (
          <div
            className="absolute left-0 right-0 flex items-center gap-[4px]"
            style={{ bottom: `${(40 / maxValue) * BAR_AREA_H * 0.7}px`, pointerEvents: 'none' }}
          >
            <div className="flex-1" style={{ borderTop: '1px dashed #8b8b8b' }} />
            <p className="text-[11px] font-normal shrink-0" style={{ fontFamily: poppins, color: '#8b8b8b' }}>
              Expected Task Time
            </p>
          </div>
        )}

        {bars.map((bar) => {
          const barH = Math.round((bar.value / maxValue) * BAR_AREA_H * 0.7)
          return (
            <div key={bar.label} className="flex flex-col items-center gap-[4px] shrink-0" style={{ width: barWidth }}>
              {/* 값 라벨 */}
              <p
                className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]"
                style={{ fontFamily: poppins }}
              >
                {bar.value}{unit}
              </p>
              {/* 막대 */}
              <div
                className="w-full shrink-0"
                style={{
                  height: `${barH}px`,
                  background: bar.highlight
                    ? 'linear-gradient(180deg, #3d5afb 0%, #1c2a78 100%)'
                    : '#e7e9f5',
                }}
              />
              {/* 막대 라벨 */}
              <p
                className="text-[13px] font-normal leading-[19px] text-[#1e1e1e] text-center"
                style={{ fontFamily: poppins }}
              >
                {bar.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** 누적 막대 차트 + 범례 (Error rate) */
function StackedBarChart({
  title,
  bars,
}: {
  title: string
  bars: { label: string; total: number; segments: { value: number; color: string }[] }[]
}) {
  const LEGEND = [
    { label: 'Interaction', color: '#8fd9d9' },
    { label: 'Labeling',    color: '#f4d98a' },
    { label: 'IA',          color: '#c9b8f5' },
    { label: 'UI',          color: '#b7e8c4' },
  ]
  const BAR_AREA_H = 148 // px
  const barWidth = '58.8px'
  const maxTotal = Math.max(...bars.map(b => b.total), 1)

  return (
    <div
      className="w-full flex flex-col px-[16px] py-[20px]"
      style={{ backgroundColor: 'white', border: '1px solid #dddddd', height: '340px', boxSizing: 'border-box' }}
    >
      {/* 제목 */}
      <p
        className="text-[16px] font-medium leading-[24px] text-[#1e1e1e] shrink-0"
        style={{ fontFamily: poppins }}
      >
        {title}
      </p>

      {/* 범례 */}
      <div className="flex flex-wrap gap-x-[12px] gap-y-[4px] shrink-0 mt-[8px]">
        {LEGEND.map(item => (
          <div key={item.label} className="flex items-center gap-[4px]">
            <div className="w-[10px] h-[10px] shrink-0" style={{ backgroundColor: item.color }} />
            <p className="text-[11px] font-normal leading-[16px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Bar area */}
      <div
        className="flex items-end gap-[8px] mt-auto shrink-0"
        style={{ height: `${BAR_AREA_H}px` }}
      >
        {bars.map((bar) => {
          const totalH = Math.round((bar.total / maxTotal) * BAR_AREA_H * 0.88)
          const segSum = bar.segments.reduce((s, seg) => s + seg.value, 0)
          return (
            <div key={bar.label} className="flex flex-col items-center gap-[4px] shrink-0" style={{ width: barWidth }}>
              {/* 값 라벨 */}
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
                {bar.total}
              </p>
              {/* 누적 막대 */}
              <div className="w-full flex flex-col-reverse shrink-0" style={{ height: `${totalH}px` }}>
                {bar.segments.map((seg, i) => (
                  <div
                    key={i}
                    className="w-full shrink-0"
                    style={{
                      height: segSum > 0 ? `${Math.round((seg.value / segSum) * totalH)}px` : '0px',
                      backgroundColor: seg.color,
                    }}
                  />
                ))}
              </div>
              {/* 막대 라벨 */}
              <p className="text-[13px] font-normal leading-[19px] text-[#1e1e1e] text-center" style={{ fontFamily: poppins }}>
                {bar.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Section07AnalysisOfResults() {
  return (
    <section className="w-full px-[16px] py-[48px]" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="flex flex-col gap-[24px] w-full">
        <SectionLabel num="07" label="Analysis of Results" />

        <p className="text-[20px] font-medium leading-[28px] text-[#1e1e1e]" style={{ fontFamily: poppins }}>
          Quantitative results confirmed significant improvements across all key metrics.
        </p>

        {/* 차트 4개 — 세로 스택, gap 16px */}
        <div className="flex flex-col gap-[16px] w-full">

          {/* Chart 1: Success rate — T1/T2 그라디언트, T3/T4/T5 연보라 */}
          <BarChart
            title="Success rate"
            bars={[
              { label: 'T1', value: 16,  highlight: true },
              { label: 'T2', value: 33,  highlight: true },
              { label: 'T3', value: 83,  highlight: false },
              { label: 'T4', value: 100, highlight: false },
              { label: 'T5', value: 100, highlight: false },
            ]}
            maxValue={100}
          />

          {/* Chart 2: Time taken — T1/T2 그라디언트, T3/T4/T5 연보라, Expected Task Time 점선 */}
          <BarChart
            title="Time taken (s)"
            bars={[
              { label: 'T1', value: 65,  highlight: true },
              { label: 'T2', value: 328, highlight: true },
              { label: 'T3', value: 283, highlight: false },
              { label: 'T4', value: 91,  highlight: false },
              { label: 'T5', value: 42,  highlight: false },
            ]}
            maxValue={328}
            unit=""
            showExpectedLine
          />

          {/* Chart 3: Error rate — 누적 막대 (Interaction/Labeling/IA) */}
          {/* T1: 8 (Interaction+Labeling), T2: 12 (Interaction+Labeling+IA), T3: 4 (Interaction+IA), T4: 0, T5: 1 (Labeling) */}
          <StackedBarChart
            title="Error rate"
            bars={[
              { label: 'T1', total: 8,  segments: [{ value: 3,   color: '#8fd9d9' }, { value: 5,   color: '#f4d98a' }] },
              { label: 'T2', total: 12, segments: [{ value: 3,   color: '#8fd9d9' }, { value: 7.5, color: '#f4d98a' }, { value: 1.5, color: '#c9b8f5' }] },
              { label: 'T3', total: 4,  segments: [{ value: 2.5, color: '#8fd9d9' }, { value: 1.5, color: '#c9b8f5' }] },
              { label: 'T4', total: 0,  segments: [] },
              { label: 'T5', total: 1,  segments: [{ value: 1,   color: '#f4d98a' }] },
            ]}
          />

          {/* Chart 4: Satisfaction — Average 2.67, P1~P6, P4만 그라디언트 */}
          <BarChart
            title="Satisfaction (/5)"
            bars={[
              { label: 'P1', value: 2.9, highlight: false },
              { label: 'P2', value: 2.9, highlight: false },
              { label: 'P3', value: 4,   highlight: false },
              { label: 'P4', value: 1,   highlight: true },
              { label: 'P5', value: 3.5, highlight: false },
              { label: 'P6', value: 2,   highlight: false },
            ]}
            maxValue={5}
            unit=""
            averageLabel="Average: 2.67"
          />

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────
export default function MobileAIAvatarPage() {
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
      {/* Close button — 모바일: 16px offset, 40×40px */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="group fixed top-[16px] right-[16px] w-[40px] h-[40px] bg-[#1e1e1e] flex items-center justify-center z-50 border-0 outline-none cursor-pointer shrink-0"
        aria-label="Close"
      >
        <img
          src={icClose}
          alt=""
          aria-hidden
          className="block w-[20px] h-[20px] transition-transform duration-200 ease-out group-hover:rotate-90"
        />
      </button>

      {/* Header */}
      <MobileAIAvatarHeader />

      {/* 01 INTRODUCTION */}
      <Section01Introduction />

      {/* 02 PROJECT GOAL */}
      <Section02ProjectGoal />

      {/* 03 AI Product Thinking */}
      <Section03AIProductThinking />

      {/* 04 Outcome */}
      <Section04Outcome />

      {/* 05 What did I work on? */}
      <Section05WhatDidIWorkOn />

      {/* 06 UX Research */}
      <Section06UXResearch />

      {/* 07 Analysis of Results */}
      <Section07AnalysisOfResults />

    </motion.div>
  )
}
