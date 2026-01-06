import React, { forwardRef, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import $ from 'jquery';

DataTable.use(DT);

const DataTableBase = forwardRef<any, any>(({ columns, data, options }, ref) => {
    
    useEffect(() => {
        if (!ref || !('current' in ref) || !ref.current) return;
        
        const table = $(ref.current).find('table');
        
        // Handle Klik pada Row
        table.on('click', 'tbody tr', function (e: any) {
            // Jika yang diklik adalah button action (seperti Edit/Delete), jangan trigger modal detail
            if ($(e.target).closest('.btn-action').length) return;

            const rowData = ref.current.dt().row(this).data();
            if (options?.onRowClick && rowData) {
                options.onRowClick(rowData);
            }
        });

        return () => {
            table.off('click', 'tbody tr');
        };
    }, [options?.onRowClick]);

    return (
        <div className="w-full dt-sada-theme">
            <style>{`
                .dt-sada-theme .dataTables_wrapper { width: 100%; color: #fff; }
                table.dataTable { width: 100% !important; border-collapse: collapse !important; table-layout: fixed !important; }
                table.dataTable thead th { 
                    background: #121212 !important; 
                    padding: 20px !important; 
                    color: #525252 !important; 
                    font-size: 10px !important; 
                    text-transform: uppercase !important; 
                    letter-spacing: 0.2em !important; 
                    font-weight: 900 !important;
                    border-bottom: 1px solid #262626 !important;
                    text-align: center !important;
                }
                table.dataTable thead th:first-child { text-align: left !important; }
                table.dataTable tbody td { 
                    padding: 16px 20px !important; 
                    border-bottom: 1px solid #1a1a1a !important; 
                    vertical-align: middle !important; 
                    text-align: center !important;
                }
                table.dataTable tbody td:first-child { text-align: left !important; }
                
                .dt-footer { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-top: 1px solid #262626; }
                .dataTables_info { color: #525252 !important; font-size: 11px !important; font-weight: bold; }
                .dataTables_paginate { display: flex; gap: 6px; }
                .paginate_button { 
                    background: #171717 !important; border: 1px solid #262626 !important; 
                    color: #737373 !important; padding: 6px 14px !important; border-radius: 10px !important; 
                    font-size: 12px !important; cursor: pointer !important; transition: 0.2s;
                }
                .paginate_button.current { background: #ef4444 !important; color: #fff !important; border-color: #ef4444 !important; }
                .paginate_button.disabled { opacity: 0.3; cursor: not-allowed; }

                table.dataTable tbody tr:hover {
                    background-color: rgba(255, 255, 255, 0.02) !important;
                }

                /* Transisi warna untuk teks title */
                table.dataTable tbody tr .group-hover\:text-red-500 {
                    transition: color 0.2s ease-in-out;
            `}</style>

            <DataTable 
                ref={ref}
                data={data}
                columns={columns} 
                options={{
                    dom: 't<"dt-footer"ip>',
                    responsive: true,
                    destroy: true,
                    ...options
                }} 
                className="w-full"
            />
        </div>
    );
});

export default DataTableBase;