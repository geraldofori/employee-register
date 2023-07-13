import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clocking',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.css']
})
export class ClockingComponent {

  employeeId: string = '';

  constructor(private http: HttpClient) {}

  clockIn(): void {
    const timestamp = new Date().toISOString(); // Get current timestamp
    this.recordAttendance(timestamp, 'clockIn');
  }

  clockOut(): void {
    const timestamp = new Date().toISOString(); // Get current timestamp
    this.recordAttendance(timestamp, 'clockOut');
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
