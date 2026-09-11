// AIAvatarPageRouter.tsx
// 창 너비에 따라 데스크톱 / 태블릿 / 모바일 레이아웃 전환
// ★ AIAvatarPage.tsx(데스크톱 원본)는 한 글자도 수정하지 않음.

import { useWindowWidth } from '../hooks/useWindowWidth'
import AIAvatarPage        from './AIAvatarPage'        // 데스크톱 (≥1024px)
import TabletAIAvatarPage  from './TabletAIAvatarPage'  // 태블릿  (768–1023px)
import MobileAIAvatarPage  from './MobileAIAvatarPage'  // 모바일  (<768px)

export default function AIAvatarPageRouter() {
  const width = useWindowWidth()

  if (width >= 1024) return <AIAvatarPage />
  if (width >= 768)  return <TabletAIAvatarPage />
  return <MobileAIAvatarPage />
}
