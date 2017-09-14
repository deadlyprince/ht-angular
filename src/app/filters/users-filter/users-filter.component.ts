import { Component, OnInit } from '@angular/core';
import {HtUsersClientService} from "ht-angular-client";

@Component({
  selector: 'ht-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.less']
})
export class UsersFilterComponent implements OnInit {
  query$;
  loading$;
  statusFiltes;
  sortingLabels;
  ordering$;
  constructor(
    private usersClientService: HtUsersClientService
  ) { }

  ngOnInit() {
    this.query$ = this.usersClientService.queryLabel$;
    this.loading$ = this.usersClientService.list.loadingObserver.data$();
    this.statusFiltes = this.usersClientService.filterClass.statusQueryArray;
    this.sortingLabels = this.usersClientService.filterClass.sortingQueryLabel;
    this.ordering$ = this.usersClientService.ordering$;
  }

  onQuery(query) {
    this.usersClientService.list.queryObserver.updateData(query)
  }

  clearQuery(key) {
    this.usersClientService.list.queryObserver.clearQueryKey(key)
  }

  setStatus(key, event) {
    this.onQuery({status: key})
  }

  setOrdering(key) {
    this.onQuery({ordering: key})
  }

}
