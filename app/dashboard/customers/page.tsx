import { fetchFilteredCustomers, fetchFilteredCustomersPages } from '@lib/data';
import CustomersTable from '@ui/customers/table';
import { lusitana } from '@ui/fonts';
import Pagination from '@ui/invoices/pagination';
import Search from '@ui/search';
import { CustomersTableSkeleton } from '@ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Customers',
};
export interface CustomersPageProps {
    // TBD
}

export interface CustomersPageProps {
    searchParams?: {
        query?: string;
        page?: string;
    };
}

export default async function CustomersPage(props: CustomersPageProps) {
    const { searchParams } = props;
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) ?? 1;
    const customers = await fetchFilteredCustomers(query, currentPage);
    const totalPages = await fetchFilteredCustomersPages(query);
    console.log({ customers, totalPages });

    return (
        <div className="w-full">
            <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
                Customers
            </h1>
            <Search placeholder="Search customers..." />
            <Suspense
                key={`${query}/${currentPage}`}
                fallback={<CustomersTableSkeleton />}
            >
                <CustomersTable customers={customers} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
