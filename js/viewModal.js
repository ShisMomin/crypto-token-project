import * as model from "./model.js";
class ViewModal {
  _parentElement = document.getElementById("overlay");
  _modalData;
  renderModal(data) {
    this._modalData = data;
    const markUp = this._generateModalMarkUp();
    this._showMarkUp(markUp);
  }

  _showMarkUp(markUp) {
    this._parentElement.classList.remove("hidden");
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  _clearModal() {
    const modalElement = this._parentElement.querySelector(".modal");
    if (modalElement) {
      this._parentElement.removeChild(modalElement);
    }
    this._parentElement.classList.add("hidden");
    window.location.hash = "";
  }

  addHandlerCloseModal() {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        if (e.target.classList.value != "close-btn") return;
        this._clearModal();
      }.bind(this)
    );
  }

  _generateModalMarkUp() {
    return `
        
    <div class="modal">
        <div class="close-modal-btn">
        <button type="button" class="close-btn"
        data-dismiss="modal">
        ×
        </button>
        </div>
        <div class="modal-container">
            <div class="modal-section">
                <h1 class="modal-token-name">${this._modalData.name}</h1>
                <img src="${this._modalData.image}" alt="" class="modal-token-image">
                <h2 class="modal-token-symbol">${this._modalData.symbol}</h2>
            </div>
            <div class="token-information">
                
                <div class="modal-data modal-all-time-data">
                        <div class="modal-data1">
                        <p class="ath-change-per">ath_change_percentage: <span class="text-data">${this._modalData.ath_change_percentage}</span></p>
                        <p class="ath-date">ath_date: <span class="text-data">${this._modalData.ath_date}</span></p>
                        <p class="atl-change-per">atl_change_percentage: <span class="text-data">${this._modalData.atl_change_percentage}</span></p>
                        <p class="atl-date">atl_date: <span class="text-data">${this._modalData.atl_date}</span></p>
                    </div>
                </div>
                <div class="modal-data modal-market-cap-data">
                    <div class="modal-data2">
                        <p class="market-cap">market_cap: <span class="text-data">${this._modalData.market_cap}</span></p>
                        <p class="market-cap-change">market_cap_change_24h: <span class="text-data">${this._modalData.market_cap_change_24h}</span></p>
                        <p class="market-cap-change-per">market_cap_change_percentage_24h: <span class="text-data">${this._modalData.market_cap_change_percentage_24h}</span></p>
                        <p class="market-cap-rank">market_cap_rank: <span class="text-data">${this._modalData.market_cap_rank}</span></p>
                        
                    </div>
                </div>
                <div class="modal-data modal-total-supp-data">
                    <div class="modal-data3">
                        <p class="max-supp">max_supply: <span class="text-data">${this._modalData.max_supply}</span></p>
                        <p class="total-supp">total_supply: <span class="text-data">${this._modalData.total_supply}</span></p>
                        <p class="total-volume">total_volume: <span class="text-data">${this._modalData.total_volume}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
  }
}

export default new ViewModal();
