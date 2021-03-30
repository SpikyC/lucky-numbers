/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameView } from '@gamepark/lucky-numbers/GameView'
import { discardTileMove } from '@gamepark/lucky-numbers/moves/DiscardTile'
import { Move } from '@gamepark/lucky-numbers/moves/Move'
import { Stage } from '@gamepark/lucky-numbers/Stage'
import { usePlayerId } from '@gamepark/react-client'
import { FunctionComponent } from 'react'
import { useDrop } from 'react-dnd'
import { DragObjectType } from '../../drag-objects/DragObjectType'
import { TileFromReserve } from '../../drag-objects/TileFromReserve'
import { OriginType } from '../../OriginType'
import { discardColorActive, discardColorHover, discardColorInactive, discardHeight, discardWidth } from '../../util/Styles'
import { Tile } from '../tile/Tile'

type Props = {
  game: GameView
}

export const Discard: FunctionComponent<Props> = ({ game: { discard, stage } }) => {
  const playerId = usePlayerId<number>()!
  const [{canDrop, isOver}, ref] = useDrop({
    accept: [
      DragObjectType.TILE_FROM_RESERVE,
    ],
    canDrop: () => {
      return stage === Stage.GAME
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    drop: (item: TileFromReserve): Move => {
      return discardTileMove(playerId, item.tile)
    }
  })

  return (
    <>
      <div className="discard" ref={ref} css={[style, canDrop && canDropStyle, canDrop && isOver && isOverStyle]}></div>
      {discard.map((tile, index) => tile && <Tile key={`Tile${tile.color}${tile.value}`} tile={tile} origin={OriginType.DISCARD} index={index} />)}
    </>
  )
}

const canDropStyle = css`
  background-color: ${discardColorHover};
  border-color: ${discardColorActive};

  &::before {
    color: ${discardColorActive};
  }
`

const isOverStyle = css`
  box-shadow: inset 0 0 20px 2px ${discardColorActive}, 0 0 20px 2px ${discardColorActive};
`

const style = css`
  border: 10px double ${discardColorInactive};
  border-radius: 100%;
  position: absolute;
  height: ${discardHeight}%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${discardWidth}%;

  &::before {
    color: ${discardColorInactive};
    content: '';
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) scale(5);
  }
`

export default Discard
