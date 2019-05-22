import { Moment } from 'moment';
import { IAuthor } from 'app/shared/model/author.model';
import { IChannel } from 'app/shared/model/channel.model';

export interface IMessage {
    id?: number;
    creationDate?: Moment;
    content?: any;
    hashcode?: number;
    author?: IAuthor;
    channel?: IChannel;
}

export class Message implements IMessage {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public content?: any,
        public hashcode?: number,
        public author?: IAuthor,
        public channel?: IChannel
    ) {}
}
