import Layout from '../components/Layout'
import AnmeldelserBlok, { Rating } from '../components/AnmeldelserBlok'

// /anmeldelser: gæsternes Google-anmeldelser samlet på en side. Øverst et stort
// gennemsnit på smaragd, derunder alle anmeldelserne på elfenben.
function Anmeldelser() {
  return (
    <Layout>
      <header className="leaf-bg bg-bg">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:grid-cols-12">
          <h1 className="font-display text-5xl leading-none text-fg sm:text-7xl lg:col-span-7">
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
