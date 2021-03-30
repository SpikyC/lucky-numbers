/** @jsxImportSource @emotion/react */
import { css, /*keyframes*/ } from '@emotion/react'
import { GameView } from '@gamepark/lucky-numbers/GameView'
import { isActive } from '@gamepark/lucky-numbers/LuckyNumbers'
import { getLastTileFromReserve, isTileInReserve } from '@gamepark/lucky-numbers/material/Board'
// import { getNextAvailablePosition } from '@gamepark/lucky-numbers/material/Discard'
import { isTile, Tile as TileType } from '@gamepark/lucky-numbers/material/Tile'
import { TileColor } from '@gamepark/lucky-numbers/material/TileColor'
// import { DiscardTile, isDiscardTile } from '@gamepark/lucky-numbers/moves/DiscardTile'
import { /*DrawTile,*/ drawTileMove, /*isDrawTile*/ } from '@gamepark/lucky-numbers/moves/DrawTile'
// import { MoveType } from '@gamepark/lucky-numbers/moves/MoveType'
// import { isPlaceFromDiscard, PlaceFromDiscard } from '@gamepark/lucky-numbers/moves/PlaceFromDiscard'
// import { isPlaceTile, PlaceTile } from '@gamepark/lucky-numbers/moves/PlaceTile'
import { /*useAnimation,*/ useGame, usePlay, usePlayerId } from '@gamepark/react-client'
import { Draggable } from '@gamepark/react-components'
import { FunctionComponent } from 'react'
import { DragSourceHookSpec } from 'react-dnd'
import { tileFromDiscard } from '../../drag-objects/TileFromDiscard'
import { tileFromReserve } from '../../drag-objects/TileFromReserve'
import { OriginType } from '../../OriginType'
import { absoluteToRelative, boardOffsetLeft, boardOffsetTop, boardOffsetX, boardOffsetY, discardAmplitude, discardAngleOffset, discardOffset, goldenAngle, pileAmplitude, pileAngleOffset, pileOffset, playerOffsets, tileHeight, tileWidth } from '../../util/Styles'
import Images from '../Images'

type Props = {
  tile: TileType | true
  index: number
  origin: OriginType
  owner?: number
}

export const Tile: FunctionComponent<Props> = ({ index, tile, origin, owner }) => {
  const game = useGame<GameView>()!
  const play = usePlay()!
  const playerId = usePlayerId<number>()!
  const { reserve } = game.players[playerId]

  // const animation = useAnimation<DiscardTile | DrawTile | PlaceFromDiscard | PlaceTile, number>((animation) => {
  //   return isDrawTile(animation.move) || (animation.move.playerId !== playerId && (isDiscardTile(animation.move) || isPlaceFromDiscard(animation.move) || isPlaceTile(animation.move)))
  // })!

  // const getAnimation = animation ? (index: number) => {
  //   const move = animation.move

  //   switch (move.type) {
  //     case MoveType.DiscardTile: {
  //       if (move.playerId !== playerId) {
  //         const reserveIndex = game.players[move.playerId].reserve.findIndex((tile) => tile && tile.color === move.tile.color && tile.value === move.tile.value)
  //         const {x: reserveX, y: reserveY} = getPosition(OriginType.RESERVE, reserveIndex, (move.playerId - playerId) & 3)
  //         const {x: discardX, y: discardY} = getPosition(OriginType.DISCARD, getNextAvailablePosition(game.discard))
  //         const keyframe = keyframes`
  //           from {
  //             transform: translate(${reserveX}%, ${reserveY}%);
  //           }
  //           to {
  //             transform: translate(${discardX}%, ${discardY}%);
  //           }
  //         `
  //         return css`
  //           animation: ${keyframe} ${animation.duration}ms ease-in-out forwards;
  //           z-index: 10;
  //         `
  //       }
  //       break
  //     }
  //     case MoveType.DrawTile: {
  //       if (index === move.position) {
  //         const {x: pileX, y: pileY} = getPosition(OriginType.PILE, move.position)
  //         const {x: reserveX, y: reserveY} = getPosition(OriginType.RESERVE, game.players[move.playerId].reserve.indexOf(null), (move.playerId - playerId) & 3)
  //       const keyframe = keyframes`
  //         from {
  //           transform: translate(${pileX}%, ${pileY});
  //         }
  //         to {
  //           transform: translate(${reserveX}%, ${reserveY});
  //         }
  //       `
  //       return css`
  //         animation: ${keyframe} ${animation.duration}ms ease-in-out forwards;
  //         z-index: 10;
  //       `
  //       }
  //       break
  //     }
  //     case MoveType.PlaceFromDiscard: {
  //       if (move.playerId !== playerId) {
  //         const {x: discardX, y: discardY} = getPosition(OriginType.DISCARD, move.from)
  //         const {x: boardX, y: boardY} = getPosition(OriginType.BOARD, move.to, (move.playerId - playerId) & 3)
  //         const keyframe = keyframes`
  //           from {
  //             transform: translate(${discardX}%, ${discardY}%);
  //           }
  //           to {
  //             transform: translate(${boardX}%, ${boardY}%);
  //           }
  //         `
  //         return css`
  //           animation: ${keyframe} ${animation.duration}ms ease-in-out forwards;
  //           z-index: 10;
  //         `
  //       } else if(false) {

  //       }
  //       break
  //     }
  //     case MoveType.PlaceTile: {
  //       if (move.playerId !== playerId) {
  //         const reserveIndex = game.players[move.playerId].reserve.findIndex((tile) => tile && tile.color === move.tile.color && tile.value === move.tile.value)
  //         const {x: reserveX, y: reserveY} = getPosition(OriginType.RESERVE, reserveIndex, (move.playerId - playerId) & 3)
  //         const {x: boardX, y: boardY} = getPosition(OriginType.BOARD, move.position, (move.playerId - playerId) & 3)
  //         const keyframe = keyframes`
  //           from {
  //             transform: translate(${reserveX}%, ${reserveY}%);
  //           }
  //           to {
  //             transform: translate(${boardX}%, ${boardY}%);
  //           }
  //         `
  //         return css`
  //           animation: ${keyframe} ${animation.duration}ms ease-in-out forwards;
  //           z-index: 10;
  //         `
  //       }
  //       break
  //     }
  //   }

  //   return css``
  // } : (_index: any) => css``

  let draggable = false
  let item: DragSourceHookSpec<any, any, any>['item'] = { type: unknownTile };

  if (isTile(tile)) {
    switch (origin) {
      case OriginType.DISCARD:
        draggable = isActive(game, playerId) && !getLastTileFromReserve(reserve)
        item = tileFromDiscard(tile, index)
        break
      case OriginType.RESERVE:
        draggable = isActive(game, playerId) && isTileInReserve(reserve, tile)
        item = tileFromReserve(tile, index)
        break
    }
  }

  const {x, y} = [OriginType.DISCARD, OriginType.PILE].includes(origin) ? getPosition(origin as OriginType.DISCARD | OriginType.PILE, index) : getPosition(origin as OriginType.BOARD | OriginType.RESERVE, index, (owner! - playerId) & 3)
  const position = `translate(${x}%, ${y}%)`
  if (typeof tile === 'boolean') {
    return (
      <div
        css={[
          style,
          css`background-image: url(${images.get('cloverBack')}); cursor: pointer; transform: ${position};`,
          // getAnimation(index)
        ]}
        onClick={() => play(drawTileMove(playerId, index), { delayed: true })}
      ></div>
    )
  } else {
    return (
      <Draggable
        canDrag={() => draggable}
        css={[style, getPicture(tile), !draggable && css`pointer-events: none;`]}
        drop={play}
        item={item}
        postTransform={position}
      ></Draggable>
    )
  }
}

