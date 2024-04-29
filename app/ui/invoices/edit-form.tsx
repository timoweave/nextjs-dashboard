'use client';

import { CancelForm, SubmitForm } from './utils';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { updateInvoice } from '@lib/actions';
import { CustomerField, InvoiceForm } from '@lib/definitions';
import { Button } from '@ui/button';
import { useMemo } from 'react';

export function EditCustomerName(props: EditInvoiceFormProps) {
    const { invoice, customers } = props;
    return (
        <div className="mb-4">
            <label
                htmlFor="customer"
                className="mb-2 block text-sm font-medium"
            >
                Choose customer
            </label>
            <div className="relative">
                <select
                    id="customer"
                    name="customerId"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 hover:border-blue-500"
                    defaultValue={invoice.customer_id}
                >
                    <option value="" disabled>
                        Select a customer
                    </option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
        </div>
    );
}

export function EditInvoiceAmount(
    props: Omit<EditInvoiceFormProps, 'customers'>,
) {
    const { invoice } = props;
    return (
        <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                Choose an amount
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        defaultValue={invoice.amount}
                        placeholder="Enter USD amount"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 hover:border-blue-500"
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>
    );
}

export function EditInvoiceStatus(
    props: Omit<EditInvoiceFormProps, 'customers'>,
) {
    const { invoice } = props;
    return (
        <fieldset>
            <legend className="mb-2 block text-sm font-medium">
                Set the invoice status
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4">
                    <div className="flex items-center">
                        <input
                            id="pending"
                            name="status"
                            type="radio"
                            value="pending"
                            defaultChecked={invoice.status === 'pending'}
                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 hover:border-blue-500"
                        />
                        <label
                            htmlFor="pending"
                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                        >
                            Pending <ClockIcon className="h-4 w-4" />
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="paid"
                            name="status"
                            type="radio"
                            value="paid"
                            defaultChecked={invoice.status === 'paid'}
                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 hover:border-blue-500"
                        />
                        <label
                            htmlFor="paid"
                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            Paid <CheckIcon className="h-4 w-4" />
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
    );
}
export interface EditInvoiceFormProps {
    invoice: InvoiceForm;
    customers: CustomerField[];
}

export default function EditInvoiceForm(props: EditInvoiceFormProps) {
    const { invoice, customers } = props;
    const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

    return (
        <form action={updateInvoiceWithId}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <EditCustomerName invoice={invoice} customers={customers} />
                <EditInvoiceAmount invoice={invoice} />
                <EditInvoiceStatus invoice={invoice} />
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <CancelForm />
                <SubmitForm label="Edit Invoice" />
            </div>
        </form>
    );
}
