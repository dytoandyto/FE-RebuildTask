import ReactDOMServer from 'react-dom/server';
import { MoreVertical, FolderKanban, Building2, LayoutGrid, CalendarDays } from "lucide-react";

export const getTaskColumns = (getStatusInfo: any, getPriorityInfo: any) => [
    {
        data: 'title',
        title: 'TASK NAME',
        width: '30%',
        className: 'text-left align-middle px-6 group',
        render: (data: any, type: any, row: any) => {
            // Konfigurasi style status agar konsisten dengan project
            const statusStyles: any = {
                "todo": "bg-muted text-muted-foreground border-border",
                "in-progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
                "completed": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                "overdue": "bg-sada-red/10 text-sada-red border-sada-red/20"
            };

            const currentStatusStyle = statusStyles[row.status] || statusStyles.todo;

            return `
            <div class="flex items-center gap-4 py-4 cursor-pointer group">
                <div class="size-12 rounded-2xl bg-gradient-to-br from-sada-red to-red-900 flex items-center justify-center shadow-lg shadow-sada-red/20 group-hover:scale-105 transition-all duration-300 shrink-0 border border-white/5 ring-1 ring-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>

                <div class="flex flex-col gap-1.5 min-w-0">
                    <span class="font-black text-foreground text-[13px] group-hover:text-sada-red transition-colors uppercase  tracking-tight leading-none truncate">
                        ${row.title}
                    </span>
                    
                    <div class="flex items-center gap-2">
                        <span class="text-[8px] font-black px-2 py-0.5 rounded-md border tracking-[0.15em] uppercase  ${currentStatusStyle}">
                            ${row.status.replace('-', ' ')}
                        </span>
                        
                        <span class="text-[9px] font-bold text-muted-foreground/40 tracking-tighter uppercase">
                            ${row.id}
                        </span>
                    </div>
                </div>
            </div>
        `;
        }
    },
    {
        data: 'project_name',
        title: 'SECTOR & UNIT',
        width: '18%',
        className: 'align-middle hidden md:table-cell',
        render: (data: any, type: any, row: any) => {
            const projectIcon = ReactDOMServer.renderToString(<LayoutGrid size={11} className="text-sada-red/70" />);
            const buildingIcon = ReactDOMServer.renderToString(<Building2 size={10} className="text-muted-foreground/40" />);

            return `
                <div class="flex flex-col gap-1.5">
                    <div class="flex items-center gap-2">
                        ${projectIcon}
                        <span class="text-[10px] font-black text-foreground uppercase tracking-tight truncate max-w-[140px] ">
                            ${row.project_name || row.project}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 ml-0.5">
                        ${buildingIcon}
                        <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
                            ${row.workspace_name || row.workspace}
                        </span>
                    </div>
                </div>`
        }
    },
    {
        data: 'progress',
        title: 'STABILITY',
        width: '15%',
        className: 'align-middle',
        render: (data: any) => {
            const val = data || 0;
            return `
                <div class="flex flex-col gap-2 min-w-[130px]">
                    <div class="flex justify-between items-end text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                        <span>Integrity</span>
                        <span class="text-foreground font-mono">${val}%</span>
                    </div>
                    <div class="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden border border-border/50 p-[1px]">
                        <div class="h-full bg-gradient-to-r from-sada-red to-red-600 rounded-full shadow-[0_0_10px_rgba(227,6,19,0.3)] transition-all duration-1000" style="width: ${val}%"></div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'assignee',
        title: 'OPERATIVE',
        width: '15%',
        className: 'align-middle',
        render: (data: any) => {
            const name = data?.name || 'Unassigned';
            const avatar = data?.avatar || `https://ui-avatars.com/api/?name=${name}&background=1a1a1a&color=ef4444&bold=true`;

            return `
                <div class="flex items-center gap-3 group/member cursor-pointer">
                    <div class="size-9 rounded-full border-2 border-background bg-muted overflow-hidden shadow-lg group-hover/member:border-sada-red/50 transition-all">
                        <img src="${avatar}" class="size-full object-cover" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[11px] font-black text-foreground leading-tight uppercase group-hover/member:text-sada-red transition-colors">${name}</span>
                        <span class="text-[8px] font-bold text-muted-foreground/50 uppercase tracking-widest">Rank 01</span>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'priority',
        title: 'PRIORITY',
        width: '12%',
        className: 'text-center align-middle',
        render: (data: any) => {
            const info = getPriorityInfo(data);
            return `
                <div class="flex justify-center">
                    <span class="px-3 py-1 rounded border font-black text-[9px] uppercase tracking-[0.2em] ${info.class}">
                        ${info.label}
                    </span>
                </div>
            `;
        }
    },
    {
        data: 'dueDate',
        title: 'DEADLINE',
        width: '12%',
        className: 'align-middle hidden xl:table-cell',
        render: (data: any) => {
            if (!data) return '<span class="text-muted-foreground text-[10px] tracking-widest uppercase">No Date</span>';
            const calendarIcon = ReactDOMServer.renderToString(<CalendarDays size={10} className="text-sada-red/50" />);

            return `
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-1.5">
                        ${calendarIcon}
                        <span class="text-[10px] font-black text-foreground uppercase tracking-wider">${data}</span>
                    </div>
                    <span class="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-4">Expiration</span>
                </div>
            `;
        }
    },
    {
        data: null,
        title: '',
        orderable: false,
        width: '5%',
        className: 'text-right pr-6 align-middle',
        render: () => {
            const moreIcon = ReactDOMServer.renderToString(<MoreVertical className="size-4 text-muted-foreground cursor-pointer hover:text-sada-red transition-all" />);
            return `<div class="flex justify-end transform hover:scale-110">${moreIcon}</div>`;
        }
    }
];