import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { useInterval } from 'hooks';
import { getUpdateSlice } from 'state';

interface Props {
  delay: number;
}

const WaitingForOpponent: FunctionComponent<Props> = ({ delay }) => {
  const dispatch = useDispatch();
  useInterval(() => {
    dispatch(getUpdateSlice.actions.submit());
  }, delay);

  return (<></>);
};

export default WaitingForOpponent;
