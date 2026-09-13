import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/use-auth'
import { useNotifications } from '@/hooks/use-notifications'
import { APP_NAME, NAV_PRIMARY } from '@/lib/constants'
import { Bell, Menu, PenSquare, Search, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function Navbar() {
  const { data: user } = useCurrentUser()
  const { data: notes } = useNotifications()
  const unread = notes?.filter((n) => !n.read).length ?? 0
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link to="/" className="font-serif text-xl tracking-tight">
          {APP_NAME}
        </Link>
        <nav className="ml-6 hidden items-center gap-4 lg:flex" aria-label="Primary">
          {NAV_PRIMARY.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="Search">
            <Link to="/search">
              <Search />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Ask Uttarakhand">
            <Link to="/ask">
              <Sparkles />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label={`Notifications ${unread} unread`}>
            <Link to="/settings" className="relative">
              <Bell />
              {unread ? (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-saffron" />
              ) : null}
            </Link>
          </Button>
          <ThemeToggle />
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/create">
              <PenSquare /> Contribute
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl} alt={user?.displayName} />
                  <AvatarFallback>{user?.displayName?.[0] ?? 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.displayName ?? 'Guest'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/profile/${user?.username ?? 'meera.rawat'}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bookmarks">Bookmarks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/my-contributions">Contributions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin">Admin</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login">Sign in</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <Menu />
          </Button>
        </div>
      </div>
      {open ? (
        <nav className="border-t px-4 py-3 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-2">
            {NAV_PRIMARY.map((item) => (
              <Link key={item.to} to={item.to} className="py-1 text-sm" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
