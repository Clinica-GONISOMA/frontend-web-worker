'use client';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
    AreaChart,
    Area,
    ScatterChart,
    Scatter,
    ReferenceLine,
    ResponsiveContainer
} from 'recharts';

// Datos falsos para gráficos
const lineData = [
    { date: '2025-07-01', citas: 20 },
    { date: '2025-07-05', citas: 35 },
    { date: '2025-07-10', citas: 28 },
    { date: '2025-07-15', citas: 42 },
    { date: '2025-07-20', citas: 30 },
    { date: '2025-07-25', citas: 50 },
    { date: '2025-07-27', citas: 56 },
];
const barData = [
    { month: 'Enero', ingresos: 8000 },
    { month: 'Febrero', ingresos: 12000 },
    { month: 'Marzo', ingresos: 9500 },
    { month: 'Abril', ingresos: 14000 },
    { month: 'Mayo', ingresos: 11000 },
    { month: 'Junio', ingresos: 13000 },
];
const pieData = [
    { name: 'Activos', value: 400 },
    { name: 'Inactivos', value: 200 },
    { name: 'Nuevos', value: 78 },
];
const areaData = [
    { week: 'W1', patients: 100, revenue: 8000 },
    { week: 'W2', patients: 120, revenue: 12000 },
    { week: 'W3', patients: 90, revenue: 9500 },
    { week: 'W4', patients: 140, revenue: 14000 },
];
const scatterData = [
    { x: 1, y: 400 },
    { x: 2, y: 800 },
    { x: 3, y: 600 },
    { x: 4, y: 1200 },
    { x: 5, y: 1000 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const ChartSection: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Línea */}
        <div className="bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl p-6 overflow-auto">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Evolución de Citas
            </h3>
            <ResponsiveContainer height={300}>
                <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fill: 'var(--color-foreground)' }} />
                    <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="citas" stroke="var(--color-foreground)" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>

        {/* Área */}
        <div className="bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl p-6 overflow-auto">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Pacientes vs Ingresos Semanal
            </h3>
            <ResponsiveContainer height={300}>
                <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" tick={{ fill: 'var(--color-foreground)' }} />
                    <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="patients" stroke="var(--color-foreground)" fill="var(--color-foreground)" />
                    <ReferenceLine y={10000} stroke="var(--color-foreground)" strokeDasharray="3 3" />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        {/* Barras */}
        <div className="bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl p-6 overflow-auto">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Ingresos Mensuales
            </h3>
            <ResponsiveContainer height={300}>
                <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fill: 'var(--color-foreground)' }} />
                    <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                    <Tooltip />
                    <Bar dataKey="ingresos" fill="var(--color-foreground)" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl p-6 overflow-auto">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Distribución de Pacientes
            </h3>
            <ResponsiveContainer height={300}>
                <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {pieData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>

        {/* Scatter */}
        <div className="bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl p-6 overflow-auto md:col-span-2">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Correlación Tiempo vs Ingresos
            </h3>
            <ResponsiveContainer height={300}>
                <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid />
                    <XAxis dataKey="x" name="Día" tick={{ fill: 'var(--color-foreground)' }} />
                    <YAxis dataKey="y" name="Ingresos" tick={{ fill: 'var(--color-foreground)' }} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={scatterData} fill="var(--color-foreground)" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    </div >
);


export default function Analytics() {
    return (
        <div className="p-6 bg-[var(--color-background)] min-h-screen overflow-auto w-full">
            <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
                Analítica
            </h1>
            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-4 border border-[var(--color-foreground)]/20 rounded-4xl bg-[var(--color-background)]">
                    <h2 className="text-lg font-medium text-[var(--color-foreground)] mb-2">Total Pacientes</h2>
                    <p className="text-3xl font-bold text-[var(--color-foreground)]">678</p>
                </div>
                <div className="p-4 border border-[var(--color-foreground)]/20 rounded-4xl bg-[var(--color-background)]">
                    <h2 className="text-lg font-medium text-[var(--color-foreground)] mb-2">Citas Hoy</h2>
                    <p className="text-3xl font-bold text-[var(--color-foreground)]">56</p>
                </div>
                <div className="p-4 border border-[var(--color-foreground)]/20 rounded-4xl bg-[var(--color-background)]">
                    <h2 className="text-lg font-medium text-[var(--color-foreground)] mb-2">Ingresos Mensuales</h2>
                    <p className="text-3xl font-bold text-[var(--color-foreground)]">$13,000</p>
                </div>
                <div className="p-4 border border-[var(--color-foreground)]/20 rounded-4xl bg-[var(--color-background)]">
                    <h2 className="text-lg font-medium text-[var(--color-foreground)] mb-2">Nuevos Registros</h2>
                    <p className="text-3xl font-bold text-[var(--color-foreground)]">78</p>
                </div>
            </div>
            {/* Charts */}
            <ChartSection />
            {/* Botón */}
            <div className="mt-8">
                <button className="px-4 py-2 rounded-full border border-[var(--color-foreground)]/20 text-[var(--color-foreground)]">
                    Generar Reporte
                </button>
            </div>
        </div>
    );
}