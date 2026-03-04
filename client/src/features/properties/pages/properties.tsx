import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PropertyCard } from '../components'

export default function PropertiesPage() {
  return (
    <div className="p-8">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Imóveis</h1>
          <p className="text-slate-500 text-sm">6 imóveis cadastrados</p>
        </div>

        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Buscar imóvel..."
            className="pl-10 bg-white border-none shadow-sm h-11"
          />
        </div>
      </header>

      {/* Filtros */}
      <div className="flex gap-2 mb-8">
        <Badge className="bg-[#115e59] hover:bg-[#134e4a] px-4 py-2 rounded-lg cursor-pointer">
          Todos
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg cursor-pointer shadow-sm border-none"
        >
          Ocupados
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg cursor-pointer shadow-sm border-none"
        >
          Vagos
        </Badge>
      </div>

      {/* Grid de Imóveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard
          title="Apartamento Centro"
          address="Rua das Flores, 120 - Centro"
          rooms={2}
          size={65}
          price="1.800"
          tenant="Maria Silva"
          image="/apt-centro.jpg"
          status="Ocupado"
          payStatus="Pago"
        />
        <PropertyCard
          title="Casa Jardim Europa"
          address="Av. dos Ipês, 450 - Jardim Europa"
          rooms={3}
          size={120}
          price="3.200"
          tenant="João Santos"
          image="/casa-europa.jpg"
          status="Ocupado"
          payStatus="Atrasado"
        />
        <PropertyCard
          title="Kitnet Vila Madalena"
          address="Rua Harmonia, 88 - Vila Madalena"
          rooms={1}
          size={30}
          price="1.200"
          image="/kitnet.jpg"
          status="Vago"
        />
        <PropertyCard
          title="Sobrado Pinheiros"
          address="Rua Teodoro Sampaio, 10 - Pinheiros"
          rooms={4}
          size={180}
          price="4.500"
          tenant="Ana Oliveira"
          image="/sobrado.jpg"
          status="Ocupado"
          payStatus="Pendente"
        />
      </div>
    </div>
  )
}
