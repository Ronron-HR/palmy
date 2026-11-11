import { notFound } from '../content'
import Layout from '../components/Layout'
import Link from '../components/Link'
import SideTitel from '../components/SideTitel'

// 404 (TEKST.md): kort besked og to veje videre. Menukortet og nummeret er de samme.
function NotFound() {
  return (
    <Layout>
      <SideTitel>{notFound.heading}</SideTitel>
      <p className="mt-3 leading-relaxed">{notFound.text}</p>
      <div className="mt-5 flex flex-col items-start gap-2 font-semibold">
        {notFound.links.map((link) => (
          <Link key={link.href} to={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default NotFound
