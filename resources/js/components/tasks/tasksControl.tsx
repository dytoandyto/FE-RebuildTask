import { Search, Filter, Grid3x3, List, X, ChevronDown } from "lucide-react";

interface TaskControlsProps {
    viewMode: 'list' | 'board';
    setViewMode: (mode: 'list' | 'board') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    activeFiltersCount: number;
}

export const TaskControls = ({
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    activeFiltersCount
}: TaskControlsProps) => (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card rounded-[24px] p-3 shadow-sm border border-border mb-6 transition-all">

        {/* Search Input Section */}
        <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-sada-red transition-colors" />
            <input
                type="text"
                placeholder="Search tasks, projects, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 h-12 rounded-2xl border-none bg-muted/30 focus:bg-background focus:ring-4 focus:ring-sada-red/10 transition-all text-sm font-medium text-foreground placeholder:text-muted-foreground"
            />
            {searchQuery && (
                <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                >
                    <X className="size-4 text-muted-foreground" />
                </button>
            )}
        </div>

        {/* Action Buttons & Toggles */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            {/* Filter Button */}
            <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 border rounded-2xl px-5 h-12 text-sm font-bold transition-all active:scale-95 shadow-sm ${showFilters
                        ? 'bg-muted border-sada-red/50 text-sada-red'
                        : 'bg-background border-border text-foreground hover:bg-muted hover:border-sada-red/30'
                    }`}
            >
                <div className="relative">
                    <Filter className="size-4" />
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-2 -right-2 size-4 bg-sada-red text-white text-[9px] flex items-center justify-center rounded-full border-2 border-card">
                            {activeFiltersCount}
                        </span>
                    )}
                </div>
                Filters
                <ChevronDown className={`size-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* View Switcher */}
            <div className="flex items-center gap-1 bg-muted/50 p-1.5 rounded-2xl border border-border/50">
                <ViewToggle
                    active={viewMode === 'board'}
                    onClick={() => setViewMode('board')}
                    icon={Grid3x3}
                    label="Board"
                />
                <ViewToggle
                    active={viewMode === 'list'}
                    onClick={() => setViewMode('list')}
                    icon={List}
                    label="List"
                />
            </div>
        </div>
    </div>
);

const ViewToggle = ({ active, onClick, icon: Icon, label }: any) => (
    <button
        onClick={onClick}
        title={`View as ${label}`}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${active
                ? 'bg-background shadow-md text-sada-red scale-100 ring-1 ring-black/5'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50 scale-95 opacity-70'
            }`}
    >
        <Icon className="size-4" />
        {active && <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>}
    </button>
);