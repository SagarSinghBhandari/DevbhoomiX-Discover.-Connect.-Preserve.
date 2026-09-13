import { AdminNav } from '@/pages/admin/AdminNav'
import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/dashboard/DataTable'
import { useArticles } from '@/hooks/use-articles'
import { usePosts } from '@/hooks/use-posts'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function AdminContentPage() {
  const articles = useArticles()
  const posts = usePosts()
  return (
    <div className="space-y-8">
      <AdminNav />
      <PageHeader eyebrow="Admin" title="Content queue" />
      <section>
        <h2 className="mb-3 font-serif text-lg">Articles</h2>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'type', label: 'Type' },
            { key: 'status', label: 'Status' },
          ]}
          rows={(articles.data?.items ?? []).map((a) => ({
            title: a.title,
            type: a.type,
            status: a.status,
          }))}
        />
      </section>
      <section>
        <h2 className="mb-3 font-serif text-lg">Posts</h2>
        <DataTable
          columns={[
            { key: 'author', label: 'Author' },
            { key: 'type', label: 'Type' },
            { key: 'likes', label: 'Likes' },
          ]}
          rows={(posts.data?.items ?? []).map((p) => ({
            author: p.author.displayName,
            type: p.type,
            likes: p.likeCount,
          }))}
        />
      </section>
      <Button variant="outline" onClick={() => toast.message('Bulk approve (mock)')}>
        Approve selected
      </Button>
    </div>
  )
}
