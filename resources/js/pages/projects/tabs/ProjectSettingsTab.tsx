import { Save, Trash2, Archive, AlertTriangle, Calendar, Info } from "lucide-react";

export const ProjectSettingsTab = ({ project }: { project: any }) => {
    return (
        <div className="max-w-5xl flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* 1. General Configuration */}
            <section className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border bg-muted/10 flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-sada-red/10 flex items-center justify-center text-sada-red">
                        <Info size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">General Configuration</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Project identity and core details</p>
                    </div>
                </div>
                
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Project Nomenclature</label>
                            <input 
                                type="text" 
                                defaultValue={project.name} 
                                className="h-12 px-5 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-sada-red/20 outline-none transition-all font-bold"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Project Objectives / Description</label>
                            <textarea 
                                defaultValue={project.description} 
                                rows={5} 
                                className="p-5 rounded-3xl border border-border bg-background focus:ring-2 focus:ring-sada-red/20 outline-none transition-all resize-none text-sm leading-relaxed"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Operational Status</label>
                            <select className="h-12 px-5 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-sada-red/20 outline-none transition-all font-bold appearance-none">
                                <option value="active">ACTIVE OPERATION</option>
                                <option value="on-hold">ON HOLD / PAUSED</option>
                                <option value="completed">COMPLETED / ARCHIVED</option>
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Project Timeline</label>
                            <div className="flex items-center gap-3 h-12 px-5 rounded-2xl border border-border bg-muted/30 text-muted-foreground text-xs font-bold">
                                <Calendar size={16} />
                                Jan 12, 2024 - Dec 20, 2024
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-muted/5 border-t border-border flex justify-end">
                    <button className="flex items-center gap-2 px-8 h-12 rounded-2xl bg-sada-red text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-sada-red/20 hover:scale-[1.02] active:scale-95 transition-all">
                        <Save size={16} /> Commit Changes
                    </button>
                </div>
            </section>

            {/* 2. Management & Permissions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-card border border-border rounded-[32px] p-8 flex items-center justify-between group hover:border-sada-red/30 transition-all">
                    <div className="flex gap-4 items-center">
                        <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                            <Archive size={20} />
                        </div>
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Archive Project</h4>
                            <p className="font-bold text-sm">Move to inactive storage</p>
                        </div>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest p-3 hover:text-sada-red transition-colors">Execute</button>
                </section>

                <section className="bg-card border border-border rounded-[32px] p-8 flex items-center justify-between group hover:border-sada-red/30 transition-all">
                    <div className="flex gap-4 items-center">
                        <div className="size-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Transfer Ownership</h4>
                            <p className="font-bold text-sm">Assign new lead manager</p>
                        </div>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest p-3 hover:text-sada-red transition-colors">Transfer</button>
                </section>
            </div>

            {/* 3. Terminal Danger Zone */}
            <section className="border-2 border-red-500/20 bg-red-500/5 rounded-[40px] p-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2 flex items-center justify-center md:justify-start gap-2">
                        <AlertTriangle size={14} /> Critical Action Zone
                    </h3>
                    <h4 className="font-black text-xl mb-1 italic uppercase">Terminate Project Sector</h4>
                    <p className="text-xs text-muted-foreground max-w-sm">
                        This action is irreversible. All task data, personnel assignments, and associated documents within this sector will be purged from the system.
                    </p>
                </div>
                <button className="group flex items-center gap-3 px-10 h-14 rounded-[24px] bg-red-500 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95">
                    <Trash2 size={18} className="group-hover:animate-bounce" /> Delete Permanently
                </button>
            </section>
        </div>
    );
};