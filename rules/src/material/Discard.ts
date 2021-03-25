import { Tile } from "./Tile";

export type Discard = (Tile | null)[]

export function addTileToDiscard(discard: Discard, tile: Tile): void {
  const index = discard.indexOf(null)
  if (~index) {
    discard.splice(index, 1, tile)
  } else {
    discard.push(tile)
  }
}

export function removeTileFromDiscard(discard: Discard, position: number): Tile {
  const tile = discard[position]!
  delete discard[position]
  return tile
}

export default Discard
