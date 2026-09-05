// Viser en rets pris: enten ét fast beløb, eller en liste af varianter
// (label + pris) når prisen afhænger af et valg med prisforskel.
function PriceList({ dish, size = 'normal' }) {
  const priceClass =
    size === 'large' ? 'text-2xl font-bold sm:text-3xl' : 'font-semibold'

  if (dish.price != null) {
    return <span className={`whitespace-nowrap text-red-warm ${priceClass}`}>{dish.price} kr</span>
  }

  if (dish.variants && dish.variants.length > 0) {
    return (
      <div className="flex flex-col items-end gap-0.5">
        {dish.variants.map((variant) => (
          <div key={variant.label} className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="text-sm text-green-deep/70">{variant.label}</span>
            <span className={`text-red-warm ${priceClass}`}>{variant.price} kr</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default PriceList
