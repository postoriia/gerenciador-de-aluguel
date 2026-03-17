import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BedDouble, MapPin, Maximize2 } from 'lucide-react'
import { type Property } from '../types/properties'

interface PropertyCardProps {
  property: Property
}

function PropertyCard({ property }: PropertyCardProps) {
  const {
    title,
    street,
    number,
    neighborhood,
    city,
    bedrooms,
    area,
    rentAmount,
    isAvailable,
    imageUrl,
  } = property

  const address = `${street}, ${number} - ${neighborhood}, ${city}`
  const status = isAvailable ? 'Vago' : 'Ocupado'
  const formattedPrice = rentAmount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  })

  return (
    <Card className="overflow-hidden border-none shadow-sm rounded-2xl group cursor-pointer hover:shadow-md transition-all">
      {/* Imagem com Badges */}
      <div className="relative h-48 bg-slate-200">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge
            className={`${status === 'Vago' ? 'bg-slate-500' : 'bg-[#115e59]/80'} border-none backdrop-blur-sm`}
          >
            {status}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="font-bold text-lg text-slate-800 mb-1">{title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-4">
          <MapPin size={14} />
          {address}
        </div>

        <div className="flex items-center gap-4 text-slate-600 mb-6 text-sm">
          <div className="flex items-center gap-1.5">
            <BedDouble size={18} className="text-slate-400" />
            <span>{bedrooms} quartos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 size={16} className="text-slate-400" />
            <span>{area}m²</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#115e59]">
              R$ {formattedPrice}
            </span>
            <span className="text-xs text-muted-foreground">/mês</span>
          </div>

          {isAvailable ? (
            <span className="text-xs font-medium text-slate-400 italic">
              Disponível
            </span>
          ) : (
            <Badge
              variant="outline"
              className="text-[10px] font-normal"
            >
              Ocupado
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
