import React from "react";
import { Badge } from "@/components/ui/badge";

export default function AccessibilityBadge({ rating, showLabel = false }) {
  const getConfig = () => {
    switch(rating) {
      case 'accessible':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Accessible',
          icon: '✓'
        };
      case 'partially_accessible':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'Partially Accessible',
          icon: '~'
        };
      case 'not_accessible':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          label: 'Not Accessible',
          icon: '✗'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          label: 'Unknown',
          icon: '?'
        };
    }
  };

  const config = getConfig();

  return (
    <Badge 
      className={`${config.color} border text-xs font-medium`}
      aria-label={`Accessibility rating: ${config.label}`}
    >
      <span aria-hidden="true" className="mr-1">{config.icon}</span>
      {showLabel ? config.label : config.icon}
    </Badge>
  );
}