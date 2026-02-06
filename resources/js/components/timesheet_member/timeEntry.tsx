import { useState } from "react";
import { Upload, X, FileText, Save, Send, Clock, Layout, ChevronDown, Trash2 } from "lucide-react";
import { TimeEntry } from "./DaySummary";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "../ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Button } from "../ui/button";

interface TimeEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedHour: number;
  existingEntry?: TimeEntry | null;
  onSave: (entry: Partial<TimeEntry>, isDraft: boolean) => void;
}

export function TimeEntryModal({
  isOpen,
  onClose,
  selectedDate,
  selectedHour,
  existingEntry,
  onSave,
}: TimeEntryModalProps) {
  const [taskId, setTaskId] = useState(existingEntry?.taskName || "");
  const [subtaskId, setSubtaskId] = useState(existingEntry?.subtaskName || "");
  const [startTime, setStartTime] = useState(
    existingEntry?.startTime || `${selectedHour.toString().padStart(2, "0")}:00`
  );
  const [endTime, setEndTime] = useState(
    existingEntry?.endTime || `${(selectedHour + 1).toString().padStart(2, "0")}:00`
  );
  const [description, setDescription] = useState(existingEntry?.description || "");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const availableTasks = [
    { id: "1", name: "Design new landing page mockups", subtasks: ["Hero section", "Feature section", "Mobile version"] },
    { id: "2", name: "Implement user authentication", subtasks: ["Login flow", "Registration", "Password reset"] },
    { id: "3", name: "Write API documentation", subtasks: ["Auth endpoints", "User endpoints", "Task endpoints"] },
  ];

  const selectedTask = availableTasks.find((t) => t.name === taskId);

  const handleSubmit = (isDraft: boolean) => {
    const entry: Partial<TimeEntry> = {
      id: existingEntry?.id || Date.now().toString(),
      taskName: taskId,
      subtaskName: subtaskId || undefined,
      startTime,
      endTime,
      date: selectedDate,
      description,
      status: isDraft ? "draft" : "submitted",
      files: files.map((f) => f.name),
    };
    onSave(entry, isDraft);
    handleClose();
  };

  const handleClose = () => {
    setTaskId("");
    setSubtaskId("");
    setStartTime(`${selectedHour.toString().padStart(2, "0")}:00`);
    setEndTime(`${(selectedHour + 1).toString().padStart(2, "0")}:00`);
    setDescription("");
    setFiles([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl bg-background border border-border rounded-[32px] p-0 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* HEADER SECTION */}
        <DialogHeader className="p-8 border-b border-border bg-muted/20">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="size-2 bg-sada-red rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-sada-red uppercase tracking-[0.3em]">Operational Log</span>
              </div>
              <DialogTitle className="text-2xl font-black uppercase  tracking-tighter ">
                {existingEntry ? "Update Entry" : "Initialize Work"}
              </DialogTitle>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                {new Date(selectedDate).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* TASK SELECTION */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 flex items-center gap-2">
              <Layout size={12} className="text-sada-red" /> Linked Project Task
            </label>
            <Select value={taskId} onValueChange={setTaskId}>
              <SelectTrigger className="h-12 bg-muted/50 border-border rounded-xl font-bold text-xs uppercase tracking-tight focus:ring-1 focus:ring-sada-red">
                <SelectValue placeholder="SELECT TASK..." />
              </SelectTrigger>
              <SelectContent className="bg-background border-border rounded-xl">
                {availableTasks.map((task) => (
                  <SelectItem key={task.id} value={task.name} className="text-xs font-bold uppercase py-3 focus:bg-sada-red/10 focus:text-sada-red">
                    {task.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* TIME RANGE */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 flex items-center gap-2">
                <Clock size={12} className="text-sada-red" /> Start Window
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-xs font-black focus:ring-1 focus:ring-sada-red outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 flex items-center gap-2">
                <Clock size={12} className="text-sada-red" /> End Window
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-xs font-black focus:ring-1 focus:ring-sada-red outline-none transition-all"
              />
            </div>
          </div>

          {/* WORK DESCRIPTION */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Work Description</label>
            <textarea
              placeholder="Describe briefing or progress..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-muted/50 border border-border rounded-xl p-4 text-xs font-bold focus:ring-1 focus:ring-sada-red outline-none transition-all resize-none placeholder:text-muted-foreground/30 uppercase tracking-tight"
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 flex items-center gap-2">
              <Upload size={12} className="text-sada-red" /> Evidence / Documentation
            </label>
            <div
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                isDragging
                  ? "border-sada-red bg-sada-red/5 scale-[0.98]"
                  : "border-border hover:border-sada-red/30 hover:bg-muted/50"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); /* Logic setFiles */ }}
            >
              <Upload className="mx-auto mb-2 text-muted-foreground/40" size={24} />
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                Drop operational proofs here, or <span className="text-sada-red cursor-pointer">Browse</span>
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER SECTION */}
        <DialogFooter className="p-8 bg-muted/20 border-t border-border flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="flex-1 h-12 rounded-xl border-border text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-colors"
          >
            Discard
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit(true)}
            className="flex-1 h-12 rounded-xl border-border text-[10px] font-black uppercase tracking-widest hover:bg-background flex gap-2"
          >
            <Save size={14} /> Save Draft
          </Button>
          <Button
            onClick={() => handleSubmit(false)}
            className="flex-1 h-12 rounded-xl bg-sada-red text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-lg shadow-sada-red/20 flex gap-2 active:scale-95"
          >
            <Send size={14} /> Deploy Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}