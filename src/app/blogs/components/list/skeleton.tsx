import { FC, Fragment } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { itemVariants } from '@/app/(home)/data';

const placeholderItems = Array.from({ length: 6 });

const BlogListSkeleton: FC = () => (
    <Fragment>
        {placeholderItems.map((_, index) => (
            <motion.div key={`blog-list-skeleton-${index}`} variants={itemVariants}>
                <Card className="flex h-full flex-col border-white/15 bg-white/5 py-0">
                    <div className="w-full border-b border-white/10">
                        <Skeleton className="h-48 w-full rounded-t-xl bg-white/10" />
                    </div>
                    <CardHeader className="space-y-3 px-4">
                        <Skeleton className="h-4 w-1/3 rounded-full bg-white/20" />
                        <Skeleton className="h-6 w-3/4 rounded-full bg-white/30" />
                        <Skeleton className="h-4 w-full rounded-full bg-white/10" />
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-6">
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
                            <Skeleton className="h-6 w-14 rounded-full bg-white/10" />
                            <Skeleton className="h-6 w-12 rounded-full bg-white/10" />
                        </div>
                        <Skeleton className="mt-auto h-4 w-24 rounded-full bg-white/15" />
                    </CardContent>
                </Card>
            </motion.div>
        ))}
    </Fragment>
);

export default BlogListSkeleton;
