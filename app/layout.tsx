import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/layout/Footer";
import {Header} from "@/app/components/layout/Header";


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
        <Header/>
        <main className="d-flex flex-grow-1 overflow-auto">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
