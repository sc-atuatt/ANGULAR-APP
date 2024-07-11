import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];
  private token:any='';
  

  constructor(private foodService:FoodService , activatedRoute:ActivatedRoute) 
  { 
   
    this.token=localStorage.getItem('User');
    let foodObservable:Observable<Food[]>;
    console.log(this.token);
    
    const jsonParsedToken = JSON.parse(this.token);

    const pp=jsonParsedToken.token;
    
    activatedRoute.params.subscribe((params)=>{
      if(params['searchTerm'])
      {
        foodObservable=this.foodService.getAllFoodsBySearchTerm(params['searchTerm'],pp)
      }
      else if(params['tag'])
      {
        foodObservable=this.foodService.getAllFoodsByTag(params['tag'],pp);
      }
      else{
        foodObservable=foodService.getAll(pp);
      }
      
      foodObservable.subscribe((serverFoods)=>{
        this.foods=serverFoods;
      })
    })
    
  };

  ngOnInit(): void {
  }

}
