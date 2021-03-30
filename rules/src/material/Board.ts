import { Tile, isTile } from './Tile'

export type Board = (Tile | null)[]

export type Reserve = (Tile | null)[]

export function addTileToBoard(board: Board, tile: Tile, position: number): Tile | null {
  const oldValue = board[position]
  board[position] = tile
  return oldValue
}

export function addTileToReserve(reserve: Reserve, tile: Tile): void {
  const index = reserve.indexOf(null)
  if (~index) {
    reserve.splice(index, 1, tile)
  } else {
    reserve.push(tile)
  }
}

export function isComplete(board: Board): boolean {
  return board.filter(isTile).length === 16
}

export function isTileInReserve(reserve: Reserve, {color, value}: Tile): boolean {
  return reserve.some((tile) => tile && tile.color === color && tile.value === value)
}

export function isValid(board: Board): boolean {
  let valid = true

  for (let row = 0; row < 4;) {
    valid = board.slice(row * 4, ++row * 4).filter(isTile).every(({value}, index, array) => value < (array[index + 1]?.value ?? Infinity))
    if (!valid) {
      return false
    }
  }

  const transposed = board.map((_, index) => board[(index & 3) * 4 + (index >> 2)])

  for (let column = 0; column < 4;) {
    valid = (transposed.slice(column * 4, ++column * 4).filter(isTile) as Tile[]).every(({value}, index, array) => value < (array[index + 1]?.value ?? Infinity))
    if (!valid) {
      return false
    }
  }
  return true
}

export function getBoardSize(board: Board): number {
  return board.filter(isTile).length
}

export function getBoardTiles(board: Board): Board {
  return board.filter(isTile)
}

export function getLastTileFromReserve(reserve: Reserve): Tile {
  const tiles = reserve.filter(isTile)
  return tiles[tiles.length - 1]
}

export function getReserveLength(reserve: Reserve): number {
  return reserve.filter(isTile).length
}

export function removeTileFromReserve(reserve: Reserve, tile: Tile): Tile {
  const index = reserve.findIndex((element) => element && element.color === tile.color && element.value === tile.value)
  reserve[index] = null
  return tile
}

export default Board
