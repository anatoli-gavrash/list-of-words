import { FC, useEffect, useMemo, useState } from 'react';
import type { Card, User } from '../../store/store.types';
import { getImageLinks } from '../../services/firebase';
import { randomInteger } from '../../utils/utils';
import styles from './card-header.module.css';
import AddImage from './add-image';

interface CardHeaderProps {
  user: User | null
  formValues: Card
  setFormValues: React.Dispatch<React.SetStateAction<Card | null>>
}

type InputTypes = 'title-color' | 'title' | 'cover-image'

const CardHeader: FC<CardHeaderProps> = (props) => {
  const {user, formValues, setFormValues} = props;
  const stableListKeys: string[] = useMemo(() => [], []);
  const [isAddImage, setIsAddImage] = useState(false);
  const [isCoverImagesOpen, setIsCoverImagesOpen] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getImageLinks().then((res) => res && setImages(res));
  }, [isAddImage]);

  const createStableKey = (index: number) => {
    stableListKeys[index] = '' + randomInteger();
    return stableListKeys[index];
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: InputTypes,
  ) => {
    setFormValues((state: Card | null): Card | null => {
      if (!state) return state;

      const newState = structuredClone(state);
      switch (field) {
        case 'title-color':
          newState.configs.titleStyle.color = e.target.value;
          return newState;
        case 'title':
          newState.title.ru = e.target.value;
          return newState;
        case 'cover-image':
          newState.coverImage = e.target.value;
          return newState;
        default:
          return state;
      }
    });
  };

  return (
    <div
      className={styles.cardHeader}
      style={{backgroundImage: `url("${formValues.coverImage}")`}}
    >
      <div className={styles.titleWrapper}>
        <input
          className={styles.titleColor}
          type="color"
          value={formValues.configs.titleStyle.color}
          onChange={(e) => handleInput(e, 'title-color')}
        />
        <input
          className={styles.title}
          type="text"
          name="title"
          value={formValues.title.ru}
          placeholder="Заголовок"
          minLength={2}
          maxLength={50}
          pattern={"[А-Яа-яЁё].*"}
          required
          onChange={(e) => handleInput(e, 'title')}
          style={{color: formValues.configs.titleStyle.color}}
        />
      </div>
      <hr
        className={styles.delimeter}
        style={{backgroundColor: formValues.configs.titleStyle.color}}
      />
      <div className={styles.imageListWrapper}>
        <button
          className={isCoverImagesOpen
            ? `${styles.imageListButton} ${styles.active}`
            : styles.imageListButton
          }
          type="button"
          onClick={() => setIsCoverImagesOpen(!isCoverImagesOpen)}
          style={{color: formValues.configs.titleStyle.color}}
        ></button>
        <div
          className={isCoverImagesOpen ? `${styles.imageList} ${styles.open}` : styles.imageList}
          {...{inert: isCoverImagesOpen ? undefined : ''}}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>
          ) => e.target.name !== 'add-image' ? handleInput(e, 'cover-image') : null}
        >
          <AddImage cardsId={user?.cardsId} isAddImage={isAddImage} setIsAddImage={setIsAddImage} />
          {images.map((imageUrl, index) => (
            <label
              className={styles.imageListLabel}
              key={`img-${stableListKeys[index]
                ? stableListKeys[index]
                : createStableKey(index)}-${index}`
              }
              style={{backgroundImage: `url("${imageUrl}")`}}
            >
              <input
                className={styles.imageListRadio}
                type="radio"
                name={`cover-image`}
                value={imageUrl}
                defaultChecked={imageUrl === formValues.coverImage}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
