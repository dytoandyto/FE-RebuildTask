import AppLayout from '@/layouts/app-layout';
import { bugs, dashboard, teams } from '@/routes';
import { PERMISSION_CARDS } from '@/data/permission-data';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Page } from '@inertiajs/core';
import { BugStats } from '@/layouts/bug-stat/bug-stat';
import { BugHeader } from '@/layouts/bug-stat/bug-header';
import { BugTable } from '@/layouts/bug-stat/bug-table';
import { BUG_REQUEST_DUMMY } from '@/data/bug-data';
interface BugsProps extends Page {
    auth: {
        user: {
            name: string;
            email: string;
            company?: { name: string };
            roles?: string[];
        };
        permissions: string[];
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Bugs', href: bugs().url },
];

export default function Bugs() {
    const { props } = usePage<BugsProps>();
    const { auth } = props;

    const permissions = auth.permissions || [];
    const hasPermission = (key: string) => permissions.includes(key);

    const activeCount = PERMISSION_CARDS.filter(p => hasPermission(p.key)).length;

    return (
       <AppLayout>
            <Head title="Bugs" />
            
            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-0 p-6 md:p-10 transition-all">
              {/* <BugStats data={BUG_REQUEST_DUMMY}/> */}

              <BugHeader onReport={() => {}} />

              <BugStats data={BUG_REQUEST_DUMMY} />
              <BugTable items={BUG_REQUEST_DUMMY} />
            </div>
        </AppLayout>
    );
}