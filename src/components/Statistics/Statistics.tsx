import { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getStatisticsSlice, selectStatistics, useTranslate, useTypedSelector } from 'state';

import Sidebar from '../Sidebar';

import styles from './Statistics.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface SingleOpponentStats {
  opponent: string;
  wins: number;
  losses: number;
}

const Statistics: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const statistics = useTypedSelector(selectStatistics);

  // Need for this to be dependent on the device ID
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    dispatch(getStatisticsSlice.actions.submit());
  }, [isOpen]);

  const isBotName = (oppStats: SingleOpponentStats) => {
    return (
      oppStats.opponent === 'Patrick Panda' ||
      oppStats.opponent === 'Ellen Elephant' ||
      oppStats.opponent === 'Oliver Owl' ||
      oppStats.opponent === 'Rebecca Raven'
    );
  };

  const isHumanName = (oppStats: SingleOpponentStats) => {
    return !isBotName(oppStats);
  };

  const botTableBody = statistics.filter((os) => isBotName(os)).map((oppStats, index) => {
    return (
      <tr key={index}>
        <td>{oppStats.opponent}</td>
        <td>{oppStats.wins}</td>
        <td>{oppStats.losses}</td>
      </tr>
    );
  });

  const humanTableBody = statistics.filter((os) => isHumanName(os)).map((oppStats, index) => {
    return (
      <tr key={index}>
        <td>{oppStats.opponent}</td>
        <td>{oppStats.wins}</td>
        <td>{oppStats.losses}</td>
      </tr>
    );
  });

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('statistics')} onClose={onClose}>
      <Sidebar.Section title={translate('againstBots')}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td className={styles.header}>Opponent</td>
              <td className={styles.header}>Wins</td>
              <td className={styles.header}>Losses</td>
            </tr>
          </thead>
          <tbody>
            {botTableBody}
          </tbody>
        </table>
      </Sidebar.Section>
      <Sidebar.Section title={translate('againstHumans')}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td className={styles.header}>Opponent</td>
              <td className={styles.header}>Wins</td>
              <td className={styles.header}>Losses</td>
            </tr>
          </thead>
          <tbody>
            {humanTableBody}
          </tbody>
        </table>
      </Sidebar.Section>
    </Sidebar>
  );
};

export default Statistics;
