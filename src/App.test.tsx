import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Home } from './views/Home'
import { DeepDive } from './views/DeepDive'

describe('Avarda core-banking thesis', () => {
  it('states the experience boundary honestly on the home page', () => {
    render(<Home />)

    expect(
      screen.getByText(/interacted with Corniche in a partner-bank context/i),
    ).toBeInTheDocument()
    expect(screen.getByText('Not owned')).toBeInTheDocument()
  })

  it('renders the complete eight-chapter deep dive', () => {
    const { container } = render(<DeepDive />)
    const chapterIds = ['context', 'model', 'explorer', 'mechanics', 'modernise', 'proof', 'operate', 'close']

    chapterIds.forEach((id) => expect(container.querySelector(`#${id}`)).toBeInTheDocument())
  })

  it('switches the financial-state explorer scenario', () => {
    render(<DeepDive />)

    fireEvent.click(screen.getByRole('button', { name: 'Refund' }))
    expect(screen.getByRole('heading', { name: 'Refund after a return' })).toBeInTheDocument()
    expect(screen.getByText(/€120 merchandise return/i)).toBeInTheDocument()
  })

  it('recomputes the modernisation outcome as evidence changes', () => {
    render(<DeepDive />)

    expect(screen.getByText('KEEP + WRAP')).toBeInTheDocument()
    const retirementGate = screen.getByRole('group', {
      name: 'Is the capability duplicated or no longer needed?',
    })
    fireEvent.click(retirementGate.querySelectorAll('button')[0])
    expect(screen.getByText('RETIRE')).toBeInTheDocument()
  })
})
