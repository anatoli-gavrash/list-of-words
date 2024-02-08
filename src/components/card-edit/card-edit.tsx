import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCardsSelector, getUserSelector } from '../../store/selectors';
import type { Card } from '../../store/store.types';
import styles from './card-edit.module.css';
import { deleteCard, updateCard } from '../../services/firebase';
import WordList from '../word-list';
import CardHeader from '../card-header';
import NotFound from '../not-found';
import Loader from '../loader';

const CardEdit: FC = () => {
  const {idCard} = useParams();
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);
  const cards = useSelector(getCardsSelector);
  const card = cards?.[Number(idCard) - 1];
  const [formValues, setFormValues] = useState<Card | null>(null);

  useEffect(() => {
    card && setFormValues(card);
  }, [card]);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && card && formValues) updateCard(user.cardsId, card, formValues);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((state: Card | null): Card | null => {
      if (!state) return state;
      
      const newState = structuredClone(state);
      newState.configs.cardStyle.color = e.target.value;

      return newState;
    });
  };

  const handleDeleteButton = () => {
    if (user && card) deleteCard(user?.cardsId, card).then(() => navigate('/'));
  };

  return (
    <section className={styles.cardEdit}>
      {formValues ? <form className={styles.form} onSubmit={handleForm}>
        <CardHeader user={user} formValues={formValues} setFormValues={setFormValues}/>
        <input
          className={styles.listColor}
          type="color"
          value={formValues.configs.cardStyle.color}
          onChange={(e) => handleInput(e)}
        />
        <WordList formValues={formValues} setFormValues={setFormValues} />
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
            onClick={handleDeleteButton}
          >Удалить</button>
          {formValues.words.length >= 5 && formValues.words.length <= 20
            && <button className={styles.button} type="submit">Применить</button>
          }
        </div>
      </form> : Number(idCard) ? <Loader /> : <NotFound />}
    </section>
  );
};

export default CardEdit;
