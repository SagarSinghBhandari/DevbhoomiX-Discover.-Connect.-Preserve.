import { AdminNav } from '@/pages/admin/AdminNav'
import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/dashboard/DataTable'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const rows = [
  { id: 'R-104', target: 'Post · Char Dham opinion', reason: 'Harassment', status: 'Open' },
  { id: 'R-105', target: 'Issue · Rudrapur bypass', reason: 'Duplicate', status: 'Resolved' },
  { id: 'R-106', target: 'Article draft · Ringaal', reason: 'Copyright', status: 'Open' },
]

export function AdminReportsPage() {
  return (
    <div className="space-y-4">
      <AdminNav />
      <PageHeader eyebrow="Admin" title="Reported content" />
      <DataTable
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'target', label: 'Target' },
          { key: 'reason', label: 'Reason' },
          { key: 'status', label: 'Status' },
        ]}
        rows={rows}
      />
      <Button variant="outline" onClick={() => toast.message('Escalate (mock)')}>
        Escalate
      </Button>
    </div>
  )
}
