/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react'
import { create, all } from 'mathjs'
import { calculatorContainer, numberContainer, borderContainer } from './Calculator.module.css'
import Button from '../../components/Button/Button'
import Screen from '../../components/Screen/Screen'

const Calculator = () => {
  const config = {}
  const math = create(all, config)
  const [outPut, setOutPut] = useState('')
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')
  const [operate, setOperate] = useState(false)
  const [data, setData] = useState('')
  const [isNegativePressed, setIsNegativePressed] = useState(false)
  const handleNumber = (value) => {
    if (outPut === '-' || outPut === '+' || outPut === '*' || outPut === '%' || outPut === '/') {
      setOutPut('')
      setOperate(true)
    }
    if (value === '.') {
      if (outPut.includes('.')) {
        return // Evitar agregar más de un punto decimal
      }
    }
    if (outPut.length < 9) {
      setOutPut((prevValue) => prevValue + value)
      setExpression((prevExpression) => prevExpression + value)
      setResult((prevResult) => prevResult + value)
    } else if (operate) {
      setOutPut(value)
      setExpression((prevExpression) => prevExpression + value)
      setResult(value)
      setOperate(false)
    }
  }
  const handleClear = () => {
    setExpression('')
    setResult('')
    setOutPut('')
    setOperate(false)
  }

  const handleSymbol = (value) => {
    if (result === 'ERROR') {
      setResult('')
      setOutPut('')
      setExpression('')
      return
    }
    if (outPut === '+' || outPut === '%' || outPut === '/') {
      setResult('ERROR')
      return
    }
    if (value === '+/-') {
      const newOutPut = outPut.startsWith('-') ? `+${outPut.slice(1)}` : `-${outPut}`
      const newExpression = expression.replace(outPut, newOutPut)
      setOutPut(newOutPut)
      setData(newExpression)
      setIsNegativePressed(true)
      return
    }
    if (value === '=') {
      setOutPut(value)
      if (value === '-') {
        setExpression(data)
      } else {
        setExpression((prevValue) => prevValue + value)
      }
    }
    if (value === '.') {
      if (outPut.includes('.')) {
        return // Evitar agregar más de un punto decimal
      }
      // Agregar el punto decimal a las variables
      setOutPut((prevValue) => prevValue + value)
      setExpression((prevExpression) => prevExpression + value)
      setResult((prevResult) => prevResult + value)
    } else {
      setOutPut(value)
      const lastChar = expression.slice(-1)
      if (lastChar === '*' || lastChar === '/') {
        if (value === '-') {
          setExpression((prevValue) => `${prevValue}+${value}`)
        } else {
          setExpression((prevExpression) => prevExpression.slice(0, -1) + value)
        }
      } else {
        setExpression((prevExpression) => prevExpression + value)
      }
    }
  }

  const handleEqual = () => {
    if (isNegativePressed) {
      setExpression(data)
      setIsNegativePressed(false)
      setResult(data)
    } else {
      setExpression(outPut)
      setResult(outPut)
    }
  }

  const evaluateExpression = () => {
    if (
      expression.slice(-1) !== '+'
        && expression.slice(-1) !== '-'
        && expression.slice(-1) !== '*'
        && expression.slice(-1) !== '%'
        && expression.slice(-1) !== '/'
    ) {
      if (expression.slice(-1) !== '+') {
        const evaluatedResult = math.evaluate(expression)
        if (evaluatedResult > 999999999 || evaluatedResult < 0) {
          setResult('ERROR')
        } else {
          const formattedResult = typeof evaluatedResult === 'number' ? evaluatedResult.toFixed(9) : ''
          const trimmedResult = formattedResult.replace(/\.?0*$/, '')
          setResult(trimmedResult)
        }
      } else if (expression.slice(-1) !== '*') {
        const evaluatedResult = math.evaluate(expression)
        if (evaluatedResult > 999999999 || evaluatedResult < 0) {
          setResult('ERROR')
        } else {
          const formattedResult = typeof evaluatedResult === 'number' ? evaluatedResult.toFixed(9) : ''
          const trimmedResult = formattedResult.replace(/\.?0*$/, '')
          setResult(trimmedResult)
        }
      } else if (expression.slice(-1) !== '+/-') {
        setResult(outPut) // No calcula el resultado para la operación "+/-"
      }
    }
  }

  useEffect(() => {
    if (operate) {
      evaluateExpression()
    }
  }, [expression, operate, outPut, isNegativePressed])

  useEffect(() => {
    if (isNegativePressed) {
      evaluateExpression()
    }
  }, [isNegativePressed])

  return (
    <div className={calculatorContainer}>
      <div className={borderContainer}>
        <Screen numberInput={outPut} numberOutput={result} />
        <div className={numberContainer}>
          <Button
            character="C"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="red"
            fontSize="30px"
            handleButtonClick={handleClear}
          />
          <Button
            character="+/-"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#52cfc2"
            fontSize="30px"
            handleButtonClick={handleSymbol}
          />
          <Button
            character="%"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#52cfc2"
            fontSize="30px"
            handleButtonClick={handleSymbol}
          />
          <Button
            character="/"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#52cfc2"
            fontSize="30px"
            handleButtonClick={handleSymbol}
          />
          <Button
            character="7"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="8"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="9"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="*"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#52cfc2"
            fontSize="30px"
            handleButtonClick={handleSymbol}
          />
          <Button
            character="4"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="5"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="6"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="-"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#52cfc2"
            fontSize="30px"
            handleButtonClick={handleSymbol}
          />
          <Button
            character="1"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="2"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="3"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="+"
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#52cfc2"
            fontSize="30px"
            handleButtonClick={handleSymbol}
          />
          <div style={{ gridColumn: 'span 2' }}>
            <Button
              character="0"
              borderRadius="25px"
              width="140px"
              height="65px"
              color="#b79472"
              fontSize="30px"
              handleButtonClick={handleNumber}
            />
          </div>
          <Button
            character="."
            borderRadius="75px"
            width="65px"
            height="65px"
            color="#b79472"
            fontSize="30px"
            handleButtonClick={handleNumber}
          />
          <Button
            character="="
            borderRadius="75px"
            width="65px"
            height="65px"
            color="white"
            fontSize="30px"
            backgroundColor="#52cfc2"
            handleButtonClick={handleEqual}
          />
        </div>
      </div>
    </div>
  )
}

export default Calculator
