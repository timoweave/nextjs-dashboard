import {
    BanknotesIcon,
    ClockIcon,
    InboxIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { fetchCardData } from '@lib/data';
import { lusitana } from '@ui/fonts';
import { useMemo } from 'react';

const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

export default async function Cards() {
    const {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();

    return (
        <>
            <Card
                title="Collected"
                value={totalPaidInvoices}
                type="collected"
            />
            <Card title="Pending" value={totalPendingInvoices} type="pending" />
            <Card
                title="Total Invoices"
                value={numberOfInvoices}
                type="invoices"
            />
            <Card
                title="Total Customers"
                value={numberOfCustomers}
                type="customers"
            />
        </>
    );
}

export async function TotalPaidInvoicesCard() {
    const { totalPaidInvoices } = await fetchCardData();

    return (
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
    );
}

export async function PendingCards() {
    const { totalPendingInvoices } = await fetchCardData();

    return <Card title="Pending" value={totalPendingInvoices} type="pending" />;
}

export async function TotalInvoicesCards() {
    const { numberOfInvoices } = await fetchCardData();

    return (
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
    );
}

export async function TotalCustomersCard() {
    const { numberOfCustomers } = await fetchCardData();

    return (
        <Card
            title="Total Customers"
            value={numberOfCustomers}
            type="customers"
        />
    );
}

export interface CardProps {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
}

export function Card(props: CardProps) {
    const { title, value, type } = props;
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
