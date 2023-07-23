import { AuthService } from './auth.service';
import { EmployeeService } from './employee.service';
import {AttendanceService} from "@modules/auth/services/attendance.service";

export const services = [AuthService, EmployeeService, AttendanceService];

export * from './auth.service';
export * from './employee.service';
export * from './attendance.service'
