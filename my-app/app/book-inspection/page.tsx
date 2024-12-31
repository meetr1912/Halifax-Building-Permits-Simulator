'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function BookInspection() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState('')

  const handleBooking = () => {
    if (date && timeSlot) {
      alert(`Inspection booked for ${date.toDateString()} at ${timeSlot}`)
    } else {
      alert('Please select both a date and time slot')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Inspection</CardTitle>
        <CardDescription>Select a date and time for your permit inspection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <Select onValueChange={setTimeSlot}>
            <SelectTrigger>
              <SelectValue placeholder="Select time slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00 AM">09:00 AM</SelectItem>
              <SelectItem value="11:00 AM">11:00 AM</SelectItem>
              <SelectItem value="02:00 PM">02:00 PM</SelectItem>
              <SelectItem value="04:00 PM">04:00 PM</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleBooking} className="w-full">Book Inspection</Button>
        </div>
      </CardContent>
    </Card>
  )
}

