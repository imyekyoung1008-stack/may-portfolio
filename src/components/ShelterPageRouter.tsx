// ShelterPageRouter.tsx
// 창 너비에 따라 데스크톱 / 태블릿 / 모바일 레이아웃 전환
// 태블릿·모바일은 추후 별도 구현 예정 — 그 전까지는 데스크톱 컴포넌트로 폴백

import ShelterPage from './ShelterPage'

export default function ShelterPageRouter() {
  // TODO: 태블릿·모바일 반응형 추가 시 AIAvatarPageRouter와 동일한 패턴으로 확장
  return <ShelterPage />
}
