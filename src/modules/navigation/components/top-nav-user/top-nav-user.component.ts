import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EmployeeService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(public userService: EmployeeService) {}
    ngOnInit() {}
}
