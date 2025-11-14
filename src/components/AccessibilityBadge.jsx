import React from 'react';
import { Badge } from "@/components/ui/badge.jsx";

const AccessibilityBadge = ({ rating, showLabel }) => {
  const getBadgeVariant = () => {
    switch (rating) {
      case 'accessible':
        return 'success';
      case 'partially_accessible':
        return 'warning';
      case 'not_accessible':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getLabel = () => {
    switch (rating) {
      case 'accessible':
        return 'Accessible';
      case 'partially_accessible':
        return 'Partially Accessible';
      case 'not_accessible':
        return 'Not Accessible';
      default:
        return 'Unknown';
    }
  };

  return (
    <Badge variant={getBadgeVariant()}>
      {showLabel && <span>{getLabel()}</span>}
    </Badge>
  );
};

export default AccessibilityBadge;
