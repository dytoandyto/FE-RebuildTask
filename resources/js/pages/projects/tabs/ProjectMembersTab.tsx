import { useState, useMemo } from "react";
import { 
    Search, UserPlus, Mail, MoreVertical, Crown, ShieldCheck, 
    UserCog, User, Users2, Filter, LayoutGrid, List, CheckCircle2, Clock 
} from "lucide-react";
import { MEMBERS_DUMMY } from "@/data/member-data";
import DataTableBase from "@/components/DataTableBase";

export const ProjectMembersTab = ({ projectId }: { projectId: string }) => {
    // --- STATES ---
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

    // --- LOGIC FILTERING ---
    const filtered = useMemo(() => {
        return MEMBERS_DUMMY.filter(m => {
            // 1. Wajib: Member harus terdaftar di project ini
            const isInProject = m.project_ids.some(id => id.toString() === projectId);
            if (!isInProject) return false;

            // 2. Search
            const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 m.email.toLowerCase().includes(searchQuery.toLowerCase());
            
            // 3. Role Filter
            const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(m.role);

            // 4. Status Filter
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(m.status);

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [projectId, searchQuery, selectedRoles, selectedStatus]);

    // --- TABLE COLUMNS (Datatables.net Style) ---
    const memberColumns = [
        {
            header: "PERSONNEL",
            data: "name",
            render: (data: any, type: any, row: any) => {
                if (type === 'display') {
                    return `
                        <div class="flex items-center gap-3">
                            <div class="size-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold text-[10px]">
                                ${row.initials}
                            </div>
                            <div>
                                <p class="font-bold text-sm leading-tight text-foreground">${row.name}</p>
                                <p class="text-[10px] text-muted-foreground leading-tight">${row.email}</p>
                            </div>
                        </div>
                    `;
                }
                return data;
            }
        },
        {
            header: "ROLE",
            data: "role",
            render: (data: any, type: any, row: any) => {
                if (type === 'display') {
                    const config = getRoleConfig(row.role);
                    return `
                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-widest ${config.class}">
                            ${config.label}
                        </span>
                    `;
                }
                return data;
            }
        },
        {
            header: "STATUS",
            data: "status",
            render: (data: any, type: any, row: any) => {
                if (type === 'display') {
                    const dotClass = row.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500';
                    return `
                        <div class="flex items-center gap-2">
                            <div class="size-1.5 rounded-full ${dotClass}"></div>
                            <span class="text-[10px] font-bold capitalize">${row.status}</span>
                        </div>
                    `;
                }
                return data;
            }
        },
        {
            header: "ACTIONS",
            data: null,
            className: "text-right",
            render: (data: any, type: any) => {
                if (type === 'display') {
                    return `
                        <button class="p-1.5 hover:bg-muted rounded-md transition-colors opacity-50 hover:opacity-100 text-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                        </button>
                    `;
                }
                return null;
            }
        }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* STATS AREA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Assigned Personnel" value={filtered.length.toString()} icon={<Users2 className="text-sada-red" />} />
                <StatCard label="Active Now" value={filtered.filter(m => m.status === 'active').length.toString()} icon={<CheckCircle2 className="text-emerald-500" />} />
                <StatCard label="Roles Involved" value="3 Types" icon={<ShieldCheck className="text-blue-500" />} />
            </div>

            {/* CONTROLS AREA */}
            <div className="flex flex-col xl:flex-row gap-4 justify-between items-center">
                <div className="relative w-full xl:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input 
                        type="text" placeholder="Search project members..." 
                        className="w-full pl-11 pr-4 h-12 rounded-2xl border border-border bg-card text-sm focus:ring-2 focus:ring-sada-red/20 outline-none transition-all"
                        value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <div className="flex bg-card border border-border p-1 rounded-2xl">
                        <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-sada-red text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>
                            <LayoutGrid className="size-4" />
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-sada-red text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>
                            <List className="size-4" />
                        </button>
                    </div>

                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-5 h-12 rounded-2xl border font-bold text-xs transition-all ${showFilters ? 'bg-sada-red text-white border-sada-red' : 'bg-card border-border hover:bg-muted'}`}
                    >
                        <Filter className="size-4" /> {showFilters ? 'Close' : 'Filters'}
                    </button>

                    <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-6 h-12 rounded-2xl bg-foreground text-background font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">
                        <UserPlus className="size-4" /> Assign Member
                    </button>
                </div>
            </div>

            {/* FILTER PANEL */}
            {showFilters && (
                <div className="bg-card border border-border rounded-[32px] p-8 animate-in slide-in-from-top-4 duration-500 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-4">Filter By Role</h4>
                            <div className="flex flex-wrap gap-2">
                                {['project_manager', 'member'].map((r) => (
                                    <button 
                                        key={r} 
                                        onClick={() => setSelectedRoles(prev => prev.includes(r) ? prev.filter(i => i !== r) : [...prev, r])}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all border ${selectedRoles.includes(r) ? 'bg-sada-red border-sada-red text-white' : 'bg-muted/50 text-muted-foreground border-transparent'}`}
                                    >
                                        {r.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-4">Availability Status</h4>
                            <div className="flex flex-wrap gap-2">
                                {['active', 'inactive'].map((s) => (
                                    <button 
                                        key={s} 
                                        onClick={() => setSelectedStatus(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s])}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all border ${selectedStatus.includes(s) ? 'bg-sada-red border-sada-red text-white' : 'bg-muted/50 text-muted-foreground border-transparent'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DATA VIEW */}
            {filtered.length > 0 ? (
                viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                        {filtered.map(m => <MemberCard key={m.id} member={m} />)}
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <DataTableBase data={filtered} columns={memberColumns} />
                    </div>
                )
            ) : (
                <div className="text-center py-24 bg-muted/5 border-2 border-dashed border-border rounded-[40px]">
                    <p className="text-muted-foreground tracking-widest text-[10px] font-black uppercase opacity-40 italic text-center w-full">No personnel assigned to this project</p>
                </div>
            )}
        </div>
    );
};

// --- SUB-COMPONENTS & HELPERS ---
const getRoleConfig = (role: string) => {
    const configs: any = {
        company: { label: "Company", class: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20", icon: <Crown className="size-3" /> },
        workspace_manager: { label: "W. Manager", class: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: <ShieldCheck className="size-3" /> },
        project_manager: { label: "P. Manager", class: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: <UserCog className="size-3" /> },
        member: { label: "Member", class: "bg-slate-500/10 text-slate-500 border-slate-500/20", icon: <User className="size-3" /> }
    };
    return configs[role] || configs.member;
};

const MemberCard = ({ member }: { member: any }) => {
    const config = getRoleConfig(member.role);
    return (
        <div className="group bg-card border border-border p-5 rounded-[32px] flex items-center gap-5 hover:border-sada-red/30 transition-all hover:shadow-xl hover:shadow-sada-red/5">
            <div className="size-16 rounded-[22px] bg-gradient-to-br from-sada-red/10 to-orange-500/10 border border-sada-red/10 flex items-center justify-center text-sada-red font-black text-xl italic">{member.initials}</div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-base truncate">{member.name}</h4>
                    <button className="p-2 hover:bg-muted rounded-xl transition-colors"><MoreVertical className="size-4 text-muted-foreground" /></button>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-4 text-xs italic opacity-70">
                    <Mail className="size-3" /><span className="truncate">{member.email}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${config.class}`}>
                    {config.icon} {config.label}
                </span>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: any }) => (
    <div className="bg-card border border-border p-6 rounded-[28px] flex items-center justify-between shadow-sm">
        <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">{label}</p>
            <h3 className="text-3xl font-black tracking-tight">{value}</h3>
        </div>
        <div className="size-14 rounded-2xl bg-muted/30 flex items-center justify-center">{icon}</div>
    </div>
);