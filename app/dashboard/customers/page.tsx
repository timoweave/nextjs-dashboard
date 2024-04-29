import { fetchFilteredCustomers } from '@lib/data';
import CustomersTable from '@ui/customers/table';
import { Metadata } from 'next';

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
    const customers = await fetchFilteredCustomers(query);

    return (
        <div>
            <CustomersTable customers={customers} />
        </div>
    );
}
