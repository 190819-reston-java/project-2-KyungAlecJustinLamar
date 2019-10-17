import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthenticationService } from '../login-authentication.service';
import { HttpClient } from "@angular/common/http";


@Component({
	selector: 'app-login-signup',
	templateUrl: './login-signup.component.html',
	styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
	constructor(private router: Router, private http: HttpClient, private loginAuthentication: LoginAuthenticationService) {}

	loginUri: String;

	showLogin = function(loginForm, signUpForm) {
		loginForm.hidden = false;
		signUpForm.hidden = true;
	}

	showSignUp = function(signUpForm, loginForm) {
		signUpForm.hidden = false;
		loginForm.hidden = true;
	}

	submitLoginInfo = function(event, username, password) {
		event.preventDefault();
		let loginInfo = {
			username: username,
			password: password
		};
		this.loginUri = this.loginAuthentication.getLogin();
		this.http.post(this.loginUri, loginInfo).subscribe(
			(response => {
				if (response.status >= 200 && response.status < 300) {
					this.router.navigate(["main"]);
				} else {
					console.log("WRONG USERNAME AND PASSWORD");
				}
			})
		);
	}

	ngOnInit() {
	}
}
