import { FolderKanban, Plus } from 'lucide-react';

export const ProjectDetailHeader = ({ project }: { project: any }) => (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-muted/10 p-8 rounded-[32px] border border-border shadow-sm shadow-black/5">
        <div className="flex items-center gap-6">
            <div className={`size-16 flex items-center justify-center rounded-2xl ${project.color} shadow-xl shadow-sada-red/10 border border-white/10 ring-1 ring-white/10`}>
                <FolderKanban className="size-8 text-white drop-shadow-md" />
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter leading-none ">
                    {project.name}
                </h1>
                <p className="text-xs text-muted-foreground font-medium max-w-md line-clamp-1 opacity-70 ">
                    {project.description}
                </p>
            </div>
        </div>

        <button className="h-11 px-6 bg-sada-red hover:bg-red-700 text-white rounded-xl shadow-lg shadow-sada-red/20 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3 active:scale-95 border border-white/10">
            <Plus size={16} strokeWidth={3} />
            Create New Task
        </button>
    </div>
);