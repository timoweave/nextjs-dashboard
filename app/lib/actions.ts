'use server';

import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


const InvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer',
        required_error: 'Please select a customer',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than 0' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status',
        required_error: 'Please select an invoice status',
    }),
    date: z.string(),
});

const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });

export interface CreateInvoicePrevState {
    message?: string | null;
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
}

export async function createInvoice(
    prevState: CreateInvoicePrevState,
    formData: FormData,
) {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFormData = CreateInvoiceSchema.safeParse(rawFormData);
    if (!validatedFormData.success) {
        return {
            messsage: 'Missing Fields. Failed to creae invoice.',
            errors: validatedFormData.error.flatten().fieldErrors,
        };
    }

    const { customerId, status } = validatedFormData.data;
    const amountInCents = validatedFormData.data.amount * 100;
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

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}