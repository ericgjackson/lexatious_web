import classNames from 'classnames';
import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  FunctionComponent,
  memo,
  MouseEventHandler,
  RefObject,
} from 'react';

import { ArrowDown } from 'icons';
import { Cell, Tile as TileModel } from 'ltypes';
import { Translate } from 'types';

import Tile from '../../../Tile';

import Button from './Button';
import styles from './Cell.module.scss';

interface Props {
  cell: Cell;
  className?: string;
  direction: 'horizontal' | 'vertical';
  inputRef: RefObject<HTMLInputElement>;
  invalid: boolean;
  isEmpty: boolean;
  recentlyChanged: boolean;
  size: number;
  style?: CSSProperties;
  tile: TileModel;
  translate: Translate;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onDirectionToggleClick: MouseEventHandler<HTMLButtonElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
}

const CellPure: FunctionComponent<Props> = ({
  cell,
  className,
  direction,
  inputRef,
  invalid,
  isEmpty,
  recentlyChanged,
  size,
  style,
  tile,
  translate,
  onChange,
  onDirectionToggleClick,
  onFocus,
}) => (
  <div
    className={classNames(styles.cell, className)}
    style={style}
  >
    <Tile
      className={styles.tile}
      character={isEmpty ? undefined : tile.character}
      inputRef={inputRef}
      invalid={invalid}
      recentlyChanged={recentlyChanged}
      occupier={isEmpty ? 0 : tile.occupier}
      raised={!isEmpty}
      size={size}
      tabIndex={cell.x === 0 && cell.y === 0 ? undefined : -1}
      onChange={onChange}
      onFocus={onFocus}
    />

    <div className={styles.actions}>
      <Button tooltip={translate('cell.toggle-direction')} onClick={onDirectionToggleClick}>
        <ArrowDown
          className={classNames(styles.toggleDirection, {
            [styles.right]: direction === 'horizontal',
          })}
        />
      </Button>
    </div>
  </div>
);

export default memo(CellPure);
