'use client';

import { FC, memo, useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { projectDetailsQuery } from '@/sanity/projects/api';
import { ProjectDetails as ProjectDetailsType } from '@/sanity/projects/types';
import ProjectDetailsView from './view';
import ProjectDetailsSkeleton from './skeleton';
import { ProjectDetailsProps } from './types';
import { EmptyDataFallback } from '@/components/fallback';

const ProjectDetails: FC<ProjectDetailsProps> = ({ slug }) => {
    const [project, setProject] = useState<ProjectDetailsType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchProject = async () => {
            try {
                setIsLoading(true);
                const data = await client.fetch<ProjectDetailsType | null>(projectDetailsQuery, {
                    slug,
                });
                if (mounted) {
                    setProject(data ?? null);
                }
            } catch (error) {
                console.error('[ProjectDetails] Failed to fetch project detail', error);
                if (mounted) setProject(null);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        fetchProject();

        return () => {
            mounted = false;
        };
    }, [slug]);

    if (isLoading) {
        return <ProjectDetailsSkeleton />;
    }

    if (!project) {
        return (
            <section className="px-6 py-16 md:px-12">
                <EmptyDataFallback
                    title="Project not found"
                    description="This case study might be private or has been removed."
                />
            </section>
        );
    }

    return <ProjectDetailsView project={project} />;
};

export default memo(ProjectDetails);
