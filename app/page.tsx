"use client";

import { useState } from "react";
import { Building2, HomeIcon, Wrench } from "lucide-react";
import ProjectTypeCard from "@/components/ProjectTypeCard";
import PermitDetails from "@/components/PermitDetails";

export default function HomePage() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const projectTypes = [
    {
      title: "New Construction",
      icon: <Building2 size={48} />,
      description: "Start a new building project from the ground up",
      options: ["Single-unit dwelling", "Triplex", "Townhouse"],
    },
    {
      title: "Renovation",
      icon: <Wrench size={48} />,
      description: "Modify or upgrade existing structures",
      options: [
        "Structural changes",
        "Plumbing/Electrical changes",
        "Adding a secondary suite",
      ],
    },
    {
      title: "Home Improvement",
      icon: <HomeIcon size={48} />,
      description: "Enhance your property with additions",
      options: [
        "Deck construction",
        "Fence installation",
        "Swimming pool installation",
        "Accessory structure",
      ],
    },
  ];

  const handleProjectSelect = (project: string) => {
    setSelectedProjects((prev) =>
      prev.includes(project)
        ? prev.filter((p) => p !== project)
        : [...prev, project]
    );
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Halifax Permit Finder</h1>
          <p className="text-xl text-gray-600">
            Simplify your permit application process for construction and home
            improvement projects
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {projectTypes.map((type) => (
            <ProjectTypeCard
              key={type.title}
              {...type}
              onSelect={handleProjectSelect}
              selectedProjects={selectedProjects}
            />
          ))}
        </div>

        {selectedProjects.length > 0 && (
          <PermitDetails selectedProjects={selectedProjects} />
        )}
      </div>
    </main>
  );
}
