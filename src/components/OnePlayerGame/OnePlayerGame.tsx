import { FunctionComponent, useState } from 'react';

import { useTranslate } from 'state';

import Checkbox from '../Checkbox';
import Sidebar from '../Sidebar';

import { BotSetting } from './components';
import styles from './OnePlayerGame.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const OnePlayerGame: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();
  const [opponentGoesFirst, setOpponentGoesFirst] = useState<boolean>(false);

  const handleChange = () => {
    setOpponentGoesFirst(!opponentGoesFirst);
  };

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('singlePlayerGame')} onClose={onClose}>
      <Sidebar.Section title={translate('settings.bot')}>
        <BotSetting onClose={onClose} opponentGoesFirst={opponentGoesFirst} />
      </Sidebar.Section>
      <Sidebar.Section title="">
        <Checkbox name="Opponent Goes First" id="OpponentGoesFirst" checked={opponentGoesFirst} onChange={handleChange}>
          <div className={styles.label}>Opponent Goes First</div>
        </Checkbox>
      </Sidebar.Section>
    </Sidebar>
  );
};

export default OnePlayerGame;
