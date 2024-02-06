import { FC } from 'react';
import styles from './not-found.module.css';

const NotFound: FC = () => {
  return (
    <div className={styles.notFound}>Error 404. Page is not found!</div>
  );
};

export default NotFound;
