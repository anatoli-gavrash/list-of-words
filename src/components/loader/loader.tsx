import { FC } from 'react';
import styles from './loader.module.css';

const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.content}></span>
    </div>
  );
};

export default Loader;