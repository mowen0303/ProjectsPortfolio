import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumReportListPage } from './forum-report-list';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ForumReportListPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumReportListPage),
    PipesModule.forRoot()
  ],
})
export class ForumReportListPageModule {}
