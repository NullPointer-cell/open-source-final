import React from 'react';

const RadioGroup = React.forwardRef(({ className, value, onValueChange, children, ...props }, ref) => (
  <div
    ref={ref}
    role="radiogroup"
    className={className}
    {...props}
  >
    {React.Children.map(children, child =>
      React.cloneElement(child, { value, onValueChange })
    )}
  </div>
));

RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(({ id, value, onValueChange, checked, className, ...props }, ref) => (
  <input
    ref={ref}
    type="radio"
    id={id}
    value={value}
    checked={checked}
    onChange={(e) => onValueChange && onValueChange(e.target.value)}
    className={`h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
