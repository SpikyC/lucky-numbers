export const screenRatio = 16 / 9

export const boardHeight = 33
export const boardRatio = 1 / 1
export const boardWidth = boardHeight * boardRatio / screenRatio
export const boardRelativeOffsetLeft = 0.0475 // 126 / 2653
export const boardRelativeOffsetTop = 0.053 // 141 / 2653
export const boardRelativeOffsetX = 0.0335 // 89 / 2653
export const boardRelativeOffsetY = 0.0298 // 79 / 2653
export const boardOffsetLeft = boardWidth * boardRelativeOffsetLeft
export const boardOffsetTop = boardHeight * boardRelativeOffsetTop
export const boardOffsetX = boardWidth * boardRelativeOffsetX
export const boardOffsetY = boardHeight * boardRelativeOffsetY

export const discardColorActive = 'rgb(100% 0% 0% / 100%)'
export const discardColorHover = 'rgb(100% 0% 0% / 50%)'
export const discardColorInactive = 'rgb(100% 50% 50% / 50%)'
export const discardHeight = 45
export const discardRatio = 1 / 1
export const discardWidth = discardHeight * discardRatio / screenRatio

export const tileRelation = 0.201 // 533 / 2653
export const tileHeight = boardHeight * tileRelation
export const tileRatio = 1 / 1
export const tileWidth = tileHeight * tileRatio / screenRatio

export const discardAmplitude = 7.6
export const discardAngleOffset = -2.45
export const discardOffset = 157.6
export const goldenAngle = Math.PI * (3 - 5 ** 0.5)
export const pileAmplitude = 2 * 5 ** 0.5
export const pileAngleOffset = -Math.PI / 2
export const pileOffset = 400

export const playerOffsets = [
  {left: 0, top: 100 - boardHeight}, // BottomLeft: 0
  {left: 0, top: 7}, // TopLeft: 1
  {left: 100 - boardWidth, top: 7}, // TopRight: 2
  {left: 100 - boardWidth, top: 100 - boardHeight}, // BottomRight: 3
]

/**
 * Returns the relative linear displacement (one-dimensional) of an element
 * given their absolute size, absolute position and perhaps a relative offset
 * and an origin within that axis.
 * @param size Size of the element in absolute percentage.
 * @param position Absolute position in percentage.
 * @param offset Relative displacement in units.
 * @param origin Absolute position of the origin if not centered at 50.
 */
export function absoluteToRelative(size: number, position: number, offset: number = 0, origin: number = 50): number {
  return ((position - origin) / size + offset) * 100
}
