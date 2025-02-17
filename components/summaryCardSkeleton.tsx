import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const SummaryCardSkeleton = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="space-y-2">
          {/* Title skeleton */}
          <div className="h-6 w-1/3 bg-muted animate-pulse rounded" />
          {/* Description skeleton */}
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Content skeleton - 4 lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          <div className="h-4 w-4/6 bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/6 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
      <CardFooter>
        {/* Footer skeleton */}
        <div className="h-3 w-1/3 bg-muted animate-pulse rounded" />
      </CardFooter>
    </Card>
  );
};

export default SummaryCardSkeleton;