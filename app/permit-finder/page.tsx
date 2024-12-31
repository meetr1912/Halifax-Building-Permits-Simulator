'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { CalendarCheck, Trash2 } from 'lucide-react'
import Link from 'next/link'

const projectTypes = [
  { id: 'newConstruction', label: 'New Construction' },
  { id: 'renovation', label: 'Renovation' },
  { id: 'homeImprovement', label: 'Home Improvement' },
  { id: 'demolition', label: 'Demolition' },
  { id: 'landscaping', label: 'Landscaping and Grading' },
]

const questions = {
  newConstruction: {
    question: 'What type of new construction?',
    options: [
      'Single-unit dwelling, triplex, or townhouse',
      'Multi-unit building',
      'Commercial or industrial building',
    ],
  },
  renovation: {
    question: 'What type of renovation?',
    options: [
      'Structural changes',
      'Changes to plumbing, electrical, or mechanical systems',
      'Adding a secondary suite or backyard suite',
      'Converting a basement into a livable space',
      'Replacing windows or doors without altering the structure',
    ],
  },
  homeImprovement: {
    question: 'What type of home improvement?',
    options: [
      'Deck Construction',
      'Fence Installation',
      'Swimming Pool Installation',
      'Accessory Structure (Garage/Shed)',
      'Driveway Expansion',
      'Solar Panel Installation',
    ],
  },
  demolition: {
    question: 'Are you removing a structure (e.g., house, garage, shed)?',
    options: ['Yes', 'No'],
  },
  landscaping: {
    question: 'Are you altering the lot grading or drainage?',
    options: ['Yes', 'No'],
  },
}

export default function PermitFinder() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [requiredPermits, setRequiredPermits] = useState<string[]>([])

  const handleProjectSelection = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    )
  }

  const handleAnswer = (projectId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [projectId]: answer }))
  }

  const handleSubmit = () => {
    const permits: string[] = []
    selectedProjects.forEach((projectId) => {
      const answer = answers[projectId]
      switch (projectId) {
        case 'newConstruction':
          if (answer === 'Single-unit dwelling, triplex, or townhouse') {
            permits.push('Building Permit')
          } else if (answer === 'Multi-unit building') {
            permits.push('Building Permit', 'Development Permit')
          } else if (answer === 'Commercial or industrial building') {
            permits.push('Building Permit', 'Zoning Approval')
          }
          break
        case 'renovation':
          if (answer !== 'Replacing windows or doors without altering the structure') {
            permits.push('Building Permit')
          }
          break
        case 'homeImprovement':
          if (answer === 'Deck Construction') permits.push('Deck Permit')
          if (answer === 'Fence Installation') permits.push('Fence Permit')
          if (answer === 'Swimming Pool Installation') permits.push('Swimming Pool Permit')
          if (answer === 'Accessory Structure (Garage/Shed)') permits.push('Building Permit')
          if (answer === 'Driveway Expansion') permits.push('Driveway Permit')
          if (answer === 'Solar Panel Installation') permits.push('Building Permit')
          break
        case 'demolition':
          if (answer === 'Yes') permits.push('Demolition Permit')
          break
        case 'landscaping':
          if (answer === 'Yes') permits.push('Lot Grading Permit')
          break
      }
    })
    setRequiredPermits([...new Set(permits)])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Halifax Permit Finder</CardTitle>
          <CardDescription>Select your project types and answer the questions to determine required permits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectTypes.map((project) => (
              <div key={project.id} className="flex items-center space-x-2">
                <Checkbox
                  id={project.id}
                  checked={selectedProjects.includes(project.id)}
                  onCheckedChange={() => handleProjectSelection(project.id)}
                />
                <Label htmlFor={project.id}>{project.label}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedProjects.map((projectId) => (
        <Card key={projectId}>
          <CardHeader>
            <CardTitle>{projectTypes.find((p) => p.id === projectId)?.label}</CardTitle>
            <CardDescription>{questions[projectId as keyof typeof questions].question}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={(value) => handleAnswer(projectId, value)} value={answers[projectId] || ''}>
              {questions[projectId as keyof typeof questions].options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${projectId}-${option}`} />
                  <Label htmlFor={`${projectId}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      {selectedProjects.length > 0 && (
        <Button onClick={handleSubmit}>Determine Required Permits</Button>
      )}

      {requiredPermits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Required Permits</CardTitle>
            <CardDescription>Based on your selections, you may need the following permits:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {requiredPermits.map((permit) => (
                <li key={permit}>{permit}</li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="space-y-4">
              <Link href="/fee-calculator">
                <Button variant="outline" className="w-full">Calculate Fees</Button>
              </Link>
              <Link href="/book-inspection">
                <Button variant="outline" className="w-full">
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Book Inspection
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

