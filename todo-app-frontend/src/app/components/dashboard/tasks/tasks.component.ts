import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { Todo } from '../../../models/todo.interface';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../../services/toaster.service';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TasksListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent  implements OnInit {
  @Input() todoTasks: Todo[];
  @Input() completedTodoTasks: Todo[];
  @Input() totalTodoTasks: Todo[];
  @Output() loadTasks: EventEmitter<any>;
  currentTime: Date;
  activeTasksPercentage:number;
  completedTasksPercentage:number;
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private toaster: ToasterService
  ) {
    this.todoTasks = [];
    this.completedTodoTasks = [];
    this.totalTodoTasks = [];
    this.loadTasks = new EventEmitter();
    this.activeTasksPercentage = 0;
    this.completedTasksPercentage = 0;
  }
  getTodoPercentage(tasks: Todo[]) {
    const totalTasks = this.todoTasks.length + this.completedTodoTasks.length;
    return totalTasks > 0 ? Math.round((tasks.length / totalTasks) * 100) : 0;
  }
  ngOnInit() {
    this.currentTime = new Date();
    this.getTasksPercentages()
  }


  getTasksPercentages(){
    this.completedTasksPercentage =  this.getTodoPercentage(this.completedTodoTasks)
    this.activeTasksPercentage = this.getTodoPercentage(this.todoTasks)
  }

  onClickDeleteAll() {
    const id = JSON.parse(this.auth.getId());
    console.log(id);
    this.api.DeleteAllTasks(id).subscribe({
      next: (res) => {
        this.toaster.onShowToast(res['message'], 'success');
      },
      error: (err) => {
        this.toaster.onShowToast(err.error.messge, 'error');
      },
      complete: () => {
        this.loadTasks.emit();
      },
    });
  }
}
