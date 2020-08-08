import Search from "./models/Search";
import Recipe from "./models/Recipe";
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

/**
 * SEARCH CONTROLLER
 */
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

    try {
      //Search for recipes
      await state.search.getResults();

      // render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert(err);
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    //prepare ui for changes
    //create new recipe object
    state.recipe = new Recipe(id);
    try {
      //get recipe data
      await state.recipe.getRecipe();
      //calc  servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      //render recipe
      console.log(state.recipe);
    } catch (err) {
      alert("Error processing the recipe");
    }
  }
};

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
