import { AuthService } from './auth.service';
import { EmployeeService } from './employee.service';

export const services = [AuthService, EmployeeService];

export * from './auth.service';
export * from './employee.service';
