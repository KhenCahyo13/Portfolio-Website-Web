"use client";

import { client } from "@/lib/sanity";
import { blogDetailsQuery } from "@/sanity/blogs/api";
import { BlogDetails as BlogDetailsType } from "@/sanity/blogs/types";
import { FC, memo, useEffect, useState } from "react";
import BlogDetailsView from './view';
import { BlogDetailsPageProps } from "./types";
import BlogDetailsSkeleton from "./skeleton";
import { EmptyDataFallback } from "@/components/fallback";

const BlogDetails: FC<BlogDetailsPageProps> = ({
    slug
}) => {
    const [blog, setBlog] = useState<BlogDetailsType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug) {
            setBlog(null);
            setIsLoading(false);
            return;
        }

        let mounted = true;

        const fetchBlog = async () => {
            try {
                setIsLoading(true);
                const data = await client.fetch<BlogDetailsType | null>(blogDetailsQuery, { slug: slug });
                if (mounted) {
                    setBlog(data ?? null);
                }
            } catch (error) {
                console.error('[BlogDetails] Failed to fetch blog detail', error);
                if (mounted) {
                    setBlog(null);
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchBlog();

        return () => {
            mounted = false;
        };
    }, [slug]);

    if (isLoading) {
        return <BlogDetailsSkeleton />;
    }

    if (!blog) {
        return (
            <section className="px-6 py-16 md:px-12">
                <EmptyDataFallback title="Article not found" description="This article might be private or has been removed." />
            </section>
        );
    }

    return <BlogDetailsView blog={blog} />;
}

export default memo(BlogDetails);
