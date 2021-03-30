import { isTile, Tile } from './Tile'

export type Discard = (Tile | null)[]

export function addTileToDiscard(discard: Discard, tile: Tile | null): void {
  if (!isTile(tile)) {
    return;
  }

  const index = discard.indexOf(null)
  if (~index) {
    discard.splice(index, 1, tile)
  } else {
    discard.push(tile)
  }
}

export function getNextAvailablePosition(discard: Discard): number {
  const index = discard.indexOf(null)
  return ~index ? index : discard.length
}

export function removeTileFromDiscard(discard: Discard, position: number): Tile {
  const tile = discard[position]!
  delete discard[position]
  return tile
}

export default Discard
