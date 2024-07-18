import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
constructor(private auth:AuthService,private toaster :ToasterService,private router:Router){}
isLoggeed:boolean=true;
loginReactiveForm: FormGroup;
isShowPassword:boolean=false;
ngOnInit(){
  this.loginReactiveForm=new FormGroup({
    username:new FormControl(null,[Validators.required,CustomValidators.noSpaceAllowed]),
    password:new FormControl(null,[Validators.required,CustomValidators.passwordValidator])
  });
}
SwitchMode(){
  this.isLoggeed=!this.isLoggeed;
}
onClickLogin(loginForm:FormGroup){
 
  if(!this.isLoggeed){
    this.auth.signUp(loginForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.toaster.onShowToast(res['message'],'success');
        this.SwitchMode();
      }
        });
  }
  else{
    this.auth.login(loginForm.value).subscribe(
      {
        next:(res)=>{
          console.log(res)
          this.auth.storeToken(res.token)
          this.auth.storeId(res.userId)
          this.toaster.onShowToast(res['message'],'success');
          this.router.navigate(['home/dashboard']);
        }      }
    )
  }
  loginForm.reset();
}
toggleShowPassword(){
this.isShowPassword=!this.isShowPassword;
}
}
