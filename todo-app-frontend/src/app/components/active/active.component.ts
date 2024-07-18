import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { ApiService } from '../../services/api.service';
import { Todo } from '../../models/todo.interface';
import { TaskService } from '../../services/task.service';
import { TasksListComponent } from '../dashboard/tasks/tasks-list/tasks-list.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../dashboard/modal/modal.component';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [
    CommonModule,
    DetailComponent,
    TasksListComponent,
    ModalComponent
  ],
  templateUrl: './active.component.html',
  styleUrl: './active.component.scss',
})
export class ActiveComponent implements OnInit {
  action: number = 0;
  userId: number;
  todoTasks: Todo[];
  taskId: number;
  todoTask: Todo[];
  tasks: Todo[];
  completedTodoTasks: Todo[];
  currentTime:Date;
  constructor(
    private api: ApiService,
    private taskService: TaskService,
    private auth:AuthService,
    private activateRoute:ActivatedRoute
  ) {}
  ngOnInit() {
    this.activateRoute.data.subscribe((res) => {
      this.action = res['action'];
    });
    this.userId=JSON.parse(this.auth.getId());
    this.currentTime=new Date()
    this.taskService.tasks$.subscribe((tasks: Todo[]) => {
      this.tasks = tasks;
      this.todoTasks = this.taskService.getActiveTasks();
      this.completedTodoTasks = this.taskService.getCompletedTasks();
    });
    this.loadTodoTasks();
  }
  loadTodoTasks() {
    this.api.GetTodoTasks(this.userId).subscribe((tasks: any[]) => {
      this.taskService.setTasks(tasks);
    });
  }
}
