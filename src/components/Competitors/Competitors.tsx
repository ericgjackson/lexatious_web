import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { selectPlayer, useTypedSelector } from 'state';

import styles from './Competitors.module.scss';

interface Props {
  height: number;
  player0Name: string;
  player1Name: string;
  width: number;
}

const Competitors: FunctionComponent<Props> = ({
  height,
  player0Name,
  player1Name,
  width,
}) => {
  const player = useTypedSelector(selectPlayer);
  // 16px font * 1.5 for h2 * 1.5 for line height = 36
  const varStyle = { minHeight: height };
  const messageStyle = {
    fontWeight: 'bold',
    fontSize: height >= 36 ? '24px' : '16px',
  };
  if (!player1Name && player0Name === 'You') {
    return (
      <div
        className={classNames(styles.competitorsOuterContainer, {
          [styles.p0color]: true,
        })}
        style={varStyle}
      />
    );
  }
  return (
    <div className={styles.competitorsOuterContainer} style={varStyle}>
      <div className={styles.competitorsInnerContainer} style={{ width }}>
        <div
          className={classNames(styles.competitorContainer, {
            [styles.p0color]: player !== 1,
            [styles.p1color]: player === 1,
          })}
        >
          <span
            style={messageStyle}
          >
            {player0Name}
          </span>
        </div>
        <div
          className={classNames(styles.competitorContainer, {
            [styles.p0color]: player === 1,
            [styles.p1color]: player !== 1,
          })}
        >
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
