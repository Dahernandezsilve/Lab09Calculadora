/* eslint-disable react/function-component-definition */
import React from 'react'
import PropTypes from 'prop-types'
import { screenContainer, inputClass, outputClass } from './Screen.module.css'

const Screen = ({ numberInput, numberOutput }) => (
  <div className={screenContainer}>
    <span className={outputClass}>{numberOutput}</span>
    <span className={inputClass}>{numberInput}</span>
  </div>
)

Screen.propTypes = {
  numberInput: PropTypes.string.isRequired,
  numberOutput: PropTypes.string.isRequired,
}

export default Screen
