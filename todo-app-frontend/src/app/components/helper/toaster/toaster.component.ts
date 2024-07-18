import { Component } from '@angular/core';
import { ToasterService } from '../../../services/toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})

export class ToasterComponent {
  toasts: Toast[] = [];
  constructor(private tosterService: ToasterService) {}
  ngOnInit() {
    this.tosterService.showToast.subscribe({
      next: (res) => {
        this.toasts.push(res);
        setTimeout(() => this.removeToast(res), 3000);
      },
    });
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}