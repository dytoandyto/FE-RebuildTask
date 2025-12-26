import { Clock, Users, CheckCircle2, Coffee, Video, MoreVertical } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Badge } from "@/components/ui/badge";

export const TodayTimeline = ({ schedule }: any) => {
    return (
        <div className="bg-card rounded-[32px] border border-border p-8 shadow-sm h-full overflow-hidden transition-all">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-black uppercase text-foreground">Today's Timeline</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-sada-red mt-1">December 23, 2026</p>
                </div>
                <Badge className="bg-sada-red/10 text-sada-red border-none font-black text-[10px]">
                    {schedule.length} EVENTS
                </Badge>
            </div>

            <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-muted before:content-['']">
                {schedule.map((item: any) => {
                    const isMeeting = item.type === "meeting";
                    const isBreak = item.type === "break";
                    
                    return (
                        <div key={item.id} className="relative pl-12 group">
                            {/* Timeline Dot */}
                            <div className={`absolute left-0 top-1.5 z-10 size-10 rounded-xl border-4 border-card flex items-center justify-center transition-all group-hover:scale-110 ${
                                item.status === 'completed' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 
                                item.status === 'in-progress' ? 'bg-sada-red shadow-lg shadow-sada-red/20' : 
                                'bg-muted text-muted-foreground'
                            }`}>
                                {isMeeting ? <Video size={14} className="text-white" /> : 
                                 isBreak ? <Coffee size={14} className="text-white" /> : 
                                 <CheckCircle2 size={14} className="text-white" />}
                            </div>

                            {/* Content Card */}
                            <div className={`p-5 rounded-[24px] border transition-all ${
                                item.status === 'in-progress' 
                                ? 'bg-muted/50 border-sada-red/20 shadow-sm' 
                                : 'border-border hover:bg-muted/30'
                            }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                                        {item.time}
                                    </span>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical size={14} className="text-muted-foreground" />
                                    </button>
                                </div>

                                <h4 className={`font-bold uppercase tracking-tight group-hover:text-sada-red transition-colors ${
                                    item.status === 'completed' ? 'line-through opacity-50' : 'text-foreground'
                                }`}>
                                    {item.title}
                                </h4>
                                
                                {item.project && (
                                    <p className="text-[10px] font-black text-sada-red/70 uppercase tracking-widest mt-1">
                                        {item.project}
                                    </p>
                                )}

                                {item.attendees && (
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                                        <div className="flex -space-x-2">
                                            {item.attendees.map((person: any, idx: number) => (
                                                <ImageWithFallback 
                                                    key={idx} 
                                                    src={person.avatar} 
                                                    className="size-6 rounded-full border-2 border-card" 
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[9px] font-bold text-muted-foreground">
                                            + {item.attendees.length} members
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};