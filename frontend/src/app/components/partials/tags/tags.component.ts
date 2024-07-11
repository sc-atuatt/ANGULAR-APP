import { Component, OnInit } from '@angular/core';
import { sample_Tags } from 'src/data';
import { Tag } from 'src/app/shared/models/Tag';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  private token:any='';
    

  tags?:Tag[]=[];
  constructor(foodService:FoodService) {
    this.token=localStorage.getItem('User');
    const jsonParsedToken = JSON.parse(this.token);

    const pp=jsonParsedToken.token;
    foodService.getAllTags(pp).subscribe((serverTags)=>{
      this.tags=serverTags;
    })
   }

  ngOnInit(): void {
  }

}
