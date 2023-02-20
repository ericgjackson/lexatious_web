import classNames from 'classnames';
import {
  CSSProperties,
  FunctionComponent,
  memo,
} from 'react';

import { Tile as TileModel } from 'ltypes';

import Tile from '../../../Tile';

import styles from './Cell.module.scss';

interface Props {
  className?: string;
  isEmpty: boolean;
  size: number;
  style?: CSSProperties;
  tile: TileModel;
}

const CellPure: FunctionComponent<Props> = ({
  className,
  isEmpty,
  size,
  style,
  tile,
}) => (
  <div
    className={classNames(styles.cell, className)}
    style={style}
  >
    <Tile
      className={styles.tile}
      character={isEmpty ? undefined : tile.character}
      occupier={isEmpty ? 0 : tile.occupier}
      raised={!isEmpty}
      recentlyChanged={false}
      size={size}
    />
  </div>
);

export default memo(CellPure);
