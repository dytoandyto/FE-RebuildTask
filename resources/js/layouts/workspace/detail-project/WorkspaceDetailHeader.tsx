import { Building2, Users2, LayoutGrid } from 'lucide-react';

interface HeaderProps {
    workspace: any;
    projectCount: number;
}

export const WorkspaceDetailHeader = ({ workspace, projectCount }: HeaderProps) => (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-muted/10 p-8 rounded-[32px] border border-white/5 shadow-inner">
        <div className="flex items-center gap-6">
            <div className="size-20 flex items-center justify-center rounded-3xl bg-gradient-to-br from-sada-red to-red-950 shadow-2xl shadow-sada-red/20 border border-white/10 ring-1 ring-white/10">
                <Building2 className="size-10 text-white" />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter leading-none ">
                    {workspace.name}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users2 size={14} className="text-sada-red" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{workspace.members?.length || 0} Members</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <LayoutGrid size={14} className="text-sada-red" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{projectCount} Projects</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Progress Stability */}
        <div className="flex flex-col items-end gap-3 min-w-[240px]">
            <div className="flex justify-between w-full items-end">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Project Status</span>
                <span className="text-2xl font-black text-foreground ">{workspace.progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden border border-white/5 p-[1px]">
                <div
                    className="h-full bg-gradient-to-r from-sada-red to-red-600 rounded-full shadow-[0_0_15px_rgba(227,6,19,0.5)] transition-all duration-1000"
                    style={{ width: `${workspace.progress}%` }}
                />
            </div>
        </div>
    </div>
);