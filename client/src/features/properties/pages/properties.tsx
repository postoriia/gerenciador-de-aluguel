import { useState, useEffect } from 'react'
import { Search, Loader2, Plus } from 'lucide-react' // Importado o Plus
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button' // Certifique-se de ter o componente Button do shadcn
import { PropertyCard } from '../components'
import { usePropertiesQuery } from '../hooks/use-properties-query'
import { toast } from 'sonner'
import { type Property } from '../types/properties'

type FilterType = 'todos' | 'ocupados' | 'vagos'

export default function PropertiesPage() {
  const [filter, setFilter] = useState<FilterType>('todos')
  const [search, setSearch] = useState('')

  const { data, isLoading, isError } = usePropertiesQuery()

  useEffect(() => {
    if (isError) toast.error('Erro ao carregar imóveis.')
  }, [isError])

  const properties: Property[] = data?.data ?? []

  const filtered = properties.filter((p) => {
    if (filter === 'ocupados' && p.isAvailable) return false
    if (filter === 'vagos' && !p.isAvailable) return false

    if (search.trim()) {
      const term = search.toLowerCase()
      const address = `${p.street} ${p.number} ${p.neighborhood} ${p.city}`.toLowerCase()
      return p.title.toLowerCase().includes(term) || address.includes(term)
    }
    return true
  })

  const totalProperties = properties.length
  const filters: { label: string; value: FilterType }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Ocupados', value: 'ocupados' },
    { label: 'Vagos', value: 'vagos' },
  ]

  // Funções de Gerenciamento (Aqui você conectaria com seus hooks de useMutation)
  const handleAddProperty = () => {
    // Ex: openModal(<PropertyForm />)
    toast.info('Abrir formulário de cadastro')
  }

  return (
    <div className="p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Imóveis</h1>
          <p className="text-slate-500 text-sm">
            {isLoading
              ? 'Carregando...'
              : `${totalProperties} imóveis cadastrados`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Campo de Busca */}
          <div className="relative w-full sm:w-72">
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

          {/* BOTÃO CADASTRAR */}
          <Button
            onClick={handleAddProperty}
            className="bg-[#115e59] hover:bg-[#134e4a] text-white h-11 px-6 rounded-xl gap-2 shadow-sm"
          >
            <Plus size={20} />
            Cadastrar novo imóvel
          </Button>
        </div>
      </header>

      {/* Filtros */}
      <div className="flex gap-2 mb-8">
        {filters.map((f) => (
          <Badge
            key={f.value}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors border-none ${filter === f.value
                ? 'bg-[#115e59] hover:bg-[#134e4a] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm'
              }`}
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
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <p className="text-muted-foreground">
            {search || filter !== 'todos'
              ? 'Nenhum imóvel encontrado com os filtros aplicados.'
              : 'Nenhum imóvel cadastrado.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            // Passe as funções de editar/deletar para dentro do card se necessário
            />
          ))}
        </div>
      )}
    </div>
  )
}