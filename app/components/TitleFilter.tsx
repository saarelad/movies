"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, useCallback, useEffect, useState} from "react";

export default function TitleFilter() {
    const [searchTerm, setSearchTerm] = useState<string>("")
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

    useEffect(() => {
        setSearchTerm(searchParams.get("filter") || "");
    }, [searchParams]);

    useEffect(() => {
        searchTerm ?
            router.push(`${pathname}?${createQueryString("filter", searchTerm)}`) :
            router.push(`${pathname}`);
    }, [searchTerm, pathname, router,createQueryString]);


    const applyFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleReset = () => {
        setSearchTerm("");
    };

    return (
        <div className="d-flex gap-2 py-1 justify-content-center align-items-center bg-dark-subtle">
            <span className="text-primary">Filter by title:</span>
            <input
                type="text"
                className="rounded"
                value={searchTerm}
                onChange={applyFilter}
            />
            <button className="btn btn-primary" onClick={handleReset}>Reset</button>
        </div>
    );
}