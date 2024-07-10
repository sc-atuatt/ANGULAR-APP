import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {


  registerForm!:FormGroup;
  isSubmitted=false;
  returnUrl='';
  constructor(private formBuilder:FormBuilder , private userService:UserService, private activatedRoute:ActivatedRoute,private router:Router) { }


  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required,Validators.minLength(4)],
      
      address:['',Validators.required,Validators.minLength(3)],
    })

    this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    console.log('doneeeeeeeeeeeeeeeeeeeee');
    
    this.isSubmitted=true;
    if(this.registerForm.invalid){
      console.log("opopopop");
      return ;
    }

    const fv=this.registerForm.value;
    const user:IUserRegister={
      name:fv.name,
      email:fv.email,
      password:fv.password,
      address:fv.address,
    };
    this.userService.register(user).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
