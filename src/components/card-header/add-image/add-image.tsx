import { FC, useState } from 'react';
import { addImage } from '../../../services/firebase';
import { fileToBlob } from '../../../utils/utils';
import styles from './add-image.module.css';

interface AddImageProps {
  cardsId: string | undefined
  isAddImage: boolean
  setIsAddImage: React.Dispatch<React.SetStateAction<boolean>>
}

const AddImage: FC<AddImageProps> = (props) => {
  const {cardsId, isAddImage, setIsAddImage} = props;
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [blobImage, setBlobImage] = useState<string | ArrayBuffer | null>(null);

  const handleInput = async (files: FileList | null) => {
    if (!files) return;
    if (files[0].type !== 'image/png'
      && files[0].type !== 'image/jpg'
      && files[0].type !== 'image/jpeg'
    ) return;

    setRawFile(files[0]);

    const image = await fileToBlob(files[0]);
    image && setBlobImage(image);
  };

  const handleAddButton = async () => {
    if (cardsId && rawFile) {
      await addImage(cardsId, rawFile);
      setIsAddImage(!isAddImage);
      setRawFile(null);
      setBlobImage(null);
    }
  };

  return (
    <label 
      className={styles.addImageLabel}
      tabIndex={0}
      style={blobImage ? {
        backgroundImage: `url('${blobImage}')`,
        backgroundSize: 'cover'
      } : {}}
    >
      <input
        className={styles.addImageInput}
        type="file"
        name="add-image"
        accept={".png, .jpg, .jpeg"}
        onChange={(e) => handleInput(e.target.files)}
      />
      {blobImage && <button
        className={styles.addImageButton}
        type="button"
        onClick={handleAddButton}
      >Добавить</button>}
    </label>
  );
};

export default AddImage;
