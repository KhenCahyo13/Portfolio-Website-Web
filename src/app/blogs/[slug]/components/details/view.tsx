'use client';

import { FC, memo, useMemo } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/datetime';
import { urlFor } from '@/lib/sanity';
import { portableComponents } from '@/components/portable';
import { BlogDetailsViewProps } from './types';

const BlogDetailsView: FC<BlogDetailsViewProps> = ({ blog }) => {
    const coverUrl = useMemo(
        () => (blog.coverImage ? urlFor(blog.coverImage).width(1400).height(720).url() : null),
        [blog.coverImage],
    );

    return (
        <section className="mx-auto w-full max-w-5xl space-y-10 py-16">
            <div className="space-y-5">
                <Badge
                    variant="outline"
                    className="border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]"
                >
                    Blog
                </Badge>
                <h1 className="font-heading text-4xl leading-tight text-foreground md:text-5xl">
                    {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>by {blog.author}</span>
                    <span>• {formatDate(blog.publishedAt)}</span>
                    {blog.readingTime ? <span>• {blog.readingTime} min read</span> : null}
                </div>
                {blog.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag) => (
                            <Badge
                                key={`${blog._id}-${tag}`}
                                variant="outline"
                                className="border-white/10 bg-transparent text-xs text-muted-foreground"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                ) : null}
            </div>

            {coverUrl ? (
                <div className="relative overflow-hidden rounded-xl border border-white/10 md:rounded-4xl">
                    <Image
                        src={coverUrl}
                        alt={blog.title}
                        width={1400}
                        height={720}
                        priority
                        className="h-auto w-full object-cover"
                    />
                </div>
            ) : null}

            <Card className="border-white/15 bg-white/5 px-6 py-8">
                <article className="prose prose-invert max-w-none space-y-6">
                    <PortableText value={blog.content} components={portableComponents} />
                </article>
            </Card>
        </section>
    );
};

export default memo(BlogDetailsView);
