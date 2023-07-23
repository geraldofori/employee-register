import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Employee} from "./employee";
import {environment} from "../../../environments/environment";
import {Attendance} from "@modules/auth/services/attendance";

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employees`);
    }

    public getAllAttendanceRecords(): Observable<Attendance[]>{
         return this.http.get<Attendance[]>(`${this.apiServerUrl}/attendance`)

    }
}
