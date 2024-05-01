import Icon from "./Icon"

export default function Button({ variation, label, icon, className, onClick, ...props }) {
  switch (variation) {
    case "regular":
      return (
        <button onClick={onClick} className={`relative p-3 px-4 uppercase tracking-tightest rounded-lg font-bold group ${className}`} {...props}>
          {icon && <Icon url={icon} />}
          {label}
          <Overlay />
        </button>
      )
    case "link":
      return (
        <button onClick={onClick} className={`relative flex items-center gap-2 font-bold group ${className}`} {...props}>
          {icon && <Icon url={icon} />}
				  <span>{label}</span>
          <Overlay />
				</button>
      )
  }
}
function Overlay() {
  return (
    <div className="absolute inset-0 bg-white/0 duration-200 ease-in-out group-hover:bg-white/60 group-data-[state=active]:bg-white/60"></div>
  )
}