import { fetchCustomers } from '@lib/data';
import Breadcrumbs from '@ui/invoices/breadcrumbs';
import CreateForm from '@ui/invoices/create-form';

export default async function InvoiceCreatePage() {
    const customers = await fetchCustomers();
    const breadcrumbs = [
        { label: 'Inovices', href: '/dashboard/invoices', active: false },
        {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
        },
    ];

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <CreateForm customers={customers} />
        </main>
    );
}