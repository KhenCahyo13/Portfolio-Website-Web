'use client';

import { FC, memo } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { portableComponents } from '@/components/portable';
import { formatDate } from '@/lib/datetime';
import { urlFor } from '@/lib/sanity';
import { ProjectDetailsViewProps } from './types';

const ProjectDetailsView: FC<ProjectDetailsViewProps> = ({ project }) => {
    const heroUrl = project.heroImage ? urlFor(project.heroImage).width(1400).height(720).url() : null;

    return (
        <section className="mx-auto w-full max-w-5xl space-y-10 px-6 py-16 md:px-12">
            <div className="space-y-5">
                <Badge variant="outline" className="border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]">
                    {project.status ? project.status.replace(/-/g, ' ') : 'Project'}
                </Badge>
                <h1 className="font-heading text-4xl leading-tight text-foreground md:text-5xl">{project.title}</h1>
                <p className="text-base text-muted-foreground">{project.summary}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {project.role ? <span>{project.role}</span> : null}
                    {project.client ? <span>• {project.client}</span> : null}
                    {project.startDate ? (
                        <span>
                            • {formatDate(project.startDate)} — {project.endDate ? formatDate(project.endDate) : 'Present'}
                        </span>
                    ) : null}
                    {project.teamSize ? <span>• Team of {project.teamSize}</span> : null}
                </div>
                {project.techStack?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <Badge key={tech} variant="outline" className="border-white/15 bg-transparent text-xs text-muted-foreground">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                ) : null}
            </div>

            {heroUrl ? (
                <div className="relative overflow-hidden rounded-4xl border border-white/10">
                    <Image src={heroUrl} alt={project.title} width={1400} height={720} priority className="h-auto w-full object-cover" />
                </div>
            ) : null}

            <Card className="border-white/15 bg-white/5 px-6 py-8">
                <article className="prose prose-invert max-w-none space-y-6">
                    <PortableText value={project.content} components={portableComponents} />
                </article>
            </Card>

            {project.gallery?.length ? (
                <div className="grid gap-6 md:grid-cols-3">
                    {project.gallery.map((image) => {
                        const src = urlFor(image).width(900).height(600).url();
                        return (
                            <div key={image._key ?? src} className="overflow-hidden rounded-3xl border border-white/10">
                                <Image src={src} alt={image.alt ?? project.title} width={900} height={600} className="h-full w-full object-cover" />
                                {image.caption ? (
                                    <p className="px-4 py-2 text-sm text-muted-foreground">{image.caption}</p>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            ) : null}

            {project.responsibilities?.length ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-6">
                    <h2 className="font-heading text-2xl text-foreground">Responsibilities & highlights</h2>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {project.responsibilities.map((item) => (
                            <li key={item} className="flex gap-2">
                                <span className="mt-1 size-1 rounded-full bg-primary" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {project.metrics?.length ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-6">
                    <h2 className="font-heading text-2xl text-foreground">Impact metrics</h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {project.metrics.map((metric) => (
                            <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                                <p className="text-sm text-muted-foreground">{metric.label}</p>
                                <p className="font-heading text-2xl text-foreground">{metric.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

            {project.links?.liveUrl || project.links?.caseStudyUrl || project.links?.repositoryUrl ? (
                <div className="flex flex-wrap gap-3">
                    {project.links?.liveUrl ? (
                        <Button asChild>
                            <Link href={project.links.liveUrl} target="_blank" rel="noreferrer">
                                Visit live site
                            </Link>
                        </Button>
                    ) : null}
                    {project.links?.repositoryUrl ? (
                        <Button asChild variant="outline">
                            <Link href={project.links.repositoryUrl} target="_blank" rel="noreferrer">
                                View repository
                            </Link>
                        </Button>
                    ) : null}
                    {project.links?.caseStudyUrl ? (
                        <Button asChild variant="ghost">
                            <Link href={project.links.caseStudyUrl} target="_blank" rel="noreferrer">
                                Read full case study
                            </Link>
                        </Button>
                    ) : null}
                </div>
            ) : null}
        </section>
    );
};

export default memo(ProjectDetailsView);
