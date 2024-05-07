"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, useCallback} from "react";

export default function TitleFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const applyFilter = (e: ChangeEvent<HTMLInputElement>) => {
        router.push(`${pathname}?${createQueryString("filter", e.target.value)}`)
    };

    return (
        <div className="py-1 d-flex gap-3 justify-content-center bg-dark-subtle">
            <span className="text-primary">Filter by title:</span>
            <input
                type="text"
                className="rounded"
                value={searchParams.get("filter") || ""}
                onChange={applyFilter}
            />
        </div>
    );
}