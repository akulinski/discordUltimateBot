import { IMessage } from 'app/shared/model/message.model';

export interface IChannel {
    id?: number;
    name?: string;
    type?: string;
    messages?: IMessage[];
}

export class Channel implements IChannel {
    constructor(public id?: number, public name?: string, public type?: string, public messages?: IMessage[]) {}
}
