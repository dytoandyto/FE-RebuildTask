import { UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamHeaderProps {
    title?: string;
    description?: string;
    onInvite: () => void;
}

export const TeamHeader = ({ 
    title = "Our Teams", 
    description = "Manage your company's human resources and monitor their workloads.",
    onInvite 
}: TeamHeaderProps) => (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
                {title}
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
                {description}
            </p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Tombol Invite Member */}
            <Button 
                onClick={onInvite}
                className="h-12 px-6 bg-sada-red hover:bg-sada-red-hover text-white rounded-2xl shadow-lg shadow-sada-red/20 font-bold flex items-center gap-2 group transition-all active:scale-95 border-none"
            >
                <div className="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
                    <UserPlus size={18} className="text-white" strokeWidth={3} />
                </div>
                Invite Member
            </Button>
        </div>
    </div>
);