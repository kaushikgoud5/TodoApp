import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../models/todo.interface';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../../../active/detail/detail.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { AuthService } from '../../../../services/auth.service';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule,DetailComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent {
  @Input() totalTodoTasks:Todo[];
  @Output() loadTask:EventEmitter<any>=new EventEmitter();
  clickedTask:Todo[];
  action:number;
  clickedTaskId:number;
  userId:number;
  constructor( private activateRoute: ActivatedRoute, private api: ApiService,
    private taskService: TaskService,
    private auth:AuthService,){
    this.totalTodoTasks = []
    this.clickedTask=[]
  }
  ngOnInit() {
    this.activateRoute.data.subscribe((res) => {
      this.action = res['action'];
    });
    this.userId=JSON.parse(this.auth.getId());
    this.loadTodoTasks();
  }
  loadTodoTasks() {
    this.api.GetTodoTasks(this.userId).subscribe((tasks: any[]) => {
      this.taskService.setTasks(tasks);
    });
  }
  onTaskModified() {
    this.loadTask.emit();
  }
  onClickDisplayDetails(id:number){
   this.clickedTask = this.totalTodoTasks.filter((x) => x.id === id);
   this.clickedTaskId = id;
  }
}
