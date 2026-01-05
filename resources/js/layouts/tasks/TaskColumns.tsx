import ReactDOMServer from 'react-dom/server';
import { MoreVertical, Calendar, MessageSquare, Paperclip, Building2, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export const getTaskColumns = (getStatusInfo: any, getPriorityInfo: any) => [
    {
        data: 'title',
        title: 'Task Details',
        width: '40%', // Kunci lebar kolom detail
        className: 'text-left align-middle px-6',
        render: (data: any, type: any, row: any) => `
            <div class="flex flex-col gap-1 py-2">
                <span class="font-bold text-white italic text-sm">${row.title}</span>
                <div class="flex flex-col mt-1">
                    <span class="text-[10px] font-bold text-red-500 uppercase tracking-wider">${row.project}</span>
                    <span class="text-[9px] font-medium text-neutral-500 uppercase tracking-tighter">${row.workspace}</span>
                </div>
            </div>
        `
    },
    {
        data: 'status',
        title: 'Status',
        width: '20%',
        className: 'text-center align-middle', // Pastiin center
        render: (data: any) => {
            const info = getStatusInfo(data);
            return `
                <div class="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${info.class}">
                    <div class="size-1.5 rounded-full ${info.dotColor}"></div>
                    ${info.label}
                </div>
            `;
        }
    },
    {
        data: 'priority',
        title: 'Priority',
        width: '20%',
        className: 'text-center align-middle',
        render: (data: any) => {
            const info = getPriorityInfo(data);
            return `<div class="flex justify-center">
                <span class="px-2.5 py-1 rounded-lg border font-black text-[9px] uppercase tracking-tighter ${info.class}">${info.label}</span>
            </div>`;
        }
    },
    {
        data: 'dueDate',
        title: 'Due Date',
        width: '20%',
        className: 'text-center align-middle',
        render: (data: any) => `<span class="text-[11px] font-bold text-neutral-400">${data}</span>`
    }
];