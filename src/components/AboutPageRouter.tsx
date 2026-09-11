// AboutPageRouter.tsx
// 창 너비에 따라 데스크톱/태블릿/모바일 About 페이지 중 하나를 렌더링한다.

import { useEffect, useRef } from 'react'
import { useWindowWidth }       from '../hooks/useWindowWidth'
import { saveScrollPosition, restoreScrollPosition } from '../hooks/usePreserveScroll'
import AboutPage       from './AboutPage'        // 데스크톱 (≥1440px)
import TabletAboutPage from './TabletAboutPage'  // 태블릿  (1024–1439px)
import MobileAboutPage from './MobileAboutPage'  // 모바일  (<1024px)

const SCROLL_KEY = 'about'

export default function AboutPageRouter() {
  const width      = useWindowWidth()
  const prevLayout = useRef('')
  const rafId      = useRef(0)

  const layout = width >= 1440 ? 'desktop' : width >= 1024 ? 'tablet' : 'mobile'

  // 렌더 단계: 구 DOM이 아직 살아있는 동안 스크롤 저장
  if (prevLayout.current && prevLayout.current !== layout) {
    saveScrollPosition(SCROLL_KEY)
  }
  prevLayout.current = layout

  // 새 컴포넌트 마운트 후 rAF으로 복원
  useEffect(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = restoreScrollPosition(SCROLL_KEY)
    return () => cancelAnimationFrame(rafId.current)
  }, [layout])

  if (width >= 1440) return <AboutPage />
  if (width >= 1024) return <TabletAboutPage />
  return <MobileAboutPage />
}
