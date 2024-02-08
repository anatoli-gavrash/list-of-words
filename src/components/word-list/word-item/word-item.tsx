import { FC, useState } from 'react';
import styles from './word-item.module.css';
import { Card, Word } from '../../../store/store.types';

interface WordItemProps {
  formValues: Card
  setFormValues: React.Dispatch<React.SetStateAction<Card | null>>
  word: Word
  index: number
}

type InputTypes = 'learn-word' | 'translate-en' | 'translate-ru'

const WordItem: FC<WordItemProps> = (props) => {
  const {formValues, setFormValues, word, index} = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: InputTypes,
    index: number
  ) => {
    setFormValues((state: Card | null): Card | null => {
      if (!state) return state;

      const newState = structuredClone(state);
      switch (field) {
        case 'learn-word':
          newState.words[index].learnWord = e.target.value;
          return newState;
        case 'translate-en':
          newState.words[index].translate.en = e.target.value;
          return newState;
        case 'translate-ru':
          newState.words[index].translate.ru = e.target.value;
          return newState;
        default:
          return state;
      }
    });
  };

  const handleButton = (index: number) => {
    setFormValues((state: Card | null): Card | null => {
      if (!state) return state;
      
      const newState = structuredClone(state);
      newState.words = newState.words.filter((word, wordIndex) => wordIndex !==  index);

      return newState;
    });
  };

  return (
    <div
      className={isOpen ? `${styles.wrapper} ${styles.open}` : styles.wrapper}
      style={{color: formValues.configs.cardStyle.color}}
    >
      <div className={styles.titleWrapper} onClick={() => setIsOpen(!isOpen)}>
        <button className={styles.button} type="button" onClick={() => setIsOpen(!isOpen)}></button>
        <input
          className={styles.learnWordTitle}
          type="text"
          name="word-title"
          value={word.learnWord}
          placeholder="Frase en español"
          minLength={2}
          maxLength={50}
          pattern={"[A-Za-zÑñ].*"}
          required
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleInput(e, 'learn-word', index)}
          style={{color: formValues.configs.cardStyle.color}}
        />
        {formValues.words.length > 5 && <button
          className={styles.deleteWord}
          type="button"
          onClick={() => handleButton(index)}
        ></button>}
      </div>
      <div className={styles.translateWrapper}>
        <label className={styles.label}>
          <span>en:</span>
          <input
            className={styles.translate}
            type="text"
            name="translate-en"
            value={word.translate.en}
            minLength={2}
            maxLength={50}
            pattern={"[A-Za-z].*"}
            required
            placeholder="English translation"
            onChange={(e) => handleInput(e, 'translate-en', index)}
            onFocus={() => setIsOpen(true)}
            style={{color: formValues.configs.cardStyle.color}}
          />
        </label>
        <label className={styles.label}>
          <span>ru:</span>
          <input
            className={styles.translate}
            type="text"
            name="translate-ru"
            value={word.translate.ru}
            minLength={2}
            maxLength={50}
            pattern={"[А-Яа-яЁё].*"}
            required
            placeholder="Перевод на русский"
            onChange={(e) => handleInput(e, 'translate-ru', index)}
            onFocus={() => setIsOpen(true)}
            style={{color: formValues.configs.cardStyle.color}}
          />
        </label>
      </div>
    </div>
  );
};

export default WordItem;
