import { GameView } from '@gamepark/lucky-numbers/GameView'
import { MoveView } from '@gamepark/lucky-numbers/moves/Move'
import { MoveType } from '@gamepark/lucky-numbers/moves/MoveType'
import { Animations } from '@gamepark/react-client'

export const LuckyNumbersAnimations: Animations<GameView, MoveView> = {
  getAnimationDuration(move: MoveView, {displayState: displayedPlayerId}) {
    switch (move.type) {
      case MoveType.DiscardTile:
      case MoveType.PlaceFromDiscard:
      case MoveType.PlaceTile:
        return move.playerId === displayedPlayerId ? 1000 : 0
      case MoveType.DrawTile:
        return 1000
      default:
        return 0
    }
  },
  getUndoAnimationDuration(move: MoveView) {
    switch (move.type) {
      case MoveType.PlaceTile:
        return 1000
      default:
        return 0
    }
  }
}

export default LuckyNumbersAnimations
