"use client";

import { Skeleton, SVGSkeleton } from "./skeleton";

const LoadingSkeleton = () => (
  <>
    <div className="flex flex-col items-center justify-start h-full w-fit min-h-[500px]">
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-4 mx-2">
          <div>
            <div className="relative border border-border px-4 py-3 z-[100] max-w-[400px] shadow-lg shadow-black/5">
              <div className="flex items-center gap-2">
                <div className="grow flex items-center">
                  <span className="me-3 inline-flex">
                    <SVGSkeleton className="rounded-full w-[48px] h-[48px]" />
                  </span>
                  <div className="flex flex-col items-start justify-start">
                    <div className="mb-1">
                      <Skeleton className="w-[72px] max-w-full" />
                    </div>
                    <div>
                      <Skeleton className="w-[72px] max-w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="inline-flex items-center justify-center transition-colors -my-1.5 -me-2 size-8 p-0">
                    <SVGSkeleton className="group-hover:opacity-100 w-[16px] h-[16px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative border border-border px-4 py-3 z-[100] max-w-[400px] shadow-lg shadow-black/5">
              <div className="flex items-center gap-2">
                <div className="grow flex items-center">
                  <span className="me-3 inline-flex">
                    <SVGSkeleton className="rounded-full w-[48px] h-[48px]" />
                  </span>
                  <div className="flex flex-col items-start justify-start">
                    <div className="mb-1">
                      <Skeleton className="w-[200px] max-w-full" />
                    </div>
                    <div>
                      <Skeleton className="w-[48px] max-w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="inline-flex items-center justify-center transition-colors -my-1.5 -me-2 size-8 p-0">
                    <SVGSkeleton className="group-hover:opacity-100 w-[16px] h-[16px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative border border-border px-4 py-3 z-[100] max-w-[400px] shadow-lg shadow-black/5">
              <div className="flex items-center gap-2">
                <div className="grow flex items-center">
                  <span className="me-3 inline-flex">
                    <SVGSkeleton className="rounded-full w-[48px] h-[48px]" />
                  </span>
                  <div className="flex flex-col items-start justify-start">
                    <div className="mb-1">
                      <Skeleton className="w-[128px] max-w-full" />
                    </div>
                    <div>
                      <Skeleton className="w-[88px] max-w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="inline-flex items-center justify-center transition-colors -my-1.5 -me-2 size-8 p-0">
                    <SVGSkeleton className="group-hover:opacity-100 w-[16px] h-[16px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative border border-border px-4 py-3 z-[100] max-w-[400px] shadow-lg shadow-black/5">
              <div className="flex items-center gap-2">
                <div className="grow flex items-center">
                  <span className="me-3 inline-flex">
                    <SVGSkeleton className="rounded-full w-[48px] h-[48px]" />
                  </span>
                  <div className="flex flex-col items-start justify-start">
                    <div className="mb-1">
                      <Skeleton className="w-[88px] max-w-full" />
                    </div>
                    <div>
                      <Skeleton className="w-[72px] max-w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="inline-flex items-center justify-center transition-colors -my-1.5 -me-2 size-8 p-0">
                    <SVGSkeleton className="group-hover:opacity-100 w-[16px] h-[16px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative border border-border px-4 py-3 z-[100] max-w-[400px] shadow-lg shadow-black/5">
              <div className="flex items-center gap-2">
                <div className="grow flex items-center">
                  <span className="me-3 inline-flex">
                    <SVGSkeleton className="rounded-full w-[48px] h-[48px]" />
                  </span>
                  <div className="flex flex-col items-start justify-start">
                    <div className="mb-1">
                      <Skeleton className="w-[96px] max-w-full" />
                    </div>
                    <div>
                      <Skeleton className="w-[96px] max-w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="inline-flex items-center justify-center transition-colors -my-1.5 -me-2 size-8 p-0">
                    <SVGSkeleton className="group-hover:opacity-100 w-[16px] h-[16px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const CreatorsListPreview = () => {
  return <LoadingSkeleton />;
};

export default CreatorsListPreview;
