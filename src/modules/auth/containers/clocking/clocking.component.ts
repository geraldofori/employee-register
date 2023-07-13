import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './clocking.component.html',
    styleUrls: ['clocking.component.scss'],
})
export class ClockingComponent {

    showClockInButton: boolean = true;
    showClockOutButton: boolean = false;

    toggleClock(checked: boolean): void {
        this.showClockInButton = checked;
        this.showClockOutButton = !checked;
    }

    employeeId!: string ;

    constructor(private http: HttpClient, private router: Router) {}

    clockIn(): void {
        const timestamp = new Date().toISOString(); // Get current timestamp
        this.recordAttendance(timestamp, 'clockIn');
        this.showClockInButton = false
        this.router.navigate(['/auth/login']);
    }

    clockOut(): void {
        const timestamp = new Date().toISOString(); // Get current timestamp
        this.recordAttendance(timestamp, 'clockOut');
        this.showClockOutButton = false
        this.router.navigate(['/auth/login']);

    }

    recordAttendance(timestamp: string, action: string): void {
        const payload = {
            employeeId: this.employeeId,
            timestamp: timestamp,
            action: action
        };

        this.http.post('http://localhost:8080/api/attendance', payload)
            .subscribe(
                () => console.log('Attendance recorded successfully'),
                error => console.log('Error recording attendance:', error)
            );
    }
}
