import { FileText, Clock, Paperclip } from 'lucide-react';

interface Props {
    activeTab: string;
    setActiveTab: (tab: any) => void;
}

export const TaskDetailTabs = ({ activeTab, setActiveTab }: Props) => {
    const tabs = [
        { id: 'brief', label: 'Mission Brief', icon: FileText },
        { id: 'timesheets', label: 'Operation Logs', icon: Clock },
        { id: 'docs', label: 'Documentation', icon: Paperclip },
    ];

    return (
        <div className="flex gap-2 p-1.5 bg-muted/30 w-fit rounded-2xl border border-border">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTab === tab.id 
                        ? 'bg-background text-sada-red shadow-lg border border-border ring-1 ring-white/10' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    <tab.icon size={14} />
                    {tab.label}
                </button>
            ))}
        </div>
    );
};