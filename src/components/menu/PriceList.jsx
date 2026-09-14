import { Fragment } from 'react'

// Viser en rets pris: enten ét fast beløb, eller varianter i et 2-kolonne grid
// (variantnavn venstre, pris højre) så variantpriserne flugter — både internt i
// retten og med de faste priser i kolonnen ude til højre.
function PriceList({ dish, size = 'normal' }) {
  const priceClass = size === 'large' ? 'text-2xl font-bold sm:text-3xl' : 'font-semibold'

  if (dish.price != null) {
    return <span className={`whitespace-nowrap text-red-warm ${priceClass}`}>{dish.price} kr</span>
  }

  if (dish.variants && dish.variants.length > 0) {
    return (
      <div className="grid grid-cols-[auto_auto] items-baseline gap-x-4 gap-y-0.5">
        {dish.variants.map((variant) => (
          <Fragment key={variant.label}>
            <span className="text-left text-sm text-green-deep/70">{variant.label}</span>
            <span className={`whitespace-nowrap text-right text-red-warm ${priceClass}`}>
              {variant.price} kr
            </span>
          </Fragment>
        ))}
      </div>
    )
  }

  return null
}

export default PriceList
