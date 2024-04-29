'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


const CreateInvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInovice = CreateInvoiceSchema.omit({ id: true, date: true });
export async function createInvoice(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFormData = CreateInovice.parse(rawFormData);
    const { customerId, status } = validatedFormData;
    const amountInCents = validatedFormData.amount * 100;
    const [date] = new Date().toISOString().split('T');

    await sql`
			INSERT INTO invoices (customer_id, amount, status, date)
			VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
		`;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices?page=1');
}