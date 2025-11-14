import React from 'react';

const Skeleton = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`animate-pulse rounded-md bg-muted ${className}`}
    {...props}
  />
));

Skeleton.displayName = "Skeleton";

export { Skeleton };
