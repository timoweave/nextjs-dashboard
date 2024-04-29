import { inter } from '@ui/fonts';
import '@ui/global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ACME Dashboard',
    description:
        'The official Next.js Course Dashboard, built with App Router.',
    metadataBase: new URL('https://next-lean-dashboard.vercel.sh'),
};

export interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
    const { children } = props;
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}