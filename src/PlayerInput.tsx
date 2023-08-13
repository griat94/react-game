import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@mui/material'
import { inputFailure, inputSuccess } from './redux/input'

const PlayerInput = () => {
  const dispatch = useDispatch()

  const [buttonColor, setButtonColor] = useState<string>('red')

  const getRandomDelay = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const resetTimer = () => {
    const changeToGreen = () => setButtonColor('green')
    const changeToRed = () => setButtonColor('red')
    const delay = getRandomDelay(500, 3500)

    if (buttonColor === 'red') {
      setTimeout(changeToGreen, delay)
    }
    if (buttonColor === 'green') {
      setTimeout(changeToRed, 325)
    }
  }

  useEffect(() => {
    resetTimer()
  })

  const handleButtonClick = () => {
    console.log('mouse has been clicked...')
    if (buttonColor === 'green') {
      dispatch(inputSuccess())
    }
    if (buttonColor === 'red') {
      resetTimer()
      dispatch(inputFailure())
    }
  }

  return (
    <Button
      sx={{
        width: 400,
        height: 150,
        marginY: '4rem',
        backgroundColor: buttonColor,
        '&:hover': {
          backgroundColor: buttonColor,
        },
      }}
      variant='contained'
      disableRipple
      onMouseDown={handleButtonClick}
    >
      Hit me when I change colour
    </Button>
  )
}

export default PlayerInput
