import { CSSProperties, FunctionComponent } from 'react';

import PlainTiles from '../PlainTiles';

interface Props {
  className?: string;
  style?: CSSProperties;
}

/* const CONTENT = [['SCRABBLE'], ['SOLVER', '2']]; */
const CONTENT = [['LEXATIOUS']];

const Logo: FunctionComponent<Props> = ({ className, style }) => (
  <PlainTiles className={className} content={CONTENT} style={style} />
);

export default Logo;
