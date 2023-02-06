import { FunctionComponent, SVGAttributes } from 'react';

import { Locale } from 'ltypes';

export interface Option {
  className: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>>;
  label: string;
  value: Locale;
}
