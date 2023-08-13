import React from 'react'
import { useSelector } from 'react-redux'

import Level from './Level'
import { Paper } from '@mui/material'
import { TOTAL_LEVELS } from './utils'

const GameLayout = () => {
  const { currentLevel } = useSelector((state: any) => state.input)

  const incompleteLevels = []
  const completedLevels = []

  for (let i = currentLevel; i < TOTAL_LEVELS; i++) {
    incompleteLevels.push(i)
  }

  for (let j = 0; j < currentLevel; j++) {
    completedLevels.push(j)
  }

  return (
    <Paper
      sx={{
        height: '30rem',
        width: '50rem',
        backgroundImage: 'linear-gradient(45deg, #cc9966 0%, #e6b280 100%)',
      }}
      elevation={24}
    >
      <div className='flex justify-evenly h-full items-center'>
        {completedLevels.map((index: number) => (
          <Level key={index * 100} variant='complete' />
        ))}
        {incompleteLevels.map((index: number) => (
          <Level key={index} variant='incomplete' />
        ))}
      </div>
    </Paper>
  )
}

export default GameLayout
