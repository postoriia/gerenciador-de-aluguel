import { Search } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SummaryCard, FilterButton, TableRow } from '../components'

export default function PaymentsPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Pagamentos</h1>
        <p className="text-slate-500 text-sm">
          Controle de recebimentos dos aluguéis
        </p>
      </header>

      {/* Top Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Recebidos"
          value="R$ 15.700"
          color="text-emerald-600"
        />
        <SummaryCard
          title="Pendentes"
          value="R$ 4.500"
          color="text-orange-500"
        />
        <SummaryCard title="Atrasados" value="R$ 3.200" color="text-red-500" />
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <FilterButton label="Todos" active />
          <FilterButton label="Pagos" />
          <FilterButton label="Pendentes" />
          <FilterButton label="Atrasados" />
        </div>

        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Buscar por inquilino ou imóvel"
            className="pl-10 bg-white border-slate-200 rounded-lg"
          />
        </div>
      </div>

      {/* Tabela de Pagamentos */}
      <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Inquilino
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Imóvel
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Mês
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <TableRow
                name="Maria Silva"
                property="Apartamento Centro"
                month="Fevereiro 2025"
                date="09/02/2025"
                value="R$ 1.800"
                status="Pago"
              />
              <TableRow
                name="João Santos"
                property="Casa Jardim Europa"
                month="Fevereiro 2025"
                date="09/02/2025"
                value="R$ 3.200"
                status="Atrasado"
              />
              <TableRow
                name="Ana Oliveira"
                property="Sobrado Pinheiros"
                month="Fevereiro 2025"
                date="09/02/2025"
                value="R$ 4.500"
                status="Pendente"
              />
              <TableRow
                name="Carlos Mendes"
                property="Studio Itaim"
                month="Fevereiro 2025"
                date="09/02/2025"
                value="R$ 2.200"
                status="Pago"
              />
              <TableRow
                name="Maria Silva"
                property="Apartamento Centro"
                month="Janeiro 2025"
                date="09/01/2025"
                value="R$ 1.800"
                status="Pago"
              />
              <TableRow
                name="João Santos"
                property="Casa Jardim Europa"
                month="Janeiro 2025"
                date="09/01/2025"
                value="R$ 3.200"
                status="Pago"
              />
              <TableRow
                name="Ana Oliveira"
                property="Sobrado Pinheiros"
                month="Janeiro 2025"
                date="09/01/2025"
                value="R$ 4.500"
                status="Pago"
              />
              <TableRow
                name="Carlos Mendes"
                property="Studio Itaim"
                month="Janeiro 2025"
                date="09/01/2025"
                value="R$ 2.200"
                status="Pago"
              />
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
