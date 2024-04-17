import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { removeWhitespaces } from 'common/services/common';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';
import { fetchPhotos, per_page } from 'common/services/pixabayAPI';
import 'react-toastify/dist/ReactToastify.min.css';
import s from './App.module.css';

const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isEndOfResults, setIsEndOfResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToNextResult = () => {
    console.log('scroll func');
    window.scrollBy({
      top: 560,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!searchQuery) {
      return; // cancel request on mount, when there is no searchQuery
    }

    setIsLoading(true);

    fetchPhotos(searchQuery, page)
      .then(res => {
        const {
          data: { hits, totalHits },
          status,
        } = res;

        if (status !== 200) {
          toast('Something went wrong. Try again later.');

          return;
        }

        if (totalHits === 0) {
          toast('No pictures for this search. Try another one.');
          return;
        }

        if (totalHits / per_page <= page) {
          setIsEndOfResults(true);
          toast("You've reached the end of results.");
        }

        setPictures(prev => [...prev, ...hits]);
      })
      .catch(error => {
        console.error(error);
        toast(`${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);

        if (page > 1) {
          scrollToNextResult();
        }
      });
  }, [searchQuery, page]);

  const handleSubmit = query => {
    if (!query) {
      toast('Input should not be empty');

      return;
    }

    if (query === searchQuery) {
      toast(
        'You are currently reviewing the results of this search. Try a different one'
      );
      return;
    }

    const normalizedQuery = removeWhitespaces(query);

    setPage(1);
    setSearchQuery(normalizedQuery);
    setPictures([]);
    setIsEndOfResults(false);
  };

  const handleLoadMore = e => {
    setPage(prev => prev + 1);

    e.target.blur();
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleSubmit} isLoading={isLoading} />
      <ImageGallery pictures={pictures} />

      {!isEndOfResults && !!pictures.length && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
