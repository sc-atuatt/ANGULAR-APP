import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
const USER_KEY='User'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject=new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient) { 
    this.userObservable=this.userSubject.asObservable();
  }


  register(userRegister:IUserRegister):Observable<User>{
    console.log("ppoiuytrtyuiiuytrertyu");
    
    return this.http.post<User>(USER_REGISTER_URL,userRegister,).pipe(
      tap({
      next: (user)=>{
      this.setUserToLocalStorage(user);

          this.userSubject.next(user);
      },
      error:(errorResponse)=>{
      }
    }));
  }

  login(userLogin:IUserLogin):Observable<User>{
    console.log('mmmmmmmmmmmmmmm');
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
      next: (user)=>{
        console.log('userrrrrrrrrrrrrrrrrrrrrrrr');
        console.log(user.token);
        
        
      this.setUserToLocalStorage(user);

          this.userSubject.next(user);
      },
      error:(errorResponse)=>{
      }
    }));
  }

  logout(){
    console.log('tttttttttttttttt');
    
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson= localStorage.getItem(USER_KEY);
    if(userJson)return JSON.parse(userJson) as User;
    return new User();
  }

}
