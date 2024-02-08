import { useMemo } from 'react';
import type { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hook';
import { randomInteger } from '../../utils/utils';
import styles from './card.module.css';
import Loader from '../loader';
import NotFound from '../not-found';
import { getCardsSelector } from '../../store/selectors';

const Card: FC = () => {
  const {idCard} = useParams();
  const cards = useAppSelector(getCardsSelector);
  const stableListKeys: string[] = useMemo(() => [], []);
  const card = cards?.[Number(idCard) - 1];

  const createStableKey = (index: number) => {
    stableListKeys[index] = '' + randomInteger();
    return stableListKeys[index];
  };

  return (
    <section className={styles.card}>
      {card ? <>
        <div
          className={styles.wrapper}
          style={{backgroundImage: `url('${card.coverImage}')`}}
        >
          <h2
            className={styles.title}
            style={{color: card.configs.titleStyle.color}}
            title={card.title.ru}
          ><span>{card.title.ru}</span></h2>
          <hr
            className={styles.delimeter}
            style={{backgroundColor: card.configs.titleStyle.color}}
          />
        </div>
        <ul className={styles.list}>
          {card.words.map((word, index) => (
            <li 
              className={styles.item}
              key={`li-${stableListKeys[index]
                ? stableListKeys[index]
                : createStableKey(index)}-${index}`
              }
            >
              <details className={styles.details}>
                <summary className={styles.summary}>
                  <h3 className={styles.learnWordTitle}>{word.learnWord}</h3>
                </summary>
                <div className={styles.detailsWrapper}>
                  <p className={styles.translate}><span>en:</span>{word.translate.en}</p>
                  <p className={styles.translate}><span>ru:</span>{word.translate.ru}</p>
                </div>
              </details>
            </li>
          ))}
        </ul>
        <Link className={styles.link} to={`/${idCard}/edit`}>Редактировать</Link>
      </> : Number(idCard) ? <Loader /> : <NotFound />}
    </section>
  );
};

export default Card;
