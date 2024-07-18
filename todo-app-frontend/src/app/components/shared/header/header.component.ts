import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';
// import { ToasterService } from '../../../services/toaster.service';
import { filter } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private auth:AuthService,private toaster:ToasterService,private route:Router,private activatedRoute:ActivatedRoute){}
  currRoute:string;
  onClickLogout(){
    this.auth.signOut();
    this.toaster.onShowToast('LogOut Success','success');
    this.route.navigate(['/login'])
  }
  ngOnInit(){
    this.currRoute = this.route.url.split('/')[2];
    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currRoute=(event.url.split("/")[2])
      });
  }

}
