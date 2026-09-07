import { useState, useEffect } from 'react'

/** 창 너비를 반응형으로 반환한다. resize 이벤트로 갱신. */
export function useWindowWidth(): number {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return width
}
