import { BlogList } from '@/sanity/blogs/types';

export interface BlogListPageProps {
    searchParams: Promise<{ query?: string }>
}
