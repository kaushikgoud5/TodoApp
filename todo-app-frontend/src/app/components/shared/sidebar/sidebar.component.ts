import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { ModalService } from '../../../services/modal.service';
import { ToasterService } from '../../../services/toaster.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  routes: any[];
  curRoute: string;
  dropdown: boolean;
  constructor(private modal:ModalService,private router:Router,private toaster:ToasterService,private auth:AuthService){
   this.routes = [
      {
        link: 'dashboard',
        value: 'Dashboard'
      }, {
        link: 'active',
        value: 'Active'
      },
      {
        link: 'completed',
        value: 'Completed'
      }
    ]
  }
  showDropdown(dropdown: boolean) {
    this.dropdown = dropdown
  }
  ngOnInit(){
    this.curRoute = this.router.url.split('/')[2];
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.curRoute=(event.url.split("/")[2])
      });
  }
  onClickLogout(){
    this.auth.signOut();
    this.toaster.onShowToast('LogOut Success','success');
    this.router.navigate(['/login'])
  }
  isAddTaskBtnClicked:boolean=false;
  isMenuBtnClicked:boolean=false;

  onClickAddTask(){
    this.isAddTaskBtnClicked=!this.isAddTaskBtnClicked;
    this.modal.onShowModal(this.isAddTaskBtnClicked,null);
    this.isAddTaskBtnClicked=!this.isAddTaskBtnClicked;
  }
  onClickDiplayMenu(){
    this.isMenuBtnClicked=!this.isMenuBtnClicked;
  }
}
