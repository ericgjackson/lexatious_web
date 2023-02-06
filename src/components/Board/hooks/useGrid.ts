/* eslint-disable max-lines, max-statements */
import {
  createRef,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useMemo,
  useState,
  useRef,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';
import { useDispatch } from 'react-redux';
import { useLatest } from 'react-use';

import {
  createGridOf,
  createKeyboardNavigation,
  extractInputValue,
  isCtrl,
  isValidPlay,
  isValidRemoval,
} from 'lib';
import { Cell, EMPTY_CELL } from 'ltypes';
import {
  boardSlice,
  invalidCellsSlice,
  placementsSlice,
  selectPlacements,
  selectPlayer,
  selectRack,
  selectWinner,
  useTypedSelector,
} from 'state';
import { Direction } from 'types';

import { getPositionInGrid, isValidChar } from '../lib';
import { Point } from '../types';

const toggleDirection = (direction: Direction) => (direction === 'vertical' ? 'horizontal' : 'vertical');

interface State {
  direction: Direction;
  refs: RefObject<HTMLInputElement>[][];
}

interface Actions {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onDirectionToggle: () => void;
  onFocus: (x: number, y: number) => void;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const useGrid = (rows: Cell[][]): [State, Actions] => {
  const height = rows.length;
  const width = rows[0].length;
  const dispatch = useDispatch();
  const placements = useTypedSelector(selectPlacements);
  const player = useTypedSelector(selectPlayer);
  const rack = useTypedSelector(selectRack);
  const winner = useTypedSelector(selectWinner);
  const refs = useMemo(
    () => createGridOf<RefObject<HTMLInputElement>>(width, height, () => createRef()),
    [width, height],
  );
  const activeIndexRef = useRef<Point>({ x: 0, y: 0 });
  const [direction, setLastDirection] = useState<Direction>('horizontal');
  const directionRef = useLatest(direction);

  const changeActiveIndex = useCallback(
    (offsetX: number, offsetY: number) => {
      const x = Math.min(Math.max(activeIndexRef.current.x + offsetX, 0), width - 1);
      const y = Math.min(Math.max(activeIndexRef.current.y + offsetY, 0), height - 1);
      activeIndexRef.current = { x, y };
      refs[y][x].current?.focus();
    },
    [activeIndexRef, refs],
  );

  const getInputRefPosition = useCallback(
    (inputRef: HTMLInputElement): Point | undefined => {
      return getPositionInGrid(refs, (ref) => ref.current === inputRef);
    },
    [refs],
  );

  const moveFocus = useCallback(
    (offset: number) => {
      if (directionRef.current === 'horizontal') {
        changeActiveIndex(offset, 0);
      } else {
        changeActiveIndex(0, offset);
      }
    },
    [changeActiveIndex, directionRef],
  );

  const deleteValue = useCallback(
    (position: Point, offset: number) => {
      const { x, y } = position;

      if (isValidRemoval(placements, rows, x, y, player)) {
        dispatch(boardSlice.actions.changeCellValue({
          x,
          y,
          value: EMPTY_CELL,
          occupier: player + 1,
        }));
        dispatch(placementsSlice.actions.remove({
          x,
          y,
        }));
        dispatch(invalidCellsSlice.actions.reset());
      }
      // We still move the focus even if there is nothing to remove.  So you can use the
      // backspace key to move backwards along a row or column.
      moveFocus(offset);
    },
    [directionRef, dispatch, moveFocus, player, rows],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (player === -1 || winner >= 0) {
        return;
      }
      const character = extractInputValue(event.target);
      // Want to ignore invalid characters like punctuation, numbers, etc.
      if (!isValidChar(character)) {
        return;
      }

      const position = getInputRefPosition(event.target);
      if (!position) {
        return;
      }

      const { x, y } = position;
      const { valid, replacement } = isValidPlay(character, rack, placements, rows, x, y, player);
      if (!valid) {
        return;
      }

      dispatch(boardSlice.actions.changeCellValue({
        x,
        y,
        value: character,
        occupier: player + 1,
      }));
      dispatch(invalidCellsSlice.actions.reset());
      if (replacement) {
        dispatch(placementsSlice.actions.replace({
          character,
          x,
          y,
        }));
      } else {
        dispatch(placementsSlice.actions.add({
          character,
          x,
          y,
        }));
      }
      moveFocus(1);
    },
    [dispatch, moveFocus, placements, player, rack, rows, winner],
  );

  const onDirectionToggle = useCallback(() => setLastDirection(toggleDirection), []);

  const onFocus = useCallback((x: number, y: number) => {
    activeIndexRef.current = { x, y };
  }, []);

  const onKeyDown = useMemo(() => {
    return createKeyboardNavigation({
      onArrowDown: (event) => {
        event.preventDefault();

        if (isCtrl(event)) {
          onDirectionToggle();
        } else {
          changeActiveIndex(0, 1);
        }
      },
      onArrowLeft: (event) => {
        event.preventDefault();

        if (isCtrl(event)) {
          onDirectionToggle();
        } else {
          changeActiveIndex(-1, 0);
        }
      },
      onArrowRight: (event) => {
        event.preventDefault();

        if (isCtrl(event)) {
          onDirectionToggle();
        } else {
          changeActiveIndex(1, 0);
        }
      },
      onArrowUp: (event) => {
        event.preventDefault();

        if (isCtrl(event)) {
          onDirectionToggle();
        } else {
          changeActiveIndex(0, -1);
        }
      },
      onBackspace: (event) => {
        if (player === -1 || winner >= 0) {
          return;
        }
        const position = getInputRefPosition(event.target as HTMLInputElement);

        if (!position) {
          return;
        }

        event.preventDefault();
        deleteValue(position, -1);
      },
      onDelete: (event) => {
        if (player === -1 || winner >= 0) {
          return;
        }
        const position = getInputRefPosition(event.target as HTMLInputElement);

        if (!position) {
          return;
        }

        event.preventDefault();
        deleteValue(position, 0);
      },
      onKeyDown: (event) => {
        if (player === -1 || winner >= 0) {
          return;
        }
        // Want to ignore invalid characters like punctuation, numbers, etc.
        if (!isValidChar(event.key)) {
          return;
        }
        // If I want to allow the user to place an E over an E that he played in a previous turn,
        // and have the focus move, then change below to event.key.toUpperCase().
        if (event.target instanceof HTMLInputElement && event.target.value === event.key) {
          // change event did not fire because the same character was typed over the current one
          // but we still want to move the caret
          event.preventDefault();
          moveFocus(1);
        }
      },
      onSpace: (event) => {
        if (player === -1 || winner >= 0) {
          return;
        }
        const position = getInputRefPosition(event.target as HTMLInputElement);

        if (!position) {
          return;
        }

        event.preventDefault();
        deleteValue(position, 0);
      },
    });
  }, [changeActiveIndex, dispatch, onDirectionToggle, player, rows]);

  return [
    { direction, refs },
    { onChange, onDirectionToggle, onFocus, onKeyDown },
  ];
};

export default useGrid;
