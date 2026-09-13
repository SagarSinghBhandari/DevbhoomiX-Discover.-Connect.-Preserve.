import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-saffron">404</p>
      <h1 className="mt-2 font-serif text-4xl">This trail is not on the map</h1>
      <Button asChild className="mt-6">
        <Link to="/">Return home</Link>
      </Button>
    </div>
  )
}
