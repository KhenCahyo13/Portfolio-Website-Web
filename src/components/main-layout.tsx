'use client';

import { FC, ReactNode } from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => (
    <div className="relative min-h-screen bg-[#05060a] text-foreground">
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_55%)] opacity-70" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100%_5rem]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[5rem_100%]" />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 px-6 md:px-12">{children}</main>
            <Footer />
        </div>
    </div>
);
