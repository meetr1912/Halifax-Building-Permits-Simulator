"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectTypeCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  options: string[];
  selectedProjects: string[];
  onSelect: (project: string) => void;
}

export default function ProjectTypeCard({
  title,
  icon,
  description,
  options,
  selectedProjects,
  onSelect,
}: ProjectTypeCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <p className="text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <Button
              key={option}
              variant={selectedProjects.includes(option) ? "default" : "outline"}
              onClick={() => onSelect(option)}
              className="justify-start"
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 