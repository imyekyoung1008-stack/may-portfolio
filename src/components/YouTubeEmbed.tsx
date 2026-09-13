/**
 * YouTubeEmbed — react-youtube 기반 반응형 임베드
 *
 * cc_load_policy=0 으로 자막을 명시적으로 off 상태로 시작.
 * 사용자가 CC 버튼으로 직접 켤 수 있음.
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
      cc_load_policy: 0,
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
