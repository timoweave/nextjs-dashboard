import SideNav from '@ui/dashboard/sidenav';
import { ReactNode } from 'react';

export interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
    const { children } = props;

    return (
        <div className="h-screen flex flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    );
}
