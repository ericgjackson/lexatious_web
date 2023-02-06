import classNames from 'classnames';
import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  MouseEventHandler,
  memo,
  RefObject,
} from 'react';

import styles from './Tile.module.scss';

interface Props {
  autoFocus?: boolean;
  character?: string;
  className?: string;
  disabled?: boolean;
  inputRef: RefObject<HTMLInputElement>;
  inputStyle?: CSSProperties;
  invalid: boolean;
  occupier: number;
  placeholder?: string;
  raised?: boolean;
  recentlyChanged: boolean;
  selected?: boolean;
  style?: CSSProperties;
  tabIndex?: number;
  visible: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const TilePure: FunctionComponent<Props> = ({
  autoFocus,
  character,
  className,
  disabled,
  inputRef,
  inputStyle,
  invalid,
  occupier,
  placeholder,
  raised,
  recentlyChanged,
  selected,
  style,
  tabIndex,
  visible,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
}) => (
  <div
    className={classNames(styles.tile, className, {
      [styles.raised]: raised,
      [styles.occupier1]: visible && character && occupier === 1,
      [styles.occupier2]: visible && character && occupier === 2,
      [styles.occupier3]: visible && character && occupier === 3,
      [styles.selected]: selected,
    })}
    style={style}
  >
    <input
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      autoFocus={autoFocus}
      className={classNames(styles.character, {
        [styles.newChar]: recentlyChanged && !invalid,
        [styles.invalid]: invalid,
      })}
      disabled={disabled}
      placeholder={placeholder}
      ref={inputRef}
      spellCheck={false}
      style={inputStyle}
      tabIndex={tabIndex}
      value={character || ''}
      onChange={onChange}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      readOnly={!onChange}
    />
  </div>
);

export default memo(TilePure);
