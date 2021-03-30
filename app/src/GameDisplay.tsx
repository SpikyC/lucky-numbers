/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { GameView } from '@gamepark/lucky-numbers/GameView'
import { Letterbox } from '@gamepark/react-components'
import { Board } from './material/board/Board'
import { Discard } from './material/discard/Discard'
import { Pile } from './material/pile/Pile'

type Props = {
  game: GameView
}

export function GameDisplay({game}: Props) {
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <div css={css`
        font-size: 3rem;
        height: 100%;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        `}
      >
        <Pile game={game} />
        <Discard game={game} />
        {game.players.map((player, index) => <Board key={`Board${index}`} player={player} playerId={index} />)}
      </div>
    </Letterbox>
  )
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const letterBoxStyle = css`
  animation: ${fadeIn} 3s ease-in forwards;
`

export default GameDisplay
