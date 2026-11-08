import { historie } from '../content'
import Layout from '../components/Layout'
import Picture from '../components/Picture'
import RingKnap from '../components/RingKnap'
import Link from '../components/Link'

// Familiens historie som en kronologi: opskrifterne, pausen og genåbningen på en
// tidslinje (det ER en rækkefølge). Pausen får et stort citat, genåbningen får
// billeder, og til sidst en teak-afslutning med invitationen. Teksten er
// uændret og synlig i den prerenderede HTML.
function Node() {
  // Messing-rude midt på tidslinjens streg (ol har padding 1,75/3,5 rem).
  return (
    <span
      aria-hidden="true"
      className="absolute -left-[2.06rem] top-3 h-2.5 w-2.5 rotate-45 bg-brass sm:-left-[3.81rem]"
    />
  )
}

const chapterTitle = 'font-display text-3xl leading-tight text-fg sm:text-5xl'
const bodyText = 'mt-5 max-w-[52ch] text-xl font-medium leading-relaxed text-fg sm:text-2xl'

function Historien() {
  const [first, pause, now] = historie.chapters

  return (
    <Layout>
      <header className="leaf-bg bg-bg">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <h1 className="max-w-4xl font-display text-5xl leading-[1.02] text-fg sm:text-7xl lg:text-8xl">
            {historie.heading}
          </h1>
        </div>
      </header>

      <div className="theme-ivory leaf-bg bg-bg text-fg">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28">
          <ol className="relative border-l border-brass/60 pl-7 sm:pl-14">
            <li className="relative pb-20 sm:pb-28">
              <Node />
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <h2 className={chapterTitle}>{first.title}</h2>
                  <p className={bodyText}>{first.text}</p>
                </div>
                <div className="lg:col-span-5">
                  <Picture
                    id="karry"
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="aspect-[4/5] w-full rounded-sm object-cover"
                  />
                </div>
              </div>
            </li>

            <li className="relative pb-20 sm:pb-28">
              <Node />
              <h2 className={chapterTitle}>{pause.title}</h2>
              <p className={bodyText}>{pause.text}</p>
              <p className="mt-10 max-w-4xl font-display text-4xl leading-[1.08] text-brass sm:text-6xl">
                {pause.quote}
              </p>
            </li>

            <li className="relative">
              <Node />
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-6">
                  <h2 className={chapterTitle}>{now.title}</h2>
                  <p className={bodyText}>{now.text}</p>
                </div>
                <div className="flex flex-col gap-4 lg:col-span-6">
                  <Picture
                    id="spisesal"
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="aspect-[4/5] w-full rounded-sm object-cover object-[50%_35%]"
                  />
                  <Picture
                    id="facade"
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="aspect-[16/9] w-full rounded-sm object-cover"
                  />
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <section className="theme-teak grain bg-bg text-fg">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="max-w-4xl font-display text-3xl leading-[1.12] text-fg sm:text-5xl">
            {historie.outro}
          </p>
          <p className="mt-8 text-xl font-semibold text-brass">{historie.closing}</p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <RingKnap variant="cta">Ring og bestil</RingKnap>
            <Link
              to="/menu"
              className="press inline-flex min-h-12 items-center justify-center rounded-full border border-fg/50 px-6 py-3 text-base font-semibold text-fg hover:bg-fg/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
            >
              Se menukortet
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Historien
