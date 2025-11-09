import { ProjectDetails } from '@/sanity/projects/types';

export interface ProjectDetailsProps {
    slug: string;
}

export interface ProjectDetailsViewProps {
    project: ProjectDetails;
}
