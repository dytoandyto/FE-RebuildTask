import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
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

    // Kirim data ke parent saat tanggal dipilih
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
                            "w-[260px] justify-start text-left font-bold bg-[#0a0a0a] border-neutral-800 rounded-xl hover:bg-neutral-900 transition-all",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-red-500" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#0a0a0a] border-neutral-800" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>

            {date && (
                <Button 
                    variant="ghost" 
                    onClick={clearFilter}
                    className="h-10 px-2 text-neutral-500 hover:text-white transition-colors"
                >
                    <X className="size-4" />
                </Button>
            )}
        </div>
    );
}