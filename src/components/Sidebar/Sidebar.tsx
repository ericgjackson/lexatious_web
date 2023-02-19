import classNames from 'classnames';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useKey } from 'react-use';

import { CrossFill } from 'icons';
import { TRANSITION_DURATION_LONG } from 'parameters';
import { useTranslate } from 'state';

import SquareButton from '../SquareButton';

import { Section } from './components';
import styles from './Sidebar.module.scss';

export interface Props {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  width?: number;
}

const Sidebar: FunctionComponent<Props> = ({ children, className, isOpen, title, onClose, width }) => {
  const translate = useTranslate();
  const [shouldReturnFocusAfterClose, setShouldReturnFocusAfterClose] = useState(true);
  const actualWidth = width || 370;
  const varStyle = { width: `${actualWidth}px` };

  useKey(
    'Escape',
    () => {
      setShouldReturnFocusAfterClose(false);
      onClose();
    },
    undefined,
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      setShouldReturnFocusAfterClose(true);
    }
  }, [isOpen]);

  return (
    <Modal
      className={{
        afterOpen: styles.afterOpen,
        base: styles.modal,
        beforeClose: styles.beforeClose,
      }}
      closeTimeoutMS={TRANSITION_DURATION_LONG}
      contentLabel={title}
      isOpen={isOpen}
      overlayClassName={styles.overlay}
      shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
      onRequestClose={onClose}
    >
      <div className={classNames(styles.sidebar, className)} style={varStyle}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>

          <SquareButton
            buttonSize={40}
            className={styles.closeButton}
            Icon={CrossFill}
            tooltip={translate('common.close')}
            onClick={onClose}
          />
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </Modal>
  );
};

export default Object.assign(Sidebar, {
  Section,
});
