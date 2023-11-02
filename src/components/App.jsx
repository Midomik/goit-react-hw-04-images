import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export const App = () => {
  // state = {
  //   searchQuery: '',
  //   posts: null,
  //   isLoading: false,
  //   page: 1,
  //   totalHits: 0,
  //   isOpenModal: false,
  //   modalData: null,
  //   error: null,
  // };
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [error, setError] = useState(null);
  const firstRenderRef = useRef(true);
  const fetchPosts = query => {
    if (searchQuery !== query) {
      setSearchQuery(query);
      setPage(1);
      setPosts([]);
    }
  };

  useEffect(() => {
    if (firstRenderRef.current === true)
      return () => {
        firstRenderRef.current = false;
      };

    try {
      setIsLoading(true);

      const API_KEY = '39444105-d76e704d7b0040e55e99f4aff';
      const fetchData = async () => {
        const { data } = await axios.get(
          `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        console.log(data);
        setPosts([...posts, ...data.hits]);
        setTotalHits(data.totalHits);
      };
      fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    /* eslint-disable */
  }, [page, searchQuery]);
  /* eslint-enable */

  const loadMore = async () => {
    setPage(page + 1);
  };
  const openModal = dataModal => {
    setIsOpenModal(true);
    setModalData(dataModal);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
  };

  let isVisibleButton = false;
  if (totalHits > 12 && Math.ceil(totalHits / 12) > page) {
    isVisibleButton = true;
  }
  return (
    <div className={css.main_container}>
      <Searchbar getQuery={fetchPosts} />
      <ImageGallery data={posts ? posts : null} openModal={openModal} />
      {isLoading && <Loader />}
      {isVisibleButton && <Button load={loadMore} />}
      {isOpenModal && <Modal closeModal={closeModal} modalData={modalData} />}
    </div>
  );
};
