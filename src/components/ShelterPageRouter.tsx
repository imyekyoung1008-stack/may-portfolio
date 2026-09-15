// ShelterPageRouter.tsx
// 창 너비에 따라 데스크톱 / 태블릿 / 모바일 레이아웃 전환

import { useEffect, useRef } from 'react'
import { useWindowWidth } from '../hooks/useWindowWidth'
import { saveScrollPosition, restoreScrollPosition } from '../hooks/usePreserveScroll'
import ShelterPage from './ShelterPage'
import TabletShelterPage from './TabletShelterPage'
import MobileShelterPage from './MobileShelterPage'

const SCROLL_KEY = 'shelter'

export default function ShelterPageRouter() {
  const width = useWindowWidth()
  const prevLayout = useRef('')
  const rafId = useRef(0)

  const layout = width >= 1024 ? 'desktop' : width >= 768 ? 'tablet' : 'mobile'

  if (prevLayout.current && prevLayout.current !== layout) saveScrollPosition(SCROLL_KEY)
  prevLayout.current = layout

  useEffect(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = restoreScrollPosition(SCROLL_KEY)
    return () => cancelAnimationFrame(rafId.current)
  }, [layout])

  if (width >= 1024) return <ShelterPage />
  if (width >= 768) return <TabletShelterPage />
  return <MobileShelterPage />
}
