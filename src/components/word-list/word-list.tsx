import { FC, useMemo } from 'react';
import type { Card, Word } from '../../store/store.types';
import styles from './word-list.module.css';
import { randomInteger } from '../../utils/utils';
import WordItem from './word-item';

interface WordListProps {
  formValues: Card
  setFormValues: React.Dispatch<React.SetStateAction<Card | null>>
}

const newWord: Word = {
  learnWord: '',
  translate: {
    en: '',
    ru: ''
  }
};

const WordList: FC<WordListProps> = (props) => {
  const {formValues, setFormValues} = props;
  const stableListKeys: string[] = useMemo(() => [], []);

  const createStableKey = (index: number) => {
    stableListKeys[index] = '' + randomInteger();
    return stableListKeys[index];
  };

  const handleButton = () => {
    setFormValues((state: Card | null): Card | null => {
      if (!state) return state;

      const newState = structuredClone(state);
      newState.words.push(newWord);

      return newState;
    });
  };

  return (
    <ul className={styles.wordList}>
      {formValues.words.map((word, index) => (
        <li
          className={styles.item}
          key={`li-${stableListKeys[index]
            ? stableListKeys[index]
            : createStableKey(index)}-${index}`
          }
        >
          <WordItem
            formValues={formValues}
            setFormValues={setFormValues}
            word={word}
            index={index}
          />
        </li>
      ))}
      {formValues.words.length < 20 && <li className={styles.item}>
        <button
          className={styles.addButton}
          type="button"
          title="Добавить слово"
          onClick={() => handleButton()}
        ></button>
      </li>}
    </ul>
  );
};

export default WordList;
