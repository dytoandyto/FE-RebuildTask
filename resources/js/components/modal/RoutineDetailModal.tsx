import { TASKS_LIST_DUMMY } from '@/data/tasksList';
import { X, Clock, Paperclip, Trash2, Save, Layout, ChevronDown } from 'lucide-react';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    taskData?: any;
}

export const RoutineDetailModal = ({ isOpen, onClose, taskData }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Container */}
            <div className="bg-background border border-border w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* 1. Header & Close Button */}
                <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
                    <h3 className="text-sm font-black  ">
                        {taskData ? 'Update Routine' : 'Add Routine'}
                    </h3>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 flex flex-col gap-8">
                    
                    {/* 2. Main Title Input (Google Calendar Style) */}
                    <div className="flex flex-col gap-2 group">
                        <input 
                            autoFocus
                            type="text" 
                            placeholder="Add Title" 
                            className="bg-transparent border-none text-2xl font-black text-foreground placeholder:text-muted-foreground/30 focus:ring-0 p-0 shadow-none outline-none uppercase   tracking-tighter"
                            defaultValue={taskData?.title}
                        />
                        <div className="h-0.5 w-full bg-border group-focus-within:bg-sada-red transition-all duration-500" />
                    </div>

                    {/* 3. Operational Details Grid */}
                    <div className="flex flex-col gap-6">
                        
                        {/* Time & Date Row */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 flex items-center gap-2">
                                <Clock size={12} className="text-sada-red" /> Operational Window
                            </label>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 bg-muted/50 border border-border px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest   text-foreground/70">
                                    Tuesday, Jan 20
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="time" defaultValue={taskData?.startTime || "09:00"} className="bg-muted/50 border border-border rounded-xl text-xs font-black text-foreground focus:ring-1 focus:ring-sada-red p-2.5 outline-none" />
                                    <span className="text-muted-foreground/30">—</span>
                                    <input type="time" defaultValue={taskData?.endTime || "11:00"} className="bg-muted/50 border border-border rounded-xl text-xs font-black text-foreground focus:ring-1 focus:ring-sada-red p-2.5 outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Project Link Row (Menggunakan TASKS_LIST_DUMMY) */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 flex items-center gap-2">
                                <Layout size={12} className="text-sada-red" /> Linked Project Task
                            </label>
                            <div className="relative group/select">
                                <select className="w-full bg-muted/50 border border-border rounded-xl text-[11px] font-bold text-foreground p-3 pr-10 appearance-none focus:ring-1 focus:ring-sada-red transition-all uppercase tracking-tight outline-none cursor-pointer">
                                    <option value="" disabled selected>Select active task...</option>
                                    {TASKS_LIST_DUMMY.map((task) => (
                                        <option key={task.id} value={task.id}>
                                            [{task.id}] {task.title} — {task.project_name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
                            </div>
                        </div>

                        {/* Evidence Upload Row */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 flex items-center gap-2">
                                <Paperclip size={12} className="text-sada-red" /> Mission Evidence
                            </label>
                            
                            <div className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-sada-red/30 hover:bg-sada-red/5 transition-all cursor-pointer group/upload">
                                <Paperclip size={20} className="text-muted-foreground group-hover:text-sada-red transition-colors" />
                                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest group-hover:text-foreground transition-colors">Attach Documentation</span>
                            </div>

                            {/* File Pill */}
                            {taskData?.hasFile && (
                                <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-xl border border-border group/file">
                                    <div className="flex items-center gap-3 truncate">
                                        <div className="size-8 rounded-lg bg-sada-red/10 flex items-center justify-center border border-sada-red/20">
                                            <Paperclip size={12} className="text-sada-red" />
                                        </div>
                                        <span className="text-[10px] font-bold text-foreground/70 uppercase truncate tracking-tight  ">survey_report_jan.jpg</span>
                                    </div>
                                    <button className="p-1.5 hover:bg-sada-red/10 rounded-lg text-muted-foreground hover:text-sada-red transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4. Footer Actions (Style dari WorkspaceModal) */}
                <div className="p-6 pt-0 flex gap-3 bg-background">
                    <button className="p-2.5 text-muted-foreground hover:text-sada-red hover:bg-sada-red/10 rounded-xl border border-border transition-all" title="Delete Entry">
                        <Trash2 size={18} />
                    </button>
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-colors"
                    >
                        Discard
                    </button>
                    <button className="flex-1 px-4 py-2.5 rounded-xl bg-sada-red text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-sada-red/20 flex items-center justify-center gap-2">
                        <Save size={14} /> Save
                    </button>
                </div>
            </div>
        </div>
    );
};