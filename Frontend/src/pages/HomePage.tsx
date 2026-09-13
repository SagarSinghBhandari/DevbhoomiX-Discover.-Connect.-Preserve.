import { IssueCard } from '@/components/issues/IssueCard'
import { ArticleCard } from '@/components/knowledge/ArticleCard'
import { PlaceMap } from '@/components/maps/PlaceMap'
import { PlaceCard } from '@/components/places/PlaceCard'
import { PostCard } from '@/components/posts/PostCard'
import { Button } from '@/components/ui/button'
import { useArticles } from '@/hooks/use-articles'
import { useIssues } from '@/hooks/use-issues'
import { useCultureItems, usePlaces } from '@/hooks/use-locations'
import { usePosts } from '@/hooks/use-posts'
import { APP_TAGLINE } from '@/lib/constants'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export function HomePage() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const { data: issues } = useIssues()
  const { data: posts } = usePosts()
  const { data: articles } = useArticles()
  const { data: places } = usePlaces()
  const { data: culture } = useCultureItems()

  const trending = issues?.items.slice(0, 3) ?? []
  const stories = posts?.items.slice(0, 2) ?? []
  const knowledge = articles?.items.filter((a) => a.status === 'PUBLISHED').slice(0, 3) ?? []
  const featuredPlaces = places?.slice(0, 4) ?? []

  return (
    <div className="space-y-20">
      <section ref={ref} className="relative -mx-4 overflow-hidden rounded-none md:mx-0 md:rounded-2xl">
        <motion.img
          style={{ y }}
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
          alt="Himalayan ridgeline in Uttarakhand"
          className="h-[78vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Uttarakhand knowledge · civic · culture
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-white md:text-6xl">
            {APP_TAGLINE}
          </h1>
          <p className="mt-4 max-w-xl text-white/85">
            A living magazine of the hills: places, oral histories, civic issues and community knowledge —
            ready for the next monsoon and the next generation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/discover">Explore Uttarakhand</Link>
            </Button>
            <Button asChild size="lg" variant="saffron">
              <Link to="/issues">Explore Issues</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/create">Contribute Knowledge</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Act"
          title="Trending issues"
          to="/issues"
          cta="All issues"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {trending.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Discuss" title="Latest discussions" to="/community" cta="Community" />
          <div className="space-y-4">
            {stories.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
        <div>
          <SectionHead eyebrow="Learn" title="New knowledge" to="/knowledge" cta="Library" />
          <div className="space-y-4">
            {knowledge.slice(0, 2).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHead eyebrow="Document" title="Community stories" to="/community" cta="Read more" />
        <div className="grid gap-4 md:grid-cols-2">
          {(posts?.items.slice(2, 4) ?? []).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>

      <section>
        <SectionHead eyebrow="Discover" title="Explore Uttarakhand" to="/places" cta="Open map" />
        {places ? <PlaceMap places={places} height={380} /> : null}
      </section>

      <section>
        <SectionHead eyebrow="Heritage" title="Culture & heritage" to="/culture" cta="Archive" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(culture ?? []).slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to={`/culture/${item.slug}`}
              className="group overflow-hidden rounded-xl border bg-card"
            >
              <img src={item.gallery[0]?.url} alt="" className="h-36 w-full object-cover" />
              <div className="p-4">
                <p className="text-xs uppercase text-saffron">{item.kind}</p>
                <p className="font-serif text-lg group-hover:underline">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHead eyebrow="Civic" title="Important issues" to="/issues" cta="Tracker" />
        <div className="grid gap-4 md:grid-cols-2">
          {(issues?.items.filter((i) => i.severity === 'CRITICAL' || i.severity === 'HIGH').slice(0, 4) ?? []).map(
            (issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ),
          )}
        </div>
      </section>

      <section>
        <SectionHead eyebrow="Library" title="Knowledge library" to="/knowledge" cta="Browse" />
        <div className="grid gap-4 md:grid-cols-3">
          {knowledge.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <section>
        <SectionHead eyebrow="Places" title="Community contributions" to="/places" cta="Places" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPlaces.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>

      <section className="aipan-border overflow-hidden rounded-2xl border bg-primary px-6 py-12 text-primary-foreground md:px-12">
        <h2 className="font-serif text-3xl md:text-4xl">Document a village, a craft, a road, a memory.</h2>
        <p className="mt-3 max-w-2xl text-primary-foreground/80">
          Contribute knowledge, report a civic issue, or start a discussion. The archive is only as alive as the
          people who keep it.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-6">
          <Link to="/create">
            Contribute <ArrowRight />
          </Link>
        </Button>
      </section>
    </div>
  )
}

function SectionHead({
  eyebrow,
  title,
  to,
  cta,
}: {
  eyebrow: string
  title: string
  to: string
  cta: string
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">{eyebrow}</p>
        <h2 className="font-serif text-3xl">{title}</h2>
      </div>
      <Button asChild variant="ghost" size="sm">
        <Link to={to}>
          {cta} <ArrowRight />
        </Link>
      </Button>
    </div>
  )
}
