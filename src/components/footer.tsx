import Link from 'next/link';
import { FC } from 'react';

export const Footer: FC = () => (
    <footer className="border-t border-white/10 px-6 py-8 text-sm text-muted-foreground md:px-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>
                © {new Date().getFullYear()} Khen Cahyo - Website Built with NextJS, ShadCN, and
                Sanity
            </p>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em]">
                <Link href="https://github.com" className="hover:text-primary">
                    GitHub
                </Link>
                <Link href="https://www.linkedin.com" className="hover:text-primary">
                    LinkedIn
                </Link>
            </div>
        </div>
    </footer>
);
