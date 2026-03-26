import { useMemo } from 'react'
import { usePropertiesQuery } from '@/features/properties/hooks/use-properties-query'
import { usePaymentsQuery } from '@/features/payments/hooks/use-payments-query'
import { useContractsQuery } from '@/features/contracts/hooks/use-contracts-query'
import { useTenantsQuery } from '@/features/tenants/hooks/use-tenants-query'
import useAuthStore from '@/store/auth-store'

/**
 * Hook que filtra todos os dados pela cadeia de ownership do usuário logado:
 * User.id → Properties (ownerId) → Contracts (propertyId) → Payments (contractId) / Tenants
 */
export const useUserScopedData = () => {
  const user = useAuthStore((state) => state.user)

  const { data: propertiesData, isLoading: propertiesLoading, isError: propertiesError } = usePropertiesQuery()
  const { data: paymentsData, isLoading: paymentsLoading, isError: paymentsError } = usePaymentsQuery()
  const { data: contractsData, isLoading: contractsLoading } = useContractsQuery()
  const { data: tenantsData, isLoading: tenantsLoading } = useTenantsQuery()

  const isLoading = propertiesLoading || paymentsLoading || contractsLoading || tenantsLoading

  const allProperties = propertiesData?.data ?? []
  const allContracts = contractsData?.data ?? []
  const allPayments = paymentsData?.data ?? []
  const allTenants = tenantsData?.data ?? []

  // Filtrar pela cadeia de ownership
  const properties = useMemo(
    () => (user ? allProperties.filter((p) => p.ownerId === user.id) : []),
    [allProperties, user]
  )

  const propertyIds = useMemo(
    () => new Set(properties.map((p) => p.id)),
    [properties]
  )

  const contracts = useMemo(
    () => allContracts.filter((c) => propertyIds.has(c.propertyId)),
    [allContracts, propertyIds]
  )

  const contractIds = useMemo(
    () => new Set(contracts.map((c) => c.id)),
    [contracts]
  )

  const tenantIds = useMemo(
    () => new Set(contracts.map((c) => c.tenantId)),
    [contracts]
  )

  const payments = useMemo(
    () => allPayments.filter((p) => contractIds.has(p.contractId)),
    [allPayments, contractIds]
  )

  const tenants = useMemo(
    () => allTenants.filter((t) => tenantIds.has(t.id)),
    [allTenants, tenantIds]
  )

  return {
    properties,
    contracts,
    payments,
    tenants,
    isLoading,
    propertiesError,
    paymentsError,
  }
}
