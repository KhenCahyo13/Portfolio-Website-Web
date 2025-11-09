import { Metadata } from 'next';
import { blogDetailsQuery } from '@/sanity/blogs/api';
import { BlogDetails as BlogDetailsType } from '@/sanity/blogs/types';
import { client } from '@/lib/sanity';
import BlogDetails from './components/details';

type RouteParams = { slug: string };

export async function generateMetadata({
    params,
}: {
    params: Promise<RouteParams>;
}): Promise<Metadata> {
    const { slug } = await params;

    if (!slug) {
        return { title: 'Blog' };
    }

    const data = await client.fetch<BlogDetailsType | null>(blogDetailsQuery, { slug });

    if (!data?.seo) {
        return {
            title: data?.title ?? 'Blog',
            description: data?.excerpt,
        };
    }

    return {
        title: data.seo.metaTitle ?? data.title,
        description: data.seo.metaDescription ?? data.excerpt,
        keywords: data.seo.keywords,
    };
}

export default async function BlogDetailsPage({ params }: { params: Promise<RouteParams> }) {
    const { slug } = await params;
    return <BlogDetails slug={slug} />;
}
