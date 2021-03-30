import { Game } from '@gamepark/rules-api'
import { GameView } from './GameView'
import { discardTile } from './moves/DiscardTile'
import { drawTileView } from './moves/DrawTile'
import { MoveView } from './moves/Move'
import { MoveType } from './moves/MoveType'
import { placeFromDiscard } from './moves/PlaceFromDiscard'
import { placeTile } from './moves/PlaceTile'

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
export class LuckyNumbersView implements Game<GameView, MoveView> {
  state: GameView

  constructor(state: GameView) {
    this.state = state
  }

  /**
   * This is where a move is reproduced on the browser of a player. Most move will be treated the exact same way on both server and client side,
   * however some moves, that involved hiding information or discovering hidden information, will receive a different treatment than in the main rules class.
   *
   * @param move The move that must be applied in the browser of the player or the spectator
   */
  play(move: MoveView): void {
    console.log({...move, origin: 'client'});
    switch (move.type) {
      case MoveType.DiscardTile:
        return discardTile(this.state, move)
      case MoveType.DrawTile:
        return drawTileView(this.state, move)
      case MoveType.PlaceFromDiscard:
        return placeFromDiscard(this.state, move)
      case MoveType.PlaceTile:
        return placeTile(this.state, move)
    }
  }
}

export default LuckyNumbersView
