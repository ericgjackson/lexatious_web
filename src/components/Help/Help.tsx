/* eslint-disable max-lines */
import { FunctionComponent, useCallback, useState } from 'react';

import { LeftArrow, RightArrow } from 'icons';
import {
  useTranslate,
} from 'state';

import SampleBoard from '../SampleBoard';
import Sidebar from '../Sidebar';
import SquareButton from '../SquareButton';

import styles from './Help.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const numScreens = 8;

const letters0 = [
  ' ', ' ', 'C', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', 'A', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', 'N', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', 'E', ' ', 'B', 'E', 'T', 'A', ' ', ' ',
  ' ', ' ', ' ', ' ', 'E', ' ', ' ', 'T', 'E', 'A',
  'A', 'N', 'G', 'L', 'E', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', 'T', ' ', ' ', 'M', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'A', 'D', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'O', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
];

const occupiers0 = [
  0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 2, 0, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 2, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 0,
];

const instructions0 = [
  'The goal in Lexatious is to form a path of tiles across the board from one edge to the other.',
  'The green player\'s path must extend from the left edge to the right edge.',
  'In this example, the green player has won the game.',
  'A winning path for the green player must consist entirely of green tiles.',
];

const letters1 = [
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'F', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'O', ' ',
  'R', 'A', 'C', 'E', ' ', ' ', ' ', ' ', 'R', ' ',
  ' ', ' ', ' ', 'N', 'O', 'D', ' ', 'I', 'T', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'C', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', 'A', 'H', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', 'N', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', 'T', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', 'E', ' ', ' ', ' ',
];

const occupiers1 = [
  0, 0, 0, 0, 0, 0, 0, 0, 2, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 0,
  1, 1, 1, 1, 0, 0, 0, 0, 2, 0,
  0, 0, 0, 1, 1, 1, 0, 2, 2, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 2, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
];

const instructions1 = [
  'The blue player\'s goal is to make a path from the top edge to the bottom.',
  'The winner is the player that completes their path first!',
];

const letters2 = [
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', 'P', 'A', 'I', 'N', 'T', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
];

const occupiers2 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const instructions2 = [
  'On each turn, you place tiles on the board in a single row or column.',
  'The tiles must form a valid word from the dictionary.',
];

const letters3 = [
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', 'T', 'A', 'L', 'O', 'N', ' ', ' ', ' ',
  ' ', 'N', 'O', ' ', ' ', 'R', 'O', 'T', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
];

const occupiers3 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
  0, 1, 1, 0, 0, 2, 2, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const instructions3 = [
  'All the words you form, using your tiles or the opponent\'s tiles, must be valid.',
  'Playing TALON here is allowed because TALON, TO, OR and NO are all in the dictionary.',
  'The rules are similar to Scrabble or Words With Friends.',
];

const letters4 = [
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'H', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'O', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ',
  'T', 'A', 'X', 'I', ' ', ' ', ' ', 'E', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
];

const occupiers4 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  1, 1, 1, 1, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const instructions4 = [
  'Unlike Scrabble, you can place your tiles anywhere on the board.',
  'Your move does not need to connect to any tiles already on the board.',
  'HORSE is a valid move by the blue player.',
];

const letters5 = [
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', 'I', ' ', ' ', ' ', ' ', ' ',
  'P', 'A', 'I', 'N', 'T', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', 'E', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', 'M', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
];

const occupiers5 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 3, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const instructions5 = [
  'You may place a tile over an opponent\'s tile, but only if the letter matches.',
  'Here the blue player has placed his own T over the opponent\'s T.',
  'This tile can now form part of a winning path for either player.',
];

const letters6 = [
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

const occupiers6 = [
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

const instructions6 = [
  'To play a word, click on the starting tile and then type the letters.  Hit enter to submit.',
  'Click on the arrow at the top right of a cell to change the typing direction.',
  'Learn about other keyboard shortcuts in the Keyboard screen',
];

const letters7 = [
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

const occupiers7 = [
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

const instructions7 = [
  'If you end up with terrible letters, you can exchange some or all of your tiles, but it will cost a turn.',
  'To exchange, click on the letters you wish to swap out, and click the Exchange button.',
  'You will need to register a username in the Profile screen to play against a friend.',
  'Alternatively, you can always play against a bot.',
];

/*
const lettersn = [
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
];

const occupiersn = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const instructionsn = [
];
*/

const letters = [
  letters0,
  letters1,
  letters2,
  letters3,
  letters4,
  letters5,
  letters6,
  letters7,
];
const occupiers = [
  occupiers0,
  occupiers1,
  occupiers2,
  occupiers3,
  occupiers4,
  occupiers5,
  occupiers6,
  occupiers7,
];
const instructions = [
  instructions0,
  instructions1,
  instructions2,
  instructions3,
  instructions4,
  instructions5,
  instructions6,
  instructions7,
];

const Help: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();
  const [screen, setScreen] = useState<number>(0);

  const handlePrevious = () => {
    if (screen > 0) {
      setScreen((s) => (s - 1));
    }
  };

  const handleNext = () => {
    if (screen < numScreens - 1) {
      setScreen((s) => (s + 1));
    }
  };

  const screenContent = useCallback(() => {
    return (
      <div className={styles.boardContainer}>
        <SampleBoard
          cellSize={60}
          height={10}
          width={10}
          letters={letters[screen]}
          occupiers={occupiers[screen]}
        />
        <div className={styles.text}>
          <ul>
            {instructions[screen].map((inst, index) => (<li key={index}>{inst}</li>))}
          </ul>
        </div>
      </div>
    );
  }, [screen]);

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('help')} onClose={onClose} width={740}>
      <Sidebar.Section title="">
        {screenContent()}
      </Sidebar.Section>
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonContainer}>
          <SquareButton
            buttonSize={60}
            Icon={LeftArrow}
            onClick={handlePrevious}
            style={{ color: '#006600' }}
          />
          <span className={styles.buttonLabel}>Previous</span>
        </div>
        <div className={styles.buttonContainer}>
          <SquareButton
            buttonSize={60}
            Icon={RightArrow}
            onClick={handleNext}
            style={{ color: '#006600' }}
          />
          <span className={styles.buttonLabel}>Next</span>
        </div>
      </div>
    </Sidebar>
  );
};

export default Help;
