'use client';
import React, { useState, useMemo } from 'react';
import Select from '../components/Select';

type SlotMap = Record<string, string[]>;
type Booking = { doctor: string; date: string; time: string; };

export default function Schedule() {
    // Mock doctors
    const doctors = [
        { label: 'Todos', value: 'all' },
        { label: 'Dr. Juan Rodríguez', value: 'dr-juan-rodriguez' },
        { label: 'Dr. Maria Lopez', value: 'dr-maria-lopez' },
        { label: 'Dr. Carlos Pérez', value: 'dr-carlos-perez' },
        { label: 'Dra. Ana Torres', value: 'dra-ana-torres' },
        { label: 'Dra. Laura Gómez', value: 'dra-laura-gomez' },
        { label: 'Dr. Luis Fernández', value: 'dr-luis-fernandez' },
        { label: 'Dra. Paula Martínez', value: 'dra-paula-martinez' },
        { label: 'Dr. Andrés Sánchez', value: 'dr-andres-sanchez' },
    ]
    const [selectedDoctor, setSelectedDoctor] = useState<string>('all');
    // Mock available slots (shared)
    const generateSlots = (): SlotMap => {
        const map: SlotMap = {};
        const today = new Date();
        for (let i = 0; i < 60; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() + i);
            const iso = d.toISOString().slice(0, 10);
            if (Math.random() > 0.3) {
                const times = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
                map[iso] = times.filter(() => Math.random() > 0.3);
            }
        }
        return map;
    };

    const availableSlots = useMemo(() => generateSlots(), []);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [bookings, setBookings] = useState<Booking[]>([]);

    // Calendar controls
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
    const monthDays = useMemo(() => {
        const days: Date[] = [];
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) days.push(new Date(d));
        return days;
    }, [currentMonth]);

    const prevMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const nextMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    const monthLabel = currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    const weekdayLabels = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

    // Handle booking
    const handleBooking = () => {
        if (selectedTime && selectedDoctor !== 'Todos') {
            setBookings(prev => [...prev, { doctor: selectedDoctor, date: selectedDate, time: selectedTime }]);
            setSelectedTime('');
        }
    };
    const cancelBooking = (idx: number) => {
        setBookings(prev => prev.filter((_, i) => i !== idx));
    };

    // Filtered bookings for current view
    const viewBookings = bookings.filter(b =>
        (selectedDoctor === 'Todos' || b.doctor === selectedDoctor) && b.date === selectedDate
    );

    return (
        <div className="w-full p-8 space-y-6">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0">
                <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Gestión de Agenda</h1>
                <div className="flex space-x-4">
                    <Select
                        label='Seleccionar Médico'
                        options={doctors}
                        value={selectedDoctor}
                        onChange={setSelectedDoctor}
                    >

                    </Select>
                </div>
            </header>

            {/* Main panel */}
            <div className="flex flex-col lg:flex-row bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl overflow-hidden">
                {/* Calendar */}
                <section className="w-full lg:w-2/3 border-b lg:border-b-0 lg:border-r border-[var(--color-foreground)]/20 p-6">
                    <div className="flex items-center justify-center mb-4 relative">
                        <button
                            onClick={prevMonth}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[var(--color-foreground)/10] focus:outline-none cursor-pointer"
                        >
                            <svg
                                className="w-6 h-6 text-[var(--color-foreground)]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold capitalize">{monthLabel}</h2>
                        <button
                            onClick={nextMonth}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[var(--color-foreground)/10] focus:outline-none cursor-pointer"
                        >
                            <svg
                                className="w-6 h-6 text-[var(--color-foreground)]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                        {weekdayLabels.map(d => <div key={d} className="font-medium opacity-70 text-[var(--color-foreground)]">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-sm">
                        {monthDays.map(day => {
                            const iso = day.toISOString().slice(0, 10);
                            const has = availableSlots[iso]?.length > 0;
                            const sel = selectedDate === iso;
                            return (
                                <button key={iso}
                                    onClick={() => has && (setSelectedDate(iso), setSelectedTime(''))}
                                    className={
                                        `h-10 flex items-center justify-center rounded-full transition focus:outline-none ` +
                                        (sel
                                            ? 'bg-[var(--color-foreground)] text-[var(--color-background)] cursor-pointer'
                                            : has
                                                ? 'bg-[var(--color-foreground)]/10 hover:bg-[var(--color-foreground)]/20 text-[var(--color-foreground)] cursor-pointer'
                                                : 'opacity-30 cursor-not-allowed')
                                    }
                                >{day.getDate()}</button>
                            );
                        })}
                    </div>
                </section>

                {/* Slots & bookings */}
                <section className="w-full lg:w-1/3 p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
                        {new Date(selectedDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {availableSlots[selectedDate]?.length ?
                            availableSlots[selectedDate].map(time => (
                                <button key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={
                                        `py-2 px-3 border border-[var(--color-foreground)] rounded-full transition cursor-pointer ${(selectedTime === time
                                            ? 'bg-[var(--color-foreground)] text-[var(--color-background)]'
                                            : 'bg-[var(--color-background)] text-[var(--color-foreground)]')}`
                                    }
                                >{time}</button>
                            ))
                            : <p className="col-span-full opacity-70 text-[var(--color-foreground)]">No hay horas disponibles.</p>
                        }
                    </div>
                    <button
                        onClick={handleBooking}
                        disabled={!selectedTime || selectedDoctor === 'Todos'}
                        className="w-full py-2 rounded-2xl bg-[var(--color-foreground)] text-[var(--color-background)] hover:opacity-90 disabled:opacity-40"
                    >Reservar</button>

                    {/* Existing bookings */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-[var(--color-foreground)]">Reservas</h4>
                        {viewBookings.length ? viewBookings.map((b, i) => (
                            <div key={i} className="flex justify-between items-center px-3 py-2 bg-[var(--color-foreground)]/5 rounded-lg">
                                <span className="text-[var(--color-foreground)] text-sm">{b.time} - {b.doctor === 'Todos' ? '' : b.doctor}</span>
                                <button onClick={() => cancelBooking(i)} className="text-[var(--color-foreground)] hover:opacity-70">✖️</button>
                            </div>
                        )) : <p className="opacity-70 text-[var(--color-foreground)] text-sm">Sin reservas.</p>}
                    </div>
                </section>
            </div>
        </div>
    );
}
