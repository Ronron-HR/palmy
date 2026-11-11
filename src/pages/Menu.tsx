import { menuText } from '../content'
import Layout from '../components/Layout'
import MenuSections from '../components/menu/MenuSections'

// /menu: kompakt skilt → sticky kategori-nav → hele menuen → "Udskriv
// menukortet" → footer (DESIGN.md "Menu"). Alt fra data/menu.ts.
function MenuPage() {
  return (
    <Layout column="wide" menuPage>
      <h1 className="sr-only">{menuText.pageHeading}</h1>
      <MenuSections variant="menu" />
      <div className="mt-8">
        <button
          type="button"
          onClick={() => window.print()}
          className="press min-h-(--btn-print-h) border border-black px-5 font-semibold"
        >
          {menuText.printButton}
        </button>
      </div>
    </Layout>
  )
}

export default MenuPage
