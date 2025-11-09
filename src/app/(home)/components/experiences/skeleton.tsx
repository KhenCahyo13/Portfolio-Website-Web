import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ExperiencesSkeleton = () => (
    <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
            <Card key={`exp-skeleton-${index}`} className="h-full border-white/15 bg-white/5">
                <CardHeader className="px-4">
                    <Skeleton className="h-5 w-2/3 rounded-full bg-white/15" />
                    <Skeleton className="mt-2 h-4 w-1/2 rounded-full bg-white/10" />
                </CardHeader>
            </Card>
        ))}
    </div>
);

export default ExperiencesSkeleton;