import { GameOptions, /*OptionsDescription, OptionType*/ } from '@gamepark/rules-api'
// import { TFunction } from 'i18next'
import { GameState } from './GameState'

type LuckyNumbersGameOptions = {
  alternativeSetup: boolean
  replayOnDiagonals: boolean
}

/**
 * This is the options for each players in the game.
 */
type LuckyNumbersPlayerOptions = { id: number }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type LuckyNumbersOptions = GameOptions<LuckyNumbersGameOptions, LuckyNumbersPlayerOptions>

/**
 * Typeguard to help Typescript distinguish between a GameState and new game's options, for you main class constructor.
 * @param arg GameState or Game options
 * @return true if arg is a Game options
 */
export function isGameOptions(arg: GameState | LuckyNumbersOptions): arg is LuckyNumbersOptions {
  return typeof (arg as GameState).pile === 'undefined'
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
// export const LuckyNumbersOptionsDescription: OptionsDescription<LuckyNumbersGameOptions, LuckyNumbersPlayerOptions> = {
//   alternativeSetup: {
//     type: OptionType.BOOLEAN,
//     getLabel: (t: TFunction) => t('options.alternativeSetup'),
//   },
//   players: {
//     id: {
//       type: OptionType.INTEGER,
//     }
//   },
//   replayOnDiagonals: {
//     type: OptionType.BOOLEAN,
//     getLabel: (t: TFunction) => t('options.replayOnDiagonals'),
//   }
// }
