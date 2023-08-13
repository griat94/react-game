import React from 'react'
import Box from '@mui/material/Box'

const MainLayout = (props: any) => {
  const { children } = props
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingX: 'auto',
        paddingY: '10rem',
      }}
    >
      {children}
    </Box>
  )
}

export default MainLayout
