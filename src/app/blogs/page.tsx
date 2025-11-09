import { Metadata } from 'next';
import BlogListContainer from './components/list';

type PageProps = {
    searchParams: Promise<{ query?: string }>;
};

export const metadata: Metadata = {
    title: 'Blogs | Khen Muhammad Cahyo',
    description:
        'Articles and notes on fullstack development, system design, and engineering leadership by Khen Muhammad Cahyo.',
    openGraph: {
        title: 'Blogs | Khen Muhammad Cahyo',
        description:
            'Articles and notes on fullstack development, system design, and engineering leadership.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blogs | Khen Muhammad Cahyo',
        description: 'Articles and notes on fullstack development, system design, and leadership.',
    },
};

export default async function BlogsPage({ searchParams }: PageProps) {
    const resolved = await searchParams;
    return <BlogListContainer initialQuery={resolved?.query ?? ''} />;
}
