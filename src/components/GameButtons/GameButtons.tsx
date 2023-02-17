import { FunctionComponent } from 'react';

import { Concede, Eraser, Exchange, Robot, Shuffle, TwoPlayer } from 'icons';
import { useTranslate } from 'state';

import SquareButton from '../SquareButton';

import styles from './GameButtons.module.scss';

interface Props {
  buttonSize: number;
  onClear: () => void;
  onConcede: () => void;
  onExchange: () => void;
  onShowOnePlayerGame: () => void;
  onShowTwoPlayerGame: () => void;
  onShuffle: () => void;
}

const GameButtons: FunctionComponent<Props> = ({
  buttonSize,
  onClear,
  onConcede,
  onExchange,
  onShowOnePlayerGame,
  onShowTwoPlayerGame,
  onShuffle,
}) => {
  const translate = useTranslate();

  return (
    <div className={styles.gameButtons}>
      <SquareButton
        buttonSize={buttonSize}
        className={styles.button}
        Icon={Robot}
        tooltip={translate('common.bot-game')}
        onClick={onShowOnePlayerGame}
      />

      <SquareButton
        buttonSize={buttonSize}
        className={styles.button}
        Icon={TwoPlayer}
        style={{ color: '#4CAF50' }}
        tooltip={translate('common.human-game')}
        onClick={onShowTwoPlayerGame}
      />

      <SquareButton
        buttonSize={buttonSize}
        className={styles.button}
        Icon={Eraser}
        style={{ color: '#DBB7BB' }}
        tooltip={translate('common.clear')}
        onClick={onClear}
      />

      <SquareButton
        buttonSize={buttonSize}
        className={styles.button}
        Icon={Shuffle}
        style={{ color: '#3B88C3' }}
        tooltip={translate('common.shuffle')}
        onClick={onShuffle}
      />

      <SquareButton
        buttonSize={buttonSize}
        className={styles.button}
        Icon={Exchange}
        style={{ color: '#669933' }}
        tooltip={translate('common.exchange')}
        onClick={onExchange}
      />

      <SquareButton
        buttonSize={buttonSize}
        className={styles.button}
        Icon={Concede}
        style={{ color: '#DC143C' }}
        tooltip={translate('common.concede')}
        onClick={onConcede}
      />

    </div>
  );
};

export default GameButtons;
