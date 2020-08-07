import Search from "./models/Search";
//means we are importing everything from the searchView
import * as searchView from "./views/searchView";
//means we are importing only the actual functions we are using not the private helper functions
import {
  elements,
  renderLoader,
  elementStrings,
  clearLoader,
} from "./views/base";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

//CHECK OUT REDUX USING REACT
const state = {};

const controlSearch = async () => {
  //Get query from the view
  const query = searchView.getInput();
  if (query) {
    //New search object and add to state
    state.search = new Search(query);

    // Prepare  UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    //Search for recipes
    await state.search.getResults();

    // render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
