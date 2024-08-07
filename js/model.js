// console.log('HII MODEL');
import { getJson } from "./helper";
import { API_URL, RES_PER_PAGE } from "./config";
import { async } from "regenerator-runtime";
export const state = {
  data: [],
  page: 1,
  resultsPerPage: RES_PER_PAGE,
};
export const searchResult = {
  query: "",
  search: [],
};
export const loadData = async function () {
  try {
    const tempData = await getJson(`${API_URL}`);
    state.data = tempData;
  } catch (err) {
    alert(err);
  }
};

export const loadSearchResult = async function (query) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query}`
    );
    const data = await res.json();
    searchResult.query = query;
    searchResult.search = data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getResultsPage = function (page = state.page) {
  console.log("called");
  state.page = page;
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;
  return state.data.slice(start, end);
};
