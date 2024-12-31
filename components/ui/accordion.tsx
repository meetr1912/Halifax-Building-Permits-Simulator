'use client';

import * as React from 'react';

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
}

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
}

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
}

interface AccordionChildProps {
  value?: string;
}

const AccordionContext = React.createContext<{
  expanded: string[];
  toggle: (value: string) => void;
}>({
  expanded: [],
  toggle: () => {},
});

export function Accordion({
  type = "single",
  collapsible = false,
  className = "",
  children,
}: AccordionProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const toggle = (value: string) => {
    if (type === "single") {
      setExpanded(expanded.includes(value) ? [] : [value]);
    } else {
      setExpanded(
        expanded.includes(value)
          ? expanded.filter((v) => v !== value)
          : [...expanded, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ expanded, toggle }}>
      <div className={`space-y-1 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children }: AccordionItemProps) {
  return (
    <div className="border rounded-lg">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<AccordionChildProps>(child)) {
          return React.cloneElement(child, { value });
        }
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({
  className = "",
  children,
  value,
}: AccordionTriggerProps) {
  const { expanded, toggle } = React.useContext(AccordionContext);

  return (
    <button
      className={`flex justify-between w-full px-4 py-2 text-left ${className}`}
      onClick={() => value && toggle(value)}
    >
      {children}
      <span
        className={`transform transition-transform ${
          expanded.includes(value || "") ? "rotate-180" : ""
        }`}
      >
        ▼
      </span>
    </button>
  );
}

export function AccordionContent({
  className = "",
  children,
  value,
}: AccordionContentProps) {
  const { expanded } = React.useContext(AccordionContext);
  const isExpanded = expanded.includes(value || "");

  return isExpanded ? (
    <div className={`px-4 py-2 ${className}`}>{children}</div>
  ) : null;
}
