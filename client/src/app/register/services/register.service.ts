import { Injectable, OnDestroy } from '@angular/core';
// import { Http, Headers, RequestOptions } from "@angular/http";
import { delay }      from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map ,catchError} from 'rxjs/operators';


/** Simulate a data service to communicatr between server */
@Injectable()
export class RegisterService  {
  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    charset: "UTF-8"
  });

  private options = { headers: this.headers };
  constructor( private http:HttpClient) { 

  }

  registerUser(user): Observable<any> {
      return this.http
        .post("/api/registerUser", JSON.stringify(user), this.options);
        
  }

}