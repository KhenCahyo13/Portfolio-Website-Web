'use client';

import { FC, useEffect, useState } from 'react';
import { easeIn, easeInOut, easeOut, motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0, transition: { duration: 0.5, ease: easeInOut } },
};

const contentVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
    hidden: { opacity: 0, y: 16, transition: { duration: 0.3, ease: easeIn } },
};

export const SplashScreen: FC = () => {
    const [isExiting, setIsExiting] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        let hideTimeout: NodeJS.Timeout | undefined;

        const triggerHide = () => {
            hideTimeout = setTimeout(() => setIsExiting(true), 800);
        };

        if (document.readyState === 'complete') {
            triggerHide();
        } else {
            window.addEventListener('load', triggerHide);
        }

        return () => {
            if (hideTimeout) clearTimeout(hideTimeout);
            window.removeEventListener('load', triggerHide);
        };
    }, []);

    useEffect(() => {
        if (!isExiting) return;
        const timer = setTimeout(() => setShouldRender(false), 500);
        return () => clearTimeout(timer);
    }, [isExiting]);

    if (!shouldRender) {
        return null;
    }

    return (
        <motion.div
            role="status"
            aria-live="polite"
            variants={overlayVariants}
            initial="visible"
            animate={isExiting ? 'hidden' : 'visible'}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#05060a] text-white"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_55%)] opacity-80" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[100%_5rem]" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[5rem_100%]" />
            </div>

            <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center gap-4 text-center"
            >
                <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.5em] text-white/60">
                        Portfolio
                    </span>
                    <h1 className="font-heading text-3xl text-white md:text-4xl">Khen Cahyo</h1>
                    <p className="text-sm text-white/60 md:text-base">
                        Building reliable digital experiences.
                    </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                    <Loader2 className="size-6 animate-spin text-primary" />
                    <span>Preparing the experiences…</span>
                </div>
            </motion.div>
        </motion.div>
    );
};
