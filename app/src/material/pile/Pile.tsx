import { GameView } from '@gamepark/lucky-numbers/GameView'
import { FunctionComponent } from 'react'
import { OriginType } from '../../OriginType'
import { Tile } from '../tile/Tile'

type Props = {
  game: GameView
}

export const Pile: FunctionComponent<Props> = ({ game: { pile } }) => {
  return (
    <>
      {pile.map((tile, index) => tile && <Tile key={`Hidden${index}`} tile={tile} origin={OriginType.PILE} index={index} />)}
    </>
  )
}

export default Pile
