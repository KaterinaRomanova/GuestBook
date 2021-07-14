import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Token, User } from "src/app/shared/interfaces";

@Injectable({
  providedIn:'root'
})
export class AuthService{
  private token: string | null = localStorage.getItem('auth-token');
  errorMessage:string = '';
  currentUser!: User ;

  constructor( private http: HttpClient ){};

  register(fd: FormData): Observable<{token: Token, user:User}>{
    return this.http.post<{token: Token, user:User}>('https://guest-book.naveksoft.com/api/v1/auth/register', fd)
    .pipe(
      tap(
        ({user, token})=>{
          localStorage.setItem('auth-token', token.access_token);
          this.setToken(token.access_token);
          this.setCurrentUser(user);
          localStorage.setItem('user-email', user.email);
        }
      ),
      catchError((error)=>{
        return throwError(error)
      })
    )
  };

  login(user: User): Observable<{token: Token, user: User}>{
    return this.http.post<{token: Token, user:User}>('https://guest-book.naveksoft.com/api/v1/auth/login', user)
    .pipe(
      tap(
        ({token, user})=>{
          localStorage.setItem('auth-token', token.access_token);
          localStorage.setItem('user-email', user.email);
          this.setToken(token.access_token);
          this.setCurrentUser(user);
        }
      ),
      catchError((error)=>{
        return throwError(error)
      })
    )
  };

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  setToken(token: string){
    this.token = token;
  };

  getToken():string | null {
    return this.token;
  };

  isAuthenticated(): boolean{
    return !!this.token;
  };

  logout(){
    this.setToken('');
    localStorage.clear();
  };

}


