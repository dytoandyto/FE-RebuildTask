import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TaskHeader = ({ onAction }: { onAction?: () => void }) => (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-foreground">Tasks Management </h1>
            <p className="text-sm text-muted-foreground font-medium">Keep track of your daily responsibilities and deadlines.</p>
        </div>
        <Button 
            onClick={onAction}
            className="h-12 px-6 bg-sada-red hover:bg-sada-red-hover text-white rounded-2xl shadow-lg shadow-sada-red/20 font-bold flex items-center gap-2 group transition-all active:scale-95"
        >
            <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
            Add New Task
        </Button>
    </div>
);