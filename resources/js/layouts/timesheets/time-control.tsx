import { Play, Pause, Square, Clock, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const TimerControl = () => {
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(0);

    // Logic Timer
    useEffect(() => {
        let interval: any = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    // Format waktu ke HH:MM:SS
    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-card rounded-[32px] border border-border p-6 shadow-xl shadow-sada-red/5 mb-8 relative overflow-hidden group">
            {/* Background Glow saat Aktif */}
            {isActive && (
                <div className="absolute inset-0 bg-sada-red/[0.03] animate-pulse pointer-events-none" />
            )}

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    {/* Icon Jam dengan Animasi Putar saat Aktif */}
                    <div className={`size-14 rounded-[20px] flex items-center justify-center transition-all ${
                        isActive ? 'bg-sada-red shadow-lg shadow-sada-red/30 rotate-12' : 'bg-muted text-muted-foreground'
                    }`}>
                        <Clock size={24} className={isActive ? 'text-white animate-spin-slow' : ''} />
                    </div>

                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
                            Current Task Tracking
                        </p>
                        <h3 className="text-xl font-black uppercase text-foreground leading-tight mt-0.5">
                            {isActive ? "Designing Homepage Mockups" : "Timer Ready to Start"}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-black text-sada-red uppercase tracking-widest bg-sada-red/10 px-2 py-0.5 rounded">
                                Website Redesign
                            </span>
                        </div>
                    </div>
                </div>

                {/* Display Waktu */}
                <div className="flex flex-col items-center md:items-end">
                    {/* <div className={`text-4xl font-black tracking-tighter tabular-nums ${
                        isActive ? 'text-sada-red' : 'text-foreground/40'
                    }`}>
                        {formatTime(seconds)}
                    </div> */}
                    
                    {/* Kontrol Timer */}
                    {/* <div className="flex items-center gap-2 mt-4">
                        {!isActive ? (
                            <Button 
                                onClick={() => setIsActive(true)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-10 px-6 font-bold flex items-center gap-2 border-none shadow-lg shadow-emerald-500/20"
                            >
                                <Play size={14} fill="currentColor" /> START
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    onClick={() => setIsActive(false)}
                                    className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl h-10 px-6 font-bold flex items-center gap-2 border-none shadow-lg shadow-amber-500/20"
                                >
                                    <Pause size={14} fill="currentColor" /> PAUSE
                                </Button>
                                <Button 
                                    onClick={() => {
                                        setIsActive(false);
                                        console.log("Saving time:", formatTime(seconds));
                                    }}
                                    className="bg-sada-red hover:bg-sada-red/90 text-white rounded-xl h-10 px-4 font-bold border-none shadow-lg shadow-sada-red/20"
                                >
                                    <Square size={14} fill="currentColor" />
                                </Button>
                            </>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    );
};