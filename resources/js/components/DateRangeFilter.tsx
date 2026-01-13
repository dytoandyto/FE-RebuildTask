import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
    className?: string;
    onFilter: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ className, onFilter }: DateRangePickerProps) {
    const [date, setDate] = React.useState<DateRange | undefined>(undefined);

    const handleSelect = (range: DateRange | undefined) => {
        setDate(range);
        onFilter(range);
    };

    const clearFilter = () => {
        setDate(undefined);
        onFilter(undefined);
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "h-11 w-[280px] justify-start text-left bg-background border-border rounded-xl hover:bg-muted hover:border-muted-foreground/20 transition-all duration-300 group shadow-sm",
                            !date && "text-muted-foreground"
                        )}
                    >
                        {/* Wrapper Icon menggunakan warna muted agar menyatu dengan bg */}
                        <div className="mr-3 p-1.5 rounded-lg bg-muted group-hover:bg-sada-red/10 transition-colors">
                            <CalendarIcon className="h-3.5 w-3.5 text-sada-red group-hover:scale-110 transition-transform" />
                        </div>

                        <span className="text-[11px] font-black uppercase tracking-wider truncate">
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "dd LLL")} — {format(date.to, "dd LLL, y")}
                                    </>
                                ) : (
                                    format(date.from, "dd LLL, y")
                                )
                            ) : (
                                "Set Date Range"
                            )}
                        </span>
                    </Button>
                </PopoverTrigger>

                {/* Popover Content menggunakan background standar dashboard */}
                <PopoverContent
                    className="w-auto p-0 bg-background border-border shadow-2xl rounded-2xl overflow-hidden"
                    align="start"
                >
                    <div className="p-3 border-b border-border bg-muted/50">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground px-2">
                            Select Deployment Window
                        </span>
                    </div>
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                        className="bg-background"
                    />
                </PopoverContent>
            </Popover>

            {date && (
                <Button
                    variant="ghost"
                    onClick={clearFilter}
                    className="h-11 px-3 bg-muted hover:bg-sada-red/10 text-muted-foreground hover:text-sada-red rounded-xl border border-border transition-all active:scale-90"
                >
                    <RotateCcw className="size-3.5 mr-2" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Reset</span>
                </Button>
            )}
        </div>
    );
}