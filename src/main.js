import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = form.elements["search-text"].value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    createGallery(data.hits);

    if (currentPage * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({ message: "Something went wrong. Please try again!" });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const card = document.querySelector(".gallery-item");
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
    }

    if (currentPage * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({ message: "Something went wrong. Please try again!" });
  } finally {
    hideLoader();
  }
});