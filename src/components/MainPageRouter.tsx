// MainPageRouter.tsx
// 창 너비에 따라 세 레이아웃 중 하나를 렌더링한다.
// ★ MainPage.tsx(데스크톱 원본)는 한 글자도 수정하지 않음.

import { useWindowWidth } from '../hooks/useWindowWidth'
import MainPage       from './MainPage'        // 데스크톱 (≥1440px) — 원본 그대로
import TabletMainPage from './TabletMainPage'  // 태블릿  (1024–1439px)
import MobileMainPage from './MobileMainPage'  // 모바일  (<1024px)

export default function MainPageRouter() {
  const width = useWindowWidth()

  if (width >= 1440) return <MainPage />
  if (width >= 1024) return <TabletMainPage />
  return <MobileMainPage />
}
