/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { ChartsModule } from './charts.module';

/* Containers */
import * as chartsContainers from './containers';


/* Routes */
export const ROUTES: Routes = [
    {
        path: 'add-employee',
        canActivate: [],
        component: chartsContainers.AddEmployeeComponent,
        data: {
            title: 'Add Employee - Admin',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Add Employee',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'employee-details',
        data: {
            title: 'Employee Details - Admin',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Employee Details',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: chartsContainers.EmployeeDetailsComponent,
    },
];

@NgModule({
    imports: [ChartsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ChartsRoutingModule {}
