import { GameState } from '../GameState'
import { GameView } from '../GameView'
import { addTileToReserve } from '../material/Board'
import { removeTileFromPile } from '../material/Pile'
import { Tile } from '../material/Tile'
import { Move } from './Move'
import { MoveType } from './MoveType'

export interface DrawTile {
  playerId: number
  position: number
  type: typeof MoveType.DrawTile
}

export type DrawTileView = DrawTile & {
  tile: Tile
}

export function drawTile(state: GameState, move: DrawTile) {
  addTileToReserve(state.players[move.playerId].reserve, removeTileFromPile(state.pile, move.position))
}

export function drawTileView(state: GameView, move: DrawTileView) {
  addTileToReserve(state.players[move.playerId].reserve, move.tile)
}

export function isDrawTile(move: Move): move is (DrawTile | DrawTileView) {
  return move.type === MoveType.DrawTile
}

export function isDrawTileView(move: DrawTile | DrawTileView): move is DrawTileView {
  return typeof (move as DrawTileView).tile !== 'undefined'
}

export default DrawTile
