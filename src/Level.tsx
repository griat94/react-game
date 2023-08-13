import React from 'react'

import { Card } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

interface LevelProps {
  variant: 'complete' | 'incomplete'
}

const Level = ({ variant }: LevelProps) => {
  return (
    <Card
      sx={{
        background: 'rgba(255,255,255, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: 75,
        borderRadius: '5rem',
      }}
    >
      {variant === 'complete' && (
        <CheckCircleOutlineIcon
          sx={{ width: 75, height: 75 }}
          color='success'
        />
      )}
      {variant === 'incomplete' && (
        <CircleIcon sx={{ width: 75, height: 75 }} color='primary' />
      )}
    </Card>
  )
}

export default Level
