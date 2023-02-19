import { FunctionComponent, useMemo } from 'react';

import { getTileSizes } from 'lib';
import { EMPTY_CELL, Tile } from 'ltypes';

import CellPure from './CellPure';

interface Props {
  className?: string;
  size: number;
  tile: Tile;
}

const Cell: FunctionComponent<Props> = ({
  className,
  size,
  tile,
}) => {
  const { tileFontSize } = getTileSizes(size);
  const isEmpty = tile.character === EMPTY_CELL;
  const style = useMemo(() => ({ fontSize: tileFontSize }), [tileFontSize]);

  return (
    <CellPure
      className={className}
      isEmpty={isEmpty}
      size={size}
      style={style}
      tile={tile}
    />
  );
};

export default Cell;
