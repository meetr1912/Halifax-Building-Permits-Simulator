import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    const heading = screen.getByText('Welcome to Halifax Permit Finder')
    expect(heading).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<HomePage />)
    const description = screen.getByText(/Find the permits you need for your projects in Halifax/i)
    expect(description).toBeInTheDocument()
  })
}) 