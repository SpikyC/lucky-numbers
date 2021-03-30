/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import GameView from '@gamepark/lucky-numbers/GameView'
import { isActive } from '@gamepark/lucky-numbers/LuckyNumbers'
import { Player } from '@gamepark/lucky-numbers/Player'
import { useGame, usePlayerId } from '@gamepark/react-client'
import { FunctionComponent } from 'react'
import { OriginType } from '../../OriginType'
import { absoluteToRelative, boardHeight, boardWidth, playerOffsets } from '../../util/Styles'
import { Images } from '../Images'
import { Tile } from '../tile/Tile'
import { BoardSpace } from './BoardSpace'

type Props = {
  player: Player
  playerId: number
}

export const Board: FunctionComponent<Props> = ({ player, playerId }) => {
  const game = useGame<GameView>()!
  const userId = usePlayerId<number>()!

  const boardSpaces = Array(16).fill(undefined).map((_, index) => <BoardSpace key={`BoardSpace${index}`} index={index} />)

  return (
    <>
      <div className="board" css={[style, pictureStyle(), positionStyle(playerId, userId), isActive(game, playerId) && activeStyle]}>
        {userId === playerId && boardSpaces}
      </div>
      {player.reserve.map((tile, index) => tile && <Tile key={`Tile${tile.color}${tile.value}`} index={index} tile={tile} origin={OriginType.RESERVE} owner={playerId} />)}
      {player.board.map((tile, index) => tile && <Tile key={`Tile${tile.color}${tile.value}`} index={index} tile={tile} origin={OriginType.BOARD} owner={playerId} />)}
    </>
  )
}

const activeStyle = css`
`

const pictureStyle = () => css`
  background-image: url(${images.get('boardFace')});

  &::after {
    background-image: url(${images.get('boardBack')});
  }
`

const positionStyle = (playerId: number, userId: number) => {
  const corner = (playerId - userId) & 3
  const x = absoluteToRelative(boardWidth, playerOffsets[corner].left)
  const y = absoluteToRelative(boardHeight, playerOffsets[corner].top)

  return css`
    transform: translate(${x}%, ${y}%) rotateY(0deg);
    z-index: ${playerId};
  `
}

const style = css`
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 3.3%;
  height: ${boardHeight}%;
  left: 50%;
  position: absolute;
  transition: box-shadow .1s ease-in-out, filter .1s ease-in-out;
  transform-style: preserve-3d;
  transform-origin: center;
  top: 50%;
  width: ${boardWidth}%;

  &::after {
    background-repeat: no-repeat;
    background-size: contain;
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    transform: translateZ(-0.01rem) scaleX(-1);
    width: 100%;
  }
`

const images = new Map<string, string>()
images.set('boardBack', Images.boardBack)
images.set('boardFace', Images.boardFace)

export default Board
