import { AdminNav } from '@/pages/admin/AdminNav'
import { getUsers } from '@/api/users.api'
import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/dashboard/DataTable'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export function AdminUsersPage() {
  const { data } = useQuery({ queryKey: ['users'], queryFn: getUsers })
  return (
    <div className="space-y-4">
      <AdminNav />
      <PageHeader eyebrow="Admin" title="Users" />
      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' },
          { key: 'district', label: 'District' },
          { key: 'score', label: 'Score' },
        ]}
        rows={(data ?? []).map((u) => ({
          name: u.displayName,
          role: u.role,
          district: u.district ?? '—',
          score: u.contributionScore,
        }))}
      />
      <Button variant="outline" onClick={() => toast.message('Warn user (mock)')}>
        Warn
      </Button>
    </div>
  )
}
