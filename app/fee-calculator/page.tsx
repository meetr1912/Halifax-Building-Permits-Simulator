'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function FeeCalculator() {
  const [constructionValue, setConstructionValue] = useState('')
  const [fee, setFee] = useState(0)

  const calculateFee = () => {
    const value = parseFloat(constructionValue)
    if (isNaN(value)) {
      setFee(0)
    } else {
      // This is a simplified fee calculation. Adjust according to actual Halifax fee structure.
      setFee(Math.max(50, value * 0.01))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permit Fee Calculator</CardTitle>
        <CardDescription>Estimate your permit fees based on construction value</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="constructionValue">Construction Value ($)</Label>
            <Input
              id="constructionValue"
              type="number"
              value={constructionValue}
              onChange={(e) => setConstructionValue(e.target.value)}
              placeholder="Enter construction value"
            />
          </div>
          <Button onClick={calculateFee}>Calculate Fee</Button>
          {fee > 0 && (
            <div className="mt-4">
              <p className="font-semibold">Estimated Fee: ${fee.toFixed(2)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

