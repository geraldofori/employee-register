import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Employee} from "@modules/auth/services/employee";
import {EmployeeService} from "@modules/auth/services";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'sb-charts',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employee-details.component.html',
    styleUrls: ['employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
    employee!: Employee;
    employeeList!: Employee[];
    routerSubscription!: Subscription;
    startDate!: string;
    showPercentage: any;

    constructor(private activatedRoute: ActivatedRoute,
                private service: EmployeeService,
                private router: Router) {}

    ngOnInit() {

        this.getPercentage();
    }

    getPercentage() {
    }
    ngOnDestroy() {
        // this.routerSubscription.unsubscribe();
    }
}
