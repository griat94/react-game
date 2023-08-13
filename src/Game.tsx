/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Container, Graphics, Stage } from '@pixi/react'
import { BlurFilter, FederatedPointerEvent } from 'pixi.js'
import { useEffect, useMemo, useState } from 'react'
// import { sound } from '@pixi/sound'
// import { getInverseColor, getRandomColor } from './utils'

export function getRandomColor(): number {
  // Generate random RGB values
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  // Convert to hexadecimal format
  return (r << 16) | (g << 8) | b
}

export function getInverseColor(color: number): number {
  // Parse the RGB components from the color
  const r = (color >> 16) & 0xff
  const g = (color >> 8) & 0xff
  const b = color & 0xff

  // Calculate the inverse RGB values
  const inverseR = 255 - r
  const inverseG = 255 - g
  const inverseB = 255 - b

  // Convert to hexadecimal format
  return (inverseR << 16) | (inverseG << 8) | inverseB
}

export interface ITile {
  index: number
  row: number
  col: number
  color: number
  active?: boolean
}

const gridSize = 10
const cellSize = 50
const gridWidth = gridSize * cellSize
const generatedTiles: ITile[] = []
// sound.add('pickup', 'fancy2.wav')
// sound.add('hurt', 'hurt.wav')

export const POINTS_PER_TILE = 100
let previousTile: undefined | ITile = undefined

export default function Game() {
  const randomColor = getRandomColor()
  // HACK: without this line, all mouse events are broken
  useMemo(() => new BlurFilter(0), [])

  useEffect(() => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const color =
          Math.random() > 0.5 ? randomColor : getInverseColor(randomColor)
        generatedTiles.push({
          index: row * gridSize + col,
          row,
          col,
          color,
          active: false,
        })
      }
    }

    setGameTiles([...generatedTiles])
  }, [])

  const [streak, setStreak] = useState(0)
  const [score, setScore] = useState(0)
  const [bestScore, setBestcore] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [gameTiles, setGameTiles] = useState<ITile[]>([])

  function handleCollect(tile: ITile) {
    // is this the first tile? if so, increase the streak and set the previousTile to this tile
    if (!previousTile) {
      increaseStreak()
      previousTile = tile
      updateInstance(tile)
      return
    }

    // ignore any event that happens on the same tile back to back
    if (previousTile.index === tile.index) return

    // is this tile already active? if so, cancel the streak and play hurt
    if (tile.active) {
      playHurt()
      resetStreak()
      previousTile = tile
      return
    }

    // increase streak if the colors match, otherwise reset the streak
    if (previousTile.color === tile.color) {
      increaseStreak()
    } else {
      if (streak > 1) playHurt()
      increaseStreak()
    }

    // update tile instance
    updateInstance(tile)

    // set previous tile to this tile for the next event
    previousTile = tile
  }

  function increaseStreak() {
    const newStreak = streak + 1
    // void sound.play('pickup', { speed: 1 + newStreak / 20 })
    if (newStreak > bestStreak) setBestStreak(newStreak)
    setStreak(newStreak)
  }

  function updateInstance(tile: ITile) {
    const tilesCopy = [...gameTiles]
    const foundInstance = tilesCopy.find(
      (t) => t.row === tile.row && t.col === tile.col
    )
    if (foundInstance) {
      const instanceCopy = { ...foundInstance, active: true }
      tilesCopy.splice(tilesCopy.indexOf(foundInstance), 1, instanceCopy)
      setGameTiles(tilesCopy)
    }
  }

  function checkForGameOver() {
    if (gameTiles.every((t) => t.active)) {
      setPlaying(false)
      if (score > bestScore) setBestcore(score)
    }
  }

  function handleCollectStart(tile: ITile, e: FederatedPointerEvent) {
    if ((e as unknown as any).nativeEvent.buttons <= 0) return
    handleCollect(tile)
  }

  function handleCollectEnd() {
    setScore(score + streak * POINTS_PER_TILE * streak)
    resetStreak()
    checkForGameOver()
  }

  function playHurt() {
    // void sound.play('hurt', { speed: 1 + streak / 20 })
  }

  function resetStreak() {
    setStreak(0)
  }

  return (
    <>
      <h1>{playing ? 'Playing' : 'Paused'}</h1>
      <h2>
        Streak {streak} / {bestStreak} | Score {score.toLocaleString()} /{' '}
        {bestScore > score
          ? bestScore.toLocaleString()
          : score.toLocaleString()}
      </h2>
      <button
        onClick={() => {
          setGameTiles([...generatedTiles])
          setStreak(0)
          setScore(0)
          if (score > bestScore) setBestcore(score)
          setPlaying(true)
        }}
      >
        Reset
      </button>
      <br />
      <br />
      <Stage width={gridWidth} height={gridWidth} options={{ antialias: true }}>
        <Container width={gridWidth} height={gridWidth}>
          {gameTiles.map((tile: ITile) => (
            <Graphics
              alpha={tile.active ? 0 : 1}
              interactive={true}
              ontouchstart={(e: FederatedPointerEvent) => {
                handleCollectStart(tile, e)
              }}
              ontouchmove={(e: FederatedPointerEvent) => {
                handleCollectStart(tile, e)
              }}
              ontouchend={() => {
                handleCollectEnd()
              }}
              onmousedown={(e: FederatedPointerEvent) => {
                handleCollectStart(tile, e)
              }}
              onmousemove={(e: FederatedPointerEvent) => {
                handleCollectStart(tile, e)
              }}
              onmouseup={() => {
                handleCollectEnd()
              }}
              key={`${tile.row}-${tile.col}`}
              x={tile.col * cellSize}
              y={tile.row * cellSize}
              width={cellSize}
              height={cellSize}
              draw={(g) => {
                g.clear()
                g.beginFill(tile.color)
                // g.lineStyle(1, 0x000000);
                // g.drawRect(0, 0, cellSize, cellSize);
                g.drawRoundedRect(0, 0, cellSize, cellSize, 10)
                g.endFill()
              }}
            />
          ))}
        </Container>
      </Stage>
    </>
  )
}
