import { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/config/site';
import ProjectListContainer from './components/list';

const pageTitle = 'Projects';
const pageDescription =
    'Case studies and shipped products showcasing fullstack web, mobile, and systems work.';
const canonicalUrl = absoluteUrl('/projects');

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    keywords: [...siteConfig.keywords, 'Projects', 'Case Studies'],
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: `${pageTitle} | ${siteConfig.name}`,
        description: pageDescription,
        url: canonicalUrl,
        siteName: siteConfig.name,
        type: 'website',
        images: [
            {
                url: absoluteUrl(siteConfig.ogImage),
                width: 1200,
                height: 630,
                alt: siteConfig.title,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: [absoluteUrl(siteConfig.ogImage)],
    },
};

type PageProps = {
    searchParams: Promise<{ query?: string }>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
    const resolved = await searchParams;
    return <ProjectListContainer initialQuery={resolved?.query ?? ''} />;
}
