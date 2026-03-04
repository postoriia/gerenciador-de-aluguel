import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'

function TableRow({ name, property, month, date, value, status }: any) {
  const statusStyles: any = {
    Pago: 'bg-emerald-50 text-emerald-600',
    Atrasado: 'bg-red-50 text-red-600',
    Pendente: 'bg-orange-50 text-orange-600',
  }

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4 text-sm font-semibold text-slate-700">{name}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{property}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{month}</td>
      <td className="px-6 py-4 text-sm text-slate-500 flex items-center gap-2">
        <Calendar size={14} className="text-slate-400" />
        {date}
      </td>
      <td className="px-6 py-4 text-sm font-bold text-slate-800">{value}</td>
      <td className="px-6 py-4 text-right">
        <Badge
          className={`${statusStyles[status]} border-none shadow-none px-3 font-medium`}
        >
          {status}
        </Badge>
      </td>
    </tr>
  )
}

export default TableRow
