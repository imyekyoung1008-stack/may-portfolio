// ProjectPageWrapper.tsx — 프로젝트 상세 페이지 공용 래퍼
// AI Avatar 페이지와 동일한 슬라이드-업 트랜지션 + 닫기 버튼을 제공.
//
// Usage:
//   <ProjectPageWrapper>
//     <YourHeroSection />
//     <YourSections />
//   </ProjectPageWrapper>

import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import icClose from '../assets/icons/close.svg'

interface ProjectPageWrapperProps {
  children: React.ReactNode
}

export function ProjectPageWrapper({ children }: ProjectPageWrapperProps) {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  // 페이지 진입 시 스크롤 맨 위로 (AI Avatar와 동일)
  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0
  }, [])

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: 'auto',
        zIndex: 20,
        backgroundColor: 'white',
      }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 닫기 버튼 — fixed top-right (AI Avatar와 동일한 위치/스타일) */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="group fixed top-[48px] right-[48px] w-[48px] h-[48px] bg-[#1e1e1e] flex items-center justify-center z-50 border-0 outline-none cursor-pointer shrink-0"
        aria-label="Close"
      >
        <img
          src={icClose}
          alt=""
          aria-hidden
          className="block w-[24px] h-[24px] transition-transform duration-200 ease-out group-hover:rotate-90"
        />
      </button>

      {children}
    </motion.div>
  )
}
