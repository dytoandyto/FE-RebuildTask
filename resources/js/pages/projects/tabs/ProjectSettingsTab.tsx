import { Trash2, Save } from "lucide-react";

export const ProjectSettingsTab = ({ project }: { project: any }) => {
    return (
        <div className="max-w-4xl flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-card border border-border rounded-[32px] p-8 flex flex-col gap-6">
                <div className="grid gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Project Name</label>
                    <input type="text" defaultValue={project.name} className="h-12 px-5 rounded-2xl border border-border bg-muted/20 focus:ring-2 focus:ring-sada-red/20 outline-none" />
                </div>
                <div className="grid gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Description</label>
                    <textarea defaultValue={project.description} rows={4} className="p-5 rounded-2xl border border-border bg-muted/20 focus:ring-2 focus:ring-sada-red/20 outline-none resize-none" />
                </div>
                <button className="flex items-center gap-2 w-fit px-8 h-12 rounded-2xl bg-sada-red text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-sada-red/20 hover:scale-[1.02] transition-all">
                    <Save size={16} /> Update Project
                </button>
            </section>

            <section className="border-2 border-red-500/10 bg-red-500/5 rounded-[32px] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h4 className="font-bold text-sm text-red-500">Archive this project</h4>
                    <p className="text-[10px] text-muted-foreground">Removing it from active view but keeping the data.</p>
                </div>
                <button className="flex items-center gap-2 px-6 h-11 rounded-xl bg-red-500/10 text-red-500 font-bold text-xs hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={14} /> Delete Project
                </button>
            </section>
        </div>
    );
};