import View from "./tokenView.js";
import { RES_PER_PAGE } from "./config";
class PaginationView extends View {
  _parentElement = document.querySelector(".pagination-btn");
  // rederPaginationBtn(){
  //     this._parentElement.innerHTML='';
  //     const markUp=this._generatePaginationBtnMarkup();
  // }
  // _generatePaginationBtnMarkup(){
  //    console.log(numPage);
  // }
  _generateMarkUp() {
    const currPage = this._data.page;
    const numPage = Math.ceil(this._data.data.length / RES_PER_PAGE);
    if (currPage === 1 && numPage > 1) {
      return `<a href="#header ">
                     <button data-goto="${
                       currPage + 1
                     }" class="all-btn next btn">page ${
        currPage + 1
      } &rarr;</button>
                 </a>
    `;
    }
    if (currPage === numPage && numPage > 1) {
      return `
         <a href="#header">
                <button data-goto="${
                  currPage - 1
                }" class="all-btn previous btn">page ${
        currPage - 1
      } &larr;</button>
                </a>
            `;
    }
    if (currPage < numPage) {
      return `
            <a href="#header">
                <button data-goto="${
                  currPage - 1
                }" class="all-btn previous btn">page ${
        currPage - 1
      } &larr;</button>
                <button data-goto="${
                  currPage + 1
                }" class="all-btn next btn">page ${currPage + 1} &rarr;</button>
                   </a>
            `;
    }
  }
}
export default new PaginationView();
