import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { projectDetailsQuery } from '@/sanity/projects/api';
import { ProjectDetails as ProjectDetailsType } from '@/sanity/projects/types';
import ProjectDetails from './components/details';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = await client.fetch<ProjectDetailsType | null>(projectDetailsQuery, { slug });

    return {
        title: data?.title ? `${data.title} | Projects` : 'Project Case Study',
        description: data?.summary,
        openGraph: {
            title: data?.title ?? 'Project Case Study',
            description: data?.summary ?? '',
        },
        twitter: {
            card: 'summary_large_image',
            title: data?.title ?? 'Project Case Study',
            description: data?.summary ?? '',
        },
    };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    return <ProjectDetails slug={slug} />;
}
