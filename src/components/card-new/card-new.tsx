import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useAppSelector } from '../../hooks/redux-hook';
import { useNavigate } from 'react-router-dom';
import { getUserSelector } from '../../store/selectors';
import type { Card, Word } from '../../store/store.types';
import { addCard } from '../../services/firebase';
import styles from './card-new.module.css';
import WordList from '../word-list';
import CardHeader from '../card-header';
import Loader from '../loader';

const newWord: Word = {
  learnWord: '',
  translate: {
    en: '',
    ru: ''
  }
};

const newCard: Card = {
  configs: {
    cardStyle: {
      color: '#20253e',
      type: 'block'
    },
    titleStyle: {
      color: '#858a9f'
    }
  },
  coverImage: ``,
  title: {
    en: '',
    ru: ''
  },
  words: new Array(5).fill({}).map(() => (structuredClone(newWord)))
};

const CardNew: FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getUserSelector);
  const [formValues, setFormValues] = useState<Card | null>(null);

  useEffect(() => {
    setFormValues(newCard);
  }, []);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && formValues) addCard(user.cardsId, formValues).then(() => navigate('/'));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((state: Card | null): Card | null => {
      if (!state) return state;
      
      const newState = structuredClone(state);
      newState.configs.cardStyle.color = e.target.value;

      return newState;
    });
  };

  return (
    <section className={styles.cardEdit}>
      {formValues ? <form className={styles.form} onSubmit={handleForm}>
        <CardHeader user={user} formValues={formValues} setFormValues={setFormValues} />
        <input
          className={styles.listColor}
          type="color"
          value={formValues.configs.cardStyle.color}
          onChange={(e) => handleInput(e)}
        />
        <WordList formValues={formValues} setFormValues={setFormValues} />
        <div className={styles.buttons}>
          {formValues.words.length >= 5 && formValues.words.length <= 20
            && <button className={styles.button} type="submit">Добавить</button>
          }
        </div>
      </form>: <Loader />}
    </section>
  );
};

export default CardNew;
