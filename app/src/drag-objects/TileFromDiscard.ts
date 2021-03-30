import Tile from "@gamepark/lucky-numbers/material/Tile";
import DragObjectType from "./DragObjectType";

export type TileFromDiscard = {
  tile: Tile
  type: typeof DragObjectType.TILE_FROM_DISCARD
  position: number
}

export function tileFromDiscard(tile: Tile, position: number): TileFromDiscard {
  return {type: DragObjectType.TILE_FROM_DISCARD, tile, position}
}

export default TileFromDiscard
