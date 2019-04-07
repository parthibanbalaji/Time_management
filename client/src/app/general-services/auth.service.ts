import { Injectable, OnDestroy, } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map ,catchError} from 'rxjs/operators';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


/** Simulate a data service to communicatr between server */
@Injectable({
  providedIn: 'root'
}
  
)
export class AuthService  {
  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    charset: "UTF-8"
  });

  private options = { headers: this.headers };
  loggedIn = false;
  currentUser = { _id: '', userName: '', role: '', email: '', firstName: '', lastName: '' };

  constructor( 
    private http:HttpClient,
    private jwtHelper:JwtHelperService,
    private router:Router
  ) {
     const token = localStorage.getItem('token');
     if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }

  }

  login(user): Observable<any> {
      return this.http
        .post("/api/login", JSON.stringify(user), this.options).pipe(
            map((result:any) =>{
                const token = localStorage.setItem('token', result.token);
                const decodedUser = this.decodeUserFromToken(result.token);
                this.setCurrentUser(decodedUser);
                return result;
            })
        );
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.userName = decodedUser.userName;
    this.currentUser.role = decodedUser.role;
    delete decodedUser.role;
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.currentUser = { _id: '', userName: '', role: '', email: '', firstName: '', lastName: '' };
    this.router.navigate(['/']);

  }

}