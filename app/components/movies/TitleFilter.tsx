"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, useCallback, useEffect, useState} from "react";

export default function TitleFilter() {
    const [inputValue, setInputValue] = useState<string>("");
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

    const applyFilter = (value:string) => {
        value ?
            router.push(`${pathname}?${createQueryString("filter", inputValue)}`) :
            router.push(`${pathname}`);
    }

    const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleReset = () => {
        setInputValue("");
        applyFilter("");
    };

    return (
        <div className="d-flex gap-2 py-1 justify-content-center align-items-center bg-dark-subtle">
            <span className="text-primary">Filter by title:</span>
            <input
                type="text"
                className="rounded"
                value={inputValue}
                onChange={onInputChange}
            />
            <button className="btn btn-primary" onClick={() => applyFilter(inputValue)}>Search</button>
            <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </div>
    );
}