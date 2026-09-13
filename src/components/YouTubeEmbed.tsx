/**
 * YouTubeEmbed — react-youtube 기반 반응형 임베드
 *
 * cc_load_policy=1 로 자막을 기본 on 상태로 시작.
 * 자동번역 영어 자막은 YouTube IFrame API 제약으로 프로그래밍 강제 불가 —
 * 사용자가 CC 버튼 → 자동번역 → English 로 직접 선택 가능.
 */

import YouTube from 'react-youtube'
import type { YouTubeProps } from 'react-youtube'

interface YouTubeEmbedProps {
  videoId: string
  className?: string
}

export function YouTubeEmbed({ videoId, className = '' }: YouTubeEmbedProps) {
  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1,
      rel: 0,
      playsinline: 1,
      cc_load_policy: 1,
      cc_lang_pref: 'en',
      hl: 'en',
    } as YT.PlayerVars,
  }

  return (
    <div className={`w-full relative ${className}`} style={{ paddingTop: '56.25%' }}>
      <YouTube
        videoId={videoId}
        opts={opts}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        iframeClassName="border-0 block w-full h-full"
      />
    </div>
  )
}
