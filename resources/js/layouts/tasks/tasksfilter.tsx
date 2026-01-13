import { X, Check } from "lucide-react";
import { DateRangePicker } from '@/components/DateRangeFilter';

interface TaskFiltersProps {
    isVisible: boolean;
    selectedStatus: string[];
    setSelectedStatus: (status: string[]) => void;
    selectedPriority: string[];
    setSelectedPriority: (priority: string[]) => void;
    onReset: () => void;
    onDateFilter: (range: any) => void;
}

export const TaskFilters = ({
    isVisible,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    onReset,
    onDateFilter
}: TaskFiltersProps) => {
    if (!isVisible) return null;

    const statuses = ['todo', 'in-progress', 'completed', 'overdue']; // Hapus 'all' dari list karena defaultnya []
    const priorities = ['low', 'medium', 'high'];

    // Fungsi Helper Toggle
    const toggleFilter = (currentArray: string[], value: string, setter: (val: string[]) => void) => {
        if (currentArray.includes(value)) {
            // Kalau sudah ada, hapus (unselect)
            setter(currentArray.filter(item => item !== value));
        } else {
            // Kalau belum ada, tambahkan (select)
            setter([...currentArray, value]);
        }
    };

    return (
        <div className="bg-card border border-border rounded-[28px] p-6 mb-6 animate-in slide-in-from-top-4 duration-300 shadow-sm">
            <div className="flex flex-col gap-6">
                
                {/* Status Filter */}
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">Filter by Status (Multi)</h4>
                    <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => toggleFilter(selectedStatus, status, setSelectedStatus)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    selectedStatus.includes(status) 
                                    ? 'bg-sada-red border-sada-red text-white shadow-md' 
                                    : 'bg-muted/50 border-transparent text-muted-foreground hover:border-border'
                                }`}
                            >
                                <div className="flex items-center gap-2 uppercase tracking-tighter">
                                    {selectedStatus.includes(status) && <Check className="size-3" />}
                                    {status.replace('-', ' ')}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                

                {/* Priority Filter */}
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">Filter by Priority (Multi)</h4>
                    <div className="flex flex-wrap gap-2">
                        {priorities.map((priority) => (
                            <button
                                key={priority}
                                onClick={() => toggleFilter(selectedPriority, priority, setSelectedPriority)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    selectedPriority.includes(priority) 
                                    ? 'bg-foreground border-foreground text-background shadow-md' 
                                    : 'bg-muted/50 border-transparent text-muted-foreground hover:border-border'
                                }`}
                            >
                                <div className="flex items-center gap-2 uppercase tracking-tighter">
                                    {selectedPriority.includes(priority) && <Check className="size-3" />}
                                    {priority}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-neutral-800/50">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Filter by Due Date</h3>
                    <div className="flex items-center gap-4">
                        <DateRangePicker onFilter={onDateFilter} />
                        <p className="text-[10px] italic text-neutral-500">
                        Select a range to filter tasks by their deadlines.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                    <p className="text-[10px] text-muted-foreground italic font-medium">
                        You can select multiple options. If none are selected, showing all.
                    </p>
                    <button onClick={onReset} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sada-red hover:opacity-70 transition-opacity">
                        <X className="size-3" /> Clear All Filters
                    </button>
                </div>
            </div>
        </div>
    );
};