import { FunctionComponent } from 'react';

import { useTranslate } from 'state';

import Sidebar from '../Sidebar';

import { Mapping } from './components';
import { ARROWS, BACKSPACE, CTRL, DEL, ENTER } from './keys';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const KeyMap: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('keyMap')} onClose={onClose}>
      <Sidebar.Section title={translate('keyMap.board-and-rack')}>
        <Mapping description={translate('keyMap.board-and-rack.navigate')} mapping={[ARROWS]} />
        <Mapping description={translate('keyMap.board-and-rack.remove-tile')} mapping={[DEL, BACKSPACE]} />
        <Mapping description={translate('keyMap.board-and-rack.submit')} mapping={[ENTER]} />
      </Sidebar.Section>

      <Sidebar.Section title={translate('keyMap.board')}>
        <Mapping description={translate('keyMap.board.toggle-direction')} mapping={[[CTRL, ARROWS]]} />
      </Sidebar.Section>
    </Sidebar>
  );
};

export default KeyMap;
