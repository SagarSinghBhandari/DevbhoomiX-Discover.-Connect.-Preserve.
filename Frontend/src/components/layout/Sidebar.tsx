import { NAV_PRIMARY } from '@/lib/constants'
import { Bookmark, LayoutDashboard, PenSquare, Sparkles, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const extra = [
  { to: '/ask', label: 'Ask Uttarakhand', icon: Sparkles },
  { to: '/create', label: 'Contribute', icon: PenSquare },
  { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { to: '/profile/meera.rawat', label: 'Profile', icon: User },
  { to: '/admin', label: 'Admin', icon: LayoutDashboard },
]

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r xl:block">
      <div className="sticky top-16 space-y-1 p-4">
        {NAV_PRIMARY.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
        {extra.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
