import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGroup, AllData} from "ht-models";
import * as _ from "underscore";
import {HtGroupsService} from "../ht/ht-groups.service";
import {Page} from "ht-models/dist/typings/common";
import {catchError, tap} from "rxjs/operators";
import {empty} from "rxjs/observable/empty";
import {of} from "rxjs/observable/of";

@Component({
  selector: 'ht-groups-chart-container',
  templateUrl: './groups-chart-container.component.html',
  styleUrls: ['./groups-chart-container.component.less']
})
export class GroupsChartContainerComponent implements OnInit {
  // groupService;
  progress: number = 0;
  groupsLevels = [];
  selectedGroups = [];
  loading: boolean = false;
  noChild: boolean = false;
  selectedGroup$;
  error;
  @Input() groupId: string;
  @Output() onGroup: EventEmitter<IGroup> = new EventEmitter();
  constructor(
    private groupService: HtGroupsService
  ) {
    // this.groupService = clientService.groups;
  }

  ngOnInit() {
    this.fillChildren(this.groupId);
    this.fillSelectedGroup(this.groupId)

  }

  fillChildren(id?, level: number = 0) {
    this.clearTree(level);
    this.loading = true;
    const groups$ = id ? this.groupService.getChildren(id) : this.groupService.getRoot();
    groups$.subscribe((data: Page<IGroup>) => {
      const totalCount = data.count;
      const currentCount = data ? data.count : 0;
      this.progress = 100 * currentCount / totalCount;
      const isDone = data && !data.next;
      if (isDone) {
        this.loading = false;
        this.progress = 100;
        const groups = data.results;
        this.setGroups(groups, level)
      }
    }, (err) => {
      this.error = err.error;
    })
  }

  fillSelectedGroup(id) {
    if (!id) return false;
    this.selectedGroup$ = this.groupService.item.api$(id).pipe(
      catchError((err) => {
        this.error = err.error;
        return of(null)
      })
    )
  }

  setGroups(groups, level) {
    // this.groupsLevels.splice(level, this.groupsLevels.length, groups)

    if (groups.length === 0) {
      this.noChild = true;
    } else {
      this.groupsLevels[level] = groups;
    }
  };

  setGroup(group) {
    this.onGroup.next(group)
  }

  selectGroup(group, level, event) {
    const id = group.id;
    event.stopPropagation();
    event.preventDefault();
    this.selectedGroups[level] = group;
    level = +level + 1;
    this.fillChildren(id, level)
  }

  clearTree(level) {
    this.selectedGroups.splice(level);
    this.groupsLevels.splice(level);
    this.noChild = false;
  }

  clearRootTree() {
    this.selectedGroups = [];
    this.groupsLevels.splice(1);
    this.noChild = false;
  };

  selectGroupFromNav(group, level) {
    this.selectedGroups.splice(level + 1);
    this.groupsLevels.splice(level + 2);
    this.noChild = !this.groupsLevels[this.groupsLevels.length - 1].length
  }

}
