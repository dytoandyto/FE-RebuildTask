import ReactDOMServer from 'react-dom/server';
import { MoreVertical, FolderKanban } from "lucide-react";

export const getTaskColumns = (getStatusInfo: any, getPriorityInfo: any) => [
    {
        data: 'title',
        title: 'Task Details',
        width: '25%',
        className: 'text-left align-middle px-6 group',
        render: (data: any, type: any, row: any) => {
            const folderIcon = ReactDOMServer.renderToString(
                <div className="size-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-900/20">
                    <FolderKanban className="size-5 text-white" />
                </div>
            );

            // Logic Badge Status di bawah judul
            const statusInfo = getStatusInfo(row.status);

            return `
                <div class="flex items-center gap-4 py-2 cursor-pointer">
                    ${folderIcon}
                    <div class="flex flex-col gap-1">
                        <span class="font-bold text-neutral-200 text-sm group-hover:text-red-500 transition-colors uppercase italic leading-none">
                            ${row.title}
                        </span>
                        
                        <div class="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 w-fit">
                            <span class="text-[8px] font-black text-blue-400 uppercase tracking-tighter">
                                ${row.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
                            </span>
                        </div>

                        <div class="flex flex-col">
                            <span class="text-[9px] font-black text-red-500/80 uppercase tracking-wider leading-tight">${row.project}</span>
                            <span class="text-[8px] font-medium text-neutral-500 uppercase tracking-tighter leading-tight">${row.workspace}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'description',
        title: 'Description',
        width: '20%',
        className: 'align-middle hidden lg:table-cell',
        render: (data: any) => `
            <span class="text-[11px] text-neutral-500 line-clamp-2 max-w-[200px] italic leading-relaxed">
                ${data || '-'}
            </span>
        `
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
                    <div class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-neutral-500">
                        <span>Progress</span>
                        <span class="text-neutral-300">${progress}%</span>
                    </div>
                    <div class="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div class="h-full bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'assignee', // Field object dari dummy lo
        title: 'Assignee',
        width: '15%',
        className: 'align-middle',
        render: (data: any) => {
            const name = data?.name || 'Unassigned';
            const avatar = data?.avatar || `https://ui-avatars.com/api/?name=${name}&background=random`;
            
            return `
                <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full border-2 border-neutral-800 overflow-hidden bg-neutral-900 shadow-md">
                        <img src="${avatar}" class="size-full object-cover" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[11px] font-bold text-neutral-200">${name}</span>
                        <span class="text-[9px] font-medium text-neutral-500 uppercase tracking-tighter">Team Member</span>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'priority',
        title: 'Priority',
        width: '10%',
        className: 'text-center align-middle',
        render: (data: any) => {
            const info = getPriorityInfo(data);
            return `
                <div class="flex justify-center">
                    <span class="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 font-black text-[9px] uppercase tracking-widest shadow-sm shadow-red-950/20">
                        ${info.label}
                    </span>
                </div>
            `;
        }
    },
    {
        data: null, // Kolom tombol titik tiga
        orderable: false,
        className: 'text-center align-middle w-[50px]',
        render: () => {
            const moreIcon = ReactDOMServer.renderToString(<MoreVertical className="size-4 text-neutral-600 cursor-pointer hover:text-white transition-colors" />);
            return `<div class="flex justify-center">${moreIcon}</div>`;
        }
    }
];