import { Metadata } from 'next';
import { blogDetailsQuery } from '@/sanity/blogs/api';
import { BlogDetails as BlogDetailsType } from '@/sanity/blogs/types';
import { client, urlFor } from '@/lib/sanity';
import { siteConfig, absoluteUrl } from '@/config/site';
import BlogDetails from './components/details';

type RouteParams = { slug: string };

export async function generateMetadata({
    params,
}: {
    params: Promise<RouteParams>;
}): Promise<Metadata> {
    const { slug } = await params;

    if (!slug) {
        const fallbackCanonical = absoluteUrl('/blogs');
        return {
            title: 'Blog',
            description: siteConfig.description,
            alternates: { canonical: fallbackCanonical },
        };
    }

    const data = await client.fetch<BlogDetailsType | null>(blogDetailsQuery, { slug });
    const canonicalUrl = absoluteUrl(`/blogs/${slug}`);

    if (!data) {
        return {
            title: 'Blog',
            description: siteConfig.description,
            alternates: { canonical: canonicalUrl },
        };
    }

    const title = data.seo?.metaTitle ?? data.title ?? 'Blog';
    const description = data.seo?.metaDescription ?? data.excerpt ?? siteConfig.description;
    const keywords = data.seo?.keywords ?? data.tags ?? siteConfig.keywords;
    const ogImage = data.coverImage
        ? urlFor(data.coverImage).width(1200).height(630).url()
        : absoluteUrl(siteConfig.ogImage);

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: 'article',
            siteName: siteConfig.name,
            publishedTime: data.publishedAt,
            authors: [data.author],
            tags: data.tags,
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

export default async function BlogDetailsPage({ params }: { params: Promise<RouteParams> }) {
    const { slug } = await params;
    return <BlogDetails slug={slug} />;
}
