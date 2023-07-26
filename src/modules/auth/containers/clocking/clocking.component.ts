import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
    clockedOut: boolean = false;
    message: string = '';

    clockedInTime!: string;
    clockedOutTime!: string;

    employeeId!: string ;
    username!: string;

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,private changeDetectorRef: ChangeDetectorRef ) {}

    ngOnInit(): void {
        this.currentDate = this.getCurrentDate();

        this.route.queryParams.subscribe(params => {
            this.employeeId = params['employeeId'];
            this.username = params['username'];
            this.checkClockStatus();
        });
    }

    clockIn(): void {
        this.recordAttendance( 'clockIn');
        this.clockedIn = true;
        this.message = 'Clock in successful.';
        this.delayedLogoutAndRedirect(2000);


    }

    clockOut(): void {
        this.recordAttendance('clockOut');
        this.clockedIn = false;
        this.message = 'Clock out successful.';
        this.delayedLogoutAndRedirect(2000);

    }

    logout(): void {


        // After performing logout operations, navigate to the home page:
        this.router.navigate(['auth/login']);
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
                        this.clockedIn = false;
                        this.clockedOut = false; // Employee has no clock-in records
                    } else {
                        const lastRecord = attendanceRecords[0];
                        this.clockedIn = lastRecord.clockIn? true : false; // If clockOut is null, employee is clocked in
                        this.clockedOut = lastRecord.clockOut? true : false; // If clockOut is not null, employee is clocked out

                        if (this.clockedIn) {
                            this.clockedInTime = new Date(lastRecord.clockIn).toLocaleTimeString();
                        } else {
                            this.clockedInTime = '-';
                        }

                        if (this.clockedOut) {
                            this.clockedOutTime = new Date(lastRecord.clockOut).toLocaleTimeString();
                        } else {
                            this.clockedOutTime = '-';
                        }
                    }

                    this.changeDetectorRef.detectChanges();
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
