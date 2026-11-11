// Sidetitel på de smalle sider (prototypen "Palmy Sider"): h1 serif 700
// 28/1.15 grøn, 56 under det kompakte skilt.
function SideTitel({ children }) {
  return <h1 className="mt-14 font-serif text-lg leading-heading font-bold text-green">{children}</h1>
}

export default SideTitel
