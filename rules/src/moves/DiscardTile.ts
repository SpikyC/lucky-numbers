import { GameState } from '../GameState'
import { GameView } from '../GameView'
import { nextPlayer } from '../LuckyNumbers'
import { removeTileFromReserve } from '../material/Board'
import { addTileToDiscard } from '../material/Discard'
import { Tile } from '../material/Tile'
import { Move } from './Move'
import { MoveType } from './MoveType'

export interface DiscardTile {
  playerId: number
  tile: Tile
  type: typeof MoveType.DiscardTile
}

export function discardTile(state: GameState | GameView, move: DiscardTile): void {
  addTileToDiscard(state.discard, removeTileFromReserve(state.players[move.playerId].reserve, move.tile))
  nextPlayer(state)
}

export function isDiscardTile(move: Move): move is DiscardTile {
  return move.type === MoveType.DiscardTile
}

export default DiscardTile
