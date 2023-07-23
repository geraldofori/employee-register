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

    currentDate!: string;
    clockedIn: boolean = false;
    message: string = '';

    employeeId!: string ;

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.currentDate = this.getCurrentDate();

        this.route.queryParams.subscribe(params => {
            this.employeeId = params['employeeId'];
        });
    }

    clockIn(): void {
        this.recordAttendance( 'clockIn');
        this.clockedIn = true;
        this.message = 'Clock in successful.';


    }

    clockOut(): void {
        this.recordAttendance('clockOut');
        this.clockedIn = false;
        this.message = 'Clock out successful.';

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
}
