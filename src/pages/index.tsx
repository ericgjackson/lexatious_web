/* eslint-disable max-lines */
import classNames from 'classnames';
import fs from 'fs';
import path from 'path';
import { AnimationEvent, FormEvent, FunctionComponent, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useEffectOnce, useMeasure } from 'react-use';

import {
  About,
  Achievements,
  Board,
  Competitors,
  FirstTime,
  GameButtons,
  Help,
  KeyMap,
  Logo,
  Message,
  NavButtons,
  OnePlayerGame,
  Profile,
  Rack,
  Splash,
  Statistics,
  TwoPlayerGame,
  WaitingForOpponent,
} from 'components';
import { useLocalStorage } from 'hooks';
import { getDims } from 'lib';
import {
  boardSlice,
  concedeSlice,
  exchangeSlice,
  initialize,
  invalidCellsSlice,
  invalidSlice,
  localStorage,
  placementsSlice,
  playSlice,
  rackSlice,
  selectActivePlayer,
  selectConfig,
  selectOpponentName,
  selectPlacements,
  selectPlayer,
  selectUsername,
  selectWinner,
  useTypedSelector,
} from 'state';


import styles from './index.module.scss';

Modal.setAppElement('#__next');

interface Props {
  version: string;
}

/* eslint-disable-next-line max-statements */
const Index: FunctionComponent<Props> = ({ version }) => {
  const dispatch = useDispatch();
  const [showAbout, setShowAbout] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showFirstTime, setShowFirstTime] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showKeyMap, setShowKeyMap] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showOnePlayerGame, setShowOnePlayerGame] = useState(false);
  const [showTwoPlayerGame, setShowTwoPlayerGame] = useState(false);
  const [boardRef, { height: boardHeight }] = useMeasure<HTMLDivElement>();
  const [indexRef, { height: indexHeight, width: indexWidth }] = useMeasure<HTMLDivElement>();
  const config = useTypedSelector(selectConfig);
  const { cellSize, rackTileSize, buttonSize } = getDims(config, indexHeight, indexWidth);
  const isInitializedInitial = boardHeight > 0;
  const [isInitialized, setIsInitialized] = useState(isInitializedInitial);
  const activePlayer = useTypedSelector(selectActivePlayer);
  const opponentName = useTypedSelector(selectOpponentName);
  const placements = useTypedSelector(selectPlacements);
  const player = useTypedSelector(selectPlayer);
  const username = useTypedSelector(selectUsername);
  const winner = useTypedSelector(selectWinner);

  const handleClear = () => {
    if (player === -1 || winner >= 0) {
      return;
    }
    const positions = placements.map((p) => {
      return ({ x: p.x, y: p.y });
    });
    dispatch(boardSlice.actions.clearCells({ positions, player }));
    dispatch(placementsSlice.actions.reset());
    dispatch(invalidCellsSlice.actions.reset());
    dispatch(invalidSlice.actions.reset());
  };

  const handleConcede = () => {
    if (player === -1 || winner >= 0) {
      return;
    }
    dispatch(concedeSlice.actions.submit());
  };

  const handleShuffle = () => {
    if (player === -1 || winner >= 0) {
      return;
    }
    dispatch(rackSlice.actions.shuffle());
  };

  const handleExchange = () => {
    if (player === -1 || winner >= 0) {
      return;
    }
    if (placements.length > 0) {
      return;
    }
    dispatch(exchangeSlice.actions.submit());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (player === -1 || winner >= 0) {
      return;
    }
    dispatch(playSlice.actions.submit());
  };

  const handleSplashAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !localStorage.getHasVisited()) {
      setShowFirstTime(true);
      localStorage.setHasVisited(true);
    }
  };

  useLocalStorage();

  useEffectOnce(() => {
    dispatch(initialize());

    setTimeout(() => {
      setIsInitialized(true);
    }, 100);
  });

  return (
    <>
      <div className={classNames(styles.index, { [styles.initialized]: isInitialized })} ref={indexRef}>
        <div className={styles.nav}>
          <div className={styles.navLogo}>
            <a className={styles.logoContainer} href="/" title={version}>
              <Logo className={styles.logo} />
            </a>
          </div>

          <NavButtons
            buttonSize={buttonSize}
            onShowAbout={() => setShowAbout(true)}
            onShowAchievements={() => setShowAchievements(true)}
            onShowHelp={() => setShowHelp(true)}
            onShowKeyMap={() => setShowKeyMap(true)}
            onShowProfile={() => setShowProfile(true)}
            onShowStatistics={() => setShowStatistics(true)}
          />
        </div>

        <Competitors
          player0Name={username || 'You'}
          player1Name={opponentName}
          width={cellSize * config.boardWidth}
        />

        <Message />

        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <form className={styles.boardContainer} onSubmit={handleSubmit}>
              {isInitialized && <Board cellSize={cellSize} innerRef={boardRef} />}
              <input className={styles.submitInput} tabIndex={-1} type="submit" />
            </form>
          </div>
        </div>

        <div className={styles.rackContainer}>
          <Rack className={styles.rack} tileSize={rackTileSize} />
        </div>

        <div className={styles.gameButtons}>
          <GameButtons
            buttonSize={buttonSize}
            onClear={handleClear}
            onConcede={handleConcede}
            onExchange={handleExchange}
            onShowOnePlayerGame={() => setShowOnePlayerGame(true)}
            onShowTwoPlayerGame={() => setShowTwoPlayerGame(true)}
            onShuffle={handleShuffle}
          />
        </div>

      </div>

      <About isOpen={showAbout} onClose={() => setShowAbout(false)} />

      <Achievements isOpen={showAchievements} onClose={() => setShowAchievements(false)} />

      <FirstTime isOpen={showFirstTime} onClose={() => setShowFirstTime(false)} setShowHelp={setShowHelp} />

      <Help isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <KeyMap isOpen={showKeyMap} onClose={() => setShowKeyMap(false)} />

      <OnePlayerGame isOpen={showOnePlayerGame} onClose={() => setShowOnePlayerGame(false)} />

      <TwoPlayerGame isOpen={showTwoPlayerGame} onClose={() => setShowTwoPlayerGame(false)} />

      <Profile isOpen={showProfile} onClose={() => setShowProfile(false)} />

      <Statistics isOpen={showStatistics} onClose={() => setShowStatistics(false)} />

      <Splash forceShow={!isInitialized} onAnimationEnd={handleSplashAnimationEnd} />

      {player >= 0 && activePlayer >= 0 && player !== activePlayer ? <WaitingForOpponent delay={1000} /> : <></>}
    </>
  );
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const version = await readVersion();
  return { props: { version } };
};

const readVersion = async (): Promise<string> => {
  const packageJsonFilepath = path.resolve(process.cwd(), 'package.json');
  const data = await fs.promises.readFile(packageJsonFilepath, 'utf-8');
  const packageJson = JSON.parse(data);
  return `v${packageJson.version}`;
};

export default Index;
