import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingFormCreation() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-9 w-48" />
          </div>

          {/* Invoice details */}
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>

          {/* From and To sections */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Date and Due Date */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-10 w-48" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <div className="grid grid-cols-12 gap-4 mb-2">
              <Skeleton className="h-4 w-24 col-span-6" />
              <Skeleton className="h-4 w-16 col-span-2" />
              <Skeleton className="h-4 w-16 col-span-2" />
              <Skeleton className="h-4 w-16 col-span-2" />
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <Skeleton className="h-20 w-full col-span-6" />
              <Skeleton className="h-10 w-full col-span-2" />
              <Skeleton className="h-10 w-full col-span-2" />
              <Skeleton className="h-10 w-full col-span-2" />
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-end">
            <div className="w-1/3 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between pt-2 border-t">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-48" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
