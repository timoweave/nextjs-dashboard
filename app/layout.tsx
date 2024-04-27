import { inter } from '@ui/fonts';
import '@ui/global.css';

export interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
    const { children } = props;
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}
