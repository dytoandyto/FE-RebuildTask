import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateWorkspaceButton from "./CreateWorkspaceButton";

interface WorkspaceHeaderProps {
    title?: string;
    description?: string;
    buttonText?: string;
    onAction?: () => void;
}

export const WorkspaceHeader = ({ 
    title = "Workspaces", 
    description = "Manage and organize all your team workspaces in one place.",
    buttonText = "Create Workspace",
    onAction 
}: WorkspaceHeaderProps) => (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
        <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-foreground transition-colors">
                {title}
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
                {description}
            </p>
        </div>
        
        <CreateWorkspaceButton />
    </div>
);