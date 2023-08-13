import React from 'react'

// import Game from './Game'
import MainLayout from './MainLayout'
import GameLayout from './GameLayout'
import PlayerInput from './PlayerInput'

const App = () => {
  return (
    <MainLayout>
      <GameLayout />
      <PlayerInput />
    </MainLayout>
  )
}

export default App
