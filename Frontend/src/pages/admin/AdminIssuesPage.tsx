import { AdminNav } from '@/pages/admin/AdminNav'
import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/dashboard/DataTable'
import { useIssues } from '@/hooks/use-issues'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function AdminIssuesPage() {
  const { data } = useIssues()
  return (
    <div className="space-y-4">
      <AdminNav />
      <PageHeader eyebrow="Admin" title="Issues moderation" />
      <DataTable
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'district', label: 'District' },
          { key: 'category', label: 'Category' },
          { key: 'status', label: 'Status' },
        ]}
        rows={(data?.items ?? []).map((i) => ({
          title: i.title.slice(0, 56),
          district: i.district,
          category: i.category,
          status: i.status,
        }))}
      />
      <div className="flex gap-2">
        {['Approve', 'Reject', 'Hide', 'Escalate'].map((a) => (
          <Button key={a} variant="outline" size="sm" onClick={() => toast.message(`${a} (mock)`)}>
            {a}
          </Button>
        ))}
      </div>
    </div>
  )
}
