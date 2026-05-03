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
    } else {
      createGallery(data.hits);

      if (data.hits.length < PER_PAGE || currentPage * PER_PAGE >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
      } else {
        showLoadMoreButton();
      }
    }
  } catch {
    iziToast.error({ message: "Something went wrong. Please try again!" });
  } finally {
    hideLoader();
  }
});