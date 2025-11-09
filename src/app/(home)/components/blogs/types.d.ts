import { BlogList } from '@/sanity/blogs/types';

export interface BlogsViewProps {
    blogs: BlogList[];
    isLoading: boolean;
}
