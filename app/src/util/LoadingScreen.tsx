/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faLightbulb, faPaintBrush, faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Picture } from '@gamepark/react-components'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export type LoadingScreenProps = {
  gameBox?: string;
  author?: string | string[];
  artist?: string | string[];
  publisher?: string | string[];
  display: boolean;
} & HTMLAttributes<HTMLDivElement>

export const LoadingScreen: FunctionComponent<LoadingScreenProps> = ({ gameBox, author, artist, publisher, display, ...props }) => {
  const { t } = useTranslation();
  const authors = typeof author === 'string' ? [author] : author;
  const artists = typeof artist === 'string' ? [artist] : artist;
  const publishers = typeof publisher === 'string' ? [publisher] : publisher;

  return (
    <div css={[loadingScreenStyle, !display && hiddenStyle]} {...props}>
      {gameBox && <Picture css={gameBoxStyle} src={gameBox} alt={t('credits.name')} />}
      <h2 css={gameTitle}>{t('credits.name')}</h2>
      <p css={gamePeople}>
      <FontAwesomeIcon css={iconStyle} icon={faLightbulb} />
      {authors?.length === 1 && <Trans i18nKey="credits.author" values={{ author: author }} components={[<strong />]} />}
      {authors?.length === 2 && <Trans i18nKey="credits.authors" values={{ author1: authors[0], author2: authors[1] }} components={[<strong />]} />}
      <br />
      <FontAwesomeIcon css={iconStyle} icon={faPaintBrush} />
      {artists?.length === 1 && <Trans i18nKey="credits.illustrator" values={{ artist: artist }} components={[<strong />]} />}
      {artists?.length === 2 && <Trans i18nKey="credits.illustrators" values={{ artist1: artists[0], artist2: artists[1] }} components={[<strong />]} />}
      <br />
      <FontAwesomeIcon css={iconStyle} icon={faWrench} />
      {publishers?.length === 1 && <Trans i18nKey="credits.editor" values={{ editor: publisher }} components={[<strong />]} />}
      {publishers?.length === 2 && <Trans i18nKey="credits.editors" values={{ editor1: publishers[0], editor2: publishers[1] }} components={[<strong />]} />}
      </p>
    </div>
  )
}

export const loadingScreenStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 2s;
  background-size: cover;
  background-position: center;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  > * {
    z-index: 1;
  }
`

export const gameBoxStyle = css`
  position: relative;
  width: 62em;
  height: 66em;
  margin-top: 8em;
  margin-bottom: 3em;
`

export const gameTitle = css`
  font-size: 5em;
  margin: 0;
`

export const gamePeople = css`
  font-size: 3em;
`

export const iconStyle = css`
  min-width: 6em;
  position: relative;
`
export const hiddenStyle = css`
  opacity: 0;
`

export default LoadingScreen
