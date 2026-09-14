// SideNav.tsx — 프로젝트 상세 페이지 공용 좌측 사이드 내비게이션
// AI Avatar 페이지와 동일한 스타일/동작.
// items prop으로 페이지별 섹션 목록을 전달.

import { useState, useEffect } from 'react'

const poppins = "'Poppins', sans-serif"

export interface SideNavItem {
  id: string
  label: string
}

interface SideNavProps {
  items: readonly SideNavItem[]
}

export function SideNav({ items }: SideNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

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
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      className="hidden 3xl:block"
      style={{
        position: 'fixed',
        left: '48px',
        top: '100px',
        width: '200px',
        zIndex: 30,
        background: 'transparent',
      }}
    >
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px', background: 'transparent' }}>
        {items.map(({ id, label }) => (
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
                whiteSpace: 'nowrap',
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
