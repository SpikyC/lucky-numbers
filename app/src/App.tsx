/** @jsxImportSource @emotion/react */
import { GameView } from '@gamepark/lucky-numbers/GameView'
import { useGame } from '@gamepark/react-client'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import { GameDisplay } from './GameDisplay'
import { Header } from './Header'
import GameBox from './material/gamebox-en.png'
import { LoadingScreen } from './util/LoadingScreen'

export function App() {
  const game = useGame<GameView>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed
  return (
    <DndProvider options={HTML5ToTouch}>
      <LoadingScreen gameBox={GameBox} author="Michael Schacht" artist="Christine Alcouffe" publisher="TIKI Editions" display={loading} />
      {game && <GameDisplay game={game}/>}
      <Header loading={loading} game={game}/>
    </DndProvider>
  )
}

export default App
