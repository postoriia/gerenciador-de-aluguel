import { Card, CardContent } from '@/components/ui/card'

function SummaryCard({
  title,
  value,
  color,
}: {
  title: string
  value: string
  color: string
}) {
  return (
    <Card className="border-none shadow-sm rounded-2xl">
      <CardContent className="p-6">
        <p className="text-sm text-slate-400 mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
      </CardContent>
    </Card>
  )
}

export default SummaryCard
