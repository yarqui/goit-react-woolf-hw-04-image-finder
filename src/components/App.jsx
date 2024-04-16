import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { removeWhitespaces } from 'common/services/common';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';
import { fetchPhotos, per_page } from 'common/services/pixabayAPI';
import 'react-toastify/dist/ReactToastify.min.css';
import s from './App.module.css';

class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    pictures: [],
    isEndOfResults: false,
    isLoading: false,
  };

  handleSubmit = query => {
    if (!query) {
      toast('Input should not be empty');

      return;
    }

    if (query === this.state.searchQuery) {
      toast(
        'You are currently reviewing the results of this search. Try a different one'
      );
      return;
    }

    const normalizedQuery = removeWhitespaces(query);

    this.setState({
      page: 1,
      searchQuery: normalizedQuery,
      pictures: [],
      isEndOfResults: false,
      isLoading: true,
    });
  };

  handleLoadMore = e => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    e.target.blur();
  };

  scrollToNextResult = () => {
    window.scrollBy({
      top: 560,
      behavior: 'smooth',
    });
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ isLoading: true });

      try {
        const res = await fetchPhotos(searchQuery, page);

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
          this.setState({ isEndOfResults: true });
          toast("You've reached the end of results.");
        }

        this.setState(
          prevState => ({
            pictures: [...prevState.pictures, ...hits],
          }),
          () => {
            if (page > 1) {
              this.scrollToNextResult();
            }
          }
        );
      } catch (error) {
        console.error(error);

        toast(`${error.message}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { pictures, isEndOfResults, isLoading } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSubmit} isLoading={isLoading} />
        <ImageGallery pictures={pictures} />

        {!isEndOfResults && !!pictures.length && (
          <LoadMoreButton onClick={this.handleLoadMore} />
        )}

        <ToastContainer position="top-center" />
      </div>
    );
  }
}

export default App;
