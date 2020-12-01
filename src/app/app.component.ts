import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Invest App';
}
