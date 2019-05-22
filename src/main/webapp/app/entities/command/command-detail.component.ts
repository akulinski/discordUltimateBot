import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommand } from 'app/shared/model/command.model';

@Component({
    selector: 'jhi-command-detail',
    templateUrl: './command-detail.component.html'
})
export class CommandDetailComponent implements OnInit {
    command: ICommand;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ command }) => {
            this.command = command;
        });
    }

    previousState() {
        window.history.back();
    }
}
