import React, { forwardRef, useEffect, useState, useImperativeHandle, useRef } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import $ from 'jquery';
import { ChevronLeft, ChevronRight } from 'lucide-react';

DataTable.use(DT);

const DataTableBase = forwardRef<any, any>(({ columns, data, options }, ref) => {
    const internalRef = useRef<any>(null);
    const [pageInfo, setPageInfo] = useState({ 
        start: 0, 
        end: 0, 
        total: 0, 
        current: 0, 
        pages: 0 
    });

    useImperativeHandle(ref, () => internalRef.current);

    const updatePageInfo = () => {
        if (!internalRef.current) return;
        try {
            const dt = internalRef.current.dt();
            const info = dt.page.info();
            
            setPageInfo({
                start: info.recordsTotal === 0 ? 0 : info.start + 1,
                end: info.end,
                total: info.recordsTotal,
                current: info.page,
                pages: info.pages
            });
        } catch (e) {
            // Menghindari error jika DT belum siap
        }
    };

    // Sinkronisasi data dan update info
    useEffect(() => {
        if (internalRef.current && data) {
            updatePageInfo();
        }
    }, [data]);

    const handlePageClick = (pageIndex: number) => {
        if (!internalRef.current) return;
        const dt = internalRef.current.dt();
        if (pageIndex >= 0 && pageIndex < pageInfo.pages) {
            dt.page(pageIndex).draw('page');
            updatePageInfo();
        }
    };

    return (
        <div className="w-full">
            <style>{`
                .dt-paging, .dataTables_paginate, .dt-info, .dataTables_info { display: none !important; }
                table.dataTable { border-collapse: collapse !important; width: 100% !important; margin-bottom: 1rem !important; }
                table.dataTable thead th { 
                    background: transparent !important; color: #525252 !important; 
                    font-size: 10px !important; text-transform: uppercase !important; 
                    letter-spacing: 0.2em !important; padding: 20px !important;
                    border-bottom: 1px solid #1a1a1a !important; font-weight: 900 !important;
                }
                table.dataTable tbody td { border-bottom: 1px solid #141414 !important; padding: 16px 20px !important; }
            `}</style>

            <DataTable 
                ref={internalRef}
                data={data}
                columns={columns} 
                options={{
                    dom: 't',
                    responsive: true,
                    pageLength: 5,
                    destroy: true, // KUNCI UTAMA: Menghancurkan tabel lama sebelum membuat baru
                    retrieve: true, // KUNCI TAMBAHAN: Mengambil instance yang sudah ada jika memungkinkan
                    drawCallback: () => updatePageInfo(),
                    initComplete: () => updatePageInfo(),
                    ...options
                }} 
                className="w-full"
            />

            {/* CUSTOM PAGINATION UI */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 px-2 border-t border-white/5 pt-6">
                <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                    Showing <span className="text-white">{pageInfo.start}</span> to <span className="text-white">{pageInfo.end}</span> of <span className="text-white">{pageInfo.total}</span> entries
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => handlePageClick(pageInfo.current - 1)}
                        disabled={pageInfo.current === 0}
                        className="flex items-center gap-2 h-10 px-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] text-[12px] font-bold text-neutral-400 hover:bg-neutral-900 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft size={16} /> Prev
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: pageInfo.pages }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handlePageClick(i)}
                                className={`size-10 flex items-center justify-center rounded-xl text-[12px] font-black transition-all border ${
                                    pageInfo.current === i 
                                    ? 'bg-[#ef4444] border-[#ef4444] text-white' 
                                    : 'border-neutral-800 bg-[#0a0a0a] text-neutral-400 hover:border-neutral-600'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => handlePageClick(pageInfo.current + 1)}
                        disabled={pageInfo.current >= pageInfo.pages - 1 || pageInfo.pages === 0}
                        className="flex items-center gap-2 h-10 px-4 rounded-xl border border-neutral-800 bg-[#0a0a0a] text-[12px] font-bold text-neutral-400 hover:bg-neutral-900 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
});

export default DataTableBase;