import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BugHeaderProps {
    onReport: () => void;
}

export const BugHeader = ({ onReport }: BugHeaderProps) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">
                Bug & Request
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
                Track system issues and feature requests from users across all projects.
            </p>
        </div>
        <Button 
            onClick={onReport}
            className="bg-sada-red hover:bg-sada-red/90 text-white rounded-2xl h-12 px-6 font-bold shadow-lg shadow-sada-red/20 border-none transition-all active:scale-95 flex items-center gap-2"
        >
            <Plus className="size-5" strokeWidth={3} />
            Report Issue
        </Button>
    </div>
);