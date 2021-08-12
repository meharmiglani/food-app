import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/actionMeals";
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favMeals: updatedFavMeals,
        };
      } else {
        const newFavMeal = state.meals.find(
          (meal) => meal.id === action.mealId
        );
        return {
          ...state,
          favMeals: state.favMeals.concat(newFavMeal),
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }

        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }

        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }

        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });

      return {
        ...state,
        filteredMeals: updatedFilteredMeals
      };
      
    default:
      return state;
  }
};

export default mealsReducer;
