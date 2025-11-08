import { FC } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { projectShowcase, itemVariants, sectionVariants, staggerVariants } from '../../data';

const ProjectsView: FC = () => (
    <motion.section
        id="projects"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="border-b border-white/10 py-16"
    >
        <div className="mx-auto w-full max-w-6xl space-y-8">
            <div className="space-y-3">
                <Badge
                    variant="outline"
                    className="border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]"
                >
                    Projects
                </Badge>
                <h2 className="font-heading text-3xl text-foreground">Selected work.</h2>
                <p className="text-sm text-muted-foreground md:text-base">
                    Fullstack engagements that highlight my range.
                </p>
            </div>
            <motion.div variants={staggerVariants} className="grid gap-6 md:grid-cols-2">
                {projectShowcase.map(({ name, description, stack, link }) => (
                    <motion.div key={name} variants={itemVariants}>
                        <Card className="h-full border-white/15 bg-white/5">
                            <CardHeader className="px-4">
                                <CardTitle className="text-2xl text-foreground">{name}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent className="px-4">
                                <div className="flex flex-wrap gap-2">
                                    {stack.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className="border-white/20 bg-transparent text-xs text-muted-foreground"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <Button asChild variant="link" className="mt-4 px-0 text-primary">
                                    <Link href={link}>Dive into details →</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </motion.section>
);

export default ProjectsView;
