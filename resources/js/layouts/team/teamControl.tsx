import { Search, LayoutGrid, List, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TeamControlsProps {
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedWorkspace: string;
    setSelectedWorkspace: (workspace: string) => void;
}

export const TeamControls = ({
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    selectedWorkspace,
    setSelectedWorkspace
}: TeamControlsProps) => {
    
    // List Workspace unik (nanti bisa diambil dari props/backend)
    const workspaces = ["All Workspaces", "Product Tech", "Marketing", "Operations"];

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            
            {/* 1. Search Bar */}
            <div className="relative w-full md:w-[400px] group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-sada-red transition-colors">
                    <Search size={18} strokeWidth={2.5} />
                </div>
                <Input 
                    placeholder="Search name, role, or email..." 
                    className="pl-12 pr-4 h-12 bg-card border-border rounded-2xl focus-visible:ring-sada-red/20 focus-visible:border-sada-red transition-all font-medium italic"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                
                {/* 2. Workspace Filter (Dropdown Simple) */}
                <div className="relative flex-1 md:flex-none">
                    <select 
                        className="appearance-none bg-card border border-border h-12 px-5 pr-12 rounded-2xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-sada-red transition-all cursor-pointer w-full"
                        value={selectedWorkspace}
                        onChange={(e) => setSelectedWorkspace(e.target.value)}
                    >
                        {workspaces.map(ws => (
                            <option key={ws} value={ws === "All Workspaces" ? "all" : ws}>
                                {ws}
                            </option>
                        ))}
                    </select>
                    <Filter size={14} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
                </div>

                {/* 3. View Switcher */}
                <div className="flex items-center bg-muted/50 p-1 rounded-2xl border border-border h-12">
                    <Button 
                        variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className={`rounded-xl px-4 h-full transition-all ${viewMode === 'grid' ? 'bg-card shadow-sm text-sada-red' : 'text-muted-foreground'}`}
                    >
                        <LayoutGrid size={18} />
                    </Button>
                    <Button 
                        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className={`rounded-xl px-4 h-full transition-all ${viewMode === 'list' ? 'bg-card shadow-sm text-sada-red' : 'text-muted-foreground'}`}
                    >
                        <List size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};