import ReactDOMServer from 'react-dom/server';
import { Building2, FolderKanban } from "lucide-react";

export const getProjectColumns = () => [
    {
        data: 'name',
        title: 'PROJECT DETAILS',
        width: '25%',
        className: 'text-left align-middle px-6 group',
        render: (data: any, type: any, row: any) => {
            const statusStyles: any = {
                "in-progress": "bg-blue-500/10 text-blue-600 border-blue-500/20",
                "completed": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                "planning": "bg-purple-500/10 text-purple-600 border-purple-500/20",
                "overdue": "bg-sada-red/10 text-sada-red border-sada-red/20"
            };
            const currentStatusStyle = statusStyles[row.status] || 'bg-muted text-muted-foreground border-border';

            return `
                <div class="flex items-center gap-4 py-3 cursor-pointer">
                    <div class="size-11 rounded-xl bg-gradient-to-br ${row.color || 'from-blue-500 to-purple-500'} flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <div class="flex flex-col min-w-0">
                        <span class="font-bold text-foreground truncate text-sm group-hover:text-sada-red transition-colors uppercase tracking-tight leading-tight">${row.name}</span>
                        <div class="mt-1">
                            <span class="text-[9px] uppercase font-black px-2 py-0.5 rounded-full border tracking-widest ${currentStatusStyle}">
                                ${row.status.replace('-', ' ')}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        // --- KOLOM BARU: WORKSPACE ---
        data: 'workspace_name', // Pastikan di dummy project ada field ini, atau ambil dari relasi
        title: 'WORKSPACE',
        width: '15%',
        className: 'text-left align-middle hidden xl:table-cell',
        render: (data: any, type: any, row: any) => {
            const workspaceIcon = ReactDOMServer.renderToString(
                <Building2 size={12} className="text-sada-red" />
            );
            return `
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-1.5">
                        <div class="bg-sada-red/10 p-1 rounded-md">
                            ${workspaceIcon}
                        </div>
                        <span class="text-[10px] font-black text-foreground uppercase tracking-tight truncate max-w-[120px]">
                            ${row.workspace_name || 'General'}
                        </span>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'description',
        title: 'DESCRIPTION',
        width: '20%',
        className: 'text-left align-middle hidden lg:table-cell',
        render: (data: any) => `
            <p class="text-[11px] text-muted-foreground italic leading-relaxed line-clamp-1 max-w-[200px]">
                ${data || '-'}
            </p>
        `
    },
    {
        data: 'progress',
        title: 'PROGRESS',
        width: '15%',
        className: 'text-left align-middle',
        render: (data: any, type: any, row: any) => `
            <div class="flex flex-col gap-1.5 max-w-[150px]">
                <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                    <span>Integrity</span>
                    <span class="text-foreground">${data}%</span>
                </div>
                <div class="h-1.5 bg-muted rounded-full overflow-hidden w-full border border-border/50">
                    <div class="h-full bg-gradient-to-r ${row.color || 'from-blue-500 to-purple-500'} transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(0,0,0,0.2)]" style="width: ${data}%"></div>
                </div>
            </div>
        `
    },
    {
        data: 'manager',
        title: 'MANAGER',
        width: '12%',
        className: 'text-left align-middle',
        render: (data: any) => `
            <div class="flex items-center gap-2.5">
                <div class="size-8 rounded-full border-2 border-background shadow-md overflow-hidden bg-muted">
                    <img src="${data.avatar}" class="size-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${data.name}&background=1a1a1a&color=fff'" />
                </div>
                <div class="flex flex-col">
                    <span class="text-[10px] font-black text-foreground leading-none truncate max-w-[80px]">${data.name}</span>
                    <span class="text-[8px] text-muted-foreground uppercase font-bold tracking-tighter mt-1">Lead</span>
                </div>
            </div>
        `
    },
    {
        data: 'tasks', 
        title: 'TASKS',
        width: '10%',
        className: 'text-left align-middle',
        render: (data: any, type: any, row: any) => {
            const priorityStyles: any = {
                "high": "bg-sada-red/10 text-sada-red",
                "medium": "bg-amber-500/10 text-amber-600",
                "low": "bg-slate-500/10 text-slate-600"
            };
            const currentPriorityStyle = priorityStyles[row.priority] || 'bg-muted text-muted-foreground';
            const completed = data?.completed || 0;

            return `
                <div class="flex flex-col gap-1.5">
                    <div class="flex items-center gap-1 text-[10px] font-black text-foreground italic">
                         <span class="text-emerald-500">✓</span> ${completed} <span class="text-muted-foreground opacity-50">/ ${data?.total || 0}</span>
                    </div>
                    <div class="uppercase font-black text-[7px] tracking-[0.2em] rounded border border-current px-1.5 py-0.5 w-fit ${currentPriorityStyle}">
                        ${row.priority}
                    </div>
                </div>
            `;
        }
    },
    {
        data: null,
        title: '',
        width: '3%',
        className: 'text-right pr-6 align-middle',
        render: () => `
            <button class="p-2 hover:bg-muted rounded-xl transition-all text-muted-foreground hover:text-sada-red active:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
        `
    }
];