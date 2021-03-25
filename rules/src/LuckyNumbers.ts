import { IncompleteInformation, SimultaneousGame } from '@gamepark/rules-api'
import { GameState } from './GameState'
import { GameView } from './GameView'
import { isGameOptions, LuckyNumbersOptions } from './LuckyNumbersOptions'
import { getBoardSize, getLastTileFromReserve, getReserveLength, isValid } from './material/Board'
import { initializePile } from './material/Pile'
import { isTile } from './material/Tile'
import { discardTile } from './moves/DiscardTile'
import { drawTile } from './moves/DrawTile'
import { Move, MoveView } from './moves/Move'
import { MoveType } from './moves/MoveType'
import { placeFromDiscard } from './moves/PlaceFromDiscard'
import { placeTile } from './moves/PlaceTile'
import { Player } from './Player'
import { Stage } from './Stage'

/**
 * Your Board Game rules must extend either "SequentialGame" or "SimultaneousGame".
 * When there is at least on situation during the game where multiple players can act at the same time, it is a "SimultaneousGame"
 * If the game contains information that players does not know (dices, hidden cards...), it must implement "IncompleteInformation".
 * If the game contains information that some players know, but the other players does not, it must implement "SecretInformation" instead.
 * Later on, you can also implement "Competitive", "Undo", "TimeLimit" and "Eliminations" to add further features to the game.
 */
export default class LuckyNumbers extends SimultaneousGame<GameState, Move>
  implements IncompleteInformation<GameState, GameView, Move, MoveView> {
  /**
   * This constructor is called when the game "restarts" from a previously saved state.
   * @param state The state of the game
   */
  constructor(state: GameState)
  /**
   * This constructor is called when a new game is created. If your game has options, or a variable number of players, it will be provided here.
   * @param options The options of the new game
   */
  constructor(options: LuckyNumbersOptions)
  /**
   * In here you must code the construction of your class. Use a "typeguard" to distinguish a new game from a restored game.
   * @param arg The state of the game, or the options when starting a new game
   */
  constructor(arg: GameState | LuckyNumbersOptions) {
    if (isGameOptions(arg)) {
      super({
        activePlayer: 0,
        discard: [],
        pile: initializePile(arg.players.length),
        players: setupPlayers(arg),
        stage: Stage.SETUP,
      })
    } else {
      super(arg)
    }
  }

  /**
   * Return the exhaustive list of moves that can be played by the active player.
   * This is used for 2 features:
   * - security (preventing unauthorized moves from being played);
   * - "Dummy players": when a player leaves a game, it is replaced by a "Dummy" that plays random moves, allowing the other players to finish the game.
   * In a SimultaneousGame, as multiple players can be active you will be passed a playedId as an argument.
   * If the game allows a very large (or infinite) number of moves, instead of implementing this method, you can implement instead:
   * - isLegal(move: Move):boolean, for security; and
   * - A class that implements "Dummy" to provide a custom Dummy player.
   */
  getLegalMoves(playerId: number): Move[] {
    const { discard, pile, players, stage } = this.state
    const { board, reserve } = players[playerId]
    const moves: Move[] = []

    switch (stage) {
      case Stage.SETUP:
        if (!getBoardSize(board) && reserve.length < 4) {
          pile.forEach((tile, position) => {
            if (isTile(tile)) {
              moves.push({type: MoveType.DrawTile, playerId, position})
            }
          })
        } else if (getBoardSize(board) < 4) {
          reserve.forEach((tile) => {
            if (isTile(tile)) {
              const validPositions = [0, 5, 10, 15]
              validPositions.forEach((position) => {
                if (!board[position]) {
                  moves.push({type: MoveType.PlaceTile, playerId, position, tile})
                }
              })
            }
          })
        }
        break
      case Stage.GAME:
        if (getReserveLength(reserve)) {
          const tile = getLastTileFromReserve(reserve)
          moves.push({type: MoveType.DiscardTile, playerId, tile})
          board.forEach((_, position, array) => {
            array[position] = tile
            if (isValid(array)) {
              moves.push({type: MoveType.PlaceTile, playerId, position, tile})
            }
          })
        } else {
          pile.forEach((tile, position) => {
            if (isTile(tile)) {
              moves.push({type: MoveType.DrawTile, playerId, position})
            }
          })
          discard.forEach((tile, from) => {
            if (isTile(tile)) {
              board.forEach((_, to, array) => {
                array[to] = tile
                if (isValid(array)) {
                  moves.push({type: MoveType.PlaceFromDiscard, from, playerId, to})
                }
              })
            }
          })
        }
        break
    }
    return moves
  }

  /**
   * If you game has incomplete information, sometime you need to alter a Move before it is sent to the players and spectator.
   * For example, if a card is revealed, the id of the revealed card should be ADDED to the Move in the MoveView
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @return What a person should know about the move that was played
   */
  getMoveView(move: Move): MoveView {
    switch (move.type) {
      case MoveType.DrawTile: {
        const tile = getLastTileFromReserve(this.state.players[move.playerId].reserve)
        return {
          ...move,
          tile,
        }
      }
    }
    return move
  }

  /**
   * If you game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(): GameView {
    return {
      ...this.state,
      pile: this.state.pile.map(Boolean),
    }
  }

  isActive(playerId: number): boolean {
    const { activePlayer, players, stage } = this.state
    return stage === Stage.SETUP ? getBoardSize(players[playerId].board) < 4 : playerId === activePlayer
  }

  /**
   * @return True when game is over
   */
  isOver(): boolean {
    return isOver(this.state)
  }

    /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   */
  play(move: Move): void {
    switch (move.type) {
      case MoveType.DiscardTile:
        return discardTile(this.state, move)
      case MoveType.DrawTile:
        return drawTile(this.state, move)
      case MoveType.PlaceFromDiscard:
        return placeFromDiscard(this.state, move)
      case MoveType.PlaceTile:
        return placeTile(this.state, move)
    }
  }
}

function isOver(game: GameState | GameView): boolean {
  return game.players.some(({board}) => getBoardSize(board) === 16) || !game.pile.length
}

function isReady(game: GameState | GameView): boolean {
  if (game.stage === Stage.SETUP) {
    return game.players.every(({board}) => getBoardSize(board) === 4)
  }
  return true
}

export function nextPlayer(game: GameState | GameView): void {
  switch (game.stage) {
    case Stage.SETUP:
      if (isReady(game)) {
        game.stage = Stage.GAME
      }
      break
    case Stage.GAME:
      if (!isOver(game)) {
        game.activePlayer = ++game.activePlayer === game.players.length ? 0 : game.activePlayer
      } else {
        game.stage = Stage.END
      }
      break
  }
}

function setupPlayer(): Player {
  return {
    board: Array(16),
    reserve: []
  }
}

export function setupPlayers(options: LuckyNumbersOptions) {
  const { players } = options
  return players.map<Player>(setupPlayer)
}
