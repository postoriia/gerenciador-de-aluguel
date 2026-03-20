import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SummaryCard, FilterButton, TableRow } from '../components'
import { usePaymentsQuery } from '../hooks/use-payments-query'
import { useContractsQuery } from '@/features/contracts/hooks/use-contracts-query'
import { useTenantsQuery } from '@/features/tenants/hooks/use-tenants-query'
import { usePropertiesQuery } from '@/features/properties/hooks/use-properties-query'
import {
  type PaymentStatus,
  statusLabels,
  monthLabels,
} from '../types/payments'
import { toast } from 'sonner'

type FilterType = 'todos' | 'paid' | 'pending' | 'late'

const ITEMS_PER_PAGE = 10

export default function PaymentsPage() {
  const [filter, setFilter] = useState<FilterType>('todos')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data: paymentsData, isLoading: paymentsLoading, isError: paymentsError } = usePaymentsQuery()
  const { data: contractsData, isLoading: contractsLoading } = useContractsQuery()
  const { data: tenantsData, isLoading: tenantsLoading } = useTenantsQuery()
  const { data: propertiesData, isLoading: propertiesLoading } = usePropertiesQuery()

  const isLoading = paymentsLoading || contractsLoading || tenantsLoading || propertiesLoading

  useEffect(() => {
    if (paymentsError) toast.error('Erro ao carregar pagamentos.')
  }, [paymentsError])

  const payments = paymentsData?.data ?? []
  const contracts = contractsData?.data ?? []
  const tenants = tenantsData?.data ?? []
  const properties = propertiesData?.data ?? []

  // Mapas para lookup rápido
  const contractMap = useMemo(
    () => new Map(contracts.map((c) => [c.id, c])),
    [contracts]
  )
  const tenantMap = useMemo(
    () => new Map(tenants.map((t) => [t.id, t])),
    [tenants]
  )
  const propertyMap = useMemo(
    () => new Map(properties.map((p) => [p.id, p])),
    [properties]
  )

  // Resolver nomes
  const resolveTenantName = (contractId: string): string => {
    const contract = contractMap.get(contractId)
    if (!contract) return '—'
    const tenant = tenantMap.get(contract.tenantId)
    return tenant?.name ?? '—'
  }

  const resolvePropertyTitle = (contractId: string): string => {
    const contract = contractMap.get(contractId)
    if (!contract) return '—'
    const property = propertyMap.get(contract.propertyId)
    return property?.title ?? '—'
  }

  // Resumo calculado
  const summary = useMemo(() => {
    const received = payments
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0)
    const pending = payments
      .filter((p) => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0)
    const late = payments
      .filter((p) => p.status === 'late')
      .reduce((sum, p) => sum + p.amount, 0)
    return { received, pending, late }
  }, [payments])

  const formatCurrency = (value: number) =>
    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR')
  }

  // Filtros, busca e ordenação (mais recentes primeiro)
  const filtered = payments
    .filter((p) => {
      if (filter !== 'todos' && p.status !== filter) return false
      if (search.trim()) {
        const term = search.toLowerCase()
        const tenantName = resolveTenantName(p.contractId).toLowerCase()
        const propertyTitle = resolvePropertyTitle(p.contractId).toLowerCase()
        return tenantName.includes(term) || propertyTitle.includes(term)
      }
      return true
    })
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedPayments = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleFilterChange = (value: FilterType) => {
    setFilter(value)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const filters: { label: string; value: FilterType }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Pagos', value: 'paid' },
    { label: 'Pendentes', value: 'pending' },
    { label: 'Atrasados', value: 'late' },
  ]

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
          value={isLoading ? '...' : formatCurrency(summary.received)}
          color="text-emerald-600"
        />
        <SummaryCard
          title="Pendentes"
          value={isLoading ? '...' : formatCurrency(summary.pending)}
          color="text-orange-500"
        />
        <SummaryCard
          title="Atrasados"
          value={isLoading ? '...' : formatCurrency(summary.late)}
          color="text-red-500"
        />
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {filters.map((f) => (
            <FilterButton
              key={f.value}
              label={f.label}
              active={filter === f.value}
              onClick={() => handleFilterChange(f.value)}
            />
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Buscar por inquilino ou imóvel"
            className="pl-10 bg-white border-slate-200 rounded-lg"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Tabela de Pagamentos */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            {search || filter !== 'todos'
              ? 'Nenhum pagamento encontrado com os filtros aplicados.'
              : 'Nenhum pagamento cadastrado.'}
          </p>
        </div>
      ) : (
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
                {paginatedPayments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    tenant={resolveTenantName(payment.contractId)}
                    property={resolvePropertyTitle(payment.contractId)}
                    month={`${monthLabels[payment.referenceMonth]} ${payment.referenceYear}`}
                    date={formatDate(payment.dueDate)}
                    value={formatCurrency(payment.amount)}
                    status={statusLabels[payment.status as PaymentStatus]}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <p className="text-sm text-slate-400">
                Página {currentPage} de {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-[#115e59] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
