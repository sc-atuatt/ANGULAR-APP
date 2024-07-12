import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
const USER_KEY='User'
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!:FormGroup;
  isSubmitted=false;
  returnUrl='';
  constructor(private formBuilder:FormBuilder , private userService:UserService, private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],

    })

    this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  get fc(){
    return this.loginForm.controls;
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson= localStorage.getItem(USER_KEY);
    if(userJson)return JSON.parse(userJson) as User;
    return new User();
  }

  submit(){
   
    
    this.isSubmitted=true;
    if(this.loginForm.invalid)return ;
    this.userService.login({email:this.fc['email'].value , password:this.fc['password'].value}).subscribe((response)=>{
      //  console.log("login done");
      //  console.log(response.message);
       
       if(response.message!='Internal server error'){
        this.setUserToLocalStorage(response);
        this.router.navigateByUrl(this.returnUrl);
       }
       else{
           alert(response.message)
       }
    
      
    })
  }
}
