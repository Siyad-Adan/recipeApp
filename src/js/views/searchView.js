import { elements } from "./base";

// implicit return thats why we dont need a return keyword
export const getInput = () => elements.searchInput.value;

export const clearInput = () => (elements.searchInput.value = "");

export const clearResults = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

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

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type === "prev" ? "left" : "right"
            }"></use>
        </svg>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
    </button>
    `;

export const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page == 1 && pages > 1) {
    button = createButton(page, "next");
  } else if (page < pages) {
    //want both buttons here
    button = `${createButton(page, "prev")}
              ${createButton(page, "next")}
              `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, "prev");
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 2, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  //recipes.forEach(el => renderRecipe(el)) bottom is equivalent to this
  recipes.slice(start, end).forEach(renderRecipe);

  //render pagination
  renderButtons(page, recipes.length, resPerPage);
};
