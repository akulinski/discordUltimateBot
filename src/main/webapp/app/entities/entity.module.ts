import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'message',
                loadChildren: './message/message.module#DcultimatebotMessageModule'
            },
            {
                path: 'author',
                loadChildren: './author/author.module#DcultimatebotAuthorModule'
            },
            {
                path: 'message',
                loadChildren: './message/message.module#DcultimatebotMessageModule'
            },
            {
                path: 'channel',
                loadChildren: './channel/channel.module#DcultimatebotChannelModule'
            },
            {
                path: 'message',
                loadChildren: './message/message.module#DcultimatebotMessageModule'
            },
            {
                path: 'message',
                loadChildren: './message/message.module#DcultimatebotMessageModule'
            },
            {
                path: 'message',
                loadChildren: './message/message.module#DcultimatebotMessageModule'
            },
            {
                path: 'author',
                loadChildren: './author/author.module#DcultimatebotAuthorModule'
            },
            {
                path: 'action',
                loadChildren: './action/action.module#DcultimatebotActionModule'
            },
            {
                path: 'command',
                loadChildren: './command/command.module#DcultimatebotCommandModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DcultimatebotEntityModule {}
