import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChannel } from 'app/shared/model/channel.model';
import { AccountService } from 'app/core';
import { ChannelService } from './channel.service';

@Component({
    selector: 'jhi-channel',
    templateUrl: './channel.component.html'
})
export class ChannelComponent implements OnInit, OnDestroy {
    channels: IChannel[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected channelService: ChannelService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.channelService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IChannel[]>) => res.ok),
                    map((res: HttpResponse<IChannel[]>) => res.body)
                )
                .subscribe((res: IChannel[]) => (this.channels = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.channelService
            .query()
            .pipe(
                filter((res: HttpResponse<IChannel[]>) => res.ok),
                map((res: HttpResponse<IChannel[]>) => res.body)
            )
            .subscribe(
                (res: IChannel[]) => {
                    this.channels = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInChannels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IChannel) {
        return item.id;
    }

    registerChangeInChannels() {
        this.eventSubscriber = this.eventManager.subscribe('channelListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
