import { NgModule } from '@angular/core';

import { DcultimatebotSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [DcultimatebotSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [DcultimatebotSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DcultimatebotSharedCommonModule {}
