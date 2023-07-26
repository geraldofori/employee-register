import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {EmployeeService} from "@modules/auth/services";
import {Employee} from "@modules/auth/services/employee";
import {Observable} from "rxjs";

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './tables.component.html',
    styleUrls: ['tables.component.scss'],
})
export class TablesComponent implements OnInit {
    employees!: Observable<Employee[]>;
    constructor(private employeeService: EmployeeService) {}

    ngOnInit() {
        // Fetch the list of employees from the backend
        this.employees = this.employeeService.getEmployees()
    }

    loadEmployees(): void {
        this.employees = this.employeeService.getEmployees();
        window.location.reload();
    }

    deleteEmployee(employeeId: string): void {
        this.employeeService.deleteEmployee(employeeId).subscribe(
            () => {
                console.log('Employee deleted successfully.');
                setTimeout(() => {
                    this.loadEmployees();
                }, 1000);            },
            (error) => {
                console.error('Error deleting employee:', error);
            }
        );
    }
}
