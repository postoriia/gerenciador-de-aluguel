import { Badge } from '@/components/ui/badge'

function PropertyItem({ name, desc, status, payStatus }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-200" />{' '}
        {/* Placeholder para imagem */}
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline" className="text-[10px] font-normal">
          {status}
        </Badge>
        {payStatus && (
          <Badge variant="secondary" className="text-[10px] font-normal">
            {payStatus}
          </Badge>
        )}
      </div>
    </div>
  )
}

export default PropertyItem
