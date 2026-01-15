import { X, Check } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangeFilter"; // Import komponen kalender lo
import { DateRange } from "react-day-picker";
import { WORKSPACES_DUMMY } from "@/data/workspace-data"; 

interface ProjectFiltersProps {
    isVisible: boolean;
    selectedStatus: string[];
    setSelectedStatus: (status: string[]) => void;
    selectedPriority: string[];
    setSelectedPriority: (priority: string[]) => void;
    onDateFilter: (range: DateRange | undefined) => void; // Tambahkan ini
    selectedWorkspaces: number[];
    setSelectedWorkspaces: (ids: number[]) => void;
    showWorkspaceFilter?: boolean;
    onReset: () => void;
}

export const ProjectFilters = ({
    isVisible,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    selectedWorkspaces,
    setSelectedWorkspaces,
    onDateFilter,
    showWorkspaceFilter = true,
    onReset
}: ProjectFiltersProps) => {
    if (!isVisible) return null;

    const statuses = ['planning', 'in-progress', 'completed', 'overdue'];
    const priorities = ['low', 'medium', 'high'];

    const toggleFilter = (currentArray: string[], value: string, setter: (val: string[]) => void) => {
        if (currentArray.includes(value)) {
            setter(currentArray.filter(item => item !== value));
        } else {
            setter([...currentArray, value]);
        }
    };

    const toggleWorkspace = (id: number) => {
        if (selectedWorkspaces.includes(id)) {
            setSelectedWorkspaces(selectedWorkspaces.filter(item => item !== id));
        } else {
            setSelectedWorkspaces([...selectedWorkspaces, id]);
        }
    };

    return (
        <div className="bg-card border border-border rounded-[28px] p-6 mb-6 animate-in slide-in-from-top-4 duration-300 shadow-sm">
            <div className="flex flex-col gap-6">
                {/* Status Filter */}
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">Filter by Project Status</h4>
                    <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => toggleFilter(selectedStatus, status, setSelectedStatus)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    selectedStatus.includes(status) 
                                    ? 'bg-sada-red border-sada-red text-white shadow-md scale-105' 
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

                {/* 2. TUGAS 2: Filter by Workspace - PINDAHKAN LOGIC KE SINI */}
                {showWorkspaceFilter && (
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">
                            Filter by Workspace (Relational)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {WORKSPACES_DUMMY.map((ws) => (
                                <button
                                    key={ws.id}
                                    onClick={() => toggleWorkspace(ws.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                        selectedWorkspaces.includes(ws.id) 
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105' 
                                        : 'bg-muted/50 border-transparent text-muted-foreground hover:border-border'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 uppercase tracking-tighter">
                                        {selectedWorkspaces.includes(ws.id) && <Check className="size-3" />}
                                        {ws.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Priority Filter */}
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">Filter by Priority</h4>
                    <div className="flex flex-wrap gap-2">
                        {priorities.map((priority) => (
                            <button
                                key={priority}
                                onClick={() => toggleFilter(selectedPriority, priority, setSelectedPriority)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    selectedPriority.includes(priority) 
                                    ? 'bg-foreground border-foreground text-background shadow-md scale-105' 
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

                {/* --- SEKSI DATE RANGE FILTER BARU --- */}
                <div className="pt-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">Filter by Deadline</h4>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <DateRangePicker onFilter={onDateFilter} />
                        <span className="text-[10px] italic text-muted-foreground/60">
                            * Pick a range to filter projects by their completion dates.
                        </span>
                    </div>
                </div>

                {/* Footer / Reset */}
                <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                    <p className="text-[10px] text-muted-foreground italic font-medium">
                        Showing projects based on active filters
                    </p>
                    <button onClick={onReset} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sada-red hover:opacity-70 transition-opacity">
                        <X className="size-3" /> Clear All Filters
                    </button>
                </div>
            </div>
        </div>
    );
};