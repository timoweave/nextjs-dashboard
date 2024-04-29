import { ReactNode } from 'react';

export interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardInvoicesLayout(props: DashboardLayoutProps) {
    const { children } = props;

    return <div>{children}</div>;
}
