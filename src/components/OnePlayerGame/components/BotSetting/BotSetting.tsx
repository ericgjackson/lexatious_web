import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { Elephant, Owl, Panda, Raven } from 'icons';
import { newGameSlice } from 'state';

import SquareButton from '../../../SquareButton';

import styles from './BotSetting.module.scss';

interface Props {
  className?: string;
  onClose: () => void;
  opponentGoesFirst: boolean;
}

const BotSetting: FunctionComponent<Props> = ({ className, onClose, opponentGoesFirst }) => {
  const dispatch = useDispatch();

  const handleClick = (opponentName: string) => {
    dispatch(newGameSlice.actions.submit({ opponentName, opponentGoesFirst }));
    onClose();
  };

  return (
    <div className={classNames(className, styles.botColumns)}>
      <div className={styles.botColumn}>
        <div className={styles.botIconContainer}>
          <SquareButton
	    buttonSize={60}
            className={classNames(styles.button)}
            Icon={Panda}
            onClick={() => {
              handleClick('Patrick Panda');
            }}
          />
        </div>
        <div className={styles.botIconContainer}>
          <SquareButton
	    buttonSize={60}
            className={classNames(styles.button)}
            Icon={Elephant}
            onClick={() => {
              handleClick('Ellen Elephant');
            }}
          />
        </div>
        <div className={styles.botIconContainer}>
          <SquareButton
	    buttonSize={60}
            className={classNames(styles.button)}
            Icon={Owl}
            onClick={() => {
              handleClick('Oliver Owl');
            }}
          />
        </div>
        <div className={styles.botIconContainer}>
          <SquareButton
	    buttonSize={60}
            className={classNames(styles.button)}
            Icon={Raven}
            onClick={() => {
              handleClick('Rebecca Raven');
            }}
          />
        </div>
      </div>
      <div className={styles.botColumn}>
        <div className={styles.botLabelContainer}>
          <span>Patrick Panda</span>
        </div>
        <div className={styles.botLabelContainer}>
          <span>Ellen Elephant</span>
        </div>
        <div className={styles.botLabelContainer}>
          <span>Oliver Owl</span>
        </div>
        <div className={styles.botLabelContainer}>
          <span>Rebecca Raven</span>
        </div>
      </div>
    </div>
  );
};

export default BotSetting;
