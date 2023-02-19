import { FunctionComponent } from 'react';

import styles from './Competitors.module.scss';

interface Props {
  player0Name: string;
  player1Name: string;
  width: number;
}

const Competitors: FunctionComponent<Props> = ({ player0Name, player1Name, width }) => {
  // 16px font * 1.5 for h2 * 1.5 for line height
  const varStyle = { minHeight: 36 };
  if (!player1Name && player0Name === 'You') {
    return (
      <div className={styles.competitorsOuterContainer} style={varStyle} />
    );
  }
  return (
    <div className={styles.competitorsOuterContainer} style={varStyle}>
      <div className={styles.competitorsInnerContainer} style={{ width }}>
        <div className={styles.competitor0Container}>
          <h2>{player0Name}</h2>
        </div>
        <div className={styles.competitor1Container}>
          <h2>{player1Name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Competitors;
