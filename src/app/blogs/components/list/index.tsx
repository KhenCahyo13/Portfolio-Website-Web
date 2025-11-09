'use client';

import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import BlogListView from './view';
import { BlogListProps } from './types';
import { useQuery } from '@/hooks/use-query';
import { blogListQuery } from '@/sanity/blogs/api';
import { BlogList as BlogListType } from '@/sanity/blogs/types';
import { client } from '@/lib/sanity';

const BlogList: FC<BlogListProps> = ({ initialQuery = '' }) => {
    const fetcher = useCallback(
        async ({ offset, limit, search, filters }: { offset: number; limit: number; search: string; filters: string[] }) => {
            const params = {
                offset,
                limit,
                search: search ? `${search}*` : '',
                tags: filters.length ? filters : [],
            };
            return client.fetch<BlogListType[]>(blogListQuery, params);
        },
        []
    );

    const { data, isLoading, hasMore, search, setSearch, filters, setFilters, loadMore, reset } = useQuery<BlogListType>({
        initialSearch: initialQuery,
        pageSize: 6,
        fetcher,
    });

    useEffect(() => {
        reset(initialQuery);
    }, [initialQuery, reset]);

    const availableTags = useMemo(() => {
        const tagSet = new Set<string>();
        data.forEach((blog) => blog.tags?.forEach((tag) => tagSet.add(tag)));
        return Array.from(tagSet);
    }, [data]);

    return (
        <BlogListView
            blogs={data}
            isLoading={isLoading}
            onLoadMore={loadMore}
            hasMore={hasMore}
            searchTerm={search}
            onSearchChange={setSearch}
            activeTag={filters[0] ?? ''}
            onTagChange={(tag) => setFilters(tag ? [tag] : [])}
            availableTags={availableTags}
        />
    );
};

export default memo(BlogList);
