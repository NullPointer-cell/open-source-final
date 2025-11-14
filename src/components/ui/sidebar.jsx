import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

export const Sidebar = ({ children, className }) => (
  <aside className={`w-64 flex-shrink-0 ${className}`}>{children}</aside>
);

export const SidebarHeader = ({ children, className }) => (
  <header className={className}>{children}</header>
);

export const SidebarContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarGroup = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarGroupLabel = ({ children, className }) => (
  <h3 className={className}>{children}</h3>
);

export const SidebarGroupContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarMenu = ({ children, className }) => (
  <ul className={className}>{children}</ul>
);

export const SidebarMenuItem = ({ children, className }) => (
  <li className={className}>{children}</li>
);

export const SidebarMenuButton = ({ children, className, asChild }) => {
  const Comp = asChild ? 'span' : 'button';
  return <Comp className={className}>{children}</Comp>;
};

export const SidebarTrigger = ({ children, className }) => {
  const { setIsOpen } = useSidebar();
  return (
    <button className={className} onClick={() => setIsOpen(true)}>
      {children}
    </button>
  );
};
