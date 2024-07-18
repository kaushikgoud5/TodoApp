import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Todo } from '../../../models/todo.interface';
import { ModalService } from '../../../services/modal.service';
import { ModalComponent } from '../../dashboard/modal/modal.component';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { TaskService } from '../../../services/task.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  @Input() taskAction: number = 0;
  @Input() activeTaskId: number = 0;
  @Input() todoActiveTask: Todo[];
  @ViewChild('detailBox') detailBox: ElementRef;
  @Output() loadtask: EventEmitter<any>;
  isDetailCardActive:boolean;
  constructor(
    private modal: ModalService,
    private api: ApiService,
    private taskService: TaskService,
    private toaster: ToasterService
  ) {
    this.todoActiveTask = [];
    this.loadtask = new EventEmitter();
  }
  ngOnInit(){
    if(this.todoActiveTask){
        this.isDetailCardActive=true
    }
    else{
      this.isDetailCardActive=false;
    }
  }
  // ngAfterViewInit(){
  //   document.onclick=(args)=>{
  //     if(this.detailBox?.nativeElement.contains(args.target)){
  //       console.log('true')
  //       this.todoActiveTask=[]
  //     }
  //   }
  // }
  onClickChangeStatus(id: number) {
    this.api.UpdateTaskStatus(id).subscribe({
      next: (res: Todo[]) => {
        this.toaster.onShowToast(res['message'], 'info');
        this.todoActiveTask = [];
      },
      error: (err) => {
        this.toaster.onShowToast(err.error.message, 'error');
      },
      complete: () => {
        this.loadtask.emit();
      },
    });
  }
  onClickEdit(id: number) {
    const task = this.taskService.getActiveTasks().find((x) => x.id == id);
    this.modal.onShowModal(true, task);
    this.isDetailCardActive=false
  }
  onClickDelete(id: number) {
    this.api.DeleteTask(id).subscribe({
      next: (res) => {
        this.toaster.onShowToast(res['message'], 'success');
      },
      error: (err) => {
        this.toaster.onShowToast(err.error.message, 'error');
      },
      complete: () => {
        this.loadtask.emit();
        this.todoActiveTask = [];
      },
    });
  }
  calculateHours(time: string) {
    const createdDate = new Date(time);
    const currentDate = new Date();
    const differenceInMillis = currentDate.getTime() - createdDate.getTime();
    const diffInMinutes = Math.floor(differenceInMillis / 60000);
    const differenceInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
    const diffInDays = Math.floor(differenceInHours / 24);

    if (diffInMinutes < 1) return 'just now';
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
      if (differenceInHours < 24) return `${differenceInHours} hours ago`;
      return `${diffInDays} days ago`;


  }
  onClickCloseDetailBox() {
    this.todoActiveTask = [];
  }
}
