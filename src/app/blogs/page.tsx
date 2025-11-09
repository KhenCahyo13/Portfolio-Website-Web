import { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/config/site';
import BlogListContainer from './components/list';

type PageProps = {
    searchParams: Promise<{ query?: string }>;
};

const pageTitle = 'Blogs';
const pageDescription =
    'Articles and notes on fullstack development, system design, and engineering leadership.';
const canonicalUrl = absoluteUrl('/blogs');

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    keywords: [...siteConfig.keywords, 'Blog', 'Engineering Leadership'],
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

export default async function BlogsPage({ searchParams }: PageProps) {
    const resolved = await searchParams;
    return <BlogListContainer initialQuery={resolved?.query ?? ''} />;
}
