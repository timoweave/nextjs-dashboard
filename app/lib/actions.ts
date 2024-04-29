'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


const InvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFormData = CreateInvoiceSchema.parse(rawFormData);
    const { customerId, status } = validatedFormData;
    const amountInCents = validatedFormData.amount * 100;
    const [date] = new Date().toISOString().split('T');

    try {
        await sql`
					INSERT INTO invoices (customer_id, amount, status, date)
					VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
				`;
    } catch (error) {
        return { message: 'Database Error: Failed to Create Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices?page=1');
}

const UpdateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });

export async function updateInvoice(invoiceId: string, formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFormData = UpdateInvoiceSchema.parse(rawFormData);
    const { customerId, status } = validatedFormData;
    const amountInCents = validatedFormData.amount * 100;

    try {
        await sql`
					UPDATE invoices
					SET customer_id = ${customerId},
						amount = ${amountInCents},
						status = ${status}
					WHERE id = ${invoiceId}
					`;
    } catch (error) {
        return {
            message: `Database Error: Failed to Update Invoice id ${invoiceId}.`,
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices?page=1');
}

export async function deleteInvoice(invoiceId: string, formData: FormData) {
    try {
        await sql`
					DELETE FROM invoices
					WHERE id = ${invoiceId}
				`;
				revalidatePath('/dashboard/invoices');
        return { message: `Delete Invoice id ${invoiceId}.` };
    } catch (error) {
        return {
            message: `Database Error: Failed to Delete Invoice id ${invoiceId}.`,
        };
    }

}