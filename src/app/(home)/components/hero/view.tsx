import { FC } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { heroHighlights, itemVariants, sectionVariants, staggerVariants } from '../../data';

const HeroView: FC = () => (
    <motion.section
        id="home"
        initial="hidden"
        animate="show"
        variants={sectionVariants}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="border-b border-white/10 py-16"
    >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-0 lg:flex-row lg:items-center">
            <motion.div variants={staggerVariants} className="flex-1 space-y-8">
                <motion.div variants={itemVariants}>
                    <Badge
                        variant="outline"
                        className="border-white/20 bg-white/5 uppercase tracking-[0.4em] text-[0.65rem] text-white"
                    >
                        Fullstack Developer
                    </Badge>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-4">
                    <h1 className="font-heading text-4xl leading-tight text-foreground md:text-5xl">
                        Helping teams build reliable products end-to-end across web and mobile.
                    </h1>
                    <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                        I&apos;m Khen Muhammad Cahyo—undergraduate student from State Polytechnic of Malang and Fullstack Developer with {new Date().getFullYear() - 2022}+ years of
                        experience working as a frontend engineer, backend engineer, mentor, and
                        engineer lead. I thrive in cross-functional squads where clear communication
                        and hands-on shipping matter most.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                    <Button asChild size="lg">
                        <Link href="#collaboration">Start a project</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-white/30 text-foreground"
                    >
                        <Link href="#projects">View projects</Link>
                    </Button>
                </motion.div>
                <motion.div variants={staggerVariants} className="grid gap-4 sm:grid-cols-2">
                    {heroHighlights.map(({ label, value }) => (
                        <motion.div key={label} variants={itemVariants}>
                            <Card className="h-full border-white/15 bg-white/5">
                                <CardHeader className="px-4">
                                    <CardTitle className="font-heading text-2xl text-foreground">
                                        {value}
                                    </CardTitle>
                                    <CardDescription className="uppercase tracking-[0.3em] text-[0.6rem] text-muted-foreground">
                                        {label}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex-1">
                <Card className="border-white/15 bg-white/5 backdrop-blur">
                    <CardContent className="space-y-4 px-4">
                        <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl border border-white/30">
                            <Image
                                src="/images/profiles/Khen-Gray.png"
                                alt="Khen Muhammad Cahyo portrait"
                                fill
                                priority
                                className="object-cover grayscale"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-linier-to-b from-transparent via-[#05060a]/10 to-[#05060a]/40" />
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                            Khen Muhammad Cahyo - Fullstack Developer based in Indonesia.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
        <motion.div
            variants={itemVariants}
            className="mx-auto mt-12 max-w-6xl rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-muted-foreground"
        >
            Pragmatic products, steady communication, and ownership across every layer of the stack.
        </motion.div>
    </motion.section>
);

export default HeroView;
