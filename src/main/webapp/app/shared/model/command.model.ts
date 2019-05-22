import { Moment } from 'moment';
import { IAction } from 'app/shared/model/action.model';
import { IChannel } from 'app/shared/model/channel.model';
import { IAuthor } from 'app/shared/model/author.model';

export interface ICommand {
    id?: number;
    command?: string;
    creationDate?: Moment;
    action?: IAction;
    channel?: IChannel;
    poster?: IAuthor;
}

export class Command implements ICommand {
    constructor(
        public id?: number,
        public command?: string,
        public creationDate?: Moment,
        public action?: IAction,
        public channel?: IChannel,
        public poster?: IAuthor
    ) {}
}
