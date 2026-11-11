import Layout from '../components/Layout'
import MenuSections from '../components/menu/MenuSections'

// Forside — hovedperson: menuen (DESIGN.md "Sektionsplan").
function Home() {
  return (
    <Layout sign="full" column="wide">
      <MenuSections variant="forside" />
    </Layout>
  )
}

export default Home
