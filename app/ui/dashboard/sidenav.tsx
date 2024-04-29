'use client';

// import { logoutAction, signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';
import AcmeLogo from '@ui/acme-logo';
import { NavLink, customers, dashboard, invoices } from '@ui/dashboard/nav-links';
import Link from 'next/link';


function Spacer() {
    return (
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
            {/* space */}
        </div>
    );
}

function Logout() {
    return (
        <form
            // action={
                // logoutAction
                // signOut
                // async function logoutAction() {
                //     'use server';
                //     await signOut();
                // }
            // }
        >
            <button
                onClick={() => {
                    console.log('logout');
                }}
                className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
            </button>
        </form>
    );
}

function Home() {
    return (
        <Link
            className="flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
            href="/"
        >
            <div className="w-32 text-white md:w-40">
                <AcmeLogo />
            </div>
        </Link>
    );
}

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <Home />
                <NavLink link={dashboard} />
                <NavLink link={invoices} />
                <NavLink link={customers} />
                <Spacer />
                <Logout />
            </div>
        </div>
    );
}