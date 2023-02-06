import { ChangeEventHandler, FunctionComponent, RefObject, useCallback, useMemo } from 'react';

import { getTileSizes } from 'lib';
import { Cell as CellModel, EMPTY_CELL } from 'ltypes';
import {
  useTranslate,
} from 'state';

import CellPure from './CellPure';

interface Props {
  cell: CellModel;
  className?: string;
  direction: 'horizontal' | 'vertical';
  inputRef: RefObject<HTMLInputElement>;
  invalid: boolean;
  recentlyChanged: boolean;
  size: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onDirectionToggle: () => void;
  onFocus: (x: number, y: number) => void;
}

const Cell: FunctionComponent<Props> = ({
  cell,
  className,
  direction,
  inputRef,
  invalid,
  recentlyChanged,
  size,
  onChange,
  onDirectionToggle,
  onFocus,
}) => {
  const { tile, x, y } = cell;
  const translate = useTranslate();
  const { tileFontSize } = getTileSizes(size);
  const isEmpty = tile.character === EMPTY_CELL;
  const style = useMemo(() => ({ fontSize: tileFontSize }), [tileFontSize]);

  const handleDirectionToggleClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    onDirectionToggle();
  }, [onDirectionToggle]);

  const handleFocus = useCallback(() => onFocus(x, y), [x, y, onFocus]);

  return (
    <CellPure
      cell={cell}
      className={className}
      direction={direction}
      inputRef={inputRef}
      invalid={invalid}
      isEmpty={isEmpty}
      recentlyChanged={recentlyChanged}
      size={size}
      style={style}
      tile={tile}
      translate={translate}
      onChange={onChange}
      onDirectionToggleClick={handleDirectionToggleClick}
      onFocus={handleFocus}
    />
  );
};

export default Cell;
