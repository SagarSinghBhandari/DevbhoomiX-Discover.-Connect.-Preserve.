import { APP_NAME } from '@/lib/constants'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-serif text-xl">{APP_NAME}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            A living archive, civic desk and community for the Himalayan state.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Explore</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li><Link to="/discover">Discover</Link></li>
            <li><Link to="/culture">Culture</Link></li>
            <li><Link to="/places">Places</Link></li>
            <li><Link to="/knowledge">Knowledge</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Act</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li><Link to="/issues">Issues</Link></li>
            <li><Link to="/create/issue">Report an issue</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/ask">Ask Uttarakhand</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Ready for FastAPI</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Mock API is on. Point VITE_API_BASE_URL at your Python backend when ready.
          </p>
        </div>
      </div>
    </footer>
  )
}
