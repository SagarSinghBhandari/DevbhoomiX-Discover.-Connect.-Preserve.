import { register as registerUser } from '@/api/auth.api'
import { AuthFrame } from '@/pages/auth/LoginPage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerSchema, type RegisterValues } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function RegisterPage() {
  const nav = useNavigate()
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { displayName: '', username: '', email: '', password: '', confirmPassword: '' },
  })
  const mutation = useMutation({
    mutationFn: (v: RegisterValues) =>
      registerUser({
        displayName: v.displayName,
        username: v.username,
        email: v.email,
        password: v.password,
      }),
    onSuccess: () => {
      toast.success('Account created (mock)')
      nav('/')
    },
  })
  return (
    <AuthFrame title="Create an account">
      <form className="space-y-4" onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
        <div className="space-y-2">
          <Label htmlFor="displayName">Name</Label>
          <Input id="displayName" {...form.register('displayName')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" {...form.register('username')} />
          <p className="text-xs text-destructive">{form.formState.errors.username?.message}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register('email')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...form.register('password')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm</Label>
          <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} />
          <p className="text-xs text-destructive">{form.formState.errors.confirmPassword?.message}</p>
        </div>
        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
      <p className="mt-4 text-sm">
        <Link to="/login">Already have an account</Link>
      </p>
    </AuthFrame>
  )
}
