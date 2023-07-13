import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Employee} from "@modules/auth/services/employee";
@Component({
    selector: 'sb-charts',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-employee.component.html',
    styleUrls: ['add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
    employeeForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.employeeForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            username:['', Validators.required],
            password:['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.employeeForm.valid) {
            // Create a new employee object from the form values
            const newEmployee: Employee = {
                firstName: this.employeeForm.value.firstName,
                lastName: this.employeeForm.value.lastName,
                email: this.employeeForm.value.email,
                username: this.employeeForm.value.username,
                password: this.employeeForm.value.password,
            };

            // Perform further actions like saving the employee to a database
            console.log(newEmployee);

            // Reset the form after submission
            this.employeeForm.reset();
        }
    }
}
