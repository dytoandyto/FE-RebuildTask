import React, { useState } from 'react';
import { 
    X, 
    Target, 
    User, 
    Calendar, 
    FileText, 
    Plus, 
    ShieldAlert, 
    ChevronDown,
    Zap
} from 'lucide-react';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "@/components/ui/dialog";

interface AddSubTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    operatives: any[]; // List anggota tim dari Task utama
}

export const AddSubTaskModal = ({ isOpen, onClose, operatives }: AddSubTaskModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white border-zinc-200 rounded-[40px] p-0 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                
                {/* --- HEADER --- */}
                <div className="bg-zinc-950 p-8 text-white relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-8 opacity-10 rotate-12">
                        <Target size={120} />
                    </div>
                    <DialogHeader className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-sada-red rounded-lg">
                                <Plus size={18} strokeWidth={3} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sada-red">New Deployment</span>
                        </div>
                        <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Initialize Objective</DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                            Define specific sub-sector parameters and assign personnel.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* --- FORM BODY --- */}
                <form className="p-8 space-y-6">
                    
                    {/* 1. Objective Title */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1 flex items-center gap-2">
                            <Zap size={12} className="text-sada-red" /> Objective Title
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g. High-Fidelity Mobile Slicing"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-[12px] font-bold text-zinc-900 focus:ring-4 focus:ring-sada-red/5 focus:border-sada-red outline-none transition-all italic"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* 2. Assign Personnel */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1 flex items-center gap-2">
                                <User size={12} /> Operative
                            </label>
                            <div className="relative">
                                <select className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-[11px] font-black text-zinc-900 focus:ring-4 focus:ring-sada-red/5 focus:border-sada-red outline-none appearance-none cursor-pointer uppercase tracking-tight italic">
                                    <option value="">SELECT OPERATIVE</option>
                                    {operatives.map((op, i) => (
                                        <option key={i} value={op.name}>{op.name.toUpperCase()}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* 3. Deadline */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1 flex items-center gap-2">
                                <Calendar size={12} /> Termination
                            </label>
                            <input 
                                type="date" 
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-[11px] font-black text-zinc-900 focus:ring-4 focus:ring-sada-red/5 focus:border-sada-red outline-none italic"
                            />
                        </div>
                    </div>

                    {/* 4. Technical Description */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1 flex items-center gap-2">
                            <FileText size={12} /> Technical Briefing
                        </label>
                        <textarea 
                            rows={3}
                            placeholder="Specify technical requirements and constraints..."
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-5 text-[12px] font-medium text-zinc-600 focus:ring-4 focus:ring-sada-red/5 focus:border-sada-red outline-none transition-all resize-none italic"
                        />
                    </div>

                    {/* --- FOOTER ACTIONS --- */}
                    <div className="flex gap-4 pt-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-12 rounded-2xl border border-zinc-200 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:bg-zinc-50 transition-colors"
                        >
                            Abort
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 h-12 bg-sada-red text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-sada-red/20 hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <ShieldAlert size={14} /> Dispatch Objective
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};