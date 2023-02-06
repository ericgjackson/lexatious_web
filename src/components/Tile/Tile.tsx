import {
  ChangeEventHandler,
  createRef,
  FocusEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  MouseEventHandler,
  RefObject,
  useEffect,
  useMemo,
} from 'react';

import { getTileSizes, noop } from 'lib';

import TilePure from './TilePure';

interface Props {
  autoFocus?: boolean;
  character?: string;
  className?: string;
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  invalid?: boolean;
  occupier: number;
  placeholder?: string;
  raised?: boolean;
  recentlyChanged: boolean;
  selected?: boolean;
  size: number;
  tabIndex?: number;
  visible?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const Tile: FunctionComponent<Props> = ({
  autoFocus,
  className,
  character = '',
  disabled,
  inputRef: ref,
  invalid = false,
  occupier,
  placeholder,
  raised,
  recentlyChanged,
  selected,
  size,
  tabIndex,
  visible = true,
  onChange,
  onClick,
  onFocus = noop,
  onKeyDown = noop,
}) => {
  const { tileFontSize, tileSize } = getTileSizes(size);
  const style = useMemo(() => ({ height: tileSize, width: tileSize }), [tileSize]);
  const inputStyle = useMemo(() => ({ fontSize: tileFontSize, cursor: 'default' }), [tileFontSize]);
  const inputRef = useMemo<RefObject<HTMLInputElement>>(() => ref || createRef(), [ref]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    inputRef.current?.select();
    onKeyDown(event);
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);

  return (
    <TilePure
      autoFocus={autoFocus}
      character={character}
      className={className}
      disabled={disabled}
      inputRef={inputRef}
      inputStyle={inputStyle}
      invalid={invalid}
      recentlyChanged={recentlyChanged}
      placeholder={placeholder}
      occupier={occupier}
      raised={raised}
      selected={selected}
      style={style}
      tabIndex={tabIndex}
      visible={visible}
      onChange={onChange}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Tile;
