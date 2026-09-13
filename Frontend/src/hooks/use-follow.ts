import { followUser } from '@/api/users.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useFollow(userId: string, displayName: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => followUser(userId),
    onSuccess: (result) => {
      void qc.invalidateQueries({ queryKey: ['posts'] })
      void qc.invalidateQueries({ queryKey: ['users'] })
      void qc.invalidateQueries({ queryKey: ['user'] })
      void qc.invalidateQueries({ queryKey: ['current-user'] })
      toast.success(result.following ? `Following ${displayName}` : `Unfollowed ${displayName}`)
    },
    onError: () => toast.error('Could not update follow'),
  })
}
