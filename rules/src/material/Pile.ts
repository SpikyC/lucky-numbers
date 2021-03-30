import shuffle from '../util/shuffle'
import { Tile } from './Tile'
import { TileColor } from './TileColor'

export type Pile = Tile[]

export function initializePile(players: number): Tile[] {
  const colors = shuffle(Object.keys(TileColor)).slice(0, players) as TileColor[]
  return shuffle<Tile>(Array(20 * players).fill(undefined).map((_, i) => ({
    color: colors[(i / 5) >> 2],
    value: (i % 20) + 1,
  })))
}

export function removeTileFromPile<P = Tile | null | boolean>(pile: P[], position: number): P {
  const tile = pile[position]
  delete pile[position]
  return tile
}

export default Pile
