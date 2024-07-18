import { EventEmitter, Injectable } from '@angular/core';
import { Todo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalEmitter: EventEmitter<{isOpen:boolean,task:Todo[]}> = new EventEmitter();
  onShowModal(isOpen:boolean,task:Todo[]){
    this.modalEmitter.emit({isOpen,task})
  }
  constructor() {}
}
