class SearchView {
  #parentElement = document.querySelector(".search");
  #btnParent = document.querySelector(".pagination-btn");
  getQuery() {
    const query = this.#parentElement.querySelector("input").value;
    this.#clearInput();
    return query;
  }

  addSearchHandler(handler) {
    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  #clearInput() {
    this.#parentElement.querySelector("input").value = "";
    this.#btnParent.innerHTML = "";
  }
}

export default new SearchView();
