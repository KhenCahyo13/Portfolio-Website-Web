import { FC, memo, useMemo } from 'react';
import { motion } from 'motion/react';
import { itemVariants, sectionVariants, staggerVariants } from '../../data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { formatDate } from '@/lib/datetime';
import { BlogsViewProps } from './types';
import BlogsSkeleton from './skeleton';
import { EmptyDataFallback } from '@/components/fallback';

const BlogsView: FC<BlogsViewProps> = ({
    blogs,
    isLoading
}) => (
    <motion.section
        id="blogs"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="border-b border-white/10 py-16"
    >
        <div className="mx-auto w-full max-w-6xl space-y-8">
            <div className="space-y-3">
                <Badge
                    variant="outline"
                    className="border-white/20 bg-transparent text-xs uppercase tracking-[0.3em]"
                >
                    Blogs
                </Badge>
                <h2 className="font-heading text-3xl text-foreground">
                    Notes on process and craft.
                </h2>
                <p className="text-sm text-muted-foreground md:text-base">
                    Sharing insights, tutorials, and stories from my journey as a developer.
                </p>
            </div>
            <motion.div variants={staggerVariants} className="grid gap-6 md:grid-cols-3">
                {isLoading ? (
                    <BlogsSkeleton />
                ) : blogs.length > 0 ? (
                    blogs.map((blog) => {
                        const slugPath = blog.slug?.current ? `/blog/${blog.slug.current}` : '#';
                        const coverUrl = blog.coverImage ? urlFor(blog.coverImage).width(640).height(360).url() : null;

                        return (
                            <motion.div key={blog._id} variants={itemVariants}>
                                <Card className="flex h-full flex-col border-white/15 bg-white/5 py-0">
                                    {coverUrl && (
                                        <div className="relative h-40 w-full overflow-hidden rounded-t-xl border-b border-white/10">
                                            <Image
                                                src={coverUrl}
                                                alt={blog.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover"
                                                priority={false}
                                            />
                                        </div>
                                    )}
                                    <CardHeader className="space-y-2 px-4">
                                        <CardDescription className="uppercase tracking-[0.3em] text-[0.65rem] text-muted-foreground">
                                            {formatDate(blog.publishedAt)} {` • ${blog.readingTime} min read`}
                                        </CardDescription>
                                        <CardTitle className="text-lg text-foreground">{blog.title}</CardTitle>
                                        <CardDescription>{blog.excerpt}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-1 flex-col gap-4 px-4 pb-6">
                                        {blog.tags?.length ? (
                                            <div className="flex flex-wrap gap-2">
                                                {blog.tags.map((tag) => (
                                                    <Badge
                                                        key={`${blog._id}-${tag}`}
                                                        variant="outline"
                                                        className="border-white/15 bg-transparent text-xs text-muted-foreground"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : null}
                                        <div className="mt-auto">
                                            <Button
                                                asChild
                                                variant="link"
                                                className="px-0 text-primary"
                                                disabled={slugPath === '#'}
                                            >
                                                <Link href={slugPath}>Continue reading →</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    },
                    )
                ) : (
                    <EmptyDataFallback
                        title="No blog posts yet"
                        description="Fresh stories are on the way. Check back soon!"
                    />
                )}
            </motion.div>
        </div>
    </motion.section>
);

export default memo(BlogsView);
