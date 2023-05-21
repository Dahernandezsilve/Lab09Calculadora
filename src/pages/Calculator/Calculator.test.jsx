/* eslint-disable no-undef */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from './Calculator'

describe('Calculator', () => {
  it('Renders correctly', () => {
    render(<Calculator />)
  })
  it('Calculate 2 + 2 -> 4', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    const spanElement = screen.getByText('4', { selector: 'span' })
    expect(spanElement).toBeInTheDocument()
  })
  it('Calculate 2 / 0 -> ERROR', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('2', { selector: 'button' }))
    fireEvent.click(screen.getByText('/', { selector: 'button' }))
    fireEvent.click(screen.getByText('0', { selector: 'button' }))
    expect(screen.getAllByText('ERROR', { selector: 'span' })[0]).toBeInTheDocument()
  })
  it('Calculate 6 - 2 -> 4 Press +/- and then = 8', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('6', { selector: 'button' }))
    fireEvent.click(screen.getByText('-', { selector: 'button' }))
    fireEvent.click(screen.getByText('2', { selector: 'button' }))
    fireEvent.click(screen.getByText('+/-', { selector: 'button' }))
    fireEvent.click(screen.getByText('=', { selector: 'button' }))
    expect(screen.getAllByText('8', { selector: 'span' })[0]).toBeInTheDocument()
  })
  it('Show "ERROR" for numbers > 999999999', () => {
    render(<Calculator />)
    const bigNumber = screen.getByText('9', { selector: 'button' })
    for (let i = 0; i < 9; i += 1) {
      fireEvent.click(bigNumber)
    }
    fireEvent.click(screen.getByText('+', { selector: 'button' }))
    fireEvent.click(screen.getByText('1', { selector: 'button' }))
    expect(screen.getAllByText('ERROR', { selector: 'span' })[0]).toBeInTheDocument()
  })
  it('Show "ERROR" for negative numbers', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('0', { selector: 'button' }))
    fireEvent.click(screen.getByText('-', { selector: 'button' }))
    fireEvent.click(screen.getByText('1', { selector: 'button' }))
    expect(screen.getAllByText('ERROR', { selector: 'span' })[0]).toBeInTheDocument()
  })
  it('Does not allow multiple zeros to the right after the decimal point after click an operation', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('1', { selector: 'button' }))
    fireEvent.click(screen.getByText('.', { selector: 'button' }))
    fireEvent.click(screen.getByText('0', { selector: 'button' }))
    fireEvent.click(screen.getByText('1', { selector: 'button' }))
    fireEvent.click(screen.getByText('+', { selector: 'button' }))
    fireEvent.click(screen.getByText('0', { selector: 'button' }))
    fireEvent.click(screen.getByText('.', { selector: 'button' }))
    fireEvent.click(screen.getByText('0', { selector: 'button' }))
    fireEvent.click(screen.getByText('9', { selector: 'button' }))
    expect(screen.getAllByText('1.1', { selector: 'span' })[0]).toBeInTheDocument()
  })
  it('Calculate 9 % 5 = 4', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('9', { selector: 'button' }))
    fireEvent.click(screen.getByText('%', { selector: 'button' }))
    fireEvent.click(screen.getByText('5', { selector: 'button' }))
    expect(screen.getAllByText('4', { selector: 'span' })[0]).toBeInTheDocument()
  })
  it('Functionality of clean screen (Press the C button)', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('9', { selector: 'button' }))
    fireEvent.click(screen.getByText('9', { selector: 'button' }))
    fireEvent.click(screen.getByText('9', { selector: 'button' }))
    fireEvent.click(screen.getByText('*', { selector: 'button' }))
    fireEvent.click(screen.getByText('5', { selector: 'button' }))
    fireEvent.click(screen.getByText('C', { selector: 'button' }))
    expect(screen.getAllByText('', { selector: 'span' })[0]).toBeInTheDocument()
    expect(screen.getAllByText('', { selector: 'span' })[1]).toBeInTheDocument()
  })
})
