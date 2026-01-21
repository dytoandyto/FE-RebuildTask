import { LayoutGrid, Users2, Settings } from 'lucide-react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
}

export const ProjectDetailTabs = ({ activeTab, setActiveTab }: TabsProps) => {
    const tabs = [
        { id: 'Tasks', label: 'Tasks', icon: LayoutGrid }, // Ganti 'Projects' jadi 'Tasks'
        { id: 'members', label: 'Members', icon: Users2 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex gap-2 p-1.5 bg-muted/30 w-fit rounded-2xl border border-white/5">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTab === tab.id
                            ? 'bg-background text-sada-red shadow-lg border border-white/5 ring-1 ring-white/10'
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