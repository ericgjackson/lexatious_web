import {
  ChangeEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  memo,
  Ref,
  RefObject,
} from 'react';

import { Cell } from 'ltypes';
import { Direction } from 'types';

import styles from './Board.module.scss';
import { Cell as CellComponent } from './components';

interface Props {
  cellSize: number;
  dim: number;
  direction: Direction;
  innerRef?: Ref<HTMLDivElement>;
  invalidCells: number[];
  lastChanges: number[];
  placementCells: number[];
  refs: RefObject<HTMLInputElement>[][];
  rows: Cell[][];
  onChange: ChangeEventHandler<HTMLInputElement>;
  onDirectionToggle: () => void;
  onFocus: (x: number, y: number) => void;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const BoardPure: FunctionComponent<Props> = ({
  cellSize,
  dim,
  direction,
  innerRef,
  invalidCells,
  lastChanges,
  placementCells,
  refs,
  rows,
  onChange,
  onDirectionToggle,
  onFocus,
  onKeyDown,
}) => (
  <div className={styles.board} ref={innerRef} onKeyDown={onKeyDown}>
    {rows.map((cells, y) => (
      <div className={styles.row} key={y}>
        {cells.map((cell, x) => (
          <CellComponent
            className={styles.cell}
            cell={cell}
            direction={direction}
            inputRef={refs[y][x]}
            invalid={invalidCells.includes(y * dim + x)}
            key={x}
            recentlyChanged={lastChanges.includes(y * dim + x) || placementCells.includes(y * dim + x)}
            size={cellSize}
            onChange={onChange}
            onDirectionToggle={onDirectionToggle}
            onFocus={onFocus}
          />
        ))}
      </div>
    ))}
  </div>
);

export default memo(BoardPure);
