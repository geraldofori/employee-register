import { TestBed } from '@angular/core/testing';
import { MockUser, User } from '@testing/mocks';

import { EmployeeService } from './employee.service';

const mockUser = new MockUser();

describe('UserService', () => {
    let userService: EmployeeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EmployeeService],
        });
        userService = TestBed.inject(EmployeeService);
    });

    describe('getUser$', () => {
        it('should return Observable<User>', () => {
            userService.user = mockUser;
            userService.user$.subscribe(response => {
                expect(response).toEqual(mockUser);
            });
        });
    });
});
