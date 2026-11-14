import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');

  if (!gallery) {
    return;
  }

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li>
          <a href="${escapeAttribute(largeImageURL)}">
            <img src="${escapeAttribute(webformatURL)}" alt="${escapeAttribute(tags)}">
          </a>
          <p><strong>Likes</strong>${likes}</p>
          <p><strong>Views</strong>${views}</p>
          <p><strong>Comments</strong>${comments}</p>
          <p><strong>Downloads</strong>${downloads}</p>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');

  if (gallery) {
    gallery.replaceChildren();
  }
}

export function showLoader() {
  const loader = document.querySelector('.loader');

  if (loader) {
    loader.classList.add('is-visible');
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');

  if (loader) {
    loader.classList.remove('is-visible');
  }
}
export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.classList.add('is-visible');
  }
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.classList.remove('is-visible');
  }
}
