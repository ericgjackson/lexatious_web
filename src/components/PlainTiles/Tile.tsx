import { FunctionComponent } from 'react';

interface Props {
  character: string;
  className?: string;
  color: string;
  size: number;
  transform?: string;
  x: number;
  y: number;
}

const Tile: FunctionComponent<Props> = ({ character, className, color, size, transform, x, y }) => (
  <g className={className} transform={transform}>
    <rect fill={color} height={size} width={size} x={x} y={y} />

    <text
      dominantBaseline="central"
      style={{ fill: '#FFFFFF' }}
      fontFamily="Open Sans"
      fontSize={0.6 * size}
      fontWeight="bold"
      textAnchor="middle"
      x={x + size / 2}
      y={y + size / 2}
    >
      {character}
    </text>
  </g>
);

export default Tile;
