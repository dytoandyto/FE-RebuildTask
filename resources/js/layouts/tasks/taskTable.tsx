import DataTableBase from "@/components/DataTableBase";
import { getTaskColumns } from "./TaskColumns";

export const TaskTable = ({ tasks, getStatusInfo, getPriorityInfo, onRowClick }: any) => {
    return (
        <DataTableBase 
            data={tasks}
            columns={getTaskColumns(getStatusInfo, getPriorityInfo)}
            options={{
                onRowClick: onRowClick, // Pass fungsi klik ke Base
                pageLength: 5,
                paginate: {
                previous: "Previous",
                next: "Next",
                // Kosongkan karakter anehnya
                first: "First",
                last: "Last"
            },
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
                createdRow: (row: any) => {
                    row.classList.add('cursor-pointer', 'transition-all', 'hover:bg-white/[0.02]');
                }
            }}
        />
    );
};