import { TileColor } from './TileColor'

export type Tile = {
  color: TileColor
  value: number
}

export function isTile(tile: any): tile is Tile {
  return tile && tile.color && tile.value
}

export default Tile
