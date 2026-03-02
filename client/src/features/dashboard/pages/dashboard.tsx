import {
  LayoutDashboard,
  Building2,
  Users,
  DollarSign,
  AlertCircle,
  Home
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar - Fixa à esquerda */}
      <aside className="w-64 bg-[#115e59] text-white flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <Home size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Habittar</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <div className="flex items-center gap-3 bg-[#134e4a] p-3 rounded-xl cursor-pointer">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </div>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? "bg-[#134e4a] text-white" : "text-emerald-100/70 hover:bg-[#134e4a]"
              }`
            }
          >
            <Building2 size={20} />
            <span className="font-medium">Imóveis</span>
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? "bg-[#134e4a] text-white" : "text-emerald-100/70 hover:bg-[#134e4a]"
              }`
            }
          >
            <DollarSign size={20} />
            <span className="font-medium">Pagamentos</span>
          </NavLink>
        </nav>

        <div className="p-6 text-xs text-emerald-100/40">
          © 2025 Habittar
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm">Visão geral dos seus imóveis e pagamentos</p>
        </header>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total de Imóveis" value="6" subValue="4 ocupados · 2 vagos" icon={<Building2 className="text-teal-600" />} />
          <StatCard title="Inquilinos" value="4" subValue="Ativos atualmente" icon={<Users className="text-teal-600" />} />
          <StatCard title="Receita Recebida" value="R$ 15.700" subValue="Pagamentos confirmados" icon={<DollarSign className="text-teal-600" />} />
          <StatCard title="Inadimplência" value="R$ 3.200" subValue="1 pagamento(s) atrasado(s)" icon={<AlertCircle className="text-red-500" />} color="red" />
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pagamentos Recentes */}
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Pagamentos Recentes</CardTitle>
              <p className="text-xs text-muted-foreground">Fevereiro 2025</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <PaymentItem name="Maria Silva" place="Apartamento Centro" value="R$ 1.800" status="Pago" />
              <PaymentItem name="João Santos" place="Casa Jardim Europa" value="R$ 3.200" status="Atrasado" />
              <PaymentItem name="Ana Oliveira" place="Sobrado Pinheiros" value="R$ 4.500" status="Pendente" />
              <PaymentItem name="Carlos Mendes" place="Studio Itaim" value="R$ 2.200" status="Pago" />
            </CardContent>
          </Card>

          {/* Status de Imóveis */}
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Imóveis</CardTitle>
              <p className="text-xs text-muted-foreground">Status de ocupação</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <PropertyItem name="Apartamento Centro" desc="Apartamento · 2 quartos" status="Ocupado" payStatus="Pago" />
              <PropertyItem name="Casa Jardim Europa" desc="Casa · 3 quartos" status="Ocupado" payStatus="Atrasado" />
              <PropertyItem name="Kitnet Vila Madalena" desc="Kitnet · 1 quarto" status="Vago" />
              <PropertyItem name="Sobrado Pinheiros" desc="Sobrado · 4 quartos" status="Ocupado" payStatus="Pendente" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// Subcomponentes para organizar o código
function StatCard({ title, value, subValue, icon, color = "teal" }: any) {
  return (
    <Card className="rounded-2xl border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          <div className={`p-2 rounded-lg ${color === 'red' ? 'bg-red-50' : 'bg-teal-50'}`}>
            {icon}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{subValue}</p>
      </CardContent>
    </Card>
  );
}

function PaymentItem({ name, place, value, status }: any) {
  const statusColors: any = {
    Pago: "bg-emerald-50 text-emerald-600",
    Atrasado: "bg-red-50 text-red-600",
    Pendente: "bg-orange-50 text-orange-600",
  };
  return (
    <div className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{place}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-sm">{value}</span>
        <Badge variant="secondary" className={`${statusColors[status]} border-none px-3`}>{status}</Badge>
      </div>
    </div>
  );
}

function PropertyItem({ name, desc, status, payStatus }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-200" /> {/* Placeholder para imagem */}
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline" className="text-[10px] font-normal">{status}</Badge>
        {payStatus && <Badge variant="secondary" className="text-[10px] font-normal">{payStatus}</Badge>}
      </div>
    </div>
  );
}