import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICommand } from 'app/shared/model/command.model';
import { CommandService } from './command.service';
import { IAction } from 'app/shared/model/action.model';
import { ActionService } from 'app/entities/action';
import { IChannel } from 'app/shared/model/channel.model';
import { ChannelService } from 'app/entities/channel';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author';

@Component({
    selector: 'jhi-command-update',
    templateUrl: './command-update.component.html'
})
export class CommandUpdateComponent implements OnInit {
    command: ICommand;
    isSaving: boolean;

    actions: IAction[];

    channels: IChannel[];

    authors: IAuthor[];
    creationDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commandService: CommandService,
        protected actionService: ActionService,
        protected channelService: ChannelService,
        protected authorService: AuthorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ command }) => {
            this.command = command;
            this.creationDate = this.command.creationDate != null ? this.command.creationDate.format(DATE_TIME_FORMAT) : null;
        });
        this.actionService
            .query({ filter: 'command-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IAction[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAction[]>) => response.body)
            )
            .subscribe(
                (res: IAction[]) => {
                    if (!this.command.action || !this.command.action.id) {
                        this.actions = res;
                    } else {
                        this.actionService
                            .find(this.command.action.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IAction>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IAction>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IAction) => (this.actions = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.channelService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IChannel[]>) => mayBeOk.ok),
                map((response: HttpResponse<IChannel[]>) => response.body)
            )
            .subscribe((res: IChannel[]) => (this.channels = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.authorService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAuthor[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAuthor[]>) => response.body)
            )
            .subscribe((res: IAuthor[]) => (this.authors = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.command.creationDate = this.creationDate != null ? moment(this.creationDate, DATE_TIME_FORMAT) : null;
        if (this.command.id !== undefined) {
            this.subscribeToSaveResponse(this.commandService.update(this.command));
        } else {
            this.subscribeToSaveResponse(this.commandService.create(this.command));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommand>>) {
        result.subscribe((res: HttpResponse<ICommand>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackActionById(index: number, item: IAction) {
        return item.id;
    }

    trackChannelById(index: number, item: IChannel) {
        return item.id;
    }

    trackAuthorById(index: number, item: IAuthor) {
        return item.id;
    }
}
