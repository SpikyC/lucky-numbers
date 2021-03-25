import { DiscardTile } from './DiscardTile'
import { DrawTile, DrawTileView } from './DrawTile'
import { PlaceFromDiscard } from './PlaceFromDiscard'
import { PlaceTile } from './PlaceTile'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
export type Move =
  | DiscardTile
  | DrawTile
  | PlaceFromDiscard
  | PlaceTile

export default Move

export type MoveView = Exclude<Move, DrawTile>
  | DrawTileView