const style = css`
  background-size: contain;
  background-repeat: no-repeat;
  height: ${tileHeight}%;
  left: 50%;
  position: absolute;
  top: 50%;
  width: ${tileWidth}%;
  z-index: 5;
`

const unknownTile = Symbol()

const getPicture = (tile: TileType) => css`
  background-image: url(${images.get(JSON.stringify(tile))});
`

const images = new Map<string, string>()
images.set('cloverBack', Images.cloverBack)
for (let color in TileColor) {
  for (let value = 1; value <= 20; ++value) {
    images.set(JSON.stringify({ color, value }), Images[`clover${color}${value}`])
  }
}
export function getPosition(origin: OriginType.DISCARD | OriginType.PILE, index: number): {x: number, y: number}
export function getPosition(origin: OriginType.BOARD | OriginType.RESERVE, index: number, corner: number): {x: number, y: number}
export function getPosition(origin: OriginType, index: number, corner?: number): {x: number, y: number} {
  switch (origin) {
    case OriginType.BOARD: {
      const x = absoluteToRelative(tileWidth, playerOffsets[corner!].left + boardOffsetLeft + (index & 3) * (tileWidth + boardOffsetX))
      const y = absoluteToRelative(tileHeight, playerOffsets[corner!].top + boardOffsetTop + (index >> 2) * (tileHeight + boardOffsetY))
      return {x, y}
    }
    case OriginType.DISCARD: {
      const radius = discardAmplitude * index + discardOffset
      const angle = index * goldenAngle + discardAngleOffset
      const x = radius * Math.cos(angle) - 50
      const y = radius * Math.sin(angle) - 50
      return {x, y}
    }
    case OriginType.PILE: {
      const radius = pileAmplitude * index + pileOffset
      const angle = index * goldenAngle + pileAngleOffset
      const x = radius * Math.cos(angle) - 50
      const y = radius * Math.sin(angle) - 50
      return {x, y}
    }
    case OriginType.RESERVE: {
      const x = absoluteToRelative(tileWidth, playerOffsets[corner!].left + boardOffsetLeft + index * (tileWidth + boardOffsetX))
      const y = absoluteToRelative(tileHeight, playerOffsets[corner!].top - boardOffsetTop, -1)
      return {x, y}
    }
  }
  return {x: 0, y:0}
}

export default Tile
