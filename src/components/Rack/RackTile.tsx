import { FunctionComponent, RefObject, useCallback } from 'react';

import { TILE_SIZE } from 'parameters';
import { useTranslate } from 'state';

import Tile from '../Tile';

import styles from './Rack.module.scss';

interface Props {
  character: string | null;
  index: number;
  inputRef: RefObject<HTMLInputElement>;
  onClick: (index: number) => void;
  player: number;
  selected: boolean;
  tileSize: number;
  visible: boolean;
}

const RackTile: FunctionComponent<Props> = ({
  character,
  index,
  inputRef,
  onClick,
  player,
  selected,
  tileSize,
  visible,
}) => {
  const translate = useTranslate();

  const handleClick = useCallback(() => onClick(index), [index, onClick]);

  return (
    <Tile
      autoFocus={index === 0}
      className={styles.tile}
      character={character === null ? undefined : character}
      inputRef={inputRef}
      key={index}
      recentlyChanged={false}
      occupier={player + 1}
      onClick={handleClick}
      placeholder={translate('rack.placeholder')[index]}
      raised
      selected={selected}
      size={tileSize}
      tabIndex={index === 0 ? undefined : -1}
      visible={visible}
    />
  );
};

export default RackTile;
