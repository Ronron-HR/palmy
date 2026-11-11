import { business, faq, findOs } from '../content'
import Layout from '../components/Layout'
import Picture from '../components/Picture'
import SideTitel from '../components/SideTitel'

// /find-os (ny side, typografi som hovedperson): adressen stort som link til
// Google Maps, tider, telefon, skiltets to guldblokke, facaden og to
// spørgsmål som almindelig tekst. Ingen kort-embed, ingen accordion.
function FindOs() {
  return (
    <Layout>
      <SideTitel>{findOs.heading}</SideTitel>
      <a
        href={business.googleMapsUrl}
        target="_blank"
        rel="noopener"
        className="mt-4 block text-xl leading-address font-bold decoration-(length:--address-underline) underline-offset-(--address-underline-offset)"
      >
        {business.address}
      </a>
      <p className="mt-(--sign-info-gap)">{findOs.region}</p>

      <div className="mt-10 flex flex-col gap-(--page-blocks-gap) leading-body">
        {findOs.blocks.map((block) => (
          <p key={block.label} className={block.gold ? 'border-l border-gold pl-3' : ''}>
            <b>{block.label}</b>
            <br />
            {block.phone ? <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a> : block.text}
          </p>
        ))}
      </div>

      <Picture
        id="facade"
        sizes="(min-width: 768px) 640px, 100vw"
        className="mt-10 block aspect-wide w-full object-cover object-(--pos-facade)"
      />

      <h2 className="mt-12 font-serif text-lg leading-heading font-bold text-green">{findOs.qaHeading}</h2>
      <div className="mt-4 flex flex-col gap-(--page-blocks-gap) leading-relaxed">
        {faq.items.map((item) => (
          <p key={item.question}>
            <b>{item.question}</b>
            <br />
            {item.answer}
          </p>
        ))}
      </div>
    </Layout>
  )
}

export default FindOs
