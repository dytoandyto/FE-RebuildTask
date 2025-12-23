import { PermissionCardData } from '@/data/permission-data';

interface Props {
    data: PermissionCardData;
    granted: boolean;
}

export default function PermissionCard({ data, granted }: Props) {
    if (!granted) return null;

    return (
        <div className="flex flex-col justify-between p-6 rounded-lg border border-border bg-background transition-colors hover:bg-secondary/20 shadow-sm">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">
                        {data.title}
                    </h3>
                    <code className="text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-mono border border-border">
                        {data.key}
                    </code>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.description}
                </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">Granted & Active</span>
            </div>
        </div>
    );
}