import DataTableBase from "@/components/DataTableBase";
import { getTaskColumns } from "./TaskColumns";

export const TaskTable = ({ tasks, getStatusInfo, getPriorityInfo, onRowClick }: any) => {
    return (
        <DataTableBase 
            data={tasks}
            columns={getTaskColumns(getStatusInfo, getPriorityInfo)}
            options={{
                onRowClick: onRowClick, // Pass fungsi klik ke Base
                pageLength: 2,
                // Tambahin efek hover biar user tau bisa diklik
                createdRow: (row: any) => {
                    row.classList.add('cursor-pointer', 'transition-all', 'hover:bg-white/[0.02]');
                }
            }}
        />
    );
};