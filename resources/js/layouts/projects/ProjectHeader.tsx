import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
    title?: string;
    description?: string;
    onAction?: () => void;
    onCreateProject: () => void;
}

export const ProjectHeader = ({ onCreateProject }: ProjectHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter">Project Management</h1>
                <p className="text-xs text-muted-foreground uppercase font-bold opacity-50">Manage and track all your team projects</p>
            </div>

            {/* Tombol yang lo maksud tadi bro */}
            <button 
                onClick={onCreateProject} // 4. Pasang di sini
                className="bg-sada-red hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-sada-red/20 active:scale-95"
            >
                <Plus size={14} strokeWidth={3} />
                Create Project
            </button>
        </div>
    );
};