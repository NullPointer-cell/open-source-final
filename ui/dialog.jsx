import React, { useState } from 'react';
import { X } from 'lucide-react';

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ children, className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`} {...props}>
    {children}
  </div>
);

const DialogTitle = ({ children, className, ...props }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h2>
);

const DialogFooter = ({ children, className, ...props }) => (
  <div className={`flex gap-2 pt-4 border-t ${className}`} {...props}>
    {children}
  </div>
);

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter };
