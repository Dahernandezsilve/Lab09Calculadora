/* eslint-disable react/function-component-definition */
import React from 'react'
import PropTypes from 'prop-types'
import { buttonForm } from './Button.module.css'

const Button = ({
  character, borderRadius, width, height, color, fontSize, backgroundColor, handleButtonClick,
}) => (
  <button
    className={buttonForm}
    style={{
      borderRadius,
      width,
      height,
      color,
      fontSize,
      backgroundColor,
    }}
    onClick={() => handleButtonClick(character)}
    type="button"
  >
    {character}
  </button>
)

Button.propTypes = {
  // eslint-disable-next-line react/require-default-props
  backgroundColor: PropTypes.string,
  character: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
}

export default Button
