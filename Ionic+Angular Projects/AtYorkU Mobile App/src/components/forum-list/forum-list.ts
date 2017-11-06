import {Component, Input} from '@angular/core';
import {ForumInterface} from "../../models/forum.interface";
import {CommonToolService} from "../../providers/common-tool.service";

@Component({
  selector: 'forum-list',
  templateUrl: 'forum-list.html'
})
export class ForumListComponent {

  @Input() public forums: ForumInterface[];


  constructor(public commonToolService: CommonToolService) {

  }

}
