import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    public username: string;
    public password: string;
    constructor(public authService: AuthService, public router: Router) { }

    ngOnInit() {

    }

    login() {
        this.authService.login(this.username, this.password)
            .subscribe(result => {
                if (localStorage.getItem('token') != null) {
                    this.router.navigate(['home-dashboard']);
                }
            });
    }
}
