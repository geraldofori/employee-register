/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

import {ClockingModule} from "@modules/clocking/clocking.module";
import {ClockingComponent} from "@modules/clocking/clocking.component";

/* Module */
/* Routes */
export const ROUTES: Routes = [
    {
        path: 'clock',
        component: ClockingComponent
    }
];

@NgModule({
    imports: [ClockingModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ClockingRoutingModule {}
