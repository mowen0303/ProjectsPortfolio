import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumAddPage } from './forum-add';

@NgModule({
  declarations: [
    ForumAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumAddPage),
  ],
})
export class ForumAddPageModule {}
