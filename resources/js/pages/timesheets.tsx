import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { timesheets } from '@/routes';
import { Page } from '@inertiajs/core';
import { TIME_STATS_DUMMY } from '@/data/time-stat';
import { TimesheetHeader } from '@/layouts/timesheets/time-header';
import { TimesheetStats } from '@/layouts/timesheets/timesheetStats';
import { CalendarGrid } from '@/layouts/timesheets/calendar-grid';
import { Head } from '@inertiajs/react';
import { generateCalendarDays } from '@/data/time-calendar';
import { calendarEvents } from '@/data/time-calendar-events';
import { TodayTimeline } from '@/layouts/timesheets/time-today';
import { todaySchedule } from '@/data/time-schedule';
import { timeEntries } from '@/data/time-entries';
import { TimesheetTable } from '@/layouts/timesheets/time-table';
import { TimerControl } from '@/layouts/timesheets/time-control';

interface TimesheetsProps extends Page {
    auth: {
        user: {
            name: string;
            email: string;
            company?: { name: string };
        };
        permissions: string[];
    };
}

export default function Timesheets() {
    // 1. Inisialisasi Data Kalender
    const calendarDays = generateCalendarDays();
    const todayDate = 23; // Sesuai dengan data dummy kamu yang banyak di tanggal 23

    // 2. State untuk View Toggle (Opsional jika ingin pindah ke list/schedule nanti)
    const [currentView, setCurrentView] = useState<'calendar' | 'schedule' | 'timesheet'>('calendar');

    // 3. Helper untuk mencari event berdasarkan tanggal
    const getEventsByDate = (date: number | null) => {
        if (!date) return [];
        return calendarEvents.filter(event => event.date === date);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Timesheets', href: timesheets().url }]}>
            <Head title="Timesheets" />

            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-0 p-6 md:p-10 transition-all">

                <TimesheetHeader
                    onAddEvent={() => console.log("Open Modal")}
                    onExport={() => console.log("Exporting...")}
                />

                {/* 1. View Toggles - Navigasi antar tampilan */}
                <div className="flex items-center gap-1 bg-muted/50 p-1.5 rounded-2xl border border-border/50 mb-8 w-fit shadow-sm">
                    {['calendar', 'schedule', 'timesheet'].map((view) => (
                        <button
                            key={view}
                            onClick={() => setCurrentView(view as any)}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentView === view
                                ? "bg-background shadow-md text-sada-red scale-100"
                                : "text-muted-foreground hover:text-foreground opacity-70"
                                }`}
                        >
                            {view}
                        </button>
                    ))}
                </div>

                <TimesheetStats stats={TIME_STATS_DUMMY} />

                <TimerControl />

                {/* 2. Dynamic Content Area */}
                <div className="mt-4 min-h-[600px]">
                    {/* Tampilan Kalender Bulanan */}
                    {currentView === 'calendar' && (
                        <div className="bg-card rounded-[32px] p-8 border border-border shadow-sm animate-in fade-in zoom-in-95 duration-300">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h2 className="text-xl font-black uppercase text-foreground">December 2026</h2>
                            </div>
                            <CalendarGrid
                                calendarDays={calendarDays}
                                today={todayDate}
                                getEventsByDate={getEventsByDate}
                            />
                        </div>
                    )}
                    {/* Tampilan Timeline Harian */}
                    {currentView === 'schedule' && (
                        <TodayTimeline schedule={todaySchedule} />
                    )}
                    {/* Tampilan Tabel Jam Kerja */}
                    {currentView === 'timesheet' && (
                        <TimesheetTable entries={timeEntries} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}