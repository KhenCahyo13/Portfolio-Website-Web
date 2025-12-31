import { FC, memo } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { itemVariants, sectionVariants, staggerVariants } from '@/app/(home)/data';
import { formatDate } from '@/lib/datetime';
import { urlFor } from '@/lib/sanity';
import { cn } from '@/lib/utils';
import { ProjectListViewProps } from './types';
import ProjectListSkeleton from './skeleton';
import { EmptyDataFallback } from '@/components/fallback';

const statusOptions = [
    { label: 'All', value: '' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Launched', value: 'launched' },
    { label: 'Maintenance', value: 'maintenance' },
    { label: 'Archived', value: 'archived' },
];

const ProjectListView: FC<ProjectListViewProps> = ({
    projects,
    isLoading,
    hasMore,
    onLoadMore,
    searchTerm,
    onSearchChange,
    activeStatus,
    onStatusChange,
    activeTech,
    onTechChange,
    availableTechs,
}) => (
    <section className="border-b border-white/10 py-16">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-6 md:px-12">
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6"
            >
                <div className="space-y-3">
                    <Badge
                        variant="outline"
                        className="w-fit border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]"
                    >
                        Projects
                    </Badge>
                    <h1 className="font-heading text-4xl text-foreground">
                        Product builds & case studies
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        A closer look at client work, internal accelerators, and systems I&apos;ve
                        owned across the stack.
                    </p>
                </div>
                <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search by title..."
                        className="w-full rounded-2xl border border-white/15 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-2">
                        {statusOptions.map((status) => (
                            <Button
                                key={status.value || 'all'}
                                type="button"
                                variant="outline"
                                onClick={() => onStatusChange(status.value)}
                                className={cn(
                                    'h-auto rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] transition',
                                    activeStatus === status.value
                                        ? 'border-primary text-primary'
                                        : 'border-white/15 text-muted-foreground',
                                )}
                            >
                                {status.label}
                            </Button>
                        ))}
                    </div>
                    {availableTechs.length ? (
                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onTechChange('')}
                                className={cn(
                                    'h-auto rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] transition',
                                    activeTech === ''
                                        ? 'border-primary text-primary'
                                        : 'border-white/15 text-muted-foreground',
                                )}
                            >
                                All tech
                            </Button>
                            {availableTechs.map((tech) => (
                                <Button
                                    key={tech}
                                    type="button"
                                    variant="outline"
                                    onClick={() => onTechChange(tech)}
                                    className={cn(
                                        'h-auto rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] transition',
                                        activeTech === tech
                                            ? 'border-primary text-primary'
                                            : 'border-white/15 text-muted-foreground',
                                    )}
                                >
                                    {tech}
                                </Button>
                            ))}
                        </div>
                    ) : null}
                </div>
            </motion.div>

            <motion.div
                variants={staggerVariants}
                initial={false}
                animate="show"
                className="grid gap-6 md:grid-cols-2"
            >
                {isLoading && projects.length === 0 ? (
                    <ProjectListSkeleton />
                ) : projects.length > 0 ? (
                    projects.map((project) => {
                        const slugPath = project.slug?.current
                            ? `/projects/${project.slug.current}`
                            : '#';
                        const imageUrl = project.heroImage
                            ? urlFor(project.heroImage).width(800).height(450).url()
                            : null;
                        return (
                            <motion.div key={project._id} variants={itemVariants}>
                                <Card className="flex h-full flex-col border-white/15 bg-white/5 py-0">
                                    {imageUrl && (
                                        <div className="relative h-48 w-full overflow-hidden rounded-t-xl border-b border-white/10 bg-primary">
                                            <Image
                                                src={imageUrl}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-contain object-center"
                                            />
                                        </div>
                                    )}
                                    <CardHeader className="space-y-3 px-4">
                                        <CardDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                            {project.status
                                                ? project.status.replace(/-/g, ' ')
                                                : 'Case study'}
                                            {project.startDate
                                                ? ` • ${formatDate(project.startDate)}`
                                                : ''}
                                        </CardDescription>
                                        <CardTitle className="text-2xl text-foreground">
                                            {project.title}
                                        </CardTitle>
                                        <CardDescription>{project.summary}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="mt-auto px-4 pb-6">
                                        {project.techStack?.length ? (
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tag) => (
                                                    <Badge
                                                        key={`${project._id}-${tag}`}
                                                        variant="outline"
                                                        className="border-white/15 bg-transparent text-xs text-muted-foreground"
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
                                            <Link href={slugPath}>View Case Study →</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })
                ) : (
                    <EmptyDataFallback
                        title="No projects found"
                        description="Try different filters or reset the search."
                    />
                )}
            </motion.div>

            {hasMore ? (
                <div className="flex justify-center">
                    <Button
                        onClick={onLoadMore}
                        variant="outline"
                        disabled={isLoading}
                        className="border-white/20 bg-transparent"
                    >
                        {isLoading ? 'Loading…' : 'Load more'}
                    </Button>
                </div>
            ) : null}
        </div>
    </section>
);

export default memo(ProjectListView);
