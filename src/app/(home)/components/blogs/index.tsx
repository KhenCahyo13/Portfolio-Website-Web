import { FC, useEffect, useMemo, useState } from 'react';
import BlogsView from './view';
import { client } from '@/lib/sanity';
import { blogListQuery } from '@/sanity/blogs/api';
import { BlogList } from '@/sanity/blogs/types';

const Blogs: FC = () => {
    const [blogs, setBlogs] = useState<BlogList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const safeBlogs = useMemo(() => blogs ?? [], [blogs]);

    useEffect(() => {
        let mounted = true;

        const fetchBlogs = async () => {
            try {
                setIsLoading(true);
                const data = await client.fetch<BlogList[]>(blogListQuery);
                if (mounted) {
                    setBlogs(data ?? []);
                }
            } catch (error) {
                console.error('[Blogs] Failed to fetch blogs from Sanity', error);
                if (mounted) {
                    setBlogs([]);
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchBlogs();

        return () => {
            mounted = false;
        };
    }, []);

    return <BlogsView
        blogs={safeBlogs}
        isLoading={isLoading}
    />;
};

export default Blogs;
