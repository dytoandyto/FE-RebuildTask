import ReactDOMServer from 'react-dom/server';
import { MoreVertical, Building2 } from "lucide-react";

export const getWorkspaceColumns = () => [
    {
        data: 'name',
        title: 'Workspace Details',
        width: '30%',
        className: 'text-left align-middle px-6 group',
        render: (data: any, type: any, row: any) => {
            // Mengambil avatar dari data dummy lo
            const workspaceIcon = row.avatar 
                ? `<div class="size-10 rounded-xl overflow-hidden shadow-lg border border-white/5">
                        <img src="${row.avatar}" class="size-full object-cover" />
                   </div>`
                : ReactDOMServer.renderToString(
                    <div className="size-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-900/20">
                        <Building2 className="size-5 text-white" />
                    </div>
                );

            return `
                <div class="flex items-center gap-4 py-2 cursor-pointer">
                    ${workspaceIcon}
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-200 text-sm group-hover:text-red-500 transition-colors uppercase leading-none">
                            ${row.name}
                        </span>
                        <div class="flex items-center gap-2 mt-1.5">
                            <span class="text-[9px] font-black text-indigo-500 uppercase tracking-wider">
                                ${row.tasks?.total || 0} TOTAL TASKS
                            </span>
                            <span class="text-[9px] font-medium text-neutral-600">•</span>
                            <span class="text-[9px] font-medium text-neutral-500 uppercase tracking-tighter">
                                ID: WS-0${row.id || '0'}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'description',
        title: 'Description',
        width: '25%',
        className: 'align-middle hidden lg:table-cell',
        render: (data: any) => `
            <span class="text-[11px] text-neutral-500 line-clamp-2 max-w-[250px] italic leading-relaxed">
                ${data || '-'}
            </span>
        `
    },
    {
        data: 'members', // Sesuai dengan property "members" di dummy lo
        title: 'Team Members',
        width: '15%',
        className: 'align-middle',
        render: (data: any, type: any, row: any) => {
            const members = Array.isArray(data) ? data : [];
            const totalOther = (row.totalMembers || members.length) - members.length;
            
            return `
                <div class="flex items-center gap-3">
                    <div class="flex -space-x-2">
                        ${members.slice(0, 3).map((m: any) => `
                            <div class="inline-block size-8 rounded-full border-2 border-neutral-900 bg-neutral-800 overflow-hidden shadow-sm">
                                <img src="${m.avatar}" class="size-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${m.name}'" />
                            </div>
                        `).join('')}
                    </div>
                    ${totalOther > 0 ? `<span class="text-[10px] font-bold text-neutral-500">+${totalOther} others</span>` : ''}
                </div>
            `;
        }
    },
    {
        data: 'progress', // Sesuai dengan property "progress" di dummy lo
        title: 'Workspace Health',
        width: '20%',
        className: 'align-middle',
        render: (data: any) => {
            const val = data || 0;
            return `
                <div class="flex flex-col gap-1.5 min-w-[120px]">
                    <div class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-neutral-500">
                        <span>Completion</span>
                        <span class="text-neutral-300">${val}%</span>
                    </div>
                    <div class="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div class="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)]" style="width: ${val}%"></div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: null, // Pake null supaya gak error "Unknown parameter"
        orderable: false,
        className: 'text-center align-middle w-[50px]',
        render: () => {
            const moreIcon = ReactDOMServer.renderToString(<MoreVertical className="size-4 text-neutral-600 cursor-pointer hover:text-white transition-all" />);
            return `<div class="flex justify-center">${moreIcon}</div>`;
        }
    }
];