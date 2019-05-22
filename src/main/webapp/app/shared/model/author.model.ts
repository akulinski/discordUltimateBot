import { Moment } from 'moment';
import { IMessage } from 'app/shared/model/message.model';
import { ICommand } from 'app/shared/model/command.model';

export interface IAuthor {
    id?: number;
    name?: string;
    avatarUrl?: string;
    creationDate?: Moment;
    messages?: IMessage[];
    issuers?: ICommand[];
}

export class Author implements IAuthor {
    constructor(
        public id?: number,
        public name?: string,
        public avatarUrl?: string,
        public creationDate?: Moment,
        public messages?: IMessage[],
        public issuers?: ICommand[]
    ) {}
}
