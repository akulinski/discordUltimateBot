import { Moment } from 'moment';
import { ICommand } from 'app/shared/model/command.model';

export const enum ActionType {
    COMMAND = 'COMMAND',
    TEXTMESSAGE = 'TEXTMESSAGE',
    USERJOINED = 'USERJOINED'
}

export interface IAction {
    id?: number;
    action?: ActionType;
    description?: string;
    creationDate?: Moment;
    command?: ICommand;
}

export class Action implements IAction {
    constructor(
        public id?: number,
        public action?: ActionType,
        public description?: string,
        public creationDate?: Moment,
        public command?: ICommand
    ) {}
}
