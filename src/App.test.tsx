import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Avarda core-banking thesis', () => {
  it('states the experience boundary clearly near the top', () => {
    render(<App />)

    expect(screen.getByText(/I have not personally administered an end-to-end Corniche implementation/i)).toBeInTheDocument()
    expect(screen.getByText('Not claimed')).toBeInTheDocument()
  })

  it('renders the complete eight-chapter journey', () => {
    const { container } = render(<App />)
    const chapterIds = ['context', 'model', 'explorer', 'mechanics', 'modernise', 'proof', 'operate', 'close']

    chapterIds.forEach((id) => expect(container.querySelector(`#${id}`)).toBeInTheDocument())
  })

  it('switches the financial-state explorer scenario', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Refund' }))
    expect(screen.getByRole('heading', { name: 'Refund after a return' })).toBeInTheDocument()
    expect(screen.getByText(/€120 merchandise return/i)).toBeInTheDocument()
  })

  it('recomputes the modernisation outcome as evidence changes', () => {
    render(<App />)

    expect(screen.getByText('KEEP + WRAP')).toBeInTheDocument()
    const retirementGate = screen.getByRole('group', {
      name: 'Is the capability duplicated or no longer needed?',
    })
    fireEvent.click(retirementGate.querySelectorAll('button')[0])
    expect(screen.getByText('RETIRE')).toBeInTheDocument()
  })
})
