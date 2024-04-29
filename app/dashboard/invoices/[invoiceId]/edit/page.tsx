import { fetchCustomers, fetchInvoiceById } from '@lib/data';
import Breadcrumbs from '@ui/invoices/breadcrumbs';
import EditInvoiceForm from '@ui/invoices/edit-form';
import { notFound } from 'next/navigation';

export interface InvoiceEditPageProps {
    params: {
        invoiceId: string;
    };
}

export default async function InvoiceEditPage(props: InvoiceEditPageProps) {
    const { params } = props;
    const { invoiceId } = params;

    const [customers, invoice] = await Promise.all([
        fetchCustomers(),
        fetchInvoiceById(invoiceId),
    ]);

    const breadcrumbs = [
        { label: 'Invoices', href: '/dashboard/invoices' },
        {
            label: 'Edit Invoices',
            href: `/dashboard/invoices/${invoiceId}/edit`,
        },
    ];
    if (invoice == null) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <EditInvoiceForm customers={customers} invoice={invoice} />
        </main>
    );
}
