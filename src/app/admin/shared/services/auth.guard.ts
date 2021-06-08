import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable() export class AuthGuard implements CanActivate{
  constructor(
    private auth: AuthService,
    private router: Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean{
      if(this.auth.isAuthenticated()){
        return true
      } else{
        this.auth.logout()
        this.router.navigate(['/admin','login'],{
          queryParams:{
            loginAgain: true
          }
        })
      }
    throw new Error('Method not implemented.');
  }
}