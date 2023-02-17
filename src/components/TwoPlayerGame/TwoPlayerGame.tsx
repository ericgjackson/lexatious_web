/* eslint-disable max-lines */
import { createRef, FormEvent, FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { SwordsCrossed } from 'icons';
import { noop } from 'lib';
import {
  getFriendsSlice,
  getStateSlice,
  getUserDataSlice,
  newGameSlice,
  selectFriends,
  selectInvitations,
  selectUsername,
  useTranslate,
  useTypedSelector,
} from 'state';

import Checkbox from '../Checkbox';
import Sidebar from '../Sidebar';
import SquareButton from '../SquareButton';

import styles from './TwoPlayerGame.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const TwoPlayerGame: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const inputRef = useMemo(() => createRef<HTMLInputElement>(), []);
  const friends = useTypedSelector(selectFriends);
  const invitations = useTypedSelector(selectInvitations);
  const username = useTypedSelector(selectUsername);
  const [opponentGoesFirst, setOpponentGoesFirst] = useState<boolean>(false);

  const handleChange = () => {
    setOpponentGoesFirst(!opponentGoesFirst);
  };

  // Need for this to be dependent on the device ID
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    if (!username) {
      return;
    }
    dispatch(getFriendsSlice.actions.submit());
  }, [isOpen]);

  // Need for this to be dependent on the device ID
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    if (!username) {
      return;
    }
    dispatch(getUserDataSlice.actions.submit());
  }, [isOpen]);

  const handlePlayClick = () => {
    const opponentName = inputRef.current && inputRef.current.value;
    if (opponentName) {
      dispatch(newGameSlice.actions.submit({ opponentName, opponentGoesFirst }));
    }
    onClose();
  };

  const handleFriendClick = (index: number) => {
    const opponentName = friends[index].username;
    if (opponentName) {
      dispatch(newGameSlice.actions.submit({ opponentName, opponentGoesFirst }));
    }
    onClose();
  };

  const handleInvitationClick = (index: number) => {
    const gameToken = invitations[index].token;
    if (gameToken) {
      dispatch(getStateSlice.actions.submit({ gameToken }));
    }
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const opponentName = inputRef.current && inputRef.current.value;
    if (opponentName) {
      dispatch(newGameSlice.actions.submit({ opponentName, opponentGoesFirst }));
    }
    onClose();
  };

  const friendsBody = useCallback(() => {
    return (friends.map((friend, index) => {
      return (
        <tr key={index}>
          <td>
            <div className={styles.friend} onClick={() => handleFriendClick(index)}>
              <div className={styles.letterBox}>
                <h2 className={styles.letter}>{friend.username[0].toUpperCase()}</h2>
              </div>
              <span>{friend.username}</span>
            </div>
          </td>
        </tr>
      );
    }));
  }, [friends]);

  const invitationsBody = useCallback(() => {
    return (invitations.map((invitation, index) => {
      return (
        <tr key={index}>
          <td>
            <div className={styles.friend} onClick={() => handleInvitationClick(index)}>
              <div className={styles.letterBox}>
                <h2 className={styles.letter}>{invitation.opp_username[0].toUpperCase()}</h2>
              </div>
              <span>{invitation.opp_username}</span>
            </div>
          </td>
        </tr>
      );
    }));
  }, [invitations]);

  const invitationsSection = useCallback(() => {
    if (invitations.length === 0) {
      return (<></>);
    }
    return (
      <Sidebar.Section title={translate('invitations')}>
        <table className={styles.table}>
          <tbody>
            {invitationsBody()}
          </tbody>
        </table>
      </Sidebar.Section>
    );
  }, [invitations]);

  const usernameContent = () => {
    return (
      <>
        {invitationsSection()}
        <Sidebar.Section title={translate('existingOpponent')}>
          <table className={styles.table}>
            <tbody>
              {friendsBody()}
            </tbody>
          </table>
        </Sidebar.Section>
        <Sidebar.Section title={translate('newOpponent')}>
          <form onSubmit={handleSubmit}>
            <input
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              autoFocus
              onChange={noop}
              ref={inputRef}
            />
          </form>
        </Sidebar.Section>
        <Sidebar.Section title="">
          <div>
            <Checkbox
              name="Opponent Goes First"
              id="OpponentGoesFirst"
              checked={opponentGoesFirst}
              onChange={handleChange}
            >
              <div className={styles.label}>Opponent Goes First</div>
            </Checkbox>
          </div>
        </Sidebar.Section>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonContainer}>
            <SquareButton
              buttonSize={60}
              className={styles.swordsCrossed}
              Icon={SwordsCrossed}
              onClick={handlePlayClick}
            />
            <span className={styles.buttonLabel}>Play</span>
          </div>
        </div>
      </>
    );
  };

  const noUsernameContent = () => {
    return (
      <span>You must set a username on the Profile page before starting or joining a two-player game.</span>
    );
  };

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('twoPlayerGame')} onClose={onClose}>
      {username ? usernameContent() : noUsernameContent()}
    </Sidebar>
  );
};

export default TwoPlayerGame;
