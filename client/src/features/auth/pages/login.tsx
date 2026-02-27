import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
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

        <form className="space-y-6">
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
            />
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          {/* Lembrar - Esqueceu */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="accent-primary" />
              Lembrar de mim
            </label>

            <a
              href="#"
              className="text-primary hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>

          {/* Botão */}
          <Button className="w-full h-11 text-base">
            Entrar
          </Button>
        </form>

        {/* Divisão */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            OU
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Cadastrar */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Não possui uma conta?{" "}
          <a href="#" className="text-primary hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}