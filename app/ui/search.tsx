'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export interface SearchProps {
    placeholder?: string;
}

export default function Search(props: SearchProps) {
    const { placeholder = 'Search invoices...' } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const route = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        // console.log({ e });
        // const term = e.target.value ?? '';
        const params = new URLSearchParams(searchParams);
        console.log({ term, params: params.toString() });
        if (term !== '') {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        // params.set('page', '1');
        route.replace(`${pathname}?${params.toString()}`);
    }, 300);

    // const search = (term: string) => {
    //     console.log({ term });
    // };

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSearch(e.target.value)
                }
                // onChange={(e) => {
                // 	handleSearch(e);
                //     console.log({ value: e.target.value, onChange: 'change' });
                //     // search(e.target.value);
                // }}
                // onClick={(e) => {
                //     console.log({ e, onClick: 'click' });
                // }}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}