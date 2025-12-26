import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimesheetHeaderProps {
    title?: string;
    description?: string;
    onAddEvent: () => void;
    onExport?: () => void;
}

export const TimesheetHeader = ({ 
    title = "Time & Schedule", 
    description = "Track your daily productivity and manage work hours across projects.",
    onAddEvent,
    onExport
}: TimesheetHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 transition-all">
            {/* Judul dan Deskripsi */}
            <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight text-foreground  uppercase">
                    {title}
                </h1>
                <p className="text-sm text-muted-foreground font-medium max-w-md">
                    {description}
                </p>
            </div>

            {/* Aksi Utama */}
            <div className="flex items-center gap-3">
                {/* Tombol Export */}
                <Button 
                    variant="outline" 
                    onClick={onExport}
                    className="h-12 px-6 rounded-2xl font-bold border-border bg-card hover:bg-muted transition-all uppercase text-[10px] tracking-widest text-muted-foreground hover:text-foreground shadow-sm"
                >
                    <Download className="size-4 mr-2" /> 
                    Export Data
                </Button>

                {/* Tombol Add Event (Main Action) */}
                <Button 
                    onClick={onAddEvent}
                    className="h-12 px-6 bg-sada-red hover:bg-sada-red/90 text-white rounded-2xl shadow-lg shadow-sada-red/20 font-bold flex items-center gap-2 group transition-all active:scale-95 border-none"
                >
                    <div className="bg-white/20 p-1 rounded-lg group-hover:bg-white/30 transition-colors">
                        <Plus size={18} strokeWidth={3} className="text-white" />
                    </div>
                    <span className="uppercase text-[11px] tracking-wider">Add Event</span>
                </Button>
            </div>
        </div>
    );
};