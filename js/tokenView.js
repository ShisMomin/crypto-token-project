export default class TokenView {
  _parentElement = document.querySelector(".main-section");
  _seeMoreBtn;
  _data;

  render(data) {
    this._data = data;
    const markUp =
      data.length === 1 ? this._generateMarkUp(data) : this._generateMarkUp();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  addHandleRenderModal(handler) {
    this._seeMoreBtns = document.querySelectorAll(".see-more");
    this._seeMoreBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const query = e.target.dataset.modal;
        handler(query);
      });
    });
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      const btnGoto = +btn.dataset.goto;
      handler(btnGoto);
    });
  }

  checkAndRenderSearch(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this._renderError("Data not found");
    this.render(data);
  }

  renderPaginationBtn() {
    this._parentElement.innerHTML = "";
    const markUp = this._generateMarkUp();
  }

  addHandlerRender(handler) {
    ["hashchange"].forEach((ev) =>
      window.addEventListener(ev, function () {
        //     const fullUrl = window.location.href;
        //     // Extract the fragment (hash) part
        //     const url = new URL(fullUrl);
        //     const currUrl = url.hash.slice(1); // Remove the '#' character
        // console.log(currUrl);
        handler();
      })
    );
  }

  _renderError(err) {
    alert(err);
    this._clear();
    return;
  }

  renderSpinner = function () {
    const markUp = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  };

  _clear() {
    this._parentElement.innerHTML = "";
  }
  _generateMarkUp(tokenData = this._data) {
    return tokenData.map((ele) => this._generateMarkUpPreview(ele)).join("");
  }

  _generateMarkUpPreview(data) {
    return `
       
        <div class="main-section-content">
        <div class="token-basic-info">
            <h1 class="token-full-name">${data.name}</h1>
            <div class="token-image-short-name">
                <img class="token-image" src="${data.image}" alt="not visible">
                <p class="short-name">${data.symbol}</p>
            </div>
        </div>
        <div class="information">
            <div class="curr-price-circulation-supp all-data">
                <p class="curr-price">Curr Price:- <span class="text-data"> ${data.current_price}</span></p>
                <p class="circul-supplay">Circulation Supp:- <span class="text-data">${data.circulating_supply}</span></p>
            </div>
            <div class="all-time-high-low all-data">
                <p class="all-time-high">All Time High:- <span class="text-data">${data.ath}</span></p>
                <p class="all-time-low">All Time Low:- <span class="text-data">${data.atl}</span></p>
            </div>
            <div class="high-low all-data">
                <p class="high">High In 24H:- <span class="text-data">${data.high_24h}</span></p>
                <p class="low">Low In 24H:- <span class="text-data">${data.low_24h}</span></p>
            </div>
            <div class="see-more-btn">
       
                <button data-modal="${data.id}" class="all-btn see-more">See More</button>
             
            </div>
        </div>
        </div>
       `;
  }
}

//  <a class="see-more-link" href="#${data.id}">
//  </a>

// export default new TokenView();
