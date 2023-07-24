import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './clocking.component.html',
    styleUrls: ['clocking.component.scss'],
})
export class ClockingComponent implements OnInit{

    currentDate!: string;
    clockedIn: boolean = false;
    message: string = '';

    employeeId!: string ;

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.currentDate = this.getCurrentDate();

        this.route.queryParams.subscribe(params => {
            this.employeeId = params['employeeId'];
            this.checkClockStatus();
        });
    }

    clockIn(): void {
        this.recordAttendance( 'clockIn');
        this.clockedIn = true;
        this.message = 'Clock in successful.';
        // this.delayedLogoutAndRedirect(3000);


    }

    clockOut(): void {
        this.recordAttendance('clockOut');
        this.clockedIn = false;
        this.message = 'Clock out successful.';
        // this.delayedLogoutAndRedirect(3000);

    }

    getCurrentDate(): string {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    }

    recordAttendance(action: string): void {
        const payload = {
            employeeId: this.employeeId,
        };

        if(action == 'clockIn'){
            this.http.post('http://localhost:8080/clockIn', payload)
                .subscribe(
                    () => {
                        console.log('Clocked out successfully')
                    },
                    error => console.log('Error recording attendance:', error)
                );

        }else{
            this.http.post('http://localhost:8080/clockOut', payload)
                .subscribe(
                    () => {
                        console.log('Clocked out successfully')
                    },
                    error => console.log('Error recording attendance:', error)
                );

        }


    }

    checkClockStatus(): void {
        const url = 'http://localhost:8080/attendance/employee';

        const params = new HttpParams().set('id', this.employeeId);

        this.http.get<any[]>(url,{params})
            .subscribe(
                (attendanceRecords) => {
                    if (attendanceRecords.length === 0) {
                        this.clockedIn = false; // Employee has no clock-in records
                    } else {
                        const lastRecord = attendanceRecords[attendanceRecords.length - 1];
                        this.clockedIn = !lastRecord.checkOut; // If checkOut is null, employee is clocked in
                    }
                },
                error => console.log('Error fetching attendance records:', error)
            );
    }

    delayedLogoutAndRedirect(delay: number): void {
        setTimeout(() => {
            // Perform any logout operations here if necessary, such as clearing local storage or tokens.
            // Then navigate to the login page.
            this.router.navigate(['/auth/login']);
        }, delay);
    }
}
