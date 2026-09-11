// AIAvatarPageRouter.tsx
// 창 너비에 따라 데스크톱 / 태블릿 / 모바일 레이아웃 전환
// ★ AIAvatarPage.tsx(데스크톱 원본)는 한 글자도 수정하지 않음.

import { useEffect, useRef } from 'react'
import { useWindowWidth }       from '../hooks/useWindowWidth'
import { saveScrollPosition, restoreScrollPosition } from '../hooks/usePreserveScroll'
import AIAvatarPage        from './AIAvatarPage'        // 데스크톱 (≥1024px)
import TabletAIAvatarPage  from './TabletAIAvatarPage'  // 태블릿  (768–1023px)
import MobileAIAvatarPage  from './MobileAIAvatarPage'  // 모바일  (<768px)

const SCROLL_KEY = 'ai-avatar'

export default function AIAvatarPageRouter() {
  const width      = useWindowWidth()
  const prevLayout = useRef('')
  const rafId      = useRef(0)

  const layout = width >= 1024 ? 'desktop' : width >= 768 ? 'tablet' : 'mobile'

  // ── 렌더 단계: 구 DOM이 아직 살아있는 동안 스크롤 저장 ─────────────
  if (prevLayout.current && prevLayout.current !== layout) {
    saveScrollPosition(SCROLL_KEY)
  }
  prevLayout.current = layout

  // ── 새 컴포넌트 마운트 후 rAF으로 복원 ──────────────────────────────
  // useEffect는 자식 useEffect 이후에 실행되므로,
  // 자식의 scrollTop=0 리셋이 끝난 뒤 rAF으로 올바른 위치를 덮어씀.
  useEffect(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = restoreScrollPosition(SCROLL_KEY)
    return () => cancelAnimationFrame(rafId.current)
  }, [layout])

  if (width >= 1024) return <AIAvatarPage />
  if (width >= 768)  return <TabletAIAvatarPage />
  return <MobileAIAvatarPage />
}
