import { FunctionComponent } from 'react';

import {
  selectActivePlayer,
  selectErrorMessage,
  selectInvalid,
  selectLastAction,
  selectOpponentName,
  selectPlayer,
  selectWinner,
  useTypedSelector,
} from 'state';

import styles from './Message.module.scss';

interface Props {
  height: number,
}

/* eslint-disable-next-line max-statements */
const Message: FunctionComponent<Props> = ({ height }) => {
  const activePlayer = useTypedSelector(selectActivePlayer);
  const errorMessage = useTypedSelector(selectErrorMessage);
  const invalid = useTypedSelector(selectInvalid);
  const lastAction = useTypedSelector(selectLastAction);
  const opponentName = useTypedSelector(selectOpponentName);
  const player = useTypedSelector(selectPlayer);
  const winner = useTypedSelector(selectWinner);
  // 16px font * 1.5 for h2 * 1.5 for line height
  const varStyle = { minHeight: height };
  const messageStyle = {
    fontWeight: 'bold',
    fontSize: height >= 36 ? '24px' : '16px',
  };

  let message = '';
  if (errorMessage) {
    message = errorMessage;
  } else if (player >= 0) {
    if (winner === -1) {
      if (activePlayer === player) {
        if (invalid) {
          message = 'Invalid word formed';
        } else if (lastAction === '*EXCHANGE') {
          message = `${opponentName} exchanged tiles`;
        } else if (lastAction) {
          message = `${opponentName} played ${lastAction}`;
        } else {
          message = 'Your move';
        }
      } else {
        message = `${opponentName} is thinking`;
      }
    } else if (winner === 2) {
      message = 'A tie has been declared!';
    } else if (winner === player) {
      if (lastAction === '*CONCEDE') {
        message = `${opponentName} conceded!`;
      } else {
        message = 'You won!';
      }
    } else if (winner === 1 - player) {
      message = 'You lost!';
    } else {
      message = 'Internal error';
    }
  }

  return (
    <div className={styles.messageContainer} style={varStyle}>
      <span
        style={messageStyle}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;
