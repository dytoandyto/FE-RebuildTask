import ReactDOMServer from 'react-dom/server';
import { MoreVertical, Building2, Users2 } from "lucide-react";

export const getWorkspaceColumns = () => [
    {
        data: 'name',
        title: 'WORKSPACE DETAILS',
        width: '35%',
        className: 'text-left align-middle px-6 group',
        render: (data: any, type: any, row: any) => {
            // Kita fokus pada icon Building2 dengan gradasi merah
            const workspaceIcon = ReactDOMServer.renderToString(
                <div className="size-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-sada-red to-red-600 shadow-lg shadow-sada-red/20 group-hover:shadow-sada-red/40 transition-all duration-300 border border-white/5 ring-1 ring-white/10">
                    <Building2 className="size-5 text-white shadow-sm" />
                </div>
            );

            return `
                <div class="flex items-center gap-4 py-3 cursor-pointer">
                    ${workspaceIcon}
                    <div class="flex flex-col gap-1">
                        <span class="font-black text-foreground text-[13px] group-hover:text-sada-red transition-colors uppercase tracking-tight leading-none">
                            ${row.name}
                        </span>
                        <div class="flex items-center gap-2">
                            <span class="text-[8px] font-black text-sada-red bg-sada-red/10 px-1.5 py-0.5 rounded border border-sada-red/20 uppercase tracking-widest">
                                ${row.tasks?.total || 0} TASKS
                            </span>
                            <span class="text-[9px] font-bold text-muted-foreground tracking-tighter uppercase opacity-60">
                                ID • WS-${row.id || '0'}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'description',
        title: 'OVERVIEW',
        width: '25%',
        className: 'align-middle hidden lg:table-cell px-4',
        render: (data: any) => `
            <p class="text-[11px] text-muted-foreground line-clamp-2 max-w-[280px] italic leading-relaxed font-medium">
                ${data || 'No description provided for this workspace.'}
            </p>
        `
    },
    {
        data: 'members',
        title: 'OPERATIVES',
        width: '15%',
        className: 'align-middle',
        render: (data: any, type: any, row: any) => {
            const members = Array.isArray(data) ? data : [];
            const totalOther = (row.totalMembers || members.length) - members.length;

            return `
                <div class="flex items-center gap-3">
                    <div class="flex -space-x-3">
                        ${members.slice(0, 3).map((m: any) => `
                            <div class="inline-block size-8 rounded-full border-2 border-background bg-muted overflow-hidden shadow-xl hover:translate-y-[-2px] transition-transform cursor-pointer">
                                <img src="${m.avatar}" class="size-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${m.name}&background=E30613&color=fff'" />
                            </div>
                        `).join('')}
                    </div>
                    ${totalOther > 0 ? `
                        <div class="flex items-center gap-1 px-2 py-1 rounded-full bg-muted border border-border">
                            <Users2 size={10} class="text-muted-foreground" />
                            <span class="text-[9px] font-black text-foreground uppercase tracking-tighter">
                                +${totalOther}
                            </span>
                        </div>` : ''}
                </div>
            `;
        }
    },
    {
        data: 'progress',
        title: 'STABILITY',
        width: '20%',
        className: 'align-middle',
        render: (data: any) => {
            const val = data || 0;
            // Warna dinamis: Orange jika < 30, Sada Red jika sudah stabil
            const colorClass = val < 30 ? 'from-orange-500 to-orange-700' : 'from-sada-red to-red-800';
            const shadowColor = val < 30 ? 'rgba(249,115,22,0.3)' : 'rgba(227,6,19,0.3)';

            return `
                <div class="flex flex-col gap-2 min-w-[140px] px-2">
                    <div class="flex justify-between items-end text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        <span>Integrity</span>
                        <span class="text-foreground">${val}%</span>
                    </div>
                    <div class="w-full h-1.5 bg-muted rounded-full overflow-hidden border border-border/50 shadow-inner">
                        <div class="h-full bg-gradient-to-r ${colorClass} rounded-full shadow-[0_0_12px_${shadowColor}] transition-all duration-1000 ease-out" style="width: ${val}%"></div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: null,
        title: 'ACTIONS',
        orderable: false,
        className: 'text-right pr-6 align-middle',
        render: () => {
            const moreIcon = ReactDOMServer.renderToString(
                <MoreVertical className="size-4 text-muted-foreground hover:text-sada-red transition-all duration-300 cursor-pointer" />
            );
            return `<div class="flex justify-end transform hover:scale-110">${moreIcon}</div>`;
        }
    }
];