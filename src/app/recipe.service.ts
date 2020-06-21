import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is Just a test', 'https://www.wholesomeyum.com/wp-content/uploads/2017/03/wholesomeyum_low-carb-bread-recipe-almond-flour-bread-paleo-gluten-free.jpg', [
      new Ingredient('Potato', 3),
      new Ingredient('selery', 1)
    ]),
    new Recipe('A Test Recipe 2', 'This is Just a test', 'https://www.wholesomeyum.com/wp-content/uploads/2017/03/wholesomeyum_low-carb-bread-recipe-almond-flour-bread-paleo-gluten-free.jpg', [
      new Ingredient('Coren', 2),
      new Ingredient('Chiken', 10)
    ]),
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
