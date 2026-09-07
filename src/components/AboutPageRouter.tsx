// AboutPageRouter.tsx
// 창 너비에 따라 데스크톱/태블릿/모바일 About 페이지 중 하나를 렌더링한다.

import { useWindowWidth } from '../hooks/useWindowWidth'
import AboutPage       from './AboutPage'        // 데스크톱 (≥1440px)
import TabletAboutPage from './TabletAboutPage'  // 태블릿  (1024–1439px)
import MobileAboutPage from './MobileAboutPage'  // 모바일  (<1024px)

export default function AboutPageRouter() {
  const width = useWindowWidth()

  if (width >= 1440) return <AboutPage />
  if (width >= 1024) return <TabletAboutPage />
  return <MobileAboutPage />
}
