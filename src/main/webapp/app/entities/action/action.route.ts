import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Action } from 'app/shared/model/action.model';
import { ActionService } from './action.service';
import { ActionComponent } from './action.component';
import { ActionDetailComponent } from './action-detail.component';
import { ActionUpdateComponent } from './action-update.component';
import { ActionDeletePopupComponent } from './action-delete-dialog.component';
import { IAction } from 'app/shared/model/action.model';

@Injectable({ providedIn: 'root' })
export class ActionResolve implements Resolve<IAction> {
    constructor(private service: ActionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAction> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Action>) => response.ok),
                map((action: HttpResponse<Action>) => action.body)
            );
        }
        return of(new Action());
    }
}

export const actionRoute: Routes = [
    {
        path: '',
        component: ActionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ActionDetailComponent,
        resolve: {
            action: ActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ActionUpdateComponent,
        resolve: {
            action: ActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ActionUpdateComponent,
        resolve: {
            action: ActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const actionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ActionDeletePopupComponent,
        resolve: {
            action: ActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
