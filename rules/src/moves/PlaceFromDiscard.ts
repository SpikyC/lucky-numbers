import { GameState } from '../GameState'
import { GameView } from '../GameView'
import { nextPlayer } from '../LuckyNumbers'
import { addTileToBoard } from '../material/Board'
import { addTileToDiscard, removeTileFromDiscard } from '../material/Discard'
import { Move } from './Move'
import { MoveType } from './MoveType'

export interface PlaceFromDiscard {
  playerId: number
  from: number
  to: number
  type: typeof MoveType.PlaceFromDiscard
}

export function isPlaceFromDiscard(move: Move): move is PlaceFromDiscard {
  return move.type === MoveType.PlaceFromDiscard
}

export function placeFromDiscard(state: GameState | GameView, move: PlaceFromDiscard) {
  const { discard, players } = state
  const { board } = players[move.playerId]

  addTileToDiscard(discard, addTileToBoard(board, removeTileFromDiscard(discard, move.from), move.to))
  nextPlayer(state)
}

export const placeFromDiscardMove = (playerId: number, from: number, to: number): PlaceFromDiscard => ({
  type: MoveType.PlaceFromDiscard,
  playerId,
  from,
  to,
})

export default PlaceFromDiscard
