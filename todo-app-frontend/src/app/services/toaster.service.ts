import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }
  showToast:EventEmitter<Toast>=new EventEmitter();
  onShowToast(message: string, type: 'success' | 'error' | 'info') {
   this.showToast.emit({
    message: message,
    type: type
   });
    
  }
 
}
 interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
  }