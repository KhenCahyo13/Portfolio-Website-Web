'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { Button } from './ui/button';

const navItems = [
    {
        label: 'Home',
        href: '#home',
    },
    {
        label: 'About',
        href: '#about',
    },
    {
        label: 'Experiences',
        href: '#experiences',
    },
    {
        label: 'Skills',
        href: '#skills',
    },
    {
        label: 'Projects',
        href: '#projects',
    },
    {
        label: 'Blogs',
        href: '#blogs',
    },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'sticky top-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-24',
                scrolled
                    ? 'bg-[#05060a]/75 backdrop-blur supports-backdrop-filter:backdrop-blur'
                    : 'bg-transparent',
            )}
        >
            <Link
                href="#home"
                className="font-heading text-base font-semibold tracking-wide text-foreground"
            >
                KHEN CAHYO
            </Link>
            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="flex gap-4 text-sm uppercase tracking-[0.25em] text-muted-foreground">
                    {navItems.map(({ label, href }, index) => (
                        <NavigationMenuItem key={label}>
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} bg-transparent px-2 py-1 text-current hover:text-primary`}
                                data-index={index}
                            >
                                <Link href={href}>{label}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <svg
                    className={cn('size-5 transition', isOpen ? 'rotate-90' : 'rotate-0')}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                >
                    {isOpen ? (
                        <path d="M6 6l12 12M6 18L18 6" />
                    ) : (
                        <>
                            <path d="M4 7h16" />
                            <path d="M4 12h16" />
                            <path d="M4 17h16" />
                        </>
                    )}
                </svg>
            </Button>

            <div
                className={cn(
                    'fixed inset-x-0 top-[72px] mx-auto flex w-full max-w-6xl flex-col gap-2 rounded-2xl border border-white/10 bg-[#05060a]/95 px-6 py-4 text-sm uppercase tracking-[0.2em] text-muted-foreground shadow-2xl transition-all duration-200 md:hidden',
                    isOpen
                        ? 'pointer-events-auto opacity-100 translate-y-0'
                        : 'pointer-events-none opacity-0 -translate-y-2',
                )}
            >
                {navItems.map(({ label, href }) => (
                    <Link
                        key={label}
                        href={href}
                        className="rounded-lg px-3 py-2 text-foreground hover:bg-white/5 hover:text-primary"
                        onClick={() => setIsOpen(false)}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};
