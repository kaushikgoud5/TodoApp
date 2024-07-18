import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  taskForm: FormGroup;
  @Output() loadTasks: EventEmitter<any>;
  @ViewChild('saveBtn') saveBtn: ElementRef;
  constructor(
    private modal: ModalService,
    private api: ApiService,
    private auth: AuthService,
    private taskService: TaskService,
    private toaster: ToasterService
  ) {
    this.loadTasks = new EventEmitter();
  }
  isModalActive: boolean = false;
  isUpdateBtnclicked: boolean = false;
  taskIdToBeUpdated: number;
  ngOnInit() {
    this.modal.modalEmitter.subscribe(({ isOpen, task }) => {
      this.isModalActive = isOpen;
      if (task) {
        this.taskForm.patchValue(task);
        this.taskIdToBeUpdated = task['id'];
        this.isUpdateBtnclicked = true;
      }
    });
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onClickCancel(form) {
    this.isModalActive = false;
    this.taskForm.reset();
  }
  onClickSave(form: FormGroup) {
    const id = this.auth.getId();
    form.value.userId = JSON.parse(id);
    if (!this.isUpdateBtnclicked) this.AddTask(form);
    else this.UpdateTask(form);
    this.modal.onShowModal(false,[])
    form.reset();
  }
  UpdateTask(form: FormGroup) {
    const oldTask=this.taskService.getTaskById(this.taskIdToBeUpdated);
    this.taskService.updateLocalTask(form,this.taskIdToBeUpdated)
    this.api.UpdateTask(form.value, this.taskIdToBeUpdated).subscribe({
      next: (res) => {
        this.toaster.onShowToast(res['message'], 'success');
      },
      error: (err) => {
        this.taskService.updateLocalTask(oldTask,this.taskIdToBeUpdated);
        this.toaster.onShowToast(err.error.message, 'error');
      },
      complete: () => {
        // this.taskService.refreshTasks();
      },
    });
    this.isModalActive = false;
    form.reset();
  }
  AddTask(form: FormGroup) {
    this.api.AddTodoTask(form.value).subscribe({
      next: (res) => {
        this.taskService.addTask(res);
        this.toaster.onShowToast('Successfully Added', 'success');
      },
      error: (err) => {
        this.toaster.onShowToast('Failed', 'error');
      },
    });
  }
  canExit(): boolean {
    if (this.taskForm.touched && this.taskForm.dirty) {
      return confirm(
        'You have unsaved changes!! Do you want to leave the page!!'
      );
    } else return true;
  }
}
