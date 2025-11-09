import { FC } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { itemVariants, sectionVariants, staggerVariants } from '../../data';
import ProjectsSkeleton from './skeleton';
import { ProjectsViewProps } from './types';

const ProjectsView: FC<ProjectsViewProps> = ({ projects, isLoading }) => (
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
                <h2 className="font-heading text-3xl text-foreground">
                    Selected work and personal projects.
                </h2>
                <p className="text-sm text-muted-foreground md:text-base">
                    Fullstack engagements that highlight my range.
                </p>
            </div>
            {isLoading ? (
                <ProjectsSkeleton />
            ) : projects.length > 0 ? (
                <motion.div variants={staggerVariants} className="grid gap-6 md:grid-cols-2">
                    {projects.map((project) => {
                        const slugPath = project.slug?.current
                            ? `/projects/${project.slug.current}`
                            : '#';
                        return (
                            <motion.div key={project._id} variants={itemVariants}>
                                <Card className="h-full border-white/15 bg-white/5">
                                    <CardHeader className="px-4">
                                        <CardTitle className="text-2xl text-foreground">
                                            {project.title}
                                        </CardTitle>
                                        <CardDescription>{project.summary}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-4">
                                        {project.techStack?.length ? (
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.slice(0, 4).map((tag) => (
                                                    <Badge
                                                        key={`${project._id}-${tag}`}
                                                        variant="outline"
                                                        className="border-white/20 bg-transparent text-xs text-muted-foreground"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : null}
                                        <Button
                                            asChild
                                            variant="link"
                                            className="mt-4 px-0 text-primary"
                                            disabled={slugPath === '#'}
                                        >
                                            <Link href={slugPath}>Dive into details →</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            ) : (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-muted-foreground">
                    Projects will be published here soon. Stay tuned!
                </div>
            )}
            <div className="flex justify-center">
                <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/20 bg-transparent text-xs uppercase tracking-[0.3em] text-muted-foreground md:w-auto"
                >
                    <Link href="/projects">See all projects →</Link>
                </Button>
            </div>
        </div>
    </motion.section>
);

export default ProjectsView;
