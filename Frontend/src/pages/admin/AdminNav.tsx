import { NavLink } from 'react-router-dom'

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/issues', label: 'Issues' },
  { to: '/admin/content', label: 'Content' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/users', label: 'Users' },
]

export function AdminNav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-2" aria-label="Admin">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          className={({ isActive }) =>
            `rounded-full border px-3 py-1 text-sm ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  )
}
