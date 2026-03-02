import {
    LayoutDashboard,
    Building2,
    DollarSign,
    Home,
    Search,
    Calendar
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function PaymentsPage() {
    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar - Mantida igual ao Dashboard */}
            <aside className="w-64 bg-[#115e59] text-white flex flex-col">
                <div className="p-6 flex items-center gap-2">
                    <div className="bg-orange-500 p-1.5 rounded-lg">
                        <Home size={20} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Habittar</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <NavLink
                        to="/dashboard"
                        className="flex items-center gap-3 p-3 text-emerald-100/70 hover:bg-[#134e4a] rounded-xl transition-colors"
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/properties"
                        className="flex items-center gap-3 p-3 text-emerald-100/70 hover:bg-[#134e4a] rounded-xl transition-colors"
                    >
                        <Building2 size={20} />
                        <span className="font-medium">Imóveis</span>
                    </NavLink>
                    <div className="flex items-center gap-3 bg-[#134e4a] p-3 rounded-xl cursor-pointer">
                        <DollarSign size={20} />
                        <span className="font-medium">Pagamentos</span>
                    </div>
                </nav>

                <div className="p-6 text-xs text-emerald-100/40">© 2025 Habittar</div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Pagamentos</h1>
                    <p className="text-slate-500 text-sm">Controle de recebimentos dos aluguéis</p>
                </header>

                {/* Top Cards de Resumo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <SummaryCard title="Recebidos" value="R$ 15.700" color="text-emerald-600" />
                    <SummaryCard title="Pendentes" value="R$ 4.500" color="text-orange-500" />
                    <SummaryCard title="Atrasados" value="R$ 3.200" color="text-red-500" />
                </div>

                {/* Filtros e Busca */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex gap-2">
                        <FilterButton label="Todos" active />
                        <FilterButton label="Pagos" />
                        <FilterButton label="Pendentes" />
                        <FilterButton label="Atrasados" />
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input
                            placeholder="Buscar por inquilino ou imóvel"
                            className="pl-10 bg-white border-slate-200 rounded-lg"
                        />
                    </div>
                </div>

                {/* Tabela de Pagamentos */}
                <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Inquilino</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Imóvel</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Mês</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Vencimento</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Valor</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <TableRow name="Maria Silva" property="Apartamento Centro" month="Fevereiro 2025" date="09/02/2025" value="R$ 1.800" status="Pago" />
                                <TableRow name="João Santos" property="Casa Jardim Europa" month="Fevereiro 2025" date="09/02/2025" value="R$ 3.200" status="Atrasado" />
                                <TableRow name="Ana Oliveira" property="Sobrado Pinheiros" month="Fevereiro 2025" date="09/02/2025" value="R$ 4.500" status="Pendente" />
                                <TableRow name="Carlos Mendes" property="Studio Itaim" month="Fevereiro 2025" date="09/02/2025" value="R$ 2.200" status="Pago" />
                                <TableRow name="Maria Silva" property="Apartamento Centro" month="Janeiro 2025" date="09/01/2025" value="R$ 1.800" status="Pago" />
                                <TableRow name="João Santos" property="Casa Jardim Europa" month="Janeiro 2025" date="09/01/2025" value="R$ 3.200" status="Pago" />
                                <TableRow name="Ana Oliveira" property="Sobrado Pinheiros" month="Janeiro 2025" date="09/01/2025" value="R$ 4.500" status="Pago" />
                                <TableRow name="Carlos Mendes" property="Studio Itaim" month="Janeiro 2025" date="09/01/2025" value="R$ 2.200" status="Pago" />
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>
        </div>
    );
}

// --- Subcomponentes Auxiliares ---

function SummaryCard({ title, value, color }: { title: string, value: string, color: string }) {
    return (
        <Card className="border-none shadow-sm rounded-2xl">
            <CardContent className="p-6">
                <p className="text-sm text-slate-400 mb-1">{title}</p>
                <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
            </CardContent>
        </Card>
    );
}

function FilterButton({ label, active = false }: { label: string, active?: boolean }) {
    return (
        <button className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${active
                ? "bg-[#115e59] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}>
            {label}
        </button>
    );
}

function TableRow({ name, property, month, date, value, status }: any) {
    const statusStyles: any = {
        Pago: "bg-emerald-50 text-emerald-600",
        Atrasado: "bg-red-50 text-red-600",
        Pendente: "bg-orange-50 text-orange-600",
    };

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
                <Badge className={`${statusStyles[status]} border-none shadow-none px-3 font-medium`}>
                    {status}
                </Badge>
            </td>
        </tr>
    );
}