import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DcultimatebotSharedModule } from 'app/shared';
import {
    CommandComponent,
    CommandDetailComponent,
    CommandUpdateComponent,
    CommandDeletePopupComponent,
    CommandDeleteDialogComponent,
    commandRoute,
    commandPopupRoute
} from './';

const ENTITY_STATES = [...commandRoute, ...commandPopupRoute];

@NgModule({
    imports: [DcultimatebotSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommandComponent,
        CommandDetailComponent,
        CommandUpdateComponent,
        CommandDeleteDialogComponent,
        CommandDeletePopupComponent
    ],
    entryComponents: [CommandComponent, CommandUpdateComponent, CommandDeleteDialogComponent, CommandDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DcultimatebotCommandModule {}
