import { fetchLatestInvoices, fetchRevenue } from '@lib/data';
import Cards, { PendingCards, TotalCustomersCard, TotalInvoicesCards, TotalPaidInvoicesCard } from '@ui/dashboard/cards';
import LatestInvoices from '@ui/dashboard/latest-invoices';
import RevenueChart from '@ui/dashboard/revenue-chart';
import { lusitana } from '@ui/fonts';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export interface DashboardPageProps {
    // TBD
}

export default async function DashboardPage(_props: DashboardPageProps) {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <TotalPaidInvoicesCard />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                    <PendingCards />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                    <TotalInvoicesCards />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                    <TotalCustomersCard />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}