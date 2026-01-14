import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { TIME_STATS_DUMMY } from '@/data/time-stat';
import { generateCalendarDays } from '@/data/time-calendar';
import { calendarEvents } from '@/data/time-calendar-events';
import { timeEntries } from '@/data/time-entries';
import { TimesheetHeader } from '@/layouts/timesheets/TimesheetHeader';
import { TimesheetStats } from '@/layouts/timesheets/timesheetStats';
import { TimesheetControls } from '@/layouts/timesheets/control/TImesheetsControl';
import { ViewRenderer } from '@/layouts/timesheets/ViewRenderer';
import { BreadcrumbItem } from '@/types';
import { timesheets } from '@/routes';

export default function Timesheets() {
    const [currentView, setCurrentView] = useState<'calendar' | 'audit' | 'review' | 'analytics'>('calendar');
    const [searchQuery, setSearchQuery] = useState('');

    const calendarProps = {
        calendarDays: generateCalendarDays(),
        today: 14,
        getEventsByDate: (date: number | null) => date ? calendarEvents.filter(e => e.date === date) : []
    };

    const pendingLogs = [
        { name: "Alex Operative", date: "Today", duration: "4.5", status: "pending", note: "Sector Alpha Inspection", hasFile: true },
        { name: "Sarah Jenkins", date: "Today", duration: "2.0", status: "pending", note: "Infrastructure Audit" }
    ];
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Timesheets', href: timesheets().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Timesheets" />

            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10">
                <TimesheetHeader onAddEvent={() => { }} onExport={() => { }} />

                <TimesheetStats stats={TIME_STATS_DUMMY} />

                <TimesheetControls
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <ViewRenderer
                    currentView={currentView}
                    data={{ calendarProps, timeEntries, pendingLogs }}
                />
            </div>
        </AppLayout>
    );
}