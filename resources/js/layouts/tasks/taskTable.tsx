// TaskTable.tsx
import DataTableBase from "@/components/DataTableBase";
import { getTaskColumns } from "./TaskColumns";

export const TaskTable = ({ tasks, getStatusInfo, getPriorityInfo }: any) => {
    return (
        <DataTableBase 
            data={tasks}
            columns={getTaskColumns(getStatusInfo, getPriorityInfo)}
        />
    );
};