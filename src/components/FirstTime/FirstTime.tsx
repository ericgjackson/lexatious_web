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
  screenHeight: number;
  setShowHelp: (val: boolean) => void;
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

const FirstTime: FunctionComponent<Props> = ({ className, isOpen, onClose, screenHeight, setShowHelp }) => {
  const translate = useTranslate();

  // 85 for modal header
  // 54 for text
  // 50 for top margin on text
  // 11 for cell borders
  // 87 for buttons
  // 50 for top margin on buttons
  // 20 for bottom padding on Sidebar content
  const fixedHeight = 85 + 54 + 50 + 11 + 87 + 50 + 20;
  const remHeight = screenHeight - fixedHeight;
  const cellSize = Math.min(Math.floor(remHeight / 10), 60);

  const handleTutorial = () => {
    onClose();
    setShowHelp(true);
  };

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('help')} onClose={onClose} width={740}>
      <Sidebar.Section title="">
        <div className={styles.boardContainer}>
          <SampleBoard
            cellSize={cellSize}
            height={10}
            width={10}
            letters={letters}
            occupiers={occupiers}
          />
        </div>
        <div className={styles.text}>
          <span>It looks like you're new around here.  Would you like to learn how to play Lexatious?</span>
        </div>
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
      </Sidebar.Section>
    </Sidebar>
  );
};

export default FirstTime;
