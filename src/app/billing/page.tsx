'use client';
import React from 'react';
import {
    BarChart, Bar,
    XAxis, YAxis,
    CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts';

// Datos falsos
const billingSummary = {
    total: 125000,
    pendientes: 8,
    facturasHoy: 12,
    ingresosHoy: 4500
};

const monthlyBillingData = [
    { month: 'Enero', total: 8000 },
    { month: 'Febrero', total: 10000 },
    { month: 'Marzo', total: 9500 },
    { month: 'Abril', total: 12000 },
    { month: 'Mayo', total: 11000 },
    { month: 'Junio', total: 13000 },
    { month: 'Julio', total: 15000 },
];

// Datos diarios del mes actual (simulados)
const dailyBillingData = [
    { date: '2025-07-01', total: 120000 },
    { date: '2025-07-02', total: 98000 },
    { date: '2025-07-03', total: 110000 },
    { date: '2025-07-04', total: 134000 },
    { date: '2025-07-05', total: 97000 },
    { date: '2025-07-06', total: 88000 },
    { date: '2025-07-07', total: 123000 },
];

export default function Billing() {
    return (
        <div className="p-6 bg-[var(--color-background)] min-h-screen overflow-auto w-full">
            <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Facturación</h1>

            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-4 border border-[var(--color-foreground)]/20 rounded-4xl bg-[var(--color-background)]">
                    <h2 className="text-lg font-medium text-[var(--color-foreground)] mb-2">Total Facturado</h2>
                    <p className="text-3xl font-bold text-[var(--color-foreground)]">${billingSummary.total.toLocaleString()}</p>
                </div>
                <div className="p-4 border border-[var(--color-foreground)]/20 rounded-4xl bg-[var(--color-background)]">
                    <h2 className="text-lg font-medium text-[var(--color-foreground)] mb-2">Pendientes</h2>
                    <p className="text-3xl font-bold text-[var(--color-foreground)]">{billingSummary.pendientes}</p>
                </div>
                <div className="p-4 border border-[var(--color-foreground)]/20 rounded-4xl bg-[var(--color-background)]">
                    <h2 className="text-lg font-medium text-[var(--color-foreground)] mb-2">Facturas Hoy</h2>
                    <p className="text-3xl font-bold text-[var(--color-foreground)]">{billingSummary.facturasHoy}</p>
                </div>
                <div className="p-4 border border-[var(--color-foreground)]/20 rounded-4xl bg-[var(--color-background)]">
                    <h2 className="text-lg font-medium text-[var(--color-foreground)] mb-2">Ingresos Hoy</h2>
                    <p className="text-3xl font-bold text-[var(--color-foreground)]">${billingSummary.ingresosHoy.toLocaleString()}</p>
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gráfico de barras */}
                <div className="bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl p-6">
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Facturación Mensual</h3>
                    <ResponsiveContainer height={300}>
                        <BarChart data={monthlyBillingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fill: 'var(--color-foreground)' }} />
                            <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                            <Tooltip />
                            <Bar dataKey="total" fill="var(--color-foreground)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl p-6">
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Facturación Diaria</h3>
                    <ResponsiveContainer height={300}>
                        <BarChart data={dailyBillingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fill: 'var(--color-foreground)' }} />
                            <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                            <Tooltip />
                            <Bar dataKey="total" fill="var(--color-foreground)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                    Desglose de facturación
                </h2>

                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl overflow-hidden">

                        {/* Encabezado con líneas verticales y borde inferior */}
                        <div className="grid grid-cols-4 divide-x divide-[var(--color-foreground)]/10 border-b border-[var(--color-foreground)]/10">
                            <div className="px-4 py-3 text-left text-[var(--color-foreground)] font-semibold">
                                Fecha
                            </div>
                            <div className="px-4 py-3 text-left text-[var(--color-foreground)] font-semibold">
                                Total
                            </div>
                            <div className="px-4 py-3 text-left text-[var(--color-foreground)] font-semibold">
                                Transacciones
                            </div>
                            <div className="px-4 py-3 text-left text-[var(--color-foreground)] font-semibold">
                                Promedio
                            </div>
                        </div>

                        {/* Filas de datos con líneas verticales y división horizontal */}
                        {dailyBillingData.map((item, index) => {
                            const transacciones = Math.floor(Math.random() * 15 + 5);
                            const promedio = item.total / transacciones;
                            return (
                                <div
                                    key={index}
                                    className={`
              grid grid-cols-4 divide-x divide-[var(--color-foreground)]/10 
              border-t border-[var(--color-foreground)]/10
              ${index % 2 === 0 ? 'bg-[var(--color-foreground)]/5' : ''}
            `}
                                >
                                    <div className="px-4 py-2 text-[var(--color-foreground)]">
                                        {item.date}
                                    </div>
                                    <div className="px-4 py-2 text-[var(--color-foreground)]">
                                        ${item.total.toLocaleString()}
                                    </div>
                                    <div className="px-4 py-2 text-[var(--color-foreground)]">
                                        {transacciones}
                                    </div>
                                    <div className="px-4 py-2 text-[var(--color-foreground)]">
                                        ${promedio.toFixed(0)}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>

            {/* Botón para reporte */}
            <div className="mt-8">
                <button className="px-4 py-2 rounded-full border border-[var(--color-foreground)]/20 text-[var(--color-foreground)]">
                    Descargar Reporte
                </button>
            </div>
        </div>
    );
}
