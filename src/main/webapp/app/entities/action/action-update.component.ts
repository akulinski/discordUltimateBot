import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAction } from 'app/shared/model/action.model';
import { ActionService } from './action.service';
import { ICommand } from 'app/shared/model/command.model';
import { CommandService } from 'app/entities/command';

@Component({
    selector: 'jhi-action-update',
    templateUrl: './action-update.component.html'
})
export class ActionUpdateComponent implements OnInit {
    action: IAction;
    isSaving: boolean;

    commands: ICommand[];
    creationDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected actionService: ActionService,
        protected commandService: CommandService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ action }) => {
            this.action = action;
            this.creationDate = this.action.creationDate != null ? this.action.creationDate.format(DATE_TIME_FORMAT) : null;
        });
        this.commandService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICommand[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICommand[]>) => response.body)
            )
            .subscribe((res: ICommand[]) => (this.commands = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.action.creationDate = this.creationDate != null ? moment(this.creationDate, DATE_TIME_FORMAT) : null;
        if (this.action.id !== undefined) {
            this.subscribeToSaveResponse(this.actionService.update(this.action));
        } else {
            this.subscribeToSaveResponse(this.actionService.create(this.action));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAction>>) {
        result.subscribe((res: HttpResponse<IAction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCommandById(index: number, item: ICommand) {
        return item.id;
    }
}
