import { DaySummary, TimeEntry } from "@/components/timesheet_member/DaySummary";
import { TimeEntryModal } from "@/components/timesheet_member/timeEntry";
import { TimeGrid } from "@/components/timesheet_member/timegrid";
import { TimesheetHeader } from "@/components/timesheet_member/TimesheetHeader";
import { TimesheetStats } from "@/components/timesheet_member/timesheetStat";
import { useState } from "react";


export default function App() {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");
  const [currentDate, setCurrentDate] = useState(new Date("2026-02-04"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<TimeEntry | null>(null);
  
  // Sample time entries
  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: "1",
      taskName: "Design new landing page mockups",
      subtaskName: "Hero section",
      startTime: "09:00",
      endTime: "11:30",
      date: "2026-02-04",
      description: "Created initial wireframes and high-fidelity mockups for the hero section. Focused on mobile-first approach.",
      status: "approved",
      files: ["hero-mockup-v1.fig", "wireframes.pdf"],
    },
    {
      id: "2",
      taskName: "Design new landing page mockups",
      subtaskName: "Feature section",
      startTime: "13:00",
      endTime: "15:00",
      date: "2026-02-04",
      description: "Working on feature section layout and component designs.",
      status: "submitted",
    },
    {
      id: "3",
      taskName: "Write API documentation",
      subtaskName: "Auth endpoints",
      startTime: "15:30",
      endTime: "17:00",
      date: "2026-02-04",
      description: "Documented authentication endpoints with request/response examples.",
      status: "draft",
    },
    {
      id: "4",
      taskName: "Implement user authentication",
      startTime: "10:00",
      endTime: "12:00",
      date: "2026-02-03",
      description: "Implemented login flow with JWT tokens and refresh mechanism.",
      status: "approved",
    },
    {
      id: "5",
      taskName: "Code review for payment module",
      startTime: "14:00",
      endTime: "16:30",
      date: "2026-02-03",
      description: "Reviewed payment integration code. Found some security issues that need attention.",
      status: "revision",
      files: ["review-notes.txt"],
    },
    {
      id: "6",
      taskName: "Update project dependencies",
      startTime: "09:00",
      endTime: "10:30",
      date: "2026-02-05",
      description: "Updated all npm packages to latest stable versions. Ran test suite.",
      status: "submitted",
    },
  ]);

  // Calculate stats
  const getWeekRange = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return { start: startOfWeek, end: endOfWeek };
  };

  const calculateWeekStats = () => {
    const { start, end } = getWeekRange();
    const weekEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= start && entryDate <= end;
    });

    const calculateHours = (entry: TimeEntry) => {
      const [startHour, startMin] = entry.startTime.split(":").map(Number);
      const [endHour, endMin] = entry.endTime.split(":").map(Number);
      return endHour - startHour + (endMin - startMin) / 60;
    };

    const totalHours = weekEntries.reduce((sum, entry) => sum + calculateHours(entry), 0);
    const approvedHours = weekEntries
      .filter((e) => e.status === "approved")
      .reduce((sum, entry) => sum + calculateHours(entry), 0);
    const pendingHours = weekEntries
      .filter((e) => e.status === "submitted")
      .reduce((sum, entry) => sum + calculateHours(entry), 0);
    const draftHours = weekEntries
      .filter((e) => e.status === "draft")
      .reduce((sum, entry) => sum + calculateHours(entry), 0);

    return { totalHours, approvedHours, pendingHours, draftHours };
  };

  const stats = calculateWeekStats();

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "daily") {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "daily") {
      newDate.setDate(currentDate.getDate() + 1);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date("2026-02-04"));
  };

  const handleTimeSlotClick = (date: string, hour: number) => {
    setSelectedDate(date);
    setSelectedHour(hour);
    setSelectedEntry(null);
    setIsModalOpen(true);
  };

  const handleEntryClick = (entry: TimeEntry) => {
    setSelectedEntry(entry);
    setSelectedDate(entry.date);
    const [hour] = entry.startTime.split(":").map(Number);
    setSelectedHour(hour);
    setIsModalOpen(true);
  };

  const handleSaveEntry = (entry: Partial<TimeEntry>, isDraft: boolean) => {
    if (selectedEntry) {
      // Update existing entry
      setEntries(entries.map((e) => (e.id === selectedEntry.id ? { ...e, ...entry } : e)));
    } else {
      // Add new entry
      setEntries([...entries, entry as TimeEntry]);
    }
  };

  return (
    <div className="">
      <div className="">
        <main className="">
          <div className="max-w-[1800px] mx-auto space-y-6">
            <TimesheetHeader
              viewMode={viewMode}
              setViewMode={setViewMode}
              currentDate={currentDate}
              onPreviousWeek={handlePreviousWeek}
              onNextWeek={handleNextWeek}
              onToday={handleToday}
            />

            <TimesheetStats
              totalHoursWeek={stats.totalHours}
              approvedHours={stats.approvedHours}
              pendingHours={stats.pendingHours}
              draftHours={stats.draftHours}
            />

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 min-w-0">
                <TimeGrid
                  viewMode={viewMode}
                  currentDate={currentDate}
                  entries={entries}
                  onTimeSlotClick={handleTimeSlotClick}
                  onEntryClick={handleEntryClick}
                />
              </div>

              <DaySummary entries={entries} currentDate={currentDate} />
            </div>
          </div>
        </main>
      </div>

      <TimeEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        selectedHour={selectedHour}
        existingEntry={selectedEntry}
        onSave={handleSaveEntry}
      />
    </div>
  );
}