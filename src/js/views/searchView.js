import { elements } from "./base";

// implicit return thats why we dont need a return keyword
export const getInput = () => elements.searchInput.value;

export const clearInput = () => (elements.searchInput.value = "");

export const clearResults = () => (elements.searchResList.innerHTML = "");

export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, curr) => {
      if (acc + curr.length <= limit) {
        newTitle.push(curr);
      }
      return acc + curr.length;
    }, 0);

    return `${newTitle.join(" ")} ...`;
  }

  return title;
};

// dont need the function outside the module so its a 'private function'
const renderRecipe = (recipe) => {
  const markup = `
      <li>
      <a class="results__link results__link--active" href="#${
        recipe.recipe_id
      }">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
    </li>
  `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  //recipes.forEach(el => renderRecipe(el)) bottom is equivalent to this
  recipes.forEach(renderRecipe);
};
