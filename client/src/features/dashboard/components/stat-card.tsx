import { Card, CardContent } from '@/components/ui/card'

function StatCard({ title, value, subValue, icon, color = 'teal' }: any) {
  return (
    <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-all cursor-default group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          <div
            className={`p-2 rounded-lg transition-colors ${
              color === 'red'
                ? 'bg-red-50 group-hover:bg-red-100'
                : 'bg-teal-50 group-hover:bg-teal-100'
            }`}
          >
            {icon}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{subValue}</p>
      </CardContent>
    </Card>
  )
}

export default StatCard
