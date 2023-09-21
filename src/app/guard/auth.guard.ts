import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private service: AuthService, private router: Router,private tostr:ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    if (this.service.isloggedin()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'user') {
          if (this.service.getrole() == 'admin') {
         this.router.navigate(['dashboard']); // Check that 'dashboard' is the correct route path
            return true;
          } else {
            this.router.navigate(['']);
              this.tostr.warning('You dont have access.')
            return false;
          }
        }else{
          return true;
        }
      } else {
        return true;
      }
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

}

// auth.guard.ts



// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard {
//   constructor(private service: AuthService, private router: Router, private tostr: ToastrService) { }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//     if (this.service.isloggedin()) {
//       // Check if the user is an admin
//       if (this.service.getrole() == 'admin') {
//         // Allow access for admin
//         this.router.navigate(['dashboard']); // Check that 'dashboard' is the correct route path

//         return true;
//       } else {
//         // Redirect non-admin users to the login page with a message
//         this.router.navigate(['login']);
//         this.tostr.warning('Only admin users are allowed to access this page.');
//         return false;
//       }
//     } else {
//       // Redirect unauthenticated users to the login page with a message
//       this.router.navigate(['login']);
//       this.tostr.warning('You need to log in and contact the admin for approval or authorization.');
//       return false;
//     }
//   }
// }

