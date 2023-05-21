/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('Renders correctly', () => {
    render(<Button />)
    screen.debug()
  })
})
