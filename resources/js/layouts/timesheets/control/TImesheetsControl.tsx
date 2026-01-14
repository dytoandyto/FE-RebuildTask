import { Calendar, ListFilter, ShieldCheck, BarChart3, Search, Filter } from 'lucide-react';

export const TimesheetControls = ({ currentView, setCurrentView, searchQuery, setSearchQuery }: any) => {
    const tabs = [
        { id: 'calendar', label: 'Fleet Activity', icon: Calendar },
        { id: 'audit', label: 'Operational Audit', icon: ListFilter },
        { id: 'review', label: 'Verification Center', icon: ShieldCheck },
        { id: 'analytics', label: 'Operational Analytics', icon: BarChart3 },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* View Toggles */}
                <div className="flex items-center gap-1 bg-muted/30 p-1.5 rounded-2xl border border-border/50 shadow-inner">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setCurrentView(tab.id as any)}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                currentView === tab.id
                                ? "bg-background shadow-md text-sada-red border border-border"
                                : "text-muted-foreground hover:text-foreground opacity-70"
                            }`}
                        >
                            <tab.icon size={14} />
                            <span className="hidden md:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SEARCH RECORDS..."
                        className="w-full bg-muted/20 border-border rounded-xl pl-10 text-[10px] font-black uppercase tracking-widest focus:ring-sada-red"
                    />
                </div>
            </div>
        </div>
    );
};