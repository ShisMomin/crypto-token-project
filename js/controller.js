import * as model from "./model.js";
import { liveData } from "./btcLiveData.js";
import tokenViewclass from "./tokenView.js";
import searchView from "./searchView.js";
import pagination from "./paginationView.js";
import viewModal from "./viewModal.js";
import "core-js/stable"; //this is polyfilling evrything else
import "regenerator-runtime/runtime"; //this is polyfilling for async await
const informationContainer = document.querySelector(".main-section");
// creating the object of tokenView
const tokenView = new tokenViewclass();
const endpoint =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

// testing the API data
// const API_KEY='25dc7ef2-627b-497b-b515-b9bd3cbfde82';
// fetch(endpoint)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data); // Output the data to the console
//   })
//   .catch(error => {
//     console.error('Error:', error); // Handle any errors
//   });

const controlModalData = function (query) {
  // 1) finding the Modal data from the main data
  const modalData = model.state.data.find((el) => (el.id === query ? el : ""));
  // 2) Show the data in the Modal
  viewModal.renderModal(modalData);
};
const fetchData = async function () {
  try {
    // 1) Show spinner
    tokenView.renderSpinner();
    // 2) load the data
    await model.loadData();
    // let token=model.state;
    // 3) Show the data 10 element per Page
    tokenView.render(model.getResultsPage());
    // 4) Show the pagination buttons next and previous
    pagination.render(model.state);
    // 5) addEventListener on those buttons
    tokenView.addHandleRenderModal(controlModalData);
    // viewModal.addHandlerRenderModal();
  } catch (err) {
    alert(err);
  }
};

const controlSearchResult = async function () {
  try {
    // get search query
    const query = searchView.getQuery();
    if (!query) return;
    // load query result
    tokenView.renderSpinner();
    await model.loadSearchResult(query);
    tokenView.checkAndRenderSearch(model.searchResult.search);
    tokenView.addHandleRenderModal(controlModalData);
  } catch (err) {
    alert(err);
  }
};

const controlPagination = function (gotoPage) {
  // 1) Render new results
  tokenView.render(model.getResultsPage(gotoPage));
  // 2) Render new pagination buttons
  pagination.render(model.state);
  // 3) Render Modal
  tokenView.addHandleRenderModal(controlModalData);
};

const init = function () {
  fetchData();
  liveData();
  searchView.addSearchHandler(controlSearchResult);
  pagination.addHandlerClick(controlPagination);
  viewModal.addHandlerCloseModal();
  console.log('Welcome!');
};
init();
