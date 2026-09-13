import { ImageGallery } from '@/components/common/ImageGallery'
import { LocationBadge } from '@/components/common/LocationBadge'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/types'

export function ArticleReader({ article }: { article: Article }) {
  const headings = article.body.filter((b) => b.kind === 'heading')
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-[0.18em] text-saffron">{article.type}</p>
      <h1 className="mt-2 font-serif text-4xl leading-tight">{article.title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{article.subtitle}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>{article.author.displayName}</span>
        {article.publishedAt ? <span>{formatDate(article.publishedAt)}</span> : null}
        <span>{article.readingTimeMin} min read</span>
        {article.district ? <LocationBadge label={article.district} /> : null}
      </div>
      <img src={article.cover.url} alt={article.cover.alt || ''} className="my-8 aspect-[16/8] w-full rounded-xl object-cover" />
      {headings.length ? (
        <nav className="mb-8 rounded-lg border bg-muted/40 p-4 text-sm" aria-label="Table of contents">
          <p className="mb-2 font-medium">Contents</p>
          <ol className="list-decimal space-y-1 pl-4">
            {headings.map((h, i) => (
              <li key={i}>{h.kind === 'heading' ? h.text : null}</li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="space-y-4 text-[17px] leading-8">
        {article.body.map((block, i) => {
          if (block.kind === 'heading') {
            const Tag = block.level === 2 ? 'h2' : 'h3'
            return (
              <Tag key={i} className="font-serif text-2xl">
                {block.text}
              </Tag>
            )
          }
          if (block.kind === 'quote') {
            return (
              <blockquote key={i} className="border-l-2 border-saffron pl-4 italic">
                {block.text}
                {block.attribution ? <footer className="mt-1 text-sm not-italic text-muted-foreground">— {block.attribution}</footer> : null}
              </blockquote>
            )
          }
          if (block.kind === 'image') {
            return (
              <figure key={i}>
                <img src={block.url} alt={block.alt || ''} className="rounded-lg" />
                {block.caption ? <figcaption className="mt-1 text-sm text-muted-foreground">{block.caption}</figcaption> : null}
              </figure>
            )
          }
          if (block.kind === 'video') {
            return (
              <figure key={i}>
                <video src={block.url} controls className="w-full rounded-lg" />
                {block.caption ? <figcaption className="mt-1 text-sm text-muted-foreground">{block.caption}</figcaption> : null}
              </figure>
            )
          }
          return <p key={i}>{block.text}</p>
        })}
      </div>
      {article.cover ? <div className="mt-8"><ImageGallery items={[article.cover]} /></div> : null}
      <section className="mt-10">
        <h2 className="font-serif text-xl">References</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {article.references.map((r) => (
            <li key={r.title}>
              {r.title} — {r.source}
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
