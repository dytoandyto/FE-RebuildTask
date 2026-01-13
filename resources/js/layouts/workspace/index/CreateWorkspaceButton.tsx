import WorkspaceModal from "@/components/modal/WorkspaceModal";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CreateWorkspaceButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="h-11 px-6 bg-gradient-to-r from-sada-red to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-xl shadow-lg shadow-sada-red/20 transition-all duration-300 flex items-center gap-3 group active:scale-95 border border-white/10 relative overflow-hidden"
            >
                {/* Efek Kilau saat Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative flex items-center gap-2.5">
                    <div className="bg-white/15 p-1.5 rounded-lg group-hover:bg-white/25 group-hover:rotate-90 transition-all duration-500 shadow-inner">
                        <Plus size={14} className="text-white" strokeWidth={4} />
                    </div>

                    <span className="text-[11px] font-black uppercase tracking-[0.15em]">
                        CREATE WORKSPACE
                    </span>
                </div>
            </button>

            {/* Modal Control */}
            <WorkspaceModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}