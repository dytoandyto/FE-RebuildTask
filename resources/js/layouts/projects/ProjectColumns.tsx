export const getProjectColumns = () => [
    {
        data: 'name',
        title: 'PROJECT DETAILS',
        width: '30%',
        className: 'text-left align-middle px-6 group',
        render: (data: any, type: any, row: any) => {
            const iconColors: any = {
                'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
                'completed': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
                'overdue': 'bg-sada-red/10 text-sada-red border-sada-red/20',
                'planning': 'bg-purple-500/10 text-purple-500 border-purple-500/20'
            };
            const colorClass = iconColors[row.status] || 'bg-white/5 text-white/50 border-white/10';

            return `
                <div class="flex items-center gap-4 py-3 cursor-pointer">
                    <div class="p-3 rounded-2xl border transition-all duration-300 group-hover:scale-110 ${colorClass}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-white italic text-base group-hover:text-red-500 transition-colors uppercase tracking-tight">${row.name}</span>
                        <div class="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 self-start mt-1">
                            <span class="text-[9px] font-black uppercase tracking-widest text-neutral-400">${row.status}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'description',
        title: 'DESCRIPTION',
        width: '25%',
        className: 'text-left align-middle hidden lg:table-cell',
        render: (data: any) => `<span class="text-[11px] text-neutral-500 italic leading-relaxed line-clamp-2">${data}</span>`
    },
    {
        data: 'progress',
        title: 'PROGRESS',
        width: '15%',
        className: 'text-left align-middle',
        render: (data: any, type: any, row: any) => {
            let barColor = 'bg-blue-500';
            if (row.status === 'overdue') barColor = 'bg-sada-red';
            if (row.status === 'completed') barColor = 'bg-emerald-500';
            if (row.status === 'planning') barColor = 'bg-orange-500';

            return `
                <div class="flex flex-col gap-2 min-w-[130px]">
                    <div class="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                        <span class="text-neutral-500">Progress</span>
                        <span class="text-white">${data}%</span>
                    </div>
                    <div class="h-2 w-full bg-neutral-800/50 rounded-full overflow-hidden border border-white/5 p-[1px]">
                        <div class="h-full ${barColor} rounded-full transition-all duration-1000" style="width: ${data}%"></div>
                    </div>
                </div>
            `;
        }
    },
    {
        data: 'manager',
        title: 'MANAGER',
        width: '15%',
        className: 'text-left align-middle',
        render: (data: any) => `
            <div class="flex items-center gap-3">
                <img src="${data.avatar}" class="size-9 rounded-full border border-white/10 object-cover" />
                <div class="flex flex-col">
                    <span class="text-[11px] font-bold text-white uppercase tracking-tight">${data.name}</span>
                    <span class="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">PM</span>
                </div>
            </div>
        `
    },
    {
        // KITA UBAH DISINI: pake data: 'tasks' karena di dummy lo namanya 'tasks'
        data: 'tasks', 
        title: 'TASKS',
        width: '10%',
        className: 'text-center align-middle',
        render: (data: any, type: any, row: any) => {
            // data disini adalah object { total, completed }
            const completed = data?.completed || 0;
            return `
                <div class="flex flex-col items-center">
                    <div class="flex items-center gap-1">
                         <div class="size-2 rounded-full bg-emerald-500"></div>
                         <span class="text-xs font-black text-white italic">${completed}</span>
                    </div>
                    <span class="text-[8px] font-bold text-sada-red uppercase tracking-tighter">${row.priority}</span>
                </div>
            `;
        }
    },
    {
        data: null,
        title: '',
        width: '5%',
        className: 'text-right pr-6 align-middle',
        render: () => `
            <button class="btn-action p-2 hover:bg-white/5 rounded-lg text-neutral-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
        `
    }
];