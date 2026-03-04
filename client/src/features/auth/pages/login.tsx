import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useLoginMutation } from '../hooks/use-login-mutation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const { mutate, isPending } = useLoginMutation()

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    mutate({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-10 bg-card rounded-2xl shadow-lg">
        {/* Logos*/}
        <div className="mb-8 flex flex-col items-center text-center">
          {/* Logo Light */}
          <img
            src="/habittar-logo-light.jpeg"
            alt="Habittar logo"
            className="h-28 w-auto mb-4 dark:hidden"
          />

          {/* Logo Dark */}
          <img
            src="/habittar-logo-dark.jpeg"
            alt="Habittar logo"
            className="h-28 w-auto mb-4 hidden dark:block"
          />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }))
              }}
              disabled={isPending}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Lembrar - Esqueceu */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="accent-primary" />
              Lembrar de mim
            </label>

            <a href="#" className="text-primary hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          {/* Botão */}
          <Button className="w-full h-11 text-base" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>

        {/* Divisão */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OU</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Cadastrar */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Não possui uma conta?{' '}
          <Link to="/cadastrar" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
