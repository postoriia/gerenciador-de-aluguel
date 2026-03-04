import { Building2, Users, DollarSign, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PaymentItem, PropertyItem, StatCard } from '../components'

export default function DashboardPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm">
          Visão geral dos seus imóveis e pagamentos
        </p>
      </header>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total de Imóveis"
          value="6"
          subValue="4 ocupados · 2 vagos"
          icon={<Building2 className="text-teal-600" />}
        />
        <StatCard
          title="Inquilinos"
          value="4"
          subValue="Ativos atualmente"
          icon={<Users className="text-teal-600" />}
        />
        <StatCard
          title="Receita Recebida"
          value="R$ 15.700"
          subValue="Pagamentos confirmados"
          icon={<DollarSign className="text-teal-600" />}
        />
        <StatCard
          title="Inadimplência"
          value="R$ 3.200"
          subValue="1 pagamento(s) atrasado(s)"
          icon={<AlertCircle className="text-red-500" />}
          color="red"
        />
      </div>

      {/* Bottom Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pagamentos Recentes */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Pagamentos Recentes
            </CardTitle>
            <p className="text-xs text-muted-foreground">Fevereiro 2025</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <PaymentItem
              name="Maria Silva"
              place="Apartamento Centro"
              value="R$ 1.800"
              status="Pago"
            />
            <PaymentItem
              name="João Santos"
              place="Casa Jardim Europa"
              value="R$ 3.200"
              status="Atrasado"
            />
            <PaymentItem
              name="Ana Oliveira"
              place="Sobrado Pinheiros"
              value="R$ 4.500"
              status="Pendente"
            />
            <PaymentItem
              name="Carlos Mendes"
              place="Studio Itaim"
              value="R$ 2.200"
              status="Pago"
            />
          </CardContent>
        </Card>

        {/* Status de Imóveis */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Imóveis</CardTitle>
            <p className="text-xs text-muted-foreground">Status de ocupação</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <PropertyItem
              name="Apartamento Centro"
              desc="Apartamento · 2 quartos"
              status="Ocupado"
              payStatus="Pago"
            />
            <PropertyItem
              name="Casa Jardim Europa"
              desc="Casa · 3 quartos"
              status="Ocupado"
              payStatus="Atrasado"
            />
            <PropertyItem
              name="Kitnet Vila Madalena"
              desc="Kitnet · 1 quarto"
              status="Vago"
            />
            <PropertyItem
              name="Sobrado Pinheiros"
              desc="Sobrado · 4 quartos"
              status="Ocupado"
              payStatus="Pendente"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
