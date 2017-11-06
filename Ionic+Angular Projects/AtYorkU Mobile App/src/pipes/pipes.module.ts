import {NgModule} from '@angular/core';
import {
  CommercialTypePipe, ContentLengthPipe, GenderIconPipe, GenderPipe, HostUrlPipe,
  TranslateNullPipe
} from './my/my.pipe';

@NgModule({
  declarations: [
    GenderPipe,
    GenderIconPipe,
    HostUrlPipe,
    TranslateNullPipe,
    CommercialTypePipe,
    ContentLengthPipe
  ],
  imports: [],
  exports: [
    GenderPipe,
    GenderIconPipe,
    HostUrlPipe,
    TranslateNullPipe,
    CommercialTypePipe,
    ContentLengthPipe
  ]
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
