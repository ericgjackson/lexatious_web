import { FunctionComponent, memo } from 'react';

import { Tile } from 'ltypes';

import { Cell as CellComponent } from './components';
import styles from './SampleBoard.module.scss';

interface Props {
  cellSize: number;
  height: number;
  letters: string[];
  occupiers: number[];
  width: number;
}

const SampleBoard: FunctionComponent<Props> = ({
  cellSize,
  height,
  letters,
  occupiers,
  width,
}) => (
  <div className={styles.board}>
    {Array(height).fill(0).map((_y, y) => (
      <div className={styles.row} key={y}>
        {Array(width).fill(0).map((_x, x) => (
          <CellComponent
            className={styles.cell}
            key={x}
            size={cellSize}
            tile={new Tile({ character: letters[y * width + x], occupier: occupiers[y * width + x] })}
          />
        ))}
      </div>
    ))}
  </div>
);

export default memo(SampleBoard);
