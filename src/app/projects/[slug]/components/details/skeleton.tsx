'use client';

import { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectDetailsSkeleton: FC = () => (
    <section className="mx-auto w-full max-w-5xl space-y-8 px-6 py-16 md:px-12">
        <div className="space-y-4">
            <Skeleton className="h-4 w-32 rounded-full bg-white/15" />
            <Skeleton className="h-10 w-3/4 rounded-2xl bg-white/20" />
            <Skeleton className="h-5 w-1/2 rounded-full bg-white/10" />
        </div>
        <div className="relative overflow-hidden rounded-4xl border border-white/10">
            <Skeleton className="h-80 w-full bg-white/5" />
        </div>
        <Card className="border-white/15 bg-white/5">
            <CardHeader className="px-6 pt-6">
                <Skeleton className="h-5 w-1/3 rounded-full bg-white/15" />
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                        key={`line-${index}`}
                        className="h-4 w-full rounded-full bg-white/10"
                    />
                ))}
            </CardContent>
        </Card>
    </section>
);

export default ProjectDetailsSkeleton;
