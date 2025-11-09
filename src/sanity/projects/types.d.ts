import { SanityImage, SanityRichContent, SanitySlug } from '@/types/sanity';

export interface ProjectLinks {
    liveUrl?: string;
    repositoryUrl?: string;
    caseStudyUrl?: string;
}

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface ProjectList {
    _id: string;
    title: string;
    slug: SanitySlug;
    summary: string;
    heroImage: SanityImage;
    status?: string;
    techStack?: string[];
    responsibilities?: string[];
    role?: string;
    teamSize?: number;
    client?: string;
    startDate?: string;
    endDate?: string | null;
    orderRank?: number;
}

export interface ProjectDetails extends ProjectList {
    gallery?: SanityImage[];
    content: SanityRichContent;
    links?: ProjectLinks;
    metrics?: ProjectMetric[];
}
