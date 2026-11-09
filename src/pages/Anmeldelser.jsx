import Layout from '../components/Layout'
import AnmeldelserBlok, { Rating } from '../components/AnmeldelserBlok'

// /anmeldelser: gæsternes Google-anmeldelser samlet på en side. Øverst et stort
// gennemsnit på smaragd, derunder alle anmeldelserne på elfenben.
function Anmeldelser() {
  return (
    <Layout>
      <header className="theme-ink bg-bg text-fg">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:grid-cols-12">
          <h1 className="font-display text-h1 text-fg lg:col-span-7">
            Anmeldelser
          </h1>
          <Rating className="lg:col-span-5" />
        </div>
      </header>
      <AnmeldelserBlok variant="full" />
    </Layout>
  )
}

export default Anmeldelser
