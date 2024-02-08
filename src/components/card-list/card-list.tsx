import { FC, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCardsSelector } from '../../store/selectors';
import { randomInteger } from '../../utils/utils';
import styles from './card-list.module.css';

const CardList: FC = () => {
  const cards = useSelector(getCardsSelector);
  const stableListKeys: string[] = useMemo(() => [], []);
  const [isHide, setIsHide] = useState<boolean>(false);

  const createStableKey = (index: number) => {
    stableListKeys[index] = '' + randomInteger();
    return stableListKeys[index];
  };

  const handleHideButton = () => {
    setIsHide(!isHide);
  };

  return (
    <section className={isHide ? `${styles.cardList} ${styles.hide}` : styles.cardList}>
      <button
        className={styles.closeButton}
        type='button'
        onClick={handleHideButton}
      >
        {isHide ? ' > ' : ' < '}
      </button>
      <ul className={styles.list} {...{inert: isHide ? '' : undefined}}>
        {cards?.map((card, index) => (
          <li
            className={styles.item}
            key={`li-${stableListKeys[index]
              ? stableListKeys[index]
              : createStableKey(index)}-${index}`
            }
            style={{backgroundImage: `url('${card.coverImage}')`}}
          >
            <NavLink
              className={styles.navLink}
              to={`/${index + 1}`}
              title={card.title.ru}
              style={{color: card.configs.titleStyle.color}}
            >
              <span>{card.title.ru}</span>
            </NavLink>
            <Link className={styles.link} to={`/${index + 1}/edit`}>
              <svg className={styles.icon} style={{fill: card.configs.titleStyle.color}} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 612.032 612.032">
                <g>
                  <path d="M602.905,152.23l-60.41,60.411L399.378,69.523L459.76,9.112c20.503-20.503,41.006,0,41.006,0l102.14,102.111
                    C602.905,111.225,623.408,131.728,602.905,152.23z M0.015,612.032l173.51-30.451L30.09,438.146L0.015,612.032z M50.211,418.679
                    l143.137,143.137L520.52,234.645L377.383,91.508L50.211,418.679z"/>
                </g>
              </svg>
            </Link>
          </li>
        ))}
        <li className={styles.item}>
          <Link className={styles.newCardLink} to={'/new-card'}></Link>
        </li>
      </ul>
    </section>
  );
};

export default CardList;
