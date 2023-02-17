import classNames from 'classnames';
import { createRef, FunctionComponent, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { createArray } from 'lib';
import { RackLetter } from 'ltypes';
import { rackSlice, selectPlacements, selectPlayer, selectRack, useTypedSelector } from 'state';

import styles from './Rack.module.scss';
import RackTile from './RackTile';

interface Props {
  className?: string;
  tileSize: number;
}

const Rack: FunctionComponent<Props> = ({ className, tileSize }) => {
  const dispatch = useDispatch();
  const placements = useTypedSelector(selectPlacements);
  const player = useTypedSelector(selectPlayer);
  const rack = useTypedSelector(selectRack);
  const rackLetters: RackLetter[] = rack.letters;
  const tilesCount = rackLetters.length;
  const tilesRefs = useMemo(() => createArray(tilesCount).map(() => createRef<HTMLInputElement>()), [tilesCount]);
  const onClick = useCallback((index: number) => {
    dispatch(rackSlice.actions.toggleSelected({ index }));
  }, [rack]);

  const visible = new Array(tilesCount).fill(true);
  placements.forEach((p) => {
    const letter = p.character;
    for (let i = 0; i < tilesCount; ++i) {
      if (visible[i] && rackLetters[i].letter === letter) {
        visible[i] = false;
        break;
      }
    }
  });

  return (
    <div className={classNames(styles.rack, className)}>
      {rackLetters.map((rl, index) => (
        <RackTile
          character={rl.letter}
          index={index}
          inputRef={tilesRefs[index]}
          key={index}
          onClick={onClick}
          player={player}
          selected={rl.selected}
	  tileSize={tileSize}
          visible={visible[index]}
        />
      ))}
    </div>
  );
};

export default Rack;
