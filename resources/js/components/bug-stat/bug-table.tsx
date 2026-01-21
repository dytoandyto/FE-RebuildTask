import { Bug, Lightbulb } from "lucide-react";

export const BugTable = ({ items }: any) => (
    <div className="bg-card rounded-[32px] border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-muted/30 border-b border-border">
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Issue Details</th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Origin (WS & Proj)</th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Priority</th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Reporter</th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
                {items.map((item: any) => (
                    <tr key={item.id} className="group hover:bg-muted/20 transition-colors cursor-pointer">
                        <td className="p-5">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    {item.type === 'bug' ? 
                                        <Bug size={14} className="text-sada-red" /> : 
                                        <Lightbulb size={14} className="text-blue-500" />
                                    }
                                    <span className="font-bold text-foreground group-hover:text-sada-red transition-colors">
                                        {item.title}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                            </div>
                        </td>
                        <td className="p-5 text-xs font-bold">
                            <div className="text-foreground">{item.project}</div>
                            <div className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mt-1">
                                {item.workspace}
                            </div>
                        </td>
                        <td className="p-5 text-center">
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                                item.priority === 'critical' ? 'bg-sada-red text-white' : 'bg-muted text-muted-foreground'
                            }`}>
                                {item.priority}
                            </span>
                        </td>
                        <td className="p-5">
                            <div className="flex items-center gap-2">
                                <div className="size-7 rounded-full bg-slate-200 overflow-hidden">
                                    <img src={item.reporter.avatar} alt="" />
                                </div>
                                <span className="text-xs font-bold">{item.reporter.name}</span>
                            </div>
                        </td>
                        <td className="p-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border text-[9px] font-black uppercase tracking-widest">
                                {item.status.replace('-', ' ')}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);