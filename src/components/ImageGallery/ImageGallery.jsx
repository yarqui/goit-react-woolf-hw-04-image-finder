import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ pictures }) => {
  const scrollToNextResult = () => {
    window.scrollBy({
      top: 560,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToNextResult();
  }, [pictures]);

  return (
    <ul className={s.ImageGallery}>
      {pictures?.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = { pictures: PropTypes.arrayOf(PropTypes.object) };

export default ImageGallery;
