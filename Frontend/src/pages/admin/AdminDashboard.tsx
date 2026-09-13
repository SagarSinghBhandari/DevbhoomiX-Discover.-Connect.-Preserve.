import { AdminNav } from '@/pages/admin/AdminNav'
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart'
import { DataTable } from '@/components/dashboard/DataTable'
import { StatCard } from '@/components/dashboard/StatCard'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { useArticles } from '@/hooks/use-articles'
import { useIssues } from '@/hooks/use-issues'
import { usePosts } from '@/hooks/use-posts'
import { getUsers } from '@/api/users.api'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function AdminDashboard() {
  const issues = useIssues()
  const posts = usePosts()
  const articles = useArticles()
  const users = useQuery({ queryKey: ['users'], queryFn: getUsers })
  const issueItems = issues.data?.items ?? []
  const byDistrict = Object.entries(
    issueItems.reduce<Record<string, number>>((acc, i) => {
      acc[i.district] = (acc[i.district] || 0) + 1
      return acc
    }, {}),
  ).map(([district, count]) => ({ district, count }))
  const byCategory = Object.entries(
    issueItems.reduce<Record<string, number>>((acc, i) => {
      acc[i.category] = (acc[i.category] || 0) + 1
      return acc
    }, {}),
  ).map(([category, count]) => ({ category, count }))
  const byStatus = Object.entries(
    issueItems.reduce<Record<string, number>>((acc, i) => {
      acc[i.status] = (acc[i.status] || 0) + 1
      return acc
    }, {}),
  ).map(([status, count]) => ({ status, count }))

  const pending = (articles.data?.items ?? []).filter((a) => a.status === 'IN_REVIEW')

  return (
    <div className="space-y-8">
      <AdminNav />
      <PageHeader
        eyebrow="Moderation"
        title="Admin desk"
        description="No real authorization. Charts and tables over mock civic data."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Users" value={users.data?.length ?? 0} />
        <StatCard label="Posts" value={posts.data?.total ?? 0} />
        <StatCard label="Issues" value={issues.data?.total ?? 0} />
        <StatCard label="Pending articles" value={pending.length} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border p-4">
          <h2 className="mb-3 font-serif text-lg">Issues by district</h2>
          <AnalyticsChart data={byDistrict} xKey="district" yKey="count" />
        </section>
        <section className="rounded-xl border p-4">
          <h2 className="mb-3 font-serif text-lg">Issues by category</h2>
          <AnalyticsChart data={byCategory} xKey="category" yKey="count" />
        </section>
      </div>
      <section className="rounded-xl border p-4">
        <h2 className="mb-3 font-serif text-lg">Issues by status</h2>
        <AnalyticsChart data={byStatus} xKey="status" yKey="count" />
      </section>
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-lg">Recent issues</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/issues">Open</Link>
          </Button>
        </div>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'district', label: 'District' },
            { key: 'status', label: 'Status' },
            { key: 'severity', label: 'Severity' },
          ]}
          rows={issueItems.slice(0, 8).map((i) => ({
            title: i.title.slice(0, 48),
            district: i.district,
            status: i.status,
            severity: i.severity,
          }))}
        />
      </section>
      <section>
        <h2 className="mb-3 font-serif text-lg">Pending articles</h2>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'author', label: 'Author' },
            { key: 'status', label: 'Status' },
          ]}
          rows={pending.map((a) => ({ title: a.title, author: a.author.displayName, status: a.status }))}
        />
        <div className="mt-3 flex gap-2">
          {['Approve', 'Reject', 'Hide', 'Escalate', 'Warn'].map((action) => (
            <Button key={action} size="sm" variant="outline" onClick={() => toast.message(`${action} (mock)`)}>
              {action}
            </Button>
          ))}
        </div>
      </section>
    </div>
  )
}
