import { FC, Fragment } from 'react';
import { motion } from 'motion/react';
import { itemVariants } from '../../data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const skeletonItems = Array.from({ length: 3 });

const BlogsSkeleton: FC = () => (
    <Fragment>
        {skeletonItems.map((_, index) => (
            <motion.div key={`blog-skeleton-${index}`} variants={itemVariants}>
                <Card className="flex h-full flex-col border-white/15 bg-white/5">
                    <div className="w-full border-b border-white/10">
                        <Skeleton className="h-40 w-full rounded-t-xl bg-white/10" />
                    </div>
                    <CardHeader className="space-y-3 px-4">
                        <Skeleton className="h-3 w-1/3 rounded-full bg-white/20" />
                        <Skeleton className="h-5 w-3/4 rounded-full bg-white/30" />
                        <Skeleton className="h-16 w-full rounded-xl bg-white/10" />
                        <Skeleton className="h-3 w-1/4 rounded-full bg-white/15" />
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

export default BlogsSkeleton;
