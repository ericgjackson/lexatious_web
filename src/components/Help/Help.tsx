import { FunctionComponent, useCallback, useState } from 'react';

import { LeftArrow, RightArrow } from 'icons';
import {
  useTranslate,
} from 'state';

import Sidebar from '../Sidebar';
import SquareButton from '../SquareButton';

import styles from './Help.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Help: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();
  const [screen, setScreen] = useState<number>(0);

  const handlePrevious = () => {
    setScreen((s) => (s - 1));
  };

  const handleNext = () => {
    setScreen((s) => (s + 1));
  };

  const screenContent0 = () => {
    return (
      <div className={styles.text}>
        <ul>
          <li>The goal in Lexatious is to form a path of tiles across the board from one edge to the other.</li>
          <li>The green player's path must extend from the left edge to the right edge.</li>
          <li>In this example, the green player has won the game.</li>
          <li>A winning path for the green player must consist entirely of green tiles.</li>
        </ul>
      </div>
    );
  };

  const screenContent = useCallback(() => {
    if (screen === 0) {
      return screenContent0();
    }
    return (<></>);
  }, [screen]);

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('profile')} onClose={onClose}>
      <Sidebar.Section title="">
        {screenContent()}
      </Sidebar.Section>
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonContainer}>
          <SquareButton
	    buttonSize={60}
            className={styles.register}
            Icon={LeftArrow}
            onClick={handlePrevious}
            style={{ color: '#006600' }}
          />
          <span className={styles.buttonLabel}>Next</span>
        </div>
        <div className={styles.buttonContainer}>
          <SquareButton
	    buttonSize={60}
            className={styles.register}
            Icon={RightArrow}
            onClick={handleNext}
            style={{ color: '#006600' }}
          />
          <span className={styles.buttonLabel}>Previous</span>
        </div>
      </div>
    </Sidebar>
  );
};

export default Help;
