import {NgModule, CUSTOM_ELEMENTS_SCHEMA,} from '@angular/core';
import {ForumListComponent} from './forum-list/forum-list'
import {CommonModule} from "@angular/common";
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
  declarations: [
    ForumListComponent
  ],
  imports: [
    CommonModule,
    PipesModule.forRoot()
  ],
  exports: [
    ForumListComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class ComponentsModule {
}
