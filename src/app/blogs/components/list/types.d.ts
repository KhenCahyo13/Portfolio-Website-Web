import { BlogList } from '@/sanity/blogs/types';

export interface BlogListViewProps {
    blogs: BlogList[];
    isLoading: boolean;
    onLoadMore: () => void;
    hasMore: boolean;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    activeTag: string;
    onTagChange: (tag: string) => void;
    availableTags: string[];
}

export interface BlogListProps {
    initialQuery?: string;
}
