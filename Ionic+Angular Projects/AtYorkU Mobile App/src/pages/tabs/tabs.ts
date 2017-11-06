import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavParams, Tabs} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})



export class TabsPage {

  mainRoot: string;
  eventRoot: string;
  courseRoot: string;
  forumRoot: string;
  meRoot: string;

  @ViewChild('myTabs') tabRef;


  selectedIndex:number = 0;

  constructor(
    private navParams: NavParams
  ) {

    this.mainRoot = 'HomePage';
    this.eventRoot = 'HomePage';
    this.courseRoot = 'HomePage';
    this.forumRoot = 'ForumListPage';
    this.meRoot = 'UserPage';

    this.selectedIndex = navParams.get('selectedIndex') || this.selectedIndex;

    // setTimeout(()=>{
    //   this.tabRef.select(1);
    // },100)

  }

  select(index){
    this.tabRef.select(index);
  }


}
