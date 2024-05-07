import Link from 'next/link';

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary d-flex justify-content-between">
            <div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/movies" className="nav-link">
                            Movies
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/about" className="nav-link">
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
