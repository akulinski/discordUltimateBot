import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Command } from 'app/shared/model/command.model';
import { CommandService } from './command.service';
import { CommandComponent } from './command.component';
import { CommandDetailComponent } from './command-detail.component';
import { CommandUpdateComponent } from './command-update.component';
import { CommandDeletePopupComponent } from './command-delete-dialog.component';
import { ICommand } from 'app/shared/model/command.model';

@Injectable({ providedIn: 'root' })
export class CommandResolve implements Resolve<ICommand> {
    constructor(private service: CommandService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICommand> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Command>) => response.ok),
                map((command: HttpResponse<Command>) => command.body)
            );
        }
        return of(new Command());
    }
}

export const commandRoute: Routes = [
    {
        path: '',
        component: CommandComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commands'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CommandDetailComponent,
        resolve: {
            command: CommandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commands'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CommandUpdateComponent,
        resolve: {
            command: CommandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commands'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CommandUpdateComponent,
        resolve: {
            command: CommandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commands'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commandPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CommandDeletePopupComponent,
        resolve: {
            command: CommandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commands'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
