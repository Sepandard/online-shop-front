import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  
} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, HttpInterceptor {
  constructor(private router: Router) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
  }
   
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    let Token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
        if (Token != 'null' && user_id != 'null') {
      console.log("ebi sir mikhori?");
      return true;
    }else{
      this.router.navigate(['/online-shop/auth/login']);
      return false;
    }
  }
}
