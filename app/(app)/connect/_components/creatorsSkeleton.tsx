"use client";

import { Alert } from "@/components/ui/alert";
import { Skeleton, SVGSkeleton } from "./skeleton";
import { Button } from "@/components/ui/button";
import { CreateMessageTokenIn } from "svix";

const LoadingSkeleton = () => (
  <>
    <div className="flex flex-col items-center justify-start h-full w-fit min-h-[500px]">
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-4 mx-2">
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
        </div>
      </div>
    </div>
  </>
);

const CreatorsListPreview = () => {
  return <LoadingSkeleton />;
};

const CreatorCardSkeleton = () => {
  return (
    <div>
      <Alert
        layout="row"
        isNotification
        imgSrc="/images/avatar.png"
        className="animate-pulse"
        action={
          <Button
            variant="ghost"
            className="size-8 p-0 opacity-50"
            disabled
          >
            <div className="size-4 rounded-full bg-muted" />
          </Button>
        }
      >
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded opacity-70" />
        </div>
      </Alert>
    </div>
  );
};

export default CreatorsListPreview;
