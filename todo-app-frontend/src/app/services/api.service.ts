import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.interface';
import { Observable, catchError, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private cache: { [key: string]: Observable<any[]> } = {};
  //  baseURL:string="https://todoapp20240625153810.azurewebsites.net/api/Todo"
   baseURL:string="https://localhost:7032/api/Todo"

  constructor(private http: HttpClient) { }
  AddTodoTask(taskData:Todo){
    return this.http.post<Todo>(`${this.baseURL}/AddTask`,taskData)
  }
  GetTodoTasks(id:number){
    // if(!this.cache[`${this.baseURL}/${id}`]){
    //   this.cache[`${this.baseURL}/${id}`]=this.http.get<any[]>(`${this.baseURL}/${id}`).pipe(
    //     shareReplay(1),
    //     catchError(error => {
    //       delete this.cache[`${this.baseURL}/${id}`];
    //       throw error;
    //     })
    //   );
    // }
    // return this.cache[`${this.baseURL}/${id}`]
    return this.http.get(`${this.baseURL}/${id}`)
  }
  UpdateTaskStatus(id:number){
    return this.http.put(`${this.baseURL}/${id}`,"")
  }
  DeleteTask(id:number){
    return this.http.delete(`${this.baseURL}/${id}`)
  }
  UpdateTask(taskData:Todo,id:number){
    return this.http.put(`${this.baseURL}/UpdateTask/${id}`,taskData)
  }
  DeleteAllTasks(id:number){
    return this.http.delete(`${this.baseURL}/DeleteAll/${id}`)
  }

}
