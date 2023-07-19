import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './clocking.component.html',
    styleUrls: ['clocking.component.scss'],
})
export class ClockingComponent implements OnInit{

    clockedIn = false;
    message: string = '';

    employeeId!: string ;

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.employeeId = params['employeeId'];
        });
    }

    clockIn(): void {
        const timestamp = new Date().toISOString(); // Get current timestamp
        this.recordAttendance(timestamp, 'clockIn');
        this.clockedIn = true;
        this.message = 'Clock in successful.';


    }

    clockOut(): void {
        const timestamp = new Date().toISOString(); // Get current timestamp
        this.recordAttendance(timestamp, 'clockOut');
        this.clockedIn = false;
        this.message = 'Clock out successful.';

    }

    recordAttendance(timestamp: string, action: string): void {
        const payload = {
            employeeId: this.employeeId,
            timestamp: timestamp,
        };

        if(action == 'clockIn'){
            this.http.post('http://localhost:8080/api/attendance/clockIn', payload)
                .subscribe(
                    () => {
                        console.log('Clocked out successfully')
                    },
                    error => console.log('Error recording attendance:', error)
                );

        }else{
            this.http.post('http://localhost:8080/api/attendance/clockOut', payload)
                .subscribe(
                    () => {
                        console.log('Clocked out successfully')
                    },
                    error => console.log('Error recording attendance:', error)
                );

        }


    }
}
