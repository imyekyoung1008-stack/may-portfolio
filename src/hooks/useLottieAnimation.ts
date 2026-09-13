import { useEffect, useState } from 'react'

/**
 * Fetches a Lottie JSON from the public/ folder at runtime.
 * Avoids bundling large JSON files as static imports.
 *
 * @param path - path relative to public root, e.g. '/lottie/ai-avatar-hero.json'
 */
export function useLottieAnimation(path: string): unknown | null {
  const [data, setData] = useState<unknown | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(path)
      .then(r => r.json())
      .then(json => { if (!cancelled) setData(json) })
      .catch(err => console.error('[useLottieAnimation] failed to load', path, err))
    return () => { cancelled = true }
  }, [path])

  return data
}
