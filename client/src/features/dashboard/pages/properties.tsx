import {
    Building2,
    MapPin,
    BedDouble,
    Maximize2,
    User,
    Search,
    LayoutDashboard,
    DollarSign,
    Home
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";

export default function PropertiesPage() {
    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar - Mantendo a consistência */}
            <aside className="w-64 bg-[#115e59] text-white flex flex-col sticky top-0 h-screen">
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
                    <NavLink
                        to="/payments"
                        className="flex items-center gap-3 p-3 text-emerald-100/70 hover:bg-[#134e4a] rounded-xl transition-colors"
                    >
                        <DollarSign size={20} />
                        <span className="font-medium">Pagamentos</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Imóveis</h1>
                        <p className="text-slate-500 text-sm">6 imóveis cadastrados</p>
                    </div>

                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input placeholder="Buscar imóvel..." className="pl-10 bg-white border-none shadow-sm h-11" />
                    </div>
                </header>

                {/* Filtros */}
                <div className="flex gap-2 mb-8">
                    <Badge className="bg-[#115e59] hover:bg-[#134e4a] px-4 py-2 rounded-lg cursor-pointer">Todos</Badge>
                    <Badge variant="secondary" className="bg-white text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg cursor-pointer shadow-sm border-none">Ocupados</Badge>
                    <Badge variant="secondary" className="bg-white text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg cursor-pointer shadow-sm border-none">Vagos</Badge>
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
                        image="/apt-centro.jpg" // Substitua pelas suas imagens
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
            </main>
        </div>
    );
}

function PropertyCard({ title, address, rooms, size, price, tenant, status, payStatus }: any) {
    return (
        <Card className="overflow-hidden border-none shadow-sm rounded-2xl group cursor-pointer hover:shadow-md transition-all">
            {/* Imagem com Badges */}
            <div className="relative h-48 bg-slate-200">
                <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className={`${status === 'Vago' ? 'bg-slate-500' : 'bg-[#115e59]/80'} border-none backdrop-blur-sm`}>
                        {status}
                    </Badge>
                    {payStatus && (
                        <Badge className={`${payStatus === 'Pago' ? 'bg-emerald-500/80' : payStatus === 'Atrasado' ? 'bg-red-500/80' : 'bg-orange-500/80'} border-none backdrop-blur-sm`}>
                            {payStatus}
                        </Badge>
                    )}
                </div>
                {/* Aqui entraria a <img src={image} className="w-full h-full object-cover" /> */}
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
                        <span>{rooms} quartos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Maximize2 size={16} className="text-slate-400" />
                        <span>{size}m²</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-[#115e59]">R$ {price}</span>
                        <span className="text-xs text-muted-foreground">/mês</span>
                    </div>

                    {tenant ? (
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                            <User size={14} className="text-slate-400" />
                            <span className="text-xs font-medium text-slate-600">{tenant}</span>
                        </div>
                    ) : (
                        <span className="text-xs font-medium text-slate-400 italic">Disponível</span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}