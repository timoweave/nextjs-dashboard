'use client';

import { DocumentDuplicateIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes, SVGProps, useMemo } from 'react';


export interface LinkData {
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<
        Omit<SVGProps<SVGSVGElement>, 'ref'> & {
            title?: string | undefined;
            titleId?: string | undefined;
        } & RefAttributes<SVGSVGElement>
    >;
}

export interface NavLinkProps {
    link: LinkData;
}

export function useNavLinkSelectedClassName(props: NavLinkProps): string {
    const { link } = props;
    const { href } = link;

    const pathname = usePathname();
    const isSelected = useMemo(
        () => pathname === href.replace(/\?.*/, ''),
        [pathname, href],
    );

    const className = useMemo<string>(
        () =>
            clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                { 'bg-sky-100 text-blue-600': isSelected },
            ),
        [isSelected],
    );

    return className;
}

export function NavLink(props: NavLinkProps) {
    const { link } = props;
    const { name, href, icon: Icon } = link;
    const className = useNavLinkSelectedClassName(props);

    return (
        <Link key={name} href={href} className={className}>
            <Icon className="w-6" />
            <p className="hidden md:block">{name}</p>
        </Link>
    );
}

export const dashboard: LinkData = {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
};

export const invoices: LinkData = {
    name: 'Invoices',
    href: '/dashboard/invoices?page=1',
    icon: DocumentDuplicateIcon,
};

export const customers = {
    name: 'Customers',
    href: '/dashboard/customers?page=1',
    icon: UserGroupIcon,
};

export const DashboardLink = () => <NavLink link={dashboard} />;

export const InvoicesLink = () => <NavLink link={invoices} />;

export const CustomersLink = () => <NavLink link={customers} />;