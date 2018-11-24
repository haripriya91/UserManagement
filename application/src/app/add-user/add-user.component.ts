import { Component, OnInit, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { HttpService } from "../services/http.service";
import { EmitterService } from "../services/emitter.service";

import { UserModel } from "../user-model";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
  providers: [HttpService]
})
export class AddUserComponent implements OnInit {
  @Input()
  reset: string;
  @Input()
  userInfo: string;
  @Input()
  userList: string;

  private userModel: UserModel = new UserModel("", "", "", "");
  private isInsert: boolean = true;
  constructor(private httpService: HttpService) {}

  ngOnInit() {}
  public addUser() {
    this.httpService.addUser(this.userModel).subscribe(
      response => {
        if (response.error) {
          alert(`The user could not be added, server Error.`);
        } else {
          EmitterService.get(this.userList).emit(response.users);
        }
      },
      error => {
        alert(`The user could not be added, server Error.`);
      }
    );
  }
  public updateUser() {
    this.httpService.updateUser(this.userModel).subscribe(
      response => {
        if (response.error) {
          alert(`The user could not be updated, server Error.`);
        } else {
          EmitterService.get(this.userList).emit(response.users);
        }
      },
      error => {
        alert(`The user could not be updated, server Error.`);
      }
    );
  }
  public resetAddUser() {
    this.userModel = new UserModel("", "", "", "");
    EmitterService.get(this.reset).emit(true);
    this.isInsert = true;
  }
  ngOnChanges(changes: any) {
    EmitterService.get(this.userInfo).subscribe((value: UserModel) => {
      this.userModel = new UserModel(
        value._id,
        value.name,
        value.gender,
        value.country
      );
      this.isInsert = false;
    });
  }
}
