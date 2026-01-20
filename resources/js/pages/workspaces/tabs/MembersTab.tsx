import { useState, useMemo } from "react";
import { Search, UserPlus, Mail, MoreVertical, Crown, ShieldCheck, UserCog, User, Users2, Briefcase } from "lucide-react";
import { MEMBERS_DUMMY } from "@/data/member-data";
import { PROJECTS_DUMMY } from "@/data/project";

export const MembersTab = ({ workspaceId }: { workspaceId: string }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [projectFilter, setProjectFilter] = useState("all");

    const filtered = useMemo(() => {
        return MEMBERS_DUMMY.filter(m => {
            const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === 'all' || m.role === roleFilter;
            const matchesProject = projectFilter === 'all' || m.project_ids.includes(Number(projectFilter));
            return matchesSearch && matchesRole && matchesProject;
        });
    }, [searchQuery, roleFilter, projectFilter]);

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Personnel" value={filtered.length.toString()} icon={<Users2 className="text-blue-500" />} />
                <StatCard label="Active Projects" value="3" icon={<Briefcase className="text-emerald-500" />} />
                <StatCard label="Pending" value="2" icon={<Mail className="text-amber-500" />} />
            </div>

            <div className="flex flex-col xl:flex-row gap-4 justify-between items-center">
                <div className="flex flex-col md:flex-row flex-1 gap-4 w-full">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <input type="text" placeholder="Search personnel..." className="w-full pl-11 pr-4 h-12 rounded-2xl border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                    <select className="h-12 px-4 rounded-2xl border border-border bg-card text-xs font-bold outline-none" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                        <option value="all">All Roles</option>
                        <option value="company">Company</option>
                        <option value="workspace_manager">Workspace Manager</option>
                        <option value="project_manager">Project Manager</option>
                        <option value="member">Member</option>
                    </select>
                    <select className="h-12 px-4 rounded-2xl border border-border bg-card text-xs font-bold outline-none" value={projectFilter} onChange={e => setProjectFilter(e.target.value)}>
                        <option value="all">All Projects</option>
                        {PROJECTS_DUMMY.filter(p => p.workspace_id?.toString() === workspaceId).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
                <button className="w-full xl:w-auto flex items-center justify-center gap-2 px-6 h-12 rounded-2xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest hover:opacity-90 shadow-lg">
                    <UserPlus className="size-4" /> Add Personnel
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filtered.map(m => <MemberCard key={m.id} member={m} />)}
            </div>
        </div>
    );
};

const MemberCard = ({ member }: { member: any }) => {
    const configs: any = {
        company: { label: "Company", class: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20", icon: <Crown className="size-3" /> },
        workspace_manager: { label: "Workspace Manager", class: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: <ShieldCheck className="size-3" /> },
        project_manager: { label: "Project Manager", class: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: <UserCog className="size-3" /> },
        member: { label: "Member", class: "bg-slate-500/10 text-slate-500 border-slate-500/20", icon: <User className="size-3" /> }
    };
    const role = configs[member.role] || configs.member;

    return (
        <div className="group bg-card border border-border p-5 rounded-[32px] flex items-center gap-5 hover:border-primary/30 transition-all">
            <div className="size-16 rounded-[22px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-primary/10 flex items-center justify-center text-primary font-black text-xl italic">{member.initials}</div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-base truncate">{member.name}</h4>
                    <button className="p-2 hover:bg-muted rounded-xl transition-colors"><MoreVertical className="size-4 text-muted-foreground" /></button>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Mail className="size-3" /><span className="text-xs truncate opacity-70">{member.email}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${role.class}`}>
                    {role.icon} {role.label}
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
        <div className="size-14 rounded-2xl bg-muted/30 flex items-center justify-center child-svg:size-6">{icon}</div>
    </div>
);