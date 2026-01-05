// DataTableBase.tsx
import React, { forwardRef } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';

DataTable.use(DT);

const DataTableBase = forwardRef<any, any>(({ columns, data, options }, ref) => {
    return (
        <div className="w-full bg-card rounded-[32px] border border-border overflow-hidden">
            <style>{`
                /* Paksa Layout Tabel */
                .dataTables_wrapper { width: 100%; display: block; }
                table.dataTable { 
                    width: 100% !important; 
                    border-collapse: collapse !important; 
                    margin: 0 !important;
                    display: table !important; /* Force table behavior */
                }
                table.dataTable thead { display: table-header-group !important; }
                table.dataTable tbody { display: table-row-group !important; }
                table.dataTable tr { display: table-row !important; }
                table.dataTable th, table.dataTable td { display: table-cell !important; }

                /* Header Styling */
                table.dataTable thead th {
                    background: rgba(255, 255, 255, 0.03) !important;
                    padding: 20px !important;
                    color: #737373 !important;
                    font-size: 10px !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.2em !important;
                    font-weight: 900 !important;
                    border-bottom: 1px solid #262626 !important;
                    text-align: left !important;
                }

                /* Body Styling */
                table.dataTable tbody td {
                    padding: 20px !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                    vertical-align: middle !important;
                }

                /* Footer (Pagination) di Bawah */
                .dt-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 24px;
                    background: rgba(0,0,0,0.2);
                    border-top: 1px solid #262626;
                }

                .dataTables_info { color: #525252 !important; font-size: 11px !important; font-weight: bold; }
                
                .dataTables_paginate { display: flex; gap: 8px; }
                .paginate_button {
                    background: #171717 !important;
                    border: 1px solid #262626 !important;
                    color: #a3a3a3 !important;
                    padding: 6px 12px !important;
                    border-radius: 8px !important;
                    font-size: 12px !important;
                    cursor: pointer !important;
                }
                .paginate_button.current {
                    background: #ef4444 !important;
                    color: white !important;
                    border-color: #ef4444 !important;
                }
                .paginate_button.disabled { opacity: 0.3; }

                                table.dataTable thead th {
                    text-align: center !important; /* Default semua tengah */
                    padding: 20px !important;
                }

                /* Khusus kolom pertama (Task Details) paksa ke kiri */
                table.dataTable thead th:first-child,
                table.dataTable tbody td:first-child {
                    text-align: left !important;
                }

                /* Hilangkan whitespace yang bikin layout geser */
                table.dataTable {
                    border-spacing: 0 !important;
                    table-layout: fixed !important; /* SANGAT PENTING: Agar width % di atas dipatuhi */
                }

                table.dataTable tbody td {
                    white-space: nowrap; /* Biar teks gak turun ke bawah kalau gak muat */
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            `}</style>

            <DataTable 
                ref={ref}
                data={data}
                columns={columns} 
                options={{
                    dom: 't<"dt-footer"ip>', // t = table di atas, footer (i & p) di bawah
                    responsive: true,
                    destroy: true,
                    pageLength: 5,
                    ...options
                }} 
                className="w-full"
            />
        </div>
    );
});

export default DataTableBase;