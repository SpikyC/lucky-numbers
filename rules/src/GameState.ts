import { Discard } from './material/Discard'
import { Pile } from './material/Pile'
import { Player } from './Player'
import { Stage } from './Stage'

/**
 * In here, you describe what a GameState will look like at any time during a game.
 */
export type GameState = {
  activePlayer: number
  discard: Discard
  pile: Pile
  players: Player[]
  stage: Stage
}

export default GameState
