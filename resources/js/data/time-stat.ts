import { Clock, AlertCircle, Users, Zap } from 'lucide-react';

export const TIME_STATS_DUMMY = [
    {
        title: "Total Fleet Hours",
        value: "1,284",
        change: "+12% from last month",
        icon: Clock,
    },
    {
        title: "Pending Review",
        value: "24",
        change: "Needs Immediate Action",
        icon: AlertCircle,
        isWarning: true // Tambahan flag untuk styling
    },
    {
        title: "Active Operatives",
        value: "18",
        change: "Currently Clocked In",
        icon: Users,
    },
    {
        title: "Operational Efficiency",
        value: "94%",
        change: "On Track with Deadline",
        icon: Zap,
    }
];