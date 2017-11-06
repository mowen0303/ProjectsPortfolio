import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumDetailPage } from './forum-detail';
import {PipesModule} from "../../pipes/pipes.module";


@NgModule({
  declarations: [
    ForumDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumDetailPage),
    PipesModule.forRoot()
  ],
})
export class ForumDetailPageModule {}
