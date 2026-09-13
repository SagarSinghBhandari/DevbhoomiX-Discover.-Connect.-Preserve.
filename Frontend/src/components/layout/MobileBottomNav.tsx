import { Compass, House, Landmark, PenSquare, TriangleAlert } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Home', icon: House },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/issues', label: 'Issues', icon: TriangleAlert },
  { to: '/culture', label: 'Culture', icon: Landmark },
  { to: '/create', label: 'Create', icon: PenSquare },
]

export function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur md:hidden"
      aria-label="Bottom"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 text-[11px] ${isActive ? 'text-primary' : 'text-muted-foreground'}`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
