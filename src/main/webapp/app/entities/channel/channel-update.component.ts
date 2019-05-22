import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IChannel } from 'app/shared/model/channel.model';
import { ChannelService } from './channel.service';

@Component({
    selector: 'jhi-channel-update',
    templateUrl: './channel-update.component.html'
})
export class ChannelUpdateComponent implements OnInit {
    channel: IChannel;
    isSaving: boolean;

    constructor(protected channelService: ChannelService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ channel }) => {
            this.channel = channel;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.channel.id !== undefined) {
            this.subscribeToSaveResponse(this.channelService.update(this.channel));
        } else {
            this.subscribeToSaveResponse(this.channelService.create(this.channel));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IChannel>>) {
        result.subscribe((res: HttpResponse<IChannel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
