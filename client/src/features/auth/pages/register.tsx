import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-10 bg-card rounded-2xl shadow-lg border border-border/50">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col items-center text-center">
          <img
            src="/habittar-logo-light.jpeg"
            alt="Habittar logo"
            className="h-20 w-auto mb-4 dark:hidden"
          />
          <img
            src="/habittar-logo-dark.jpeg"
            alt="Habittar logo"
            className="h-20 w-auto mb-4 hidden dark:block"
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Crie sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha os dados abaixo para começar
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" placeholder="Seu nome" className="h-11" />
          </div>

          {/* CPF */}
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              className="h-11"
              maxLength={14}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              className="h-11"
            />
          </div>

          {/* Senha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="h-11"
              />
            </div>
          </div>

          <Button className="w-full h-11 mt-4 text-base font-medium">
            Cadastrar
          </Button>
        </form>

        {/* Link para Voltar */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Já tem uma conta?{' '}
          <Link
            to="/entrar"
            className="text-primary font-semibold hover:underline"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
