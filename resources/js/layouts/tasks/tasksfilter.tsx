import { X, Check } from "lucide-react";


interface TaskFiltersProps {
    isVisible: boolean;
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    selectedPriority: string;
    setSelectedPriority: (priority: string) => void;
    onReset: () => void;
}

export const TaskFilters = ({
    isVisible,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    onReset
}: TaskFiltersProps) => {
    if (!isVisible) return null;

    const statuses = ['all', 'todo', 'in-progress', 'completed', 'overdue'];
    const priorities = ['all', 'low', 'medium', 'high'];

    return (
        <div className="bg-card border border-border rounded-[28px] p-6 mb-6 animate-in slide-in-from-top-4 duration-300 shadow-sm">
            <div className="flex flex-col gap-6">
                
                {/* Status Filter */}
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">Filter by Status</h4>
                    <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    selectedStatus === status 
                                    ? 'bg-sada-red border-sada-red text-white shadow-md scale-105' 
                                    : 'bg-muted/50 border-transparent text-muted-foreground hover:border-border hover:bg-muted'
                                }`}
                            >
                                <div className="flex items-center gap-2 uppercase tracking-tighter">
                                    {selectedStatus === status && <Check className="size-3" />}
                                    {status.replace('-', ' ')}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Priority Filter */}
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">Filter by Priority</h4>
                    <div className="flex flex-wrap gap-2">
                        {priorities.map((priority) => (
                            <button
                                key={priority}
                                onClick={() => setSelectedPriority(priority)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    selectedPriority === priority 
                                    ? 'bg-foreground border-foreground text-background shadow-md scale-105' 
                                    : 'bg-muted/50 border-transparent text-muted-foreground hover:border-border hover:bg-muted'
                                }`}
                            >
                                <div className="flex items-center gap-2 uppercase tracking-tighter">
                                    {selectedPriority === priority && <Check className="size-3" />}
                                    {priority}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer / Reset Action */}
                <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                    <p className="text-[10px] text-muted-foreground italic font-medium">
                        Showing filtered results based on your selection
                    </p>
                    <button 
                        onClick={onReset}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sada-red hover:opacity-70 transition-opacity"
                    >
                        <X className="size-3" />
                        Clear All Filters
                    </button>
                </div>
            </div>
        </div>
    );
};