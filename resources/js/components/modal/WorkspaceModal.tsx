import { X } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function WorkspaceModal({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-background border border-border w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                    <h3 className="text-sm font-black uppercase tracking-tight">Create Workspace</h3>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Workspace Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. IT Department"
                            className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-sada-red outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Description</label>
                        <textarea 
                            placeholder="Brief purpose of this workspace..."
                            rows={3}
                            className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-sada-red outline-none transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 flex gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-colors"
                    >
                        Abort
                    </button>
                    <button className="flex-1 px-4 py-2.5 rounded-xl bg-sada-red text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-sada-red/20">
                        Deploy Workspace
                    </button>
                </div>
            </div>
        </div>
    );
}