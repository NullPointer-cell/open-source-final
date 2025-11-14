import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Users } from "lucide-react";
import AccessibilityBadge from "./AccessibilityBadge";

export default function PlacesList({ places, onPlaceSelect, isLoading }) {
  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="p-3 border rounded-lg">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Places Found</h3>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Places ({places.length})
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Click on a place to view details
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {places.map((place) => (
            <button
              key={place.id}
              onClick={() => onPlaceSelect(place)}
              className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label={`View details for ${place.name}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{place.name}</h3>
                <AccessibilityBadge rating={place.overall_rating} />
              </div>
              
              <p className="text-xs text-gray-600 mb-2 flex items-start gap-1">
                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{place.address}</span>
              </p>

              {place.reportCount > 0 && (
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <Users className="w-3 h-3" />
                  <span>{place.reportCount} report{place.reportCount > 1 ? 's' : ''}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}