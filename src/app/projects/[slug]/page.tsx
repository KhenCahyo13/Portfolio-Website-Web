import { Metadata } from 'next';
import { client, urlFor } from '@/lib/sanity';
import { projectDetailsQuery } from '@/sanity/projects/api';
import { ProjectDetails as ProjectDetailsType } from '@/sanity/projects/types';
import { siteConfig, absoluteUrl } from '@/config/site';
import ProjectDetails from './components/details';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = await client.fetch<ProjectDetailsType | null>(projectDetailsQuery, { slug });
    const title = data?.title ?? 'Project Case Study';
    const description = data?.summary ?? siteConfig.description;
    const canonicalUrl = absoluteUrl(`/projects/${slug}`);
    const ogImage = data?.heroImage
        ? urlFor(data.heroImage).width(1200).height(630).url()
        : absoluteUrl(siteConfig.ogImage);

    return {
        title,
        description,
        keywords: data?.techStack ? [...data.techStack] : [...siteConfig.keywords],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: siteConfig.name,
            type: 'article',
            publishedTime: data?.startDate,
            modifiedTime: data?.endDate ?? data?.startDate,
            tags: data?.techStack,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    return <ProjectDetails slug={slug} />;
}
