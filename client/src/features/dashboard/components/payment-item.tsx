import { Badge } from '@/components/ui/badge'

function PaymentItem({ name, place, value, status }: any) {
  const statusColors: any = {
    Pago: 'bg-emerald-50 text-emerald-600',
    Atrasado: 'bg-red-50 text-red-600',
    Pendente: 'bg-orange-50 text-orange-600',
  }
  return (
    <div className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{place}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-sm">{value}</span>
        <Badge
          variant="secondary"
          className={`${statusColors[status]} border-none px-3`}
        >
          {status}
        </Badge>
      </div>
    </div>
  )
}

export default PaymentItem
