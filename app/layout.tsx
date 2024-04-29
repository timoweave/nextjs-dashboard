import { inter } from '@ui/fonts';
import '@ui/global.css';


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