import classNames from 'classnames';
import {
  ButtonHTMLAttributes,
  CSSProperties,
  FunctionComponent,
  MouseEventHandler,
  SVGAttributes,
} from 'react';

import { useTooltip } from '../Tooltip';

import Link from './Link';
import styles from './SquareButton.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSize: number;
  children?: never;
  Icon: FunctionComponent<SVGAttributes<SVGElement>>;
  style?: CSSProperties;
  tooltip?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SquareButton: FunctionComponent<Props> = ({
  buttonSize,
  className,
  Icon,
  style,
  tooltip,
  ...props
}) => {
  const triggerProps = useTooltip(tooltip, props);
  const varIconStyle = {height: buttonSize, width: buttonSize};

  return (
    <button
      className={classNames(styles.squareButton, className)}
      style={style}
      type="button"
      {...props}
      {...triggerProps}
    >
      <span className={styles.content}>
        <Icon className={styles.icon} style={varIconStyle} />
      </span>
    </button>
  );
};

export default Object.assign(SquareButton, {
  Link,
});
