import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ tags, webformatURL, largeImageURL, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  const showModal = largeImageURL => {
    setIsModalOpen(true);
    setLargeImg(largeImageURL);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        loading="lazy"
        id={id}
        onClick={() => {
          showModal(largeImageURL);
        }}
      />

      {isModalOpen && <Modal url={largeImg} tags={tags} onClose={closeModal} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  id: PropTypes.number,
};

export default ImageGalleryItem;
