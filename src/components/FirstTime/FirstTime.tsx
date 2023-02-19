import { FunctionComponent } from 'react';

import { Help, GoBack } from 'icons';
import {
  useTranslate,
} from 'state';

import SampleBoard from '../SampleBoard';
import Sidebar from '../Sidebar';
import SquareButton from '../SquareButton';

import styles from './FirstTime.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  setShowHelp: () => void;
}

const letters = [
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  'L', 'E', 'X', 'A', 'T', 'I', 'O', 'U', 'S', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', 'S', 'T', 'R', 'A', 'T', 'E', 'G', 'I', 'C',
  ' ', ' ', ' ', 'D', ' ', ' ', ' ', 'A', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'E', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
];

const occupiers = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 2, 0, 0, 0, 0, 0, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  0, 0, 0, 2, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const FirstTime: FunctionComponent<Props> = ({ className, isOpen, onClose, setShowHelp }) => {
  const translate = useTranslate();

  const handleTutorial = () => {
    onClose();
    setShowHelp(true);
  };

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('help')} onClose={onClose} width={740}>
      <Sidebar.Section title="">
        <div className={styles.boardContainer}>
          <SampleBoard
            cellSize={60}
            height={10}
            width={10}
            letters={letters}
            occupiers={occupiers}
          />
        </div>
        <div className={styles.text}>
          <span>It looks like you're new around here.  Would you like to learn how to play Lexatious?</span>
        </div>
      </Sidebar.Section>
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonContainer}>
          <SquareButton
            buttonSize={60}
            Icon={Help}
            onClick={handleTutorial}
            style={{ color: '#006600' }}
          />
          <span className={styles.buttonLabel}>Yes!</span>
        </div>
        <div className={styles.buttonContainer}>
          <SquareButton
            buttonSize={60}
            Icon={GoBack}
            onClick={onClose}
            style={{ color: '#DC143C' }}
          />
          <span className={styles.buttonLabel}>No</span>
        </div>
      </div>
    </Sidebar>
  );
};

export default FirstTime;
