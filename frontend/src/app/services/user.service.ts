import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { catchError, map, tap } from 'rxjs/operators';
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


  register(userRegister:IUserRegister):Observable<any>{
    console.log("ppoiuytrtyuiiuytrertyu");
    
    return this.http.post<any>(USER_REGISTER_URL,userRegister).pipe(map(data=> data));}
    
    
  //   .pipe(
  //     tap({
  //     next: (user)=>{
  //         this.setUserToLocalStorage(user);
  //         this.userSubject.next(user);
  //     },
  //     error:(errorResponse)=>{
  //     }
  //   }));
  // }

  login(userLogin:IUserLogin):Observable<any>{
    console.log('mmmmmmmmmmmmmmm');
    return this.http.post<any>(USER_LOGIN_URL,userLogin).pipe(map(data=> data));
      // tap({
      //     next: (user)=>{
      //       console.log('userrrrrrrrrrrrrrrrrrrrrrrr');
      //       console.log(user);
      //       this.setUserToLocalStorage(user);
      //       this.userSubject.next(user);
      //     },
      //       error:(errorResponse)=>{
      //         console.log(errorResponse);
              
      //       }
      // }),
      // catchError(this.handleError));
  //     return this.http.post<any>(USER_LOGIN_URL,userLogin).pipe(
  //       tap({
  //         next: (user)=>{
  //           console.log('userrrrrrrrrrrrrrrrrrrrrrrr');
  //           console.log(user);
  //           this.setUserToLocalStorage(user);
  //           this.userSubject.next(user);
  //         },
  //           error:(errorResponse)=>{
  //             console.log(errorResponse);
              
  //           }
  //     }),
  //     catchError(this.handleError));
      
  }
  // private handleError(error: HttpErrorResponse) {
  //   console.error('An error occurred:', error);
  //   let errorMessage = 'Unknown error occurred. Please try again later.';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side error
  //     if (error.status === 408) {
  //       errorMessage = 'Unauthorized access. Please login again.';
  //     } else if (error.status === 403) {
  //       errorMessage = 'Access forbidden.';
  //     } else if (error.status === 404) {
  //       errorMessage = 'Resource not found.';
  //     } else {
  //       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //     }
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }

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
