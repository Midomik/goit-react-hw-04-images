import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ modalData, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyEscape);
    return () => {
      window.removeEventListener('keydown', handleKeyEscape);
    };
    /* eslint-disable */
  }, []);
  /* eslint-enable */
  const handleKeyEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const overlayClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div onClick={overlayClick} className={css.overlay}>
      <div className={css.modal}>
        <img src={modalData.largeImageURL} alt={modalData.description} />
      </div>
    </div>
  );
};
