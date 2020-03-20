import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumListPage } from './forum-list';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ForumListPage
  ],
  imports: [
    IonicPageModule.forChild(ForumListPage),
    PipesModule.forRoot()
  ],
})
export class ForumListPageModule {}
