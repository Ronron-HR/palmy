import { historie } from '../content'
import Layout from '../components/Layout'
import Picture from '../components/Picture'
import RingKnap from '../components/RingKnap'
import Link from '../components/Link'

// Familiens historie som en kronologi i tre rækker på papir: opskrifterne, pausen
// og genåbningen. Hver række har en kraftig blæk-streg over sig og titlen til
// venstre, teksten i midten og billederne til højre. Pausen får det store citat
// i signal-rød. Til sidst en blæk-afslutning med invitationen. Teksten er uændret
// og synlig i den prerenderede HTML.
const rowClass = 'grid gap-6 border-t-2 border-fg py-10 sm:py-14 lg:grid-cols-12 lg:gap-12'
const chapterTitle = 'font-display text-h3 text-fg lg:col-span-4'
const bodyText = 'text-lg font-medium leading-relaxed text-fg sm:text-xl lg:col-span-4'

function Historien() {
  const [first, pause, now] = historie.chapters

  return (
    <Layout>
      <header className="theme-ink bg-bg text-fg">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
          <h1 className="max-w-5xl font-display text-h1 text-fg">{historie.heading}</h1>
        </div>
      </header>

      <div className="theme-paper bg-bg text-fg">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-10">
          <section className={rowClass}>
            <h2 className={chapterTitle}>{first.title}</h2>
            <p className={bodyText}>{first.text}</p>
            <div className="lg:col-span-4">
              <Picture
                id="karry"
                sizes="(min-width: 1024px) 380px, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </section>

          <section className={rowClass}>
            <h2 className={chapterTitle}>{pause.title}</h2>
            <p className={bodyText}>{pause.text}</p>
            <p className="font-display text-[clamp(2.4rem,1.3rem+5vw,5.25rem)] leading-[0.98] text-signal lg:col-span-12 lg:mt-6">
              {pause.quote}
            </p>
          </section>

          <section className={rowClass}>
            <h2 className={chapterTitle}>{now.title}</h2>
            <p className={bodyText}>{now.text}</p>
            <div className="flex flex-col gap-3 lg:col-span-4">
              <Picture
                id="spisesal"
                sizes="(min-width: 1024px) 380px, 100vw"
                className="aspect-[4/5] w-full object-cover object-[50%_35%]"
              />
              <Picture
                id="facade"
                sizes="(min-width: 1024px) 380px, 100vw"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </section>
        </div>
      </div>

      <section className="theme-ink bg-bg text-fg">
        <div className="section-y mx-auto max-w-6xl px-4 sm:px-6">
          <p className="max-w-4xl text-2xl font-semibold leading-snug text-fg sm:text-3xl">
            {historie.outro}
          </p>
          <p className="mt-8 font-display text-h3 text-signal">{historie.closing}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <RingKnap className="w-full sm:w-auto">Ring og bestil</RingKnap>
            <Link to="/menu" className="tlink">
              Se menukortet
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Historien
