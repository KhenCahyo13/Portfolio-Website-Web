import { FC, memo } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { itemVariants, sectionVariants, staggerVariants } from '@/app/(home)/data';
import { formatDate } from '@/lib/datetime';
import { urlFor } from '@/lib/sanity';
import { cn } from '@/lib/utils';
import { BlogListViewProps } from './types';
import BlogListSkeleton from './skeleton';
import { EmptyDataFallback } from '@/components/fallback';

const BlogListView: FC<BlogListViewProps> = ({
    blogs,
    isLoading,
    onLoadMore,
    hasMore,
    searchTerm,
    onSearchChange,
    activeTag,
    onTagChange,
    availableTags,
}) => (
    <section className="border-b border-white/10 py-16">
        <div className="mx-auto w-full max-w-6xl space-y-10">
            <motion.div variants={sectionVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
                <div className="space-y-3">
                    <Badge variant="outline" className="w-fit border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]">
                        Blog
                    </Badge>
                    <h1 className="font-heading text-4xl text-foreground">Latest articles</h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Thoughts on engineering leadership, product craft, and the pragmatic tools I use daily.
                    </p>
                </div>
                <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search by title..."
                        className="w-full rounded-2xl border border-white/15 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                    {availableTags.length ? (
                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onTagChange('')}
                                className={cn(
                                    'h-auto rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] transition',
                                    !activeTag ? 'border-primary text-primary' : 'border-white/15 text-muted-foreground'
                                )}
                            >
                                All
                            </Button>
                            {availableTags.map((tag) => (
                                <Button
                                    key={tag}
                                    type="button"
                                    variant="outline"
                                    onClick={() => onTagChange(tag)}
                                    className={cn(
                                        'h-auto rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] transition',
                                        activeTag === tag ? 'border-primary text-primary' : 'border-white/15 text-muted-foreground'
                                    )}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    ) : null}
                </div>
            </motion.div>

            <motion.div variants={staggerVariants} initial={false} animate="show" className="grid gap-6 md:grid-cols-3">
                {isLoading && blogs.length === 0 ? (
                    <BlogListSkeleton />
                ) : blogs.length > 0 ? (
                    blogs.map((blog) => {
                        const coverUrl = blog.coverImage ? urlFor(blog.coverImage).width(800).height(450).url() : null;
                        const slugPath = blog.slug?.current ? `/blogs/${blog.slug.current}` : '#';

                        return (
                            <motion.div key={blog._id} variants={itemVariants}>
                                <Card className="flex h-full flex-col border-white/15 bg-white/5 py-0">
                                    {coverUrl && (
                                        <div className="relative h-48 w-full overflow-hidden rounded-t-xl border-b border-white/10">
                                            <Image src={coverUrl} alt={blog.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                                        </div>
                                    )}
                                    <CardHeader className="space-y-3 px-4">
                                        <CardDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                            {formatDate(blog.publishedAt)} {` • ${blog.readingTime} min read`}
                                        </CardDescription>
                                        <CardTitle className="text-2xl text-foreground">{blog.title}</CardTitle>
                                        <CardDescription>{blog.excerpt.slice(0, 90)}...</CardDescription>
                                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">by {blog.author}</p>
                                        {blog.tags?.length ? (
                                            <div className="flex flex-wrap gap-2">
                                                {blog.tags.map((tag) => (
                                                    <Badge key={`${blog._id}-${tag}`} variant="outline" className="border-white/15 bg-transparent text-xs text-muted-foreground">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : null}
                                    </CardHeader>
                                    <CardContent className="mt-auto px-4 pb-6">
                                        <Button asChild variant="link" className="px-0 text-primary" disabled={slugPath === '#'}>
                                            <Link href={slugPath}>Continue reading →</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })
                ) : (
                    <EmptyDataFallback title='No articles found' description='Try a different keyword or reset the filters to discover more posts.' />
                )}
            </motion.div>

            {hasMore ? (
                <div className="flex justify-center">
                    <Button onClick={onLoadMore} variant="outline" disabled={isLoading} className="border-white/20 bg-transparent">
                        {isLoading ? 'Loading…' : 'Load more'}
                    </Button>
                </div>
            ) : null}
        </div>
    </section>
);

export default memo(BlogListView);
