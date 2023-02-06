import classNames from 'classnames';
import { CSSProperties, FunctionComponent, useMemo } from 'react';

import SvgFontCss from '../SvgFontCss';

import { createPlainTiles, getViewbox } from './lib';
import styles from './PlainTiles.module.scss';
import Tile from './Tile';

interface Props {
  className?: string;
  color?: string;
  content: string[][];
  dropShadow?: boolean;
  style?: CSSProperties;
  wave?: boolean;
}

const PlainTiles: FunctionComponent<Props> = ({ className, color, content, dropShadow, style, wave }) => {
  const tiles = useMemo(() => createPlainTiles({ color, content }), [color, content]);

  return (
    <svg
      className={classNames(className, {
        [styles.dropShadow]: dropShadow,
        [styles.wave]: wave,
      })}
      style={style}
      viewBox={getViewbox(content)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <SvgFontCss />

      {tiles.map((tile, index) => (
        <Tile
          character={tile.character}
          className={styles.tile}
          color={tile.color}
          key={index}
          size={tile.size}
          transform={tile.transform}
          x={tile.x + 10}
          y={tile.y + 10}
        />
      ))}
    </svg>
  );
};

export default PlainTiles;
