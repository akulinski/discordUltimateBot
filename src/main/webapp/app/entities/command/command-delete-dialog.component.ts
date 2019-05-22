import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommand } from 'app/shared/model/command.model';
import { CommandService } from './command.service';

@Component({
    selector: 'jhi-command-delete-dialog',
    templateUrl: './command-delete-dialog.component.html'
})
export class CommandDeleteDialogComponent {
    command: ICommand;

    constructor(protected commandService: CommandService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commandService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'commandListModification',
                content: 'Deleted an command'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-command-delete-popup',
    template: ''
})
export class CommandDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ command }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CommandDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.command = command;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/command', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/command', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
