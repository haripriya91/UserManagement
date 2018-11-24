import { Injectable } from "@angular/core";

import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { UserModel } from "../user-model";

//import { Observable } from 'rxjs/Rx';-New version of rxjs
import { Observable } from "rxjs";
//import { map } from 'rxjs/operators';

// Import RxJs required methods -New version of rxjs no longer supports single imports
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private BASE_URL: string = "http://localhost:8080/api/users/";
  constructor(public http: Http) {}

  public getAllUser() {
    return this.http
      .get(`${this.BASE_URL}`)
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }
  public addUser(body: UserModel) {
    let options = new RequestOptions({
      headers: new Headers({ "Content-Type": "application/json;charset=UTF-8" })
    });
    return this.http
      .post(`${this.BASE_URL}`, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }
  public updateUser(body: UserModel) {
    let options = new RequestOptions({
      headers: new Headers({ "Content-Type": "application/json;charset=UTF-8" })
    });

    return this.http
      .put(`${this.BASE_URL}${body["_id"]}`, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }

  public deleteUser(usersID: string) {
    let options = new RequestOptions({
      headers: new Headers({ "Content-Type": "application/json;charset=UTF-8" })
    });

    return this.http
      .delete(`${this.BASE_URL}${usersID}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }
}
