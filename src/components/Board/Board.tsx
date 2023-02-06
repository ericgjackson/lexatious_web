import { FunctionComponent, Ref } from 'react';

import { selectInvalidCells, selectLastChanges, selectPlacements, selectRows, useTypedSelector } from 'state';

import BoardPure from './BoardPure';
import { useGrid } from './hooks';

interface Props {
  cellSize: number;
  innerRef?: Ref<HTMLDivElement>;
}

const Board: FunctionComponent<Props> = ({ cellSize, innerRef }) => {
  const invalidCells = useTypedSelector(selectInvalidCells);
  const lastChanges = useTypedSelector(selectLastChanges);
  const placements = useTypedSelector(selectPlacements);
  const rows = useTypedSelector(selectRows);
  const dim = rows.length;
  const placementCells = placements.map((p) => p.y * dim + p.x);
  const [{ direction, refs }, { onChange, onDirectionToggle, onFocus, onKeyDown }] = useGrid(rows);

  return (
    <BoardPure
      cellSize={cellSize}
      dim={rows.length}
      direction={direction}
      innerRef={innerRef}
      invalidCells={invalidCells}
      lastChanges={lastChanges}
      placementCells={placementCells}
      refs={refs}
      rows={rows}
      onChange={onChange}
      onDirectionToggle={onDirectionToggle}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    />
  );
};

export default Board;
