import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements.namedItem('search-text');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let query = '';
let page = 1;
let loadedImages = 0;
let searchId = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const searchText = input.value.trim();

  if (searchText === '') {
    return;
  }

  query = searchText;
  page = 1;
  loadedImages = 0;
  searchId += 1;
  clearGallery();
  await loadImages(page);
});

loadMoreButton.addEventListener('click', async () => {
  await loadImages(page + 1);
});

async function loadImages(requestedPage) {
  const currentSearchId = searchId;
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, requestedPage);

    if (currentSearchId !== searchId) {
      return;
    }

    if (requestedPage === 1 && hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    if (hits.length > 0) {
      createGallery(hits);
      page = requestedPage;
      loadedImages += hits.length;

      if (requestedPage > 1) {
        const { height: cardHeight } =
          gallery.firstElementChild.getBoundingClientRect();

        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
      }
    }

    if (hits.length === 0 || loadedImages >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch {
    if (currentSearchId !== searchId) {
      return;
    }

    iziToast.error({ message: 'Could not load images. Please try again.' });

    if (requestedPage > 1) {
      showLoadMoreButton();
    }
  } finally {
    if (currentSearchId === searchId) {
      hideLoader();
    }
  }
}
