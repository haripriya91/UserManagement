import { Component, OnInit, Input } from "@angular/core";

import { HttpService } from "../services/http.service";
import { EmitterService } from "../services/emitter.service";

import { UserModel } from "../user-model";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
  providers: [HttpService]
})
export class UserListComponent implements OnInit {
  @Input()
  reset: string;
  @Input()
  userInfo: string;
  @Input()
  userList: string;

  private usersList;
  private currentUser: UserModel;
  private isReset: boolean = true;

  constructor(public httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getAllUser().subscribe(
      response => (this.usersList = response.users),
      error => {
        alert(`Can't get users.`);
      }
    );
    console.log(this.usersList);
  }

  public deleteUser(userId: string) {
    this.httpService.deleteUser(userId).subscribe(
      response => {
        if (response.error) {
          alert(`The user could not be deleted, server Error.`);
        } else {
          this.usersList = response.users;
        }
      },
      error => {
        alert(`The user could not be deleted, server Error.`);
      }
    );
  }
  public userSelected(user) {
    this.currentUser = user;
    EmitterService.get(this.userInfo).emit(this.currentUser);
    this.isReset = true;
  }
  public isSelected(user): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser._id === user._id ? true : false;
  }
  ngOnChanges(changes: any) {
    EmitterService.get(this.reset).subscribe((reset: boolean) => {
      this.isReset = false;
    });

    EmitterService.get(this.userList).subscribe((userList: string) => {
      this.usersList = userList;
    });
  }
}
