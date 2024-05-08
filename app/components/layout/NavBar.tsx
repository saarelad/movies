'use client'
import Link from 'next/link';
import {usePathname} from "next/navigation";

export const NavBar = () => {
    const pathname = usePathname();
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between">
            <div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link href="/" className={pathname === "/" ? "active nav-link" : "nav-link"}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={"/movies"} className={pathname.includes("/movies") ? "active nav-link" : "nav-link"}>
                            Movies
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={"/about"} className={pathname.includes("/about") ? "active nav-link" : "nav-link"}>
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
