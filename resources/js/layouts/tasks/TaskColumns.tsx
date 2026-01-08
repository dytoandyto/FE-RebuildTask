import ReactDOMServer from 'react-dom/server';
import { MoreVertical, FolderKanban, Building2, LayoutGrid } from "lucide-react";

export const getTaskColumns = (getStatusInfo: any, getPriorityInfo: any) => [
    {
        data: 'title',
        title: 'Task Name',
        width: '20%',
        className: 'text-left align-middle px-6 group',
        render: (data: any, type: any, row: any) => {
            const folderIcon = ReactDOMServer.renderToString(
                <div className="size-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-sada-red to-sada-red-hover shadow-lg shadow-sada-red/10">
                    <FolderKanban className="size-4 text-white" />
                </div>
            );

            return `
                <div class="flex items-center gap-4 py-2 cursor-pointer">
                    ${folderIcon}
                    <div class="flex flex-col gap-0.5">
                        <span class="font-bold text-foreground text-sm group-hover:text-sada-red transition-colors uppercase leading-tight">
                            ${row.title}
                        </span>
                        <div class="inline-flex items-center px-2 py-0.5 rounded-md bg-muted border border-border w-fit">
                            <span class="text-[8px] font-black text-muted-foreground uppercase tracking-tighter">
                                ${row.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        // Kolom Gabungan Workspace & Project
        data: 'project',
        title: 'Workspace & Project',
        width: '18%',
        className: 'align-middle',
        render: (data: any, type: any, row: any) => `
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-1.5">
                    <LayoutGrid size={12} class="text-sada-red/60" />
                    <span class="text-[10px] font-black text-foreground uppercase tracking-tight">${row.project}</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <Building2 size={10} class="text-muted-foreground/50" />
                    <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">${row.workspace}</span>
                </div>
            </div>`
    },
    {
        data: 'progress',
        title: 'Progress',
        width: '15%',
        className: 'align-middle',
        render: (data: any) => {
            const progress = data || 0;
            return `
                <div class="flex flex-col gap-1.5 min-w-[120px]">
                    <div class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        <span>Completion</span>
                        <span class="text-foreground">${progress}%</span>
                    </div>
                    <div class="w-full h-1.5 bg-muted rounded-full overflow-hidden border border-border">
                        <div class="h-full bg-sada-red rounded-full shadow-[0_0_8px_rgba(227,6,19,0.3)]" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'assignee',
        title: 'Assignee',
        width: '15%',
        className: 'align-middle',
        render: (data: any) => {
            const name = data?.name || 'Unassigned';
            const avatar = data?.avatar || `https://ui-avatars.com/api/?name=${name}&background=E30613&color=fff`;
            
            return `
                <div class="flex items-center gap-3">
                    <div class="size-9 rounded-full border-2 border-border overflow-hidden bg-muted shadow-sm">
                        <img src="${avatar}" class="size-full object-cover" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[11px] font-bold text-foreground leading-tight">${name}</span>
                        <span class="text-[9px] font-black text-muted-foreground/60 uppercase tracking-tighter">Assignee</span>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'priority',
        title: 'Priority',
        width: '12%',
        className: 'text-center align-middle',
        render: (data: any) => {
            const info = getPriorityInfo(data);
            return `
                <div class="flex justify-center">
                    <span class="px-3 py-1 rounded-lg bg-sada-red/10 border border-sada-red/20 text-sada-red font-black text-[9px] uppercase tracking-widest">
                        ${info?.label || data}
                    </span>
                </div>
            `;
        }
    },
    {
        data: null,
        title: 'Actions',
        orderable: false,
        width: '5%',
        className: 'text-right pr-6 align-middle',
        render: () => {
            const moreIcon = ReactDOMServer.renderToString(<MoreVertical className="size-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />);
            return `<div class="flex justify-end">${moreIcon}</div>`;
        }
    }
];