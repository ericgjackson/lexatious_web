import { FunctionComponent } from 'react';

import styles from './Competitors.module.scss';

interface Props {
  height: number;
  player0Name: string;
  player1Name: string;
  width: number;
}

const Competitors: FunctionComponent<Props> = ({ height, player0Name, player1Name, width }) => {
  // 16px font * 1.5 for h2 * 1.5 for line height = 36
  const varStyle = { minHeight: height };
  const messageStyle = {
    fontWeight: 'bold',
    fontSize: height >= 36 ? '24px' : '16px',
  };
  if (!player1Name && player0Name === 'You') {
    return (
      <div className={styles.competitorsOuterContainer} style={varStyle} />
    );
  }
  return (
    <div className={styles.competitorsOuterContainer} style={varStyle}>
      <div className={styles.competitorsInnerContainer} style={{ width }}>
        <div className={styles.competitor0Container}>
          <span
            style={messageStyle}
          >
            {player0Name}
          </span>
        </div>
        <div className={styles.competitor1Container}>
          <span
            style={messageStyle}
          >
            {player1Name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Competitors;
