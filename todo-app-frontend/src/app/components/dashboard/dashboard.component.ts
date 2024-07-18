import { Component, OnInit } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { TasksComponent } from './tasks/tasks.component';
import { ModalComponent } from './modal/modal.component';
import { HomeComponent } from '../home/home.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Todo } from '../../models/todo.interface';
import { map, shareReplay } from 'rxjs';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeroComponent,
    TasksComponent,
    ModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  userId: number;
  todoTasks: Todo[];
  tasks: Todo[] ;
  completedTodoTasks: Todo[];
  constructor(private api: ApiService, private auth: AuthService,private taskService:TaskService) {
    this.todoTasks = [];
    this.tasks = [];
    this.completedTodoTasks = []
  }
  ngOnInit() {
    this.userId = JSON.parse(this.auth.getId());
    this.taskService.tasks$.subscribe((tasks: any[]) => {
      this.tasks = tasks;
      this.todoTasks = this.taskService.getActiveTasks();
      this.completedTodoTasks=this.taskService.getCompletedTasks();
    });
    this.loadTodoTasks();

  }
  loadTodoTasks() {
    this.api.GetTodoTasks(this.userId).subscribe((tasks: any[]) => {
      this.taskService.setTasks(tasks);
    });
  }
}
