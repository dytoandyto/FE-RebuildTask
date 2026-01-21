import { LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginInputProps {
    id: string;
    label: string;
    type: string;
    icon: LucideIcon;
    placeholder: string;
    autoComplete?: string;
    children?: React.ReactNode;
}

export const LoginField = ({ id, label, type, icon: Icon, placeholder, children, ...props }: LoginInputProps) => (
    <div>
        <div className="grid gap-2">
            <Label htmlFor={id} className="text-foreground/80 text-sm font-medium ml-1">
                {label}
            </Label>
            <div className="relative group">
                <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-sada-red transition-colors" />
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={props.autoComplete}
                    required
                    autoFocus
                    tabIndex={1}
                    name={id}
                    

                    className="w-full pl-11 py-6 rounded-xl bg-muted/30 border-border focus:bg-background focus:ring-4 focus:ring-sada-red/10 focus:border-sada-red/50 transition-all duration-200 dark:bg-card dark:text-foreground"
                    {...props} />
                {children}
            </div>
        </div>
    </div>
);