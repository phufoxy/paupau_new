import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class NoLoginGuard implements CanActivate {
    constructor(public router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (localStorage.getItem('token') === null) {
            return true;
        } else {
            this.router.navigate(['home-dashboard']);
            return false;
        }
    }
}
