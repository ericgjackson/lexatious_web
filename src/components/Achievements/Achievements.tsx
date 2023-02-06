import { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Check, X } from 'icons';
import { getAchievementsSlice, selectAchievements, useTranslate, useTypedSelector } from 'state';

import Sidebar from '../Sidebar';

import styles from './Achievements.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Achievements: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const achievements = useTypedSelector(selectAchievements);

  // Need for this to be dependent on the device ID
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    dispatch(getAchievementsSlice.actions.submit());
  }, [isOpen]);

  const tableBody = achievements.map((achievement, index) => {
    return (
      <tr key={index}>
        <td>
          <div className={styles.iconContainer}>
            {achievement.achieved ? <Check className={styles.checkIcon} /> : <X className={styles.xIcon} />}
          </div>
        </td>
        <td className={achievement.achieved ? styles.achievedText : styles.notAchievedText}>
          {achievement.title}
        </td>
        <td className={achievement.achieved ? styles.achievedText : styles.notAchievedText}>
          {achievement.description}
        </td>
      </tr>
    );
  });

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('achievements')} onClose={onClose}>
      <Sidebar.Section title="">
        <table className={styles.table}>
          <thead>
            <tr>
              <td className={styles.header} />
              <td className={styles.header}>Title</td>
              <td className={styles.header}>Description</td>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </Sidebar.Section>
    </Sidebar>
  );
};

export default Achievements;
