import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PropertyCard } from '../components'
import { usePropertiesQuery } from '../hooks/use-properties-query'
import { toast } from 'sonner'
import { type Property } from '../types/properties'

type FilterType = 'todos' | 'ocupados' | 'vagos'

export default function PropertiesPage() {
  const [filter, setFilter] = useState<FilterType>('todos')
  const [search, setSearch] = useState('')
  const { data, isLoading, isError } = usePropertiesQuery()

  if (isError) {
    toast.error('Erro ao carregar imóveis.')
  }

  const properties: Property[] = data?.data ?? []

  const filtered = properties.filter((p) => {
    // Filtro de status
    if (filter === 'ocupados' && p.isAvailable) return false
    if (filter === 'vagos' && !p.isAvailable) return false

    // Busca por título ou endereço
    if (search.trim()) {
      const term = search.toLowerCase()
      const address = `${p.street} ${p.number} ${p.neighborhood} ${p.city}`.toLowerCase()
      return (
        p.title.toLowerCase().includes(term) || address.includes(term)
      )
    }

    return true
  })

  const totalProperties = properties.length
  const filters: { label: string; value: FilterType }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Ocupados', value: 'ocupados' },
    { label: 'Vagos', value: 'vagos' },
  ]

  return (
    <div className="p-8">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Imóveis</h1>
          <p className="text-slate-500 text-sm">
            {isLoading
              ? 'Carregando...'
              : `${totalProperties} imóveis cadastrados`}
          </p>
        </div>

        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Buscar imóvel..."
            className="pl-10 bg-white border-none shadow-sm h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Filtros */}
      <div className="flex gap-2 mb-8">
        {filters.map((f) => (
          <Badge
            key={f.value}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              filter === f.value
                ? 'bg-[#115e59] hover:bg-[#134e4a]'
                : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm border-none'
            }`}
            variant={filter === f.value ? 'default' : 'secondary'}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Badge>
        ))}
      </div>

      {/* Grid de Imóveis */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            {search || filter !== 'todos'
              ? 'Nenhum imóvel encontrado com os filtros aplicados.'
              : 'Nenhum imóvel cadastrado.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
