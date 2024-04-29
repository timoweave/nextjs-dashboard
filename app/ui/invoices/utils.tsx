import { Button } from '@ui/button';
import Link from 'next/link';

export function CancelForm() {
    return (
        <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
            Cancel
        </Link>
    );
}

export interface SubmitFormProps {
    label: string;
}

export function SubmitForm(props: SubmitFormProps) {
    const { label } = props;
    return <Button type="submit">{label}</Button>;
}
