import {  Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveComponent } from './components/active/active.component';
import { Route } from './route.enum';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ModalComponent } from './components/dashboard/modal/modal.component';
import { NotFoundComponent } from './components/helper/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivateChild:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'active',
        component: ActiveComponent,
        data: { action: Route.Active },
      },
      {
        path: 'completed',
        component: ActiveComponent,
        data: { action: Route.Completed },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {path:'**',component:NotFoundComponent}

];
