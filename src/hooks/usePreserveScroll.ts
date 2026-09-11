/**
 * usePreserveScroll.ts
 *
 * 브레이크포인트 전환 시 스크롤 위치를 유지하기 위한 유틸리티.
 *
 * 동작 원리:
 *  - saveScrollPosition(key)    : [data-scroll-id="key"] 요소의 scrollTop을 모듈 변수에 저장.
 *                                  렌더 단계에서 구 DOM이 아직 살아있을 때 호출한다.
 *  - restoreScrollPosition(key) : 저장된 scrollTop을 requestAnimationFrame으로 복원.
 *                                  자식 컴포넌트의 useEffect(scrollTop=0) 이후에 실행되도록
 *                                  rAF으로 한 프레임 뒤로 미룬다.
 *                                  MAX_AGE_MS 이내에 저장된 값만 복원하므로,
 *                                  신규 네비게이션(시간이 충분히 지난 경우)에는 0에서 시작한다.
 *
 * 사용처: AIAvatarPageRouter (현재는 AI Avatar 페이지에만 적용)
 */

const store: Record<string, { y: number; ts: number }> = {}
const MAX_AGE_MS = 1500 // ms — 이 시간 이내에 재마운트되면 "리사이즈"로 간주

/**
 * 현재 DOM에서 스크롤 위치를 저장.
 * [data-scroll-id="key"] 속성을 가진 요소를 찾아 scrollTop을 기록한다.
 */
export function saveScrollPosition(key: string): void {
  const el = document.querySelector<HTMLElement>(`[data-scroll-id="${key}"]`)
  if (el) store[key] = { y: el.scrollTop, ts: Date.now() }
}

/**
 * 스크롤 위치를 복원. requestAnimationFrame을 사용해 자식 useEffect 이후에 실행.
 * - 리사이즈(MAX_AGE_MS 이내) → 저장된 scrollTop 복원
 * - 신규 네비게이션 → 복원하지 않음 (scrollTop = 0으로 자연스럽게 시작)
 * @returns rAF ID (cancelAnimationFrame에 사용)
 */
export function restoreScrollPosition(key: string): number {
  const entry = store[key]
  if (!entry || Date.now() - entry.ts > MAX_AGE_MS) return 0

  return requestAnimationFrame(() => {
    const el = document.querySelector<HTMLElement>(`[data-scroll-id="${key}"]`)
    if (el) el.scrollTop = entry.y
  })
}
