import styles from './BotSetting.module.scss';

interface Option {
  className: string;
  image: string;
  label: string;
  value: string;
}

const options: Option[] = [
  {
    className: styles.panda,
    image: './panda100.png',
    label: 'Patrick Panda',
    value: 'Patrick Panda',
  },
  {
    className: styles.elephant,
    image: './elephant100.png',
    label: 'Ellen Elephant',
    value: 'Ellen Elephant',
  },
  {
    className: styles.owl,
    image: './owl100.png',
    label: 'Oliver Owl',
    value: 'Oliver Owl',
  },
  {
    className: styles.raven,
    image: './raven100.png',
    label: 'Rebecca Raven',
    value: 'Rebecca Raven',
  },
];

export default options;
