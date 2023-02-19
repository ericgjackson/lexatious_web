import { FunctionComponent } from 'react';

import { AppStore, PlayStore } from 'icons';
import { useTranslate } from 'state';

import Sidebar from '../Sidebar';

import styles from './About.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const About: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();

  return (
    <Sidebar className={className} isOpen={isOpen} title={translate('about')} onClose={onClose}>
      <Sidebar.Section title="Author">
        <span>
          Lexatious was created by Eric Jackson.
          Send questions to&nbsp;
          <a href="mailto:support@lexatious.com" target="_blank" rel="noopener noreferrer">support@lexatious.com</a>.
        </span>
        <br />
        <br />
        <span>
          The user interface and source code for the web front end is based on&nbsp;
          <a
            className={styles.anchor}
            href="https://scrabble-solver.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Scrabble Solver 2
          </a>
          &nbsp;by&nbsp;
          <a
            className={styles.anchor}
            href="https://kamilmielnik.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kamil Mielnik
          </a>.
        </span>
      </Sidebar.Section>
      <Sidebar.Section title="Apps">
        <div className={styles.appLinks}>
          <a href="https://apps.apple.com/us/app/lexatious/id1614332855" target="_blank" rel="noopener noreferrer">
            <AppStore />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.egjackson.lexatious"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayStore width={120} />
          </a>
        </div>
      </Sidebar.Section>
      <Sidebar.Section title="Technologies">
        <ul>
          <li>React</li>
          <li>React Redux</li>
          <li>Redux-Saga</li>
          <li>Next.js</li>
        </ul>
      </Sidebar.Section>
    </Sidebar>
  );
};

export default About;
