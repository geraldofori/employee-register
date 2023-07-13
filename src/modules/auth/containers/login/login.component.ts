import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthService} from "@modules/auth/services";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error: any;
    submitted: boolean = false;
    username: any;
    password: any;
    rememberMe: any;



    constructor(
        private router: Router,
        private http: HttpClient,
        public formBuilder: FormBuilder,
        private authService: AuthService,
    ) {
        // super();
        this.loginForm = this.formBuilder.group({
            username : ['',Validators.required],
            password : ['',Validators.required],
            rememberMe : [''],
            submitted: [false],
        });
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        const credentials = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        };

        const headers = new HttpHeaders({'Accept': 'application/json'});
        return this.authService.login(credentials).subscribe(
            (data: any) => {
                localStorage.setItem('token', data.access_token);
                this.router.navigateByUrl('/dashboard');
            },
            (err: HttpErrorResponse) => {
                if (err) {
                    this.error = 'Invalid username or password.';
                }
            }
        );
    }

}
