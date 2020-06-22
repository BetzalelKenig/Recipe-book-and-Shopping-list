import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }
}
