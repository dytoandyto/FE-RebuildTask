export const getProjectColumns = () => [
    {
        data: 'name',
        title: 'PROJECT DETAILS',
        width: '30%',
        className: 'text-left align-middle px-6 group',
        render: (data: any, type: any, row: any) => {
            // Mengambil gaya status dari ProjectCard agar sinkron
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
        data: 'description',
        title: 'DESCRIPTION',
        width: '25%',
        className: 'text-left align-middle hidden lg:table-cell',
        render: (data: any) => `
            <p class="text-[11px] text-muted-foreground italic leading-relaxed line-clamp-1 max-w-[250px]">
                ${data || '-'}
            </p>
        `
    },
    {
        data: 'progress',
        title: 'PROGRESS',
        width: '18%',
        className: 'text-left align-middle',
        render: (data: any, type: any, row: any) => `
            <div class="flex flex-col gap-1.5 max-w-[180px]">
                <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                    <span>Progress</span>
                    <span class="text-foreground">${data}%</span>
                </div>
                <div class="h-2 bg-muted rounded-full overflow-hidden w-full border border-border/50">
                    <div class="h-full bg-gradient-to-r ${row.color || 'from-blue-500 to-purple-500'} transition-all duration-1000 ease-out" style="width: ${data}%"></div>
                </div>
            </div>
        `
    },
    {
        data: 'manager',
        title: 'MANAGER',
        width: '15%',
        className: 'text-left align-middle',
        render: (data: any) => `
            <div class="flex items-center gap-3">
                <img src="${data.avatar}" class="size-8 rounded-full border-2 border-background shadow-sm object-cover" />
                <div class="flex flex-col">
                    <span class="text-[11px] font-bold text-foreground leading-none">${data.name}</span>
                    <span class="text-[9px] text-muted-foreground uppercase font-medium tracking-tighter mt-1">Project Manager</span>
                </div>
            </div>
        `
    },
    {
        data: 'tasks', 
        title: 'TASKS',
        width: '12%',
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
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1 font-bold text-foreground text-xs">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                         <span class="">${completed}</span>
                    </div>
                    <div class="uppercase font-black text-[8px] tracking-widest rounded-lg px-2 py-1 ${currentPriorityStyle}">
                        ${row.priority}
                    </div>
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
            <button class="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground active:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
        `
    }
];