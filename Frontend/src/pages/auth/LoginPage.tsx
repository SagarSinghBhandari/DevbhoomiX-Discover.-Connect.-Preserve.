import { login } from '@/api/auth.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginSchema, type LoginValues } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function LoginPage() {
  const nav = useNavigate()
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'meera.rawat@uttarakhand.in', password: 'password123' },
  })
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Signed in (mock session)')
      nav('/')
    },
  })
  return (
    <AuthFrame title="Sign in">
      <form className="space-y-4" onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="current-password" {...form.register('password')} />
        </div>
        <Button className="w-full" type="submit" disabled={mutation.isPending}>
          Continue
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        <Link to="/forgot-password">Forgot password</Link> · <Link to="/register">Create account</Link>
      </p>
    </AuthFrame>
  )
}

export function AuthFrame({ title, children }: { title: string; children: import('react').ReactNode }) {
  return (
    <div className="mx-auto max-w-md py-8">
      <h1 className="font-serif text-3xl">{title}</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Mock auth only. No tokens leave this browser.</p>
      {children}
    </div>
  )
}
