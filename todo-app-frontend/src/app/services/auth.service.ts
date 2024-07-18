import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    //  baseURL:string="https://todoapp20240625153810.azurewebsites.net/api/Todo"
    baseURL:string="https://localhost:7032"
  constructor(private http:HttpClient) {   }
  login(loginObj:User){
      return this.http.post<User>(`${this.baseURL}/api/Auth/login`,loginObj)
  }
  signUp(userObj:User){
    return this.http.post<User>(`${this.baseURL}/api/Auth/register`,userObj)
  }
  storeToken(tokenValue:string){
    localStorage.setItem("token",tokenValue);
  }
  storeId(userId:number){
    localStorage.setItem("id",JSON.stringify(userId))
  }
  getId(){
    return localStorage.getItem("id")
  }
  getToken(){
    return localStorage.getItem("token");
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem("token");
  }
  signOut(){
    localStorage.clear();
  }

}
