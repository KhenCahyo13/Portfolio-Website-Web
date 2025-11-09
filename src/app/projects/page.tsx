import { Metadata } from 'next';
import ProjectListContainer from './components/list';

export const metadata: Metadata = {
    title: 'Projects | Khen Muhammad Cahyo',
    description: 'Case studies and shipped products covering fullstack web, mobile, and system design work.',
    openGraph: {
        title: 'Projects | Khen Muhammad Cahyo',
        description: 'A collection of client launches, accelerators, and systems I have built.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Khen Muhammad Cahyo',
        description: 'Case studies and shipped products covering fullstack work.',
    },
};

type PageProps = {
    searchParams: Promise<{ query?: string }>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
    const resolved = await searchParams;
    return <ProjectListContainer initialQuery={resolved?.query ?? ''} />;
}
