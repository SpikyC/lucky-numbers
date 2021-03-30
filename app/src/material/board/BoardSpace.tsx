/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameView } from '@gamepark/lucky-numbers/GameView'
import { isValid } from '@gamepark/lucky-numbers/material/Board'
import Move from '@gamepark/lucky-numbers/moves/Move'
import { placeFromDiscardMove } from '@gamepark/lucky-numbers/moves/PlaceFromDiscard'
import { placeTileMove } from '@gamepark/lucky-numbers/moves/PlaceTile'
import Stage from '@gamepark/lucky-numbers/Stage'
import { useGame, usePlayerId } from '@gamepark/react-client'
import { FunctionComponent } from 'react'
import { useDrop } from 'react-dnd'
import { DragObjectType } from '../../drag-objects/DragObjectType'
import { TileFromDiscard } from '../../drag-objects/TileFromDiscard'
import { TileFromReserve } from '../../drag-objects/TileFromReserve'
import { boardRelativeOffsetLeft, boardRelativeOffsetTop, boardRelativeOffsetX, boardRelativeOffsetY, tileRelation } from '../../util/Styles'

type Props = {
  index: number
} & React.HTMLAttributes<HTMLDivElement>

export const BoardSpace: FunctionComponent<Props> = ({ index, ...props }) => {
  const { players, stage } = useGame<GameView>()!
  const playerId = usePlayerId<number>()!
  const [{ canDrop, isOver }, ref] = useDrop({
    accept: [
      DragObjectType.TILE_FROM_DISCARD,
      DragObjectType.TILE_FROM_RESERVE,
    ],
    canDrop: (item: TileFromDiscard | TileFromReserve): boolean => {
      switch (stage) {
        case Stage.SETUP: {
          const { board } = players[playerId]
          return [0, 5, 10, 15].includes(index) && !board[index]
        }
        case Stage.GAME: {
          const board = players[playerId].board.slice()
          board[index] = item.tile
          return isValid(board)
        }
      }
      return false
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    drop: (item: TileFromDiscard | TileFromReserve): Move => {
      switch (item.type) {
        case DragObjectType.TILE_FROM_DISCARD:
          return placeFromDiscardMove(playerId, item.position, index)
        case DragObjectType.TILE_FROM_RESERVE:
          return placeTileMove(playerId, item.tile, index)
      }
    }
  })

  return <div ref={ref} css={[style, positionStyle(index), canDrop && canDropStyle, canDrop && isOver && isOverStyle]} {...props}></div>
}

const canDropStyle = css`
  background-color: white;
`

const isOverStyle = css`
  background-color: goldenrod;
`

const positionStyle = (index: number) => css`
  left: ${(boardRelativeOffsetLeft + (index & 3) * (tileRelation + boardRelativeOffsetX)) * 100}%;
  top: ${(boardRelativeOffsetTop + (index >> 2) * (tileRelation + boardRelativeOffsetY)) * 100}%;
`

const style = css`
  // background-image: url();
  background-size: contain;
  background-repeat: no-repeat;
  height: ${tileRelation * 100}%;
  position: absolute;
  width: ${tileRelation * 100}%;
`

export default BoardSpace
