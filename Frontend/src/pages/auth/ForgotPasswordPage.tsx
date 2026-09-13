import { requestPasswordReset } from '@/api/auth.api'
import { AuthFrame } from '@/pages/auth/LoginPage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotSchema, type ForgotValues } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function ForgotPasswordPage() {
  const form = useForm<ForgotValues>({ resolver: zodResolver(forgotSchema), defaultValues: { email: '' } })
  const mutation = useMutation({
    mutationFn: (v: ForgotValues) => requestPasswordReset(v.email),
    onSuccess: () => toast.success('Reset link sent (mock)'),
  })
  return (
    <AuthFrame title="Reset password">
      <form className="space-y-4" onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register('email')} />
        </div>
        <Button className="w-full" type="submit">
          Send reset link
        </Button>
      </form>
    </AuthFrame>
  )
}
