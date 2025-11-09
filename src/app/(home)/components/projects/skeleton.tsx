import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectsSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
            <Card key={`project-skeleton-${index}`} className="h-full border-white/15 bg-white/5">
                <CardHeader className="px-4">
                    <Skeleton className="h-6 w-2/3 rounded-full bg-white/15" />
                    <Skeleton className="mt-2 h-4 w-1/2 rounded-full bg-white/10" />
                </CardHeader>
                <CardContent className="px-4 pb-6">
                    <Skeleton className="h-3 w-1/2 rounded-full bg-white/10" />
                    <div className="mt-4 flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
                        <Skeleton className="h-6 w-12 rounded-full bg-white/10" />
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);

export default ProjectsSkeleton;