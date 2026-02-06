import { Flag, Calendar, CheckCircle2, StickyNote, Target, User, Plus, ArrowRight, Activity, Shield } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { AddSubTaskModal } from '@/components/subtask/addSubtaskModal';

interface Props {
    task: any;
    isManager?: boolean; // Tambahkan prop ini untuk cek role
}

export const TaskOverview = ({ task, isManager = false }: Props) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- KIRI: MISSION BRIEF & SUB-TASKS --- */}
            <div className="lg:col-span-2 flex flex-col gap-8">

                {/* Description Card (Dilihat semua role) */}
                <div className="bg-muted/10 border border-border rounded-[40px] p-8 md:p-10 relative overflow-hidden shadow-inner">
                    <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] rotate-12 select-none pointer-events-none text-foreground">
                        <StickyNote size={300} />
                    </div>
                    <div className="relative z-10 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-sada-red uppercase tracking-[0.2em] ">Mission Parameters</span>
                            {isManager && <Shield size={10} className="text-sada-red opacity-50" />}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed  opacity-90 max-w-2xl font-medium mt-2">
                            {task.description || "No specific mission parameters defined for this objective."}
                        </p>
                    </div>
                </div>

                {/* --- SUB-TASKS SECTION --- */}
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-end px-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-black uppercase tracking-tighter  flex items-center gap-3">
                                <Target className="text-sada-red" size={20} />
                                Operational Objectives
                            </h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-50">
                                {task.subtasks?.length || 0} Sub-sectors identified
                            </p>
                        </div>

                        {/* CONDITIONAL RENDERING: Hanya Manager yang bisa Add Sub-Task */}
                        {isManager && (
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="h-10 px-5 bg-foreground text-background rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-sada-red hover:text-white transition-all shadow-lg active:scale-95"
                            >
                                <Plus size={14} strokeWidth={3} /> Add Objective
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {task.subtasks?.map((sub: any) => (
                            <div
                                key={sub.id}
                                className="group bg-background border border-border rounded-[28px] p-6 flex items-center justify-between hover:border-sada-red/40 hover:shadow-xl hover:shadow-sada-red/5 transition-all duration-300"
                            >
                                <div className="flex items-center gap-6">
                                    {/* Checkbox: Member bisa klik untuk update, atau Manager untuk verifikasi */}
                                    <button className={`size-8 rounded-xl border-2 flex items-center justify-center transition-all ${sub.is_completed ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-border bg-muted/20 hover:border-sada-red/50'}`}>
                                        {sub.is_completed && <CheckCircle2 size={16} className="text-white" />}
                                    </button>

                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[16px] font-black uppercase tracking-tight ${sub.is_completed ? 'text-muted-foreground line-through opacity-40 ' : 'text-foreground'}`}>
                                                {sub.title}
                                            </span>
                                            <span className="text-[8px] font-black px-2 py-0.5 bg-muted rounded border border-border text-muted-foreground/50">{sub.id}</span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-1.5">
                                                <User size={10} className="text-sada-red" />
                                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight ">
                                                    Assigned: {sub.assigned_to}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Link masuk ke Detail Sub-task (Bisa diakses semua role) */}
                                <Link
                                    href={`/subtasks/${sub.id}`}
                                    className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-muted/50 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:bg-sada-red hover:text-white transition-all group/link shadow-sm"
                                >
                                    View Detail <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- KANAN: SIDEBAR --- */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-muted/10 border border-border flex flex-col gap-4 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Activity size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-sada-red uppercase tracking-[0.3em]">Integrity Score</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-forebackground  tracking-tighter">{task.progress}%</span>
                                <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest text-emerald-500">Nominal</span>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-muted-foreground rounded-full overflow-hidden p-[1px]">
                            <div
                                className="h-full bg-sada-red rounded-full shadow-[0_0_15px_rgba(227,6,19,0.8)] transition-all duration-1000"
                                style={{ width: `${task.progress}%` }}
                            />
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed ">
                            Overall objective completion rate based on sub-sector transmissions.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <StatusItem icon={<Flag size={14} />} label="Priority" value={task.priority} red />
                    <StatusItem icon={<Calendar size={14} />} label="Deadline" value={task.dueDate} />
                    <StatusItem icon={<CheckCircle2 size={14} />} label="State" value={task.status} green />
                </div>

                {/* Modal hanya dirender jika role Manager, tapi tetap butuh isOpen logic */}
                {isManager && (
                    <AddSubTaskModal
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        operatives={task.members || [task.assignee]}
                    />
                )}
            </div>
        </div>
    );
};

const StatusItem = ({ icon, label, value, red, green }: any) => (
    <div className="bg-white border border-border p-5 rounded-[24px] flex items-center justify-between group hover:border-sada-red/30 transition-all shadow-sm">
        <div className="flex items-center gap-3  font-black uppercase text-[9px] text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
            {icon} {label}
        </div>
        <span className={`text-[11px] font-black uppercase  tracking-tighter ${red ? 'text-sada-red' : green ? 'text-emerald-500' : 'text-foreground'}`}>
            {value}
        </span>
    </div>
);