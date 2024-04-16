import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends PureComponent {
  state = {
    isModalOpen: false,
    largeImg: '',
  };

  showModal = largeImageURL => {
    this.setState({ isModalOpen: true, largeImg: largeImageURL });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { tags, webformatURL, largeImageURL, id } = this.props;
    const { isModalOpen, largeImg } = this.state;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          loading="lazy"
          id={id}
          onClick={() => {
            this.showModal(largeImageURL);
          }}
        />

        {isModalOpen && (
          <Modal url={largeImg} tags={tags} onClose={this.closeModal} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  id: PropTypes.number,
};

export default ImageGalleryItem;
