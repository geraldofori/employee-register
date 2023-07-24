import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthService} from "@modules/auth/services";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error: string | null = null;
    submitted: boolean = false;
    // username: any;
    // password: any;
    passwordVisible: boolean = false;


    constructor(
        private router: Router,
        private http: HttpClient,
        public formBuilder: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
        // super();
        this.loginForm = this.formBuilder.group({
            username : ['',Validators.required],
            password : ['',Validators.required],
            submitted: [false],
        });
    }

    ngOnInit(): void {
        this.loginForm.reset();
    }


    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
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
                this.router.navigate(['/auth/clock'],{ queryParams: { employeeId: data.employeeId } });
                // this.router.navigateByUrl(['/auth/clock'],{ queryParams: { employeeId: employeeId } });
            },
            (err: HttpErrorResponse) => {
                if (err) {
                    this.error = 'Invalid username or password.';
                }
            }
        );
    }

}
