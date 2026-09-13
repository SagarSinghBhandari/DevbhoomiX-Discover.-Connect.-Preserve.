import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export function AppShell() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 pb-24 pt-8 md:pb-12">
          <Suspense
            fallback={
              <div className="animate-pulse py-24 text-center text-sm text-muted-foreground">Loading…</div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
