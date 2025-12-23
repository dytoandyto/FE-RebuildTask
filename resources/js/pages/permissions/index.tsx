import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ShieldCheck, Info, Building2, User, CheckCircle2, Lock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Fragment } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Access Control', href: '/permissions' },
];

interface Props {
    companies: { 
        id: number; 
        name: string; 
        owner?: { name: string; email: string } | null 
    }[];
    groupedPermissions: Record<string, { id: number; name: string }[]>;
    rolePermissions: string[];
}

const permissionDescriptions: Record<string, string> = {
    'manage-company': 'Edit profil perusahaan & billing.',
    'view-analytics': 'Akses dashboard statistik.',
    'view-workspaces': 'Melihat menu workspace.',
    'create-workspaces': 'Membuat workspace baru.',
    'edit-workspaces': 'Mengubah detail workspace.',
    'delete-workspaces': 'Menghapus workspace (Bahaya).',
};

export default function PermissionsIndex({ companies, groupedPermissions, rolePermissions }: Props) {

    const handleToggle = (permName: string, isChecked: boolean) => {
        router.post('/permissions/toggle', {
            permission_name: permName,
            enabled: isChecked,
        }, {
            preserveScroll: true,
            onError: (err) => {
                console.error(err);
                alert("Gagal update permission.");
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Access Control" />

            <div className="flex h-full flex-1 flex-col gap-6 p-8 w-full max-w-[100vw]">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
                    <div className="space-y-1.5">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            Access Control Matrix
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-2xl">
                            Atur <strong>Global Permission</strong> di kiri. Pengaturan ini berlaku mutlak untuk seluruh perusahaan di kanan.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs border border-border/50 p-2 rounded-lg bg-card shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
                            <span className="font-medium text-foreground">Allowed</span>
                        </div>
                        <div className="w-px h-4 bg-border"></div>
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30"></div>
                            <span className="font-medium text-muted-foreground">Denied</span>
                        </div>
                    </div>
                </div>

                <div className="relative w-full border border-border/60 rounded-xl bg-card shadow-sm overflow-hidden flex flex-col">
                    <div className="overflow-x-auto w-full pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                        <table className="w-max text-sm text-left border-collapse min-w-full">
                            <thead className="text-xs uppercase bg-muted/50 text-foreground">
                                <tr>
                                    <th className="sticky left-0 z-20 bg-background/95 backdrop-blur font-bold tracking-wider w-[260px] min-w-[260px] border-b border-r border-border/40 shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)] h-[100px] align-middle p-0">
                                        <div className="flex w-full h-full">
                                            <div className="flex items-center px-4 flex-1 h-full border-r border-border/40">
                                                <span>Permission Detail</span>
                                            </div>

                                            <div className="flex items-center justify-center w-[70px] bg-muted/20 h-full px-1">
                                                <span className="text-[10px] text-muted-foreground text-center leading-tight">
                                                    Global<br/>Switch
                                                </span>
                                            </div>
                                        </div>
                                    </th>

                                    {companies.map((company) => (
                                        <th 
                                            key={company.id} 
                                            className="px-2 py-4 font-bold text-center border-b border-border/40 w-[220px] min-w-[220px] max-w-[220px] h-[100px] align-middle"
                                        >
                                            <div className="flex flex-col items-center justify-center h-full gap-2">
                                                <div className="flex items-center justify-center gap-1.5 text-primary bg-primary/5 px-3 py-1.5 rounded border border-primary/10 w-full max-w-[180px]" title={company.name}>
                                                    <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                                                    <span className="truncate text-[11px] tracking-wide font-bold">
                                                        {company.name}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex flex-col items-center gap-0.5 w-full">
                                                    <div className="flex items-center justify-center gap-1 text-[10px] text-foreground font-medium w-full">
                                                        <User className="w-3 h-3" />
                                                        <span className="truncate max-w-[140px]">
                                                            {company.owner?.name || 'No Owner'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/40">
                                {Object.entries(groupedPermissions).map(([category, perms]) => (
                                    <Fragment key={category}>
                                        {perms.map((perm) => {
                                            const isGranted = rolePermissions.includes(perm.name);

                                            return (
                                                <tr key={perm.id} className="group hover:bg-muted/5 transition-colors h-[70px]">
                                                    <td className="sticky left-0 z-10 bg-background/95 backdrop-blur border-r border-border/40 group-hover:bg-background shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)] h-[70px] p-0">
                                                        <div className="flex w-full h-full">
                                                            <div className="flex flex-col justify-center gap-1 px-4 flex-1 border-r border-border/40 h-full overflow-hidden">
                                                                <span className="text-sm font-medium text-foreground truncate" title={perm.name}>
                                                                    {perm.name}
                                                                </span>
                                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1 opacity-80 truncate" title={permissionDescriptions[perm.name]}>
                                                                    <Info className="w-3 h-3 flex-shrink-0" />
                                                                    {permissionDescriptions[perm.name] || 'Deskripsi permission.'}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex items-center justify-center w-[70px] bg-muted/5 h-full">
                                                                <Switch
                                                                    checked={isGranted} 
                                                                    onCheckedChange={(checked: boolean) => handleToggle(perm.name, checked)}
                                                                    className="data-[state=checked]:bg-green-600 scale-90"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {companies.map((company) => (
                                                        <td 
                                                            key={`${company.id}-${perm.id}`} 
                                                            className="px-2 py-3 text-center align-middle border-r border-border/40 last:border-r-0 group-hover:bg-muted/10 transition-colors h-[70px] w-[220px] min-w-[220px] max-w-[220px]"
                                                        >
                                                            <div className="flex justify-center items-center h-full w-full opacity-80">
                                                                {isGranted ? (
                                                                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-green-500/10 text-green-600 ring-1 ring-green-500/20">
                                                                        <CheckCircle2 className="w-4 h-4" />
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-muted-foreground ring-1 ring-border">
                                                                        <Lock className="w-3.5 h-3.5 opacity-50" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}