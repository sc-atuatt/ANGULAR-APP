import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_Tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

const USER_KEY='User'
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll(token:string): Observable<Food[]> {
   console.log(token);
   
    return this.http.get<Food[]>(FOODS_URL,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  getAllFoodsBySearchTerm(searchTerm:string,token:string):Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+searchTerm ,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    } );
  }

  getAllTags(token:string):Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  getAllFoodsByTag(tag:string,token:string):Observable<Food[]>{
    return tag=='ALL'?
    this.http.get<Food[]>(FOODS_URL):
    this.http.get<Food[]>(FOODS_BY_TAG_URL+tag,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });;
  }

  getFoodById(foodId:string,token:string):Observable<Food>{
    console.log('bbbbbbbbb');
    
    return this.http.get<Food>(FOODS_BY_ID_URL+foodId,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

}
