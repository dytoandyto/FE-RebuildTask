import { Trash2, Archive, ShieldCheck, Globe } from "lucide-react";

export const SettingsTab = ({ workspace }: { workspace: any }) => {
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* General Info */}
            <section className="bg-card border border-border rounded-[32px] overflow-hidden">
                <div className="p-8 border-b border-border bg-muted/20">
                    <h3 className="font-bold text-lg">General Information</h3>
                    <p className="text-xs text-muted-foreground">Update your workspace identity and basic details.</p>
                </div>
                <div className="p-8 flex flex-col gap-6">
                    <div className="grid gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1">Workspace Name</label>
                        <input type="text" defaultValue={workspace.name} className="h-12 px-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1">Description</label>
                        <textarea defaultValue={workspace.description} rows={4} className="p-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
                    </div>
                    <button className="w-fit px-8 h-12 rounded-2xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">
                        Save Changes
                    </button>
                </div>
            </section>

            {/* Permissions & Privacy */}
            <section className="bg-card border border-border rounded-[32px] p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Globe size={20}/></div>
                        <div>
                            <h4 className="font-bold text-sm">Public Visibility</h4>
                            <p className="text-[10px] text-muted-foreground leading-tight">Visible to everyone in organization</p>
                        </div>
                        <input type="checkbox" className="ml-auto size-5 rounded-md border-border" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500"><ShieldCheck size={20}/></div>
                        <div>
                            <h4 className="font-bold text-sm">Restrict Member Invites</h4>
                            <p className="text-[10px] text-muted-foreground leading-tight">Only managers can invite new people</p>
                        </div>
                        <input type="checkbox" className="ml-auto size-5 rounded-md border-border" />
                    </div>
                </div>
            </section>

            {/* Danger Zone */}
            <section className="border-2 border-red-500/20 bg-red-500/5 rounded-[32px] p-8">
                <h3 className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-6">Danger Zone</h3>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div>
                        <h4 className="font-bold text-sm">Delete this workspace</h4>
                        <p className="text-[10px] text-muted-foreground">Once deleted, it cannot be recovered. All projects will be lost.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 h-12 rounded-2xl bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
                        <Trash2 size={16} /> Delete Workspace
                    </button>
                </div>
            </section>
        </div>
    );
};