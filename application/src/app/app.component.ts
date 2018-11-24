import { Component } from '@angular/core';

import { EmitterService } from './services/emitter.service';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD OPERATION USING ANGULAR';
  private userInfo = 'CRUD_USER_INFO';
  private reset = 'CRUD_RESET_FORM';
  private userList = 'CRUD_USER_LIST';

constructor(private _emitterService: EmitterService) {}
}
