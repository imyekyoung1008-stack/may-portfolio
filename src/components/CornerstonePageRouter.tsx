// CornerstonePageRouter.tsx
// 창 너비에 따라 데스크톱 / 태블릿 레이아웃 전환
// ★ CornerstonePage.tsx(데스크톱 원본)는 한 글자도 수정하지 않음.

import { useWindowWidth } from '../hooks/useWindowWidth'
import CornerstonePage        from './CornerstonePage'         // 데스크톱 (≥1024px)
import TabletCornerstonePage  from './TabletCornerstonePage'   // 태블릿  (768–1023px)

export default function CornerstonePageRouter() {
  const width = useWindowWidth()

  if (width >= 1024) return <CornerstonePage />
  return <TabletCornerstonePage />
}
