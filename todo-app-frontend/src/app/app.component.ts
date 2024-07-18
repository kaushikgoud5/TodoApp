import { Component } from '@angular/core';
;
import { ToasterComponent } from './components/helper/toaster/toaster.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/helper/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToasterComponent,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-app';
}
