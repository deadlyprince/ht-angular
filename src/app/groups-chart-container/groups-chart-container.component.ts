import { Component, OnInit } from '@angular/core';
import {HtClientService} from "ht-angular-client";
import {AllData} from "ht-js-client";
import {IGroup} from "ht-models";
import * as _ from "underscore";

@Component({
  selector: 'ht-groups-chart-container',
  templateUrl: './groups-chart-container.component.html',
  styleUrls: ['./groups-chart-container.component.less']
})
export class GroupsChartContainerComponent implements OnInit {
  groupService;
  progress: number = 0;
  groupsLevels = [];
  selectedGroups = [];
  loading: boolean = false;
  noChild: boolean = false;
  constructor(
    private clientService: HtClientService
  ) {
    this.groupService = clientService.groups;
  }

  ngOnInit() {
    // this.fillChildren("ecaec5e3-accb-4f77-a8bc-9dd54e38dc47")
    this.fillChildren("87e4c882-e653-49b9-ac47-7558749292cf")
    // this.groupService.getChildren("ecaec5e3-accb-4f77-a8bc-9dd54e38dc47").do((data: AllData<IGroup>) => {
    //   const totalCount = data.count;
    //   const currentCount = data ? Object.keys(data.resultsEntity).length : 0;
    //   this.progress = 100 * currentCount / totalCount;
    //   const isDone = data && !data.next;
    //   if (isDone) {
    //     this.progress = 100;
    //     let groups = _.values(data.resultsEntity);
    //     this.setGroups(groups, 1)
    //   }
    //   console.log("all groups", data);
    // })
  }

  fillChildren(id, level: number = 0) {
    this.clearTree(level);
    this.loading = true;
    let groups$ = id ? this.groupService.getChildren(id) : this.groupService.getRoot();
    this.groupService.getChildren(id).subscribe((data: AllData<IGroup>) => {
      this.loading = false;
      const totalCount = data.count;
      const currentCount = data ? Object.keys(data.resultsEntity).length : 0;
      this.progress = 100 * currentCount / totalCount;
      const isDone = data && !data.next;
      if (isDone) {
        this.progress = 100;
        let groups = _.values(data.resultsEntity);
        this.setGroups(groups, level)
      }
      console.log("all groups", data);
    })
  }

  setGroups(groups, level) {
    // this.groupsLevels.splice(level, this.groupsLevels.length, groups)

    if (groups.length === 0) {
      this.noChild = true;
    } else {
      this.groupsLevels[level] = groups;
    }
    console.log(this.groupsLevels);
  }

  selectGroup(group, level, event) {
    const id = group.id;
    event.stopPropagation();
    event.preventDefault();
    // this.selectedGroups.splice(level, this.selectedGroups.length, id);
    this.selectedGroups[level] = id;
    level = +level + 1;
    console.log('level', level, id);
    this.fillChildren(id, level)
  }

  clearTree(level) {
    this.selectedGroups.splice(level);
    this.groupsLevels.splice(level);
    this.noChild = false;
  }

}
