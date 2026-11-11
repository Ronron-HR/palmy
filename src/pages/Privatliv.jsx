import { Fragment } from 'react'
import { business, privatliv } from '../content'
import Layout from '../components/Layout'
import SideTitel from '../components/SideTitel'

// /privatliv — teksten ordret fra prototypen (content.js). Smal tekstspalte.
function Privatliv() {
  return (
    <Layout>
      <SideTitel>{privatliv.heading}</SideTitel>
      <div className="mt-3 flex max-w-(--measure-privatliv) flex-col gap-3 leading-long">
        <p className="italic">{privatliv.updated}</p>
        {privatliv.sections.map((section) => (
          <Fragment key={section.title}>
            <h2 className="mt-4 text-md font-bold">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.text}>
                {paragraph.text}
                {paragraph.phone && (
                  <>
                    <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>.
                  </>
                )}
              </p>
            ))}
          </Fragment>
        ))}
      </div>
    </Layout>
  )
}

export default Privatliv
