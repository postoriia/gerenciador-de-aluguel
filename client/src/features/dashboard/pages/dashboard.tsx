import { useMemo, useEffect } from 'react'
import { Building2, DollarSign, AlertCircle, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PaymentItem, PropertyItem, StatCard } from '../components'
import { usePropertiesQuery } from '@/features/properties/hooks/use-properties-query'
import { usePaymentsQuery } from '@/features/payments/hooks/use-payments-query'
import { useContractsQuery } from '@/features/contracts/hooks/use-contracts-query'
import { useTenantsQuery } from '@/features/tenants/hooks/use-tenants-query'
import {
  statusLabels,
  monthLabels,
  type PaymentStatus,
} from '@/features/payments/types/payments'
import { toast } from 'sonner'

export default function DashboardPage() {
  const {
    data: propertiesData,
    isLoading: propertiesLoading,
    isError: propertiesError,
  } = usePropertiesQuery()
  const {
    data: paymentsData,
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = usePaymentsQuery()
  const { data: contractsData, isLoading: contractsLoading } = useContractsQuery()
  const { data: tenantsData, isLoading: tenantsLoading } = useTenantsQuery()

  const isLoading = propertiesLoading || paymentsLoading || contractsLoading || tenantsLoading

  useEffect(() => {
    if (propertiesError) toast.error('Erro ao carregar imóveis.')
    if (paymentsError) toast.error('Erro ao carregar pagamentos.')
  }, [propertiesError, paymentsError])

  const properties = propertiesData?.data ?? []
  const payments = paymentsData?.data ?? []
  const contracts = contractsData?.data ?? []
  const tenants = tenantsData?.data ?? []

  // Mapas para lookup
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

  const stats = useMemo(() => {
    const total = properties.length
    const occupied = properties.filter((p) => !p.isAvailable).length
    const vacant = properties.filter((p) => p.isAvailable).length

    const received = payments
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0)

    const latePayments = payments.filter((p) => p.status === 'late')
    const lateTotal = latePayments.reduce((sum, p) => sum + p.amount, 0)

    return { total, occupied, vacant, received, lateTotal, lateCount: latePayments.length }
  }, [properties, payments])

  const recentPayments = useMemo(() => {
    return [...payments]
      .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
      .slice(0, 4)
  }, [payments])

  const formatCurrency = (value: number) =>
    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm">
          Visão geral dos seus imóveis e pagamentos
        </p>

      </header>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total de Imóveis"
          value={String(stats.total)}
          subValue={`${stats.occupied} ocupados · ${stats.vacant} vagos`}
          icon={<Building2 className="text-teal-600" />}
        />
        <StatCard
          title="Receita Recebida"
          value={formatCurrency(stats.received)}
          subValue="Pagamentos confirmados"
          icon={<DollarSign className="text-teal-600" />}
        />
        <StatCard
          title="Inadimplência"
          value={formatCurrency(stats.lateTotal)}
          subValue={`${stats.lateCount} pagamento(s) atrasado(s)`}
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
            <p className="text-xs text-muted-foreground">
              Últimos pagamentos registrados
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentPayments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum pagamento registrado.
              </p>
            ) : (
              recentPayments.map((payment) => (
                <PaymentItem
                  key={payment.id}
                  name={resolveTenantName(payment.contractId)}
                  place={resolvePropertyTitle(payment.contractId)}
                  month={`${monthLabels[payment.referenceMonth]} ${payment.referenceYear}`}
                  value={`R$ ${payment.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  status={statusLabels[payment.status as PaymentStatus]}
                />
              ))
            )}
          </CardContent>
        </Card>

        {/* Status de Imóveis */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Imóveis</CardTitle>
            <p className="text-xs text-muted-foreground">Status de ocupação</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {properties.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum imóvel cadastrado.
              </p>
            ) : (
              properties.slice(0, 5).map((property) => (
                <PropertyItem
                  key={property.id}
                  name={property.title}
                  desc={`${property.type} · ${property.bedrooms} quartos`}
                  status={property.isAvailable ? 'Vago' : 'Ocupado'}
                  imageUrl={property.imageUrl}
                />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
