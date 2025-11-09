import { FC, Fragment } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { itemVariants } from '@/app/(home)/data';

const placeholderItems = Array.from({ length: 4 });

const ProjectListSkeleton: FC = () => (
    <Fragment>
        {placeholderItems.map((_, index) => (
            <motion.div key={`project-list-skeleton-${index}`} variants={itemVariants}>
                <Card className="flex h-full flex-col border-white/15 bg-white/5 py-0">
                    <CardHeader className="space-y-3 px-4">
                        <Skeleton className="h-4 w-1/3 rounded-full bg-white/20" />
                        <Skeleton className="h-6 w-3/4 rounded-full bg-white/30" />
                        <Skeleton className="h-4 w-full rounded-full bg-white/10" />
                    </CardHeader>
                    <CardContent className="space-y-3 px-4 pb-6">
                        <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
                        <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
                    </CardContent>
                </Card>
            </motion.div>
        ))}
    </Fragment>
);

export default ProjectListSkeleton;
