import { FunctionComponent } from 'react';

import { About, Help, Keyboard, Profile, Statistics, Trophy } from 'icons';
import { useTranslate } from 'state';

import SquareButton from '../SquareButton';

import styles from './NavButtons.module.scss';

interface Props {
  onShowAbout: () => void;
  onShowAchievements: () => void;
  onShowHelp: () => void;
  onShowKeyMap: () => void;
  onShowProfile: () => void;
  onShowStatistics: () => void;
}

const NavButtons: FunctionComponent<Props> = ({
  onShowAbout,
  onShowAchievements,
  onShowHelp,
  onShowKeyMap,
  onShowProfile,
  onShowStatistics,
}) => {
  const translate = useTranslate();

  return (
    <div className={styles.navButtons}>
      <SquareButton
        className={styles.button}
        Icon={Profile}
        style={{ color: '#4CAF50' }}
        tooltip={translate('profile')}
        onClick={onShowProfile}
      />

      <SquareButton
        className={styles.button}
        Icon={Statistics}
        tooltip={translate('statistics')}
        onClick={onShowStatistics}
      />

      <SquareButton
        className={styles.button}
        Icon={Trophy}
        tooltip={translate('achievements')}
        onClick={onShowAchievements}
      />

      <SquareButton
        className={styles.button}
        Icon={Keyboard}
        style={{ color: '#A9A9A9' }}
        tooltip={translate('keyMap')}
        onClick={onShowKeyMap}
      />

      <SquareButton
        className={styles.button}
        Icon={About}
        style={{ color: '#1E90FF' }}
        tooltip={translate('about')}
        onClick={onShowAbout}
      />

      <SquareButton
        className={styles.button}
        Icon={Help}
        style={{ color: '#006600' }}
        tooltip={translate('help')}
        onClick={onShowHelp}
      />
    </div>
  );
};

export default NavButtons;
