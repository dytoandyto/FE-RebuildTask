export const TimesheetStats = ({ stats }: any) => (
    <div className="bg-card rounded-[40px] border border-border p-10 shadow-sm mb-8 relative overflow-hidden group transition-all">
        {/* Glow effect background */}
        <div className="absolute top-0 right-0 size-64 bg-sada-red/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-50 group-hover:bg-sada-red/10 transition-all duration-700" />
        
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat: any, i: number) => (
                <div key={i} className={`flex flex-col gap-4 ${i !== 0 ? "lg:border-l lg:border-border/50 lg:pl-10" : ""}`}>
                    {/* Icon Container */}
                    <div className={`size-12 rounded-2xl flex items-center justify-center transition-all ${
                        stat.isWarning ? "bg-sada-red/10 text-sada-red shadow-[0_0_15px_rgba(227,6,19,0.2)]" : "bg-muted text-muted-foreground"
                    }`}>
                        <stat.icon className="size-6" />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-black uppercase  text-muted-foreground">
                            {stat.title}
                        </p>
                        <h3 className="text-4xl font-black text-foreground tracking-tighter">
                            {stat.value}
                        </h3>
                        <p className={`text-[9px] font-black uppercase  mt-1 ${
                            stat.isWarning ? "text-sada-red animate-pulse" : "text-emerald-500"
                        }`}>
                            {stat.change}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);