import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  beforeEach(() => {
    render(<HomePage />)
  })

  it('renders the main heading', () => {
    const heading = screen.getByText('Halifax Permit Finder')
    expect(heading).toBeInTheDocument()
  })

  it('renders all project type cards', () => {
    expect(screen.getByText('New Construction')).toBeInTheDocument()
    expect(screen.getByText('Renovation')).toBeInTheDocument()
    expect(screen.getByText('Home Improvement')).toBeInTheDocument()
  })

  it('renders project options', () => {
    expect(screen.getByText('Single-unit dwelling')).toBeInTheDocument()
    expect(screen.getByText('Deck construction')).toBeInTheDocument()
    expect(screen.getByText('Structural changes')).toBeInTheDocument()
  })

  it('allows selecting and deselecting projects', async () => {
    const deckButton = screen.getByRole('button', { name: 'Deck construction' })
    
    // Select project
    fireEvent.click(deckButton)
    await waitFor(() => {
      expect(screen.getByText('Permit Details')).toBeInTheDocument()
    })
    
    // Deselect project
    fireEvent.click(deckButton)
    await waitFor(() => {
      expect(screen.queryByText('Permit Details')).not.toBeInTheDocument()
    })
  })

  it('shows correct permit information when project is selected', async () => {
    // Find and click the project selection button
    const buttons = screen.getAllByRole('button')
    const singleUnitButton = buttons.find(button => button.textContent === 'Single-unit dwelling')
    expect(singleUnitButton).toBeTruthy()
    
    if (singleUnitButton) {
      fireEvent.click(singleUnitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Permit Details')).toBeInTheDocument()
      })

      // Find and click the accordion trigger
      const accordionButtons = screen.getAllByRole('button')
      const accordionTrigger = accordionButtons.find(
        button => button.textContent?.includes('Single-unit dwelling') && button.textContent?.includes('▼')
      )
      expect(accordionTrigger).toBeTruthy()

      if (accordionTrigger) {
        fireEvent.click(accordionTrigger)

        await waitFor(() => {
          expect(screen.getByText('Site plan')).toBeInTheDocument()
          expect(screen.getByText('Architectural drawings')).toBeInTheDocument()
          expect(screen.getByText('Based on construction value (minimum $750)')).toBeInTheDocument()
        })
      }
    }
  })
}) 