import { GameState } from '../GameState'
import { GameView } from '../GameView'
import { nextPlayer } from '../LuckyNumbers'
import { addTileToBoard, removeTileFromReserve } from '../material/Board'
import { addTileToDiscard } from '../material/Discard'
import { Tile } from '../material/Tile'
import { Move } from './Move'
import { MoveType } from './MoveType'

export interface PlaceTile {
  playerId: number
  position: number
  tile: Tile
  type: typeof MoveType.PlaceTile
}

export function isPlaceTile(move: Move): move is PlaceTile {
  return move.type === MoveType.PlaceTile
}

export function placeTile(state: GameState | GameView, move: PlaceTile): void {
  const { discard, players } = state
  const { board, reserve } = players[move.playerId]

  addTileToDiscard(discard, addTileToBoard(board, removeTileFromReserve(reserve, move.tile), move.position))
  nextPlayer(state)
}

export const placeTileMove = (playerId: number, tile: Tile, position: number): PlaceTile => ({
  type: MoveType.PlaceTile,
  playerId,
  position,
  tile,
})

export default PlaceTile
