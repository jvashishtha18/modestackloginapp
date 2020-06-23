import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError,map} from 'rxjs/operators';
import { Router } from '@angular/router';


interface registerResponse {
  success: boolean,
  message: string
}

interface LoginResponse  {
  access_token: string;
  data: any;
  name: string;
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url="http://localhost:8080/subscribers";
  
  authToken;
  user;
  options;

  constructor ( private http: HttpClient,private router: Router) { }
  
  signup(user: any) {
    return this.http.post<registerResponse>(this.url+"/subscribers", user);
  };

  

  login(formdata:any){
    return this.http.post(this.url+'/login/user',formdata);
};


httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


  // Verify user credentials on server to get token
  loginForm(data): Observable<any> {
    return this.http
      .post<any>(this.url+"/login/user", data)
      .pipe( map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user.user));
          }
          return user;
        }),
        catchError(this.handleError)
        
      );
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: any) {
    localStorage.setItem('name', resp.name);
    localStorage.setItem('access_token', resp.access_token);
    this.router.navigate(['/login']);
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  // Checking if token is set
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;

  }

  // After clearing localStorage redirect to login screen
logout() {
  localStorage.clear();
  this.router.navigate(['/login']);
}
// Handle API errors
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}
 
}
