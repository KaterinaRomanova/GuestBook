import { Injectable } from "@angular/core";
import { User } from "../../../shared/interfaces";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class AuthService{
  errorFlag : boolean = false;
  private token:string = '';
  constructor(private http: HttpClient){
  }
  register(user: User): Observable<User>{
    return this.http.post<User>('https://guest-book.naveksoft.com/api/v1/auth/register', user)
  }

  login(user: User): Observable<{token: string}>{
    return this.http.post<{token:string}>('https://guest-book.naveksoft.com/api/v1/auth/login', user)
    .pipe(
      tap(
        ({token})=>{
          localStorage.setItem('auth-token', token)
          this.setToken(token)
        }
      ),
      catchError(this.handleError.bind(this))
    )
  }

  private handleError(error:HttpErrorResponse){
    const {message} = error.error
      return throwError(error)

  }

  setToken(token: string){
    this.token = token
  }
  getToken():string{
    return this.token
  }

  isAuthenticated(): boolean{
    return !!this.token
  }

  logout(){
    this.setToken('')
    localStorage.clear();
  }
}


