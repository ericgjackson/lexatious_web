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

/* eslint-disable-next-line max-statements */
const Message: FunctionComponent = () => {
  const activePlayer = useTypedSelector(selectActivePlayer);
  const errorMessage = useTypedSelector(selectErrorMessage);
  const invalid = useTypedSelector(selectInvalid);
  const lastAction = useTypedSelector(selectLastAction);
  const opponentName = useTypedSelector(selectOpponentName);
  const player = useTypedSelector(selectPlayer);
  const winner = useTypedSelector(selectWinner);
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
    <div className={styles.messageContainer}>
      <h2>{message}</h2>
    </div>
  );
};

export default Message;
