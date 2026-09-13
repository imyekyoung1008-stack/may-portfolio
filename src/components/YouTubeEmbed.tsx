/**
 * YouTubeEmbed — react-youtube 기반 반응형 임베드 + 자막 자동 영어 설정 시도
 *
 * cc_load_policy=1 로 자막을 켠 뒤, onReady 콜백에서 IFrame Player API의
 * setOption('captions', 'track', ...) 으로 영어 트랙 강제 설정을 시도한다.
 *
 * 한계: YouTube IFrame API는 자동번역(auto-translate) 자막을
 * 프로그래밍적으로 강제하는 공식 방법을 제공하지 않는다.
 * setOption 호출이 실패하면 자막은 cc_load_policy=1 로 켜진 상태(원본 한국어)로 유지되며,
 * 사용자가 CC 버튼 → 자동번역 → English 를 직접 선택할 수 있다.
 */

import YouTube from 'react-youtube'
import type { YouTubeProps, YouTubeEvent } from 'react-youtube'

interface YouTubeEmbedProps {
  videoId: string
  /** 반응형 래퍼 div에 추가할 Tailwind 클래스 */
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
      cc_load_policy: 1,  // 자막 기본 on
      cc_lang_pref: 'en',
      hl: 'en',
    } as YT.PlayerVars,
  }

  const handleReady = (event: YouTubeEvent) => {
    const player = event.target
    try {
      // 자막 트랙 목록 새로고침
      player.setOption('captions', 'reload', true)

      // 잠시 후 영어 트랙 선택 시도
      setTimeout(() => {
        try {
          // 1순위: 직접 영어 자막 트랙 선택 (영어 CC 트랙이 있을 경우)
          player.setOption('captions', 'track', { languageCode: 'en' })
        } catch {
          try {
            // 2순위: 자동번역(한국어 → 영어) 트랙 선택 시도
            // YouTube IFrame API 비공식 방식으로, 플랫폼 변경 시 동작하지 않을 수 있음
            player.setOption('captions', 'track', {
              languageCode: 'ko',
              translationLanguage: { languageCode: 'en', languageName: 'English' },
            })
          } catch {
            // 두 방법 모두 실패 시 자막은 cc_load_policy=1 상태(원본 한국어)로 유지
            // 사용자가 CC → 자동번역 → English 로 직접 선택 가능
          }
        }
      }, 1500)
    } catch {
      // setOption 자체가 실패하는 환경에서는 무시
    }
  }

  return (
    <div className={`w-full relative ${className}`} style={{ paddingTop: '56.25%' }}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={handleReady}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        iframeClassName="border-0 block w-full h-full"
      />
    </div>
  )
}
