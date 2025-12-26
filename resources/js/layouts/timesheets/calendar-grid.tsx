export const CalendarGrid = ({ calendarDays, today, getEventsByDate }: any) => (
    <div className="grid grid-cols-7 gap-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 p-2">
                {day}
            </div>
        ))}

        {calendarDays.map((day: any, index: number) => {
            const events = day.date ? getEventsByDate(day.date) : [];
            const isToday = day.date === today;

            return (
                <div key={index} className={`min-h-[140px] p-3 rounded-[24px] border transition-all ${
                    !day.isCurrentMonth ? "bg-muted/20 border-transparent opacity-30" :
                    isToday ? "border-sada-red/30 bg-sada-red/[0.02] shadow-sm" :
                    "border-border bg-card hover:border-sada-red/20 hover:bg-muted/10"
                }`}>
                    {day.date && (
                        <>
                            <div className={`inline-flex items-center justify-center size-8 rounded-xl mb-3 text-xs font-black ${
                                isToday ? "bg-sada-red text-white shadow-lg shadow-sada-red/20" : "text-foreground"
                            }`}>
                                {day.date}
                            </div>
                            <div className="space-y-1.5">
                                {events.slice(0, 2).map((event: any) => (
                                    <div key={event.id} className="bg-muted border border-border rounded-lg p-2 text-[10px] font-bold transition-all hover:scale-[1.02]">
                                        <div className="text-foreground truncate uppercase tracking-tighter">{event.title}</div>
                                        <div className="text-muted-foreground opacity-70 mt-0.5">{event.time}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            );
        })}
    </div>
);