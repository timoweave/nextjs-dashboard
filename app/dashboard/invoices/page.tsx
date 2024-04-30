import { fetchInvoicesPages } from '@lib/data';
import { lusitana } from '@ui/fonts';
import { CreateInvoice } from '@ui/invoices/buttons';
import Pagination from '@ui/invoices/pagination';
import InvoiceTable from '@ui/invoices/table';
import Search from '@ui/search';
import { InvoicesTableSkeleton } from '@ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Invoice',
};

export interface InvoicesPageProps {
    searchParams?: {
        query?: string;
        page?: string;
    };
}

export default async function InvoicesPage(props: InvoicesPageProps) {
    const { searchParams } = props;
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) ?? 1;
    const totalPages = await fetchInvoicesPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search />
                <CreateInvoice />
            </div>
            <Suspense
                key={`${query}/${currentPage}`}
                fallback={<InvoicesTableSkeleton />}
            >
                <InvoiceTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
