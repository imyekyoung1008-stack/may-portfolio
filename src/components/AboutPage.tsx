// AboutPage.tsx — About me page
// Figma: node 759:37337
// Layout: max-w-880px, px-170px, py-80px, centered

// ── Profile ──────────────────────────────────────
import imgProfile        from '../assets/images/about/profile.jpg'

// ── Card 01: Designer ────────────────────────────
import img01Designer1    from '../assets/images/about/01-designer-1.jpg'
import img01Designer2    from '../assets/images/about/01-designer-2.jpg'
import img01Designer3    from '../assets/images/about/01-designer-3.png'

// ── Card 02: Explorer ────────────────────────────
import img02Explorer1    from '../assets/images/about/02-explorer-1.png'
import img02Explorer2    from '../assets/images/about/02-explorer-2.png'
import img02Explorer3    from '../assets/images/about/02-explorer-3.png'
import img02Explorer4    from '../assets/images/about/02-explorer-4.png'

// ── Card 03: Curious Human ───────────────────────
import img03Curious1     from '../assets/images/about/03-curious-1.png'
import img03Curious2     from '../assets/images/about/03-curious-2.png'
import img03Curious3     from '../assets/images/about/03-curious-3.jpg'

// ── Icons ────────────────────────────────────────
import icClose           from '../assets/icons/close.svg'

import { useNavigate } from 'react-router-dom'

// ─────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────

const CARDS = [
  {
    num:   '01',
    title: 'Designer',
    tags:  ['Visual Thinking', 'Creative Process', 'Collaboration', 'Exploration'],
    gallery: [
      { src: img01Designer1, aspect: '3894/2774' },
      { src: img01Designer2, aspect: '4/3'       },
      { src: img01Designer3, aspect: '193/258'   },
    ],
    galleryHeight: 240,
    galleryGap: 4,
  },
  {
    num:   '02',
    title: 'Explorer',
    tags:  ['Travel', 'Hiking', 'Biking', 'Café Hopping'],
    gallery: [
      { src: img02Explorer1, aspect: '3024/4032' },
      { src: img02Explorer2, aspect: '1920/2560' },
      { src: img02Explorer3, aspect: '3072/4096' },
      { src: img02Explorer4, aspect: '1921/2560' },
    ],
    galleryHeight: 272,
    galleryGap: 8,
  },
  {
    num:   '03',
    title: 'Curious Human',
    tags:  ['Community', 'New Experiences', 'Learning', 'Trying New Things'],
    gallery: [
      { src: img03Curious1, aspect: '363/242'   },
      { src: img03Curious2, aspect: '186/281'   },
      { src: img03Curious3, aspect: '338/236'   },
    ],
    galleryHeight: 236,
    galleryGap: 4,
  },
]

// ─────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────
export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen bg-[#f7f4f0] relative"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Close button — fixed top-right */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="fixed top-[48px] right-[48px] w-[48px] h-[48px] bg-[#1e1e1e] flex items-center justify-center z-50 border-0 outline-none cursor-pointer shrink-0"
        aria-label="Close"
      >
        <img src={icClose} alt="" aria-hidden className="block w-[24px] h-[24px]" />
      </button>

      {/* Page content — centered, max 880px */}
      <div className="flex flex-col items-center px-[170px] py-[80px]">
        <div className="flex flex-col gap-[80px] items-start w-full" style={{ maxWidth: '880px' }}>

          {/* ── Top section ── */}
          <div className="flex flex-col gap-[48px] items-start w-full">

            {/* Profile photo — 200×229px */}
            <div className="w-[200px] h-[229px] relative shrink-0 overflow-hidden">
              <img
                src={imgProfile}
                alt="May Im"
                className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
              />
            </div>

            {/* Headline */}
            <div className="w-full">
              <div
                className="text-[#1e1e1e] text-[36px] leading-[0] not-italic w-full"
                style={{ fontWeight: 500 }}
              >
                <p className="leading-[47px] mb-0">I'm May,</p>
                <p className="leading-[47px]">a product designer who listens first and turns what I learn into thoughtful digital experiences.</p>
              </div>
            </div>

            {/* Body text */}
            <div
              className="text-[#1e1e1e] text-[24px] leading-[36px] not-italic w-full"
              style={{ fontWeight: 400 }}
            >
              <p className="mb-0">
                I've designed products across AI avatar creation, no-code platforms, education, and community experiences. I'm especially interested in understanding where people hesitate or struggle, then turning those moments into clearer and more intuitive experiences.
              </p>
              <p className="mt-[36px]">
                I'm most drawn to user-facing products where visual craft and usability come together. I enjoy working on web experiences, creation tools, and digital products where the design can be both useful and visually engaging.
              </p>
            </div>
          </div>

          {/* ── Bottom section: 3 cards ── */}
          <div className="flex flex-col gap-[24px] items-start w-full">
            {CARDS.map((card) => (
              <div
                key={card.num}
                className="bg-white flex flex-col gap-[24px] items-start p-[24px] w-full"
              >
                {/* Card header: number badge + title */}
                <div className="flex gap-[20px] items-center w-full">
                  <div className="bg-[#fbf27e] w-[32px] h-[32px] shrink-0 flex items-center justify-center">
                    <p
                      className="text-[#1e1e1e] text-[18px] leading-[27px] not-italic text-center whitespace-nowrap m-0"
                      style={{ fontWeight: 500 }}
                    >
                      {card.num}
                    </p>
                  </div>
                  <p
                    className="text-[#1e1e1e] text-[20px] leading-[30px] not-italic flex-1 min-w-0 m-0"
                    style={{ fontWeight: 500 }}
                  >
                    {card.title}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex gap-[8px] items-center flex-wrap">
                  {card.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-[#f7f4f0] px-[12px] py-[6px] shrink-0 flex items-center justify-center"
                    >
                      <p
                        className="text-[#1e1e1e] text-[14px] leading-[21px] not-italic whitespace-nowrap m-0"
                        style={{ fontWeight: 400 }}
                      >
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Gallery */}
                <div
                  className="flex items-start w-full overflow-hidden"
                  style={{ gap: `${card.galleryGap}px`, height: `${card.galleryHeight}px` }}
                >
                  {card.gallery.map((photo, i) => (
                    <div
                      key={i}
                      className="relative shrink-0 h-full"
                      style={{ aspectRatio: photo.aspect }}
                    >
                      <img
                        src={photo.src}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
