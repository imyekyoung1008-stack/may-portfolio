// CornerstonePageRouter.tsx
// 창 너비에 따라 데스크톱 / 태블릿 레이아웃 전환
// ★ CornerstonePage.tsx(데스크톱 원본)는 한 글자도 수정하지 않음.

import { useEffect, useRef } from 'react'
import { useWindowWidth }       from '../hooks/useWindowWidth'
import { saveScrollPosition, restoreScrollPosition } from '../hooks/usePreserveScroll'
import CornerstonePage        from './CornerstonePage'         // 데스크톱 (≥1024px)
import TabletCornerstonePage  from './TabletCornerstonePage'   // 태블릿  (768–1023px)

const SCROLL_KEY = 'cornerstone'

export default function CornerstonePageRouter() {
  const width      = useWindowWidth()
  const prevLayout = useRef('')
  const rafId      = useRef(0)

  const layout = width >= 1024 ? 'desktop' : 'tablet'

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

  if (width >= 1024) return <CornerstonePage />
  return <TabletCornerstonePage />
}
