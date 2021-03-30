import Tile from "@gamepark/lucky-numbers/material/Tile";
import DragObjectType from "./DragObjectType";

export type TileFromReserve = {
  tile: Tile
  type: typeof DragObjectType.TILE_FROM_RESERVE
  position: number
}

export function tileFromReserve(tile: Tile, position: number): TileFromReserve {
  return {type: DragObjectType.TILE_FROM_RESERVE, tile, position}
}

export default TileFromReserve
