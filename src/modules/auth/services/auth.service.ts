import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public storedToken: any;
    public redirectUrl: any;
    constructor(private httpClient: HttpClient, private router: Router) {
        this.storedToken = localStorage.getItem('token');
    }


    login(credentials: any) {
        const headers = new HttpHeaders({'Accept': 'application/json'});
        return this.httpClient.post<any>( 'http://localhost:8080/login', credentials, {headers});
    }

    currentUser() {
        return this.httpClient.get('/authenticationToken');
    }

    isLoggedIn() {
        if (this.clientAuthentication()) {
            return true;
        }
        return false;
    }

    getAuthorizationToken() {
        const currentUser = JSON.parse(this.storedToken);
        return currentUser.token;
    }

    logout() {
        let reqHeader = new HttpHeaders();
        reqHeader = reqHeader.append('X-Auth-Token', '' + this.storedToken);
        return this.httpClient.post('/api/logout', {}, {headers: reqHeader});
    }

    clientAuthentication() {
        const url = '/api/validate';
        let reqHeader = new HttpHeaders();
        reqHeader = reqHeader.append('X-Auth-Token', '' + this.storedToken);
        return this.httpClient.post(url, {}, {headers: reqHeader});
    }
}
