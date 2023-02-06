import { createRef, FormEvent, FunctionComponent, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Register } from 'icons';
import { noop } from 'lib';
import {
  localStorage,
  registerSlice,
  registrationMessageSlice,
  selectRegistrationMessage,
  selectUsername,
  usernameSlice,
  useTranslate,
  useTypedSelector,
} from 'state';

import Sidebar from '../Sidebar';
import SquareButton from '../SquareButton';

import styles from './Profile.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Profile: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const inputRef = useMemo(() => createRef<HTMLInputElement>(), []);
  const registrationMessage = useTypedSelector(selectRegistrationMessage);
  const username = useTypedSelector(selectUsername);

  const handleClose = () => {
    dispatch(registrationMessageSlice.actions.reset());
    onClose();
  };

  const handleRegister = () => {
    const newUsername = inputRef.current && inputRef.current.value;
    if (newUsername) {
      dispatch(registerSlice.actions.submit({ username: newUsername }));
    } else {
      // When clearing the username, don't want to register with the backend.
      dispatch(usernameSlice.actions.set(''));
      localStorage.setUsername('');
      dispatch(registrationMessageSlice.actions.set('Username cleared'));
    }
  };

  // Should this register?
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRegister();
  };

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('profile')} onClose={handleClose}>
      <Sidebar.Section title={translate('username')}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <input
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              autoFocus
              defaultValue={username}
              onChange={noop}
              ref={inputRef}
            />
            <div className={styles.message}>
              <span>{registrationMessage}</span>
            </div>
          </div>
        </form>
      </Sidebar.Section>
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonContainer}>
          <SquareButton
            className={styles.register}
            Icon={Register}
            onClick={handleRegister}
          />
          <span className={styles.buttonLabel}>Register</span>
        </div>
      </div>
    </Sidebar>
  );
};

export default Profile;
