import { GameState } from '../GameState'
import { GameView } from '../GameView'
import { nextPlayer } from '../LuckyNumbers'
import { addTileToBoard, removeTileFromReserve } from '../material/Board'
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
  const { board, reserve } = state.players[move.playerId]

  addTileToBoard(board, removeTileFromReserve(reserve, move.tile), move.position)
  nextPlayer(state)
}

export default PlaceTile
