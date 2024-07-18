import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject: BehaviorSubject<Todo[]>;
  tasks$: Observable<any[]>;
  constructor(private api: ApiService) {
    this.tasksSubject = new BehaviorSubject<Todo[]>([]);
    this.tasks$ = this.tasksSubject.asObservable();
  }

  setTasks(tasks: any[]) {
    this.tasksSubject.next(tasks);
  }

  addTask(task: any) {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
  }

  getActiveTasks(): any[] {
    return this.tasksSubject.value.filter((task) => task.status == 1);
  }

  getCompletedTasks(): any[] {
    return this.tasksSubject.value.filter((task) => task.status == 2);
  }

  getTaskById(id: number) {
    return this.tasksSubject.value.find((task) => task.id === id);
  }
  updateLocalTask(updatedTask, id) {
    const tasks = this.tasksSubject.value.map((task) =>
      task.id === id ? { ...task, ...updatedTask.value } : task
    );
    this.tasksSubject.next(tasks);
  }
  // refreshTasks(){
  //   const userId=JSON.parse(localStorage.getItem("id"));
  //   this.api.GetTodoTasks(userId).subscribe((res:Todo[])=>{
  //     this.tasksSubject.next(res);
  //   })
  // }
}
