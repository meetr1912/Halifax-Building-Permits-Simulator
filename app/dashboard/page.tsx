'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface Application {
  id: string
  type: string
  status: 'Pending' | 'Approved' | 'Rejected'
  submissionDate: string
}

interface Inspection {
  id: string
  type: string
  date: string
  status: 'Scheduled' | 'Completed' | 'Failed'
}

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [inspections, setInspections] = useState<Inspection[]>([])

  useEffect(() => {
    // In a real application, fetch this data from an API
    setApplications([
      { id: '1', type: 'Building Permit', status: 'Pending', submissionDate: '2023-06-01' },
      { id: '2', type: 'Deck Permit', status: 'Approved', submissionDate: '2023-05-15' },
    ])
    setInspections([
      { id: '1', type: 'Foundation Inspection', date: '2023-06-15', status: 'Scheduled' },
      { id: '2', type: 'Electrical Inspection', date: '2023-06-10', status: 'Completed' },
    ])
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Permit Applications</CardTitle>
          <CardDescription>View and manage your permit applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.type}</TableCell>
                  <TableCell>
                    <Badge variant={app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'destructive' : 'default'}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.submissionDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Inspections</CardTitle>
          <CardDescription>View your scheduled and completed inspections</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell>{inspection.type}</TableCell>
                  <TableCell>{inspection.date}</TableCell>
                  <TableCell>
                    <Badge variant={inspection.status === 'Completed' ? 'success' : inspection.status === 'Failed' ? 'destructive' : 'default'}>
                      {inspection.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

