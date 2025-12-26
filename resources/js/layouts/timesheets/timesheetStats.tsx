export const TimesheetStats = ({ stats }: any) => (
    <div className="bg-card rounded-[32px] border border-border p-8 shadow-sm mb-8 relative overflow-hidden transition-all">
        <div className="absolute top-0 right-0 size-64 bg-sada-red/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat: any, i: number) => (
                <div key={i} className={`flex flex-col gap-3 ${i !== 0 ? "lg:border-l lg:border-border/50 lg:pl-8" : ""}`}>
                    <div className={`size-10 rounded-xl bg-muted/50 flex items-center justify-center`}>
                        <stat.icon className="size-5 text-sada-red" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.title}</p>
                        <h3 className="text-3xl font-black text-foreground mt-1 tracking-tighter">{stat.value}</h3>
                        <p className="text-[10px] font-bold text-emerald-500 mt-1">{stat.change}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);