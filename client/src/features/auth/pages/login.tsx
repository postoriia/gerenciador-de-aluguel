import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-neutral-900" >Habittar</h1>

        <form className="space-y-6">
          {/* Campo de email */}
          <div>
            <Label htmlFor="email" className="text-neutral-900">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              className="mt-1"
            />
          </div>

          {/* Campo de senha */}
          <div>
            <Label htmlFor="password" className="text-neutral-900">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

          {/* Botão de entrar */}
          <Button className="w-full" size="lg">
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Não tem conta?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
