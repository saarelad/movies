import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {NavBar} from "@/app/components/NavBar";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Movies and more",
    description: "Yet another TMDB like app",
};


export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className={`${inter.className} vh-100 overflow-hidden d-flex flex-column`}>
                <NavBar/>
                <main className="d-flex flex-grow-1 overflow-auto">
                    {children}
                </main>
                <footer className="footer">All rights reserved</footer>
            </body>
        </html>
    );
}
