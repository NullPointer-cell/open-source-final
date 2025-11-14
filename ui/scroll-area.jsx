import React from 'react';

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative overflow-hidden ${className}`}
    {...props}
  >
    <div className="overflow-y-auto overflow-x-hidden h-full">
      {children}
    </div>
  </div>
));

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
