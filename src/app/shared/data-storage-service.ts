import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-and-shopping-list.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log(response);
        });
    }

    fectchRecipes() {
        return this.http.get<Recipe[]>('https://recipe-book-and-shopping-list.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        );
    }
}