import { FC, useEffect, useState } from 'react';
import ProjectsView from './view';
import { client } from '@/lib/sanity';
import { projectListQuery } from '@/sanity/projects/api';
import { ProjectList } from '@/sanity/projects/types';

const Projects: FC = () => {
    const [projects, setProjects] = useState<ProjectList[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const data = await client.fetch<ProjectList[]>(projectListQuery, {
                    offset: 0,
                    limit: 4,
                    search: '',
                    tech: [],
                    status: '',
                });
                if (mounted) {
                    setProjects(data ?? []);
                }
            } catch (error) {
                console.error('[Projects] failed to fetch', error);
                if (mounted) setProjects([]);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        fetchProjects();
        return () => {
            mounted = false;
        };
    }, []);

    return <ProjectsView projects={projects} isLoading={isLoading} />;
};

export default Projects;
