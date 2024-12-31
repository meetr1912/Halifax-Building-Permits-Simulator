import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Halifax Permit Finder</CardTitle>
          <CardDescription>Find the permits you need for your projects in Halifax</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Use our permit finder to determine which permits you need for your home improvement, construction, or development projects. Simply follow the decision tree, answer a few questions, and we'll provide you with a list of required permits and next steps.
          </p>
          <Link href="/permit-finder">
            <Button>Start Permit Finder</Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Returning Users</CardTitle>
          <CardDescription>Access your previous applications and inspection schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login">
            <Button variant="outline">Log In</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

