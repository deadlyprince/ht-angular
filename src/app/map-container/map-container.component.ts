import {Component, Input, OnInit} from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";
import {ApiType} from "ht-js-client";

@Component({
  selector: 'ht-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.less']
})
export class MapContainerComponent implements OnInit {
  @Input() userId: string | null;
  @Input() showLoading: boolean = true;
  subs = [];
  loading$;
  @Input() apiType: ApiType = ApiType.analytics;

  constructor(
    private userClientService: HtUsersClientService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.userClientService.options.listApiType = this.apiType;
    this.userClientService.placeline.initListener();
    this.loading$ = this.userClientService.placeline.loadingObserver.data$()
      .map((data) => !!data && this.showLoading)
      .distinctUntilChanged();

    let sub = this.userClientService.placeline.data$.subscribe((userData: IUserData) => {
      if (userData) {
        this.mapService.tracePlaceline(userData);
        this.mapService.resetBounds()
      } else {
        this.mapService.segmentTrace.trace(null, this.mapService.map)
      }
    });

    this.subs.push(sub);

    if (this.userId) {
      this.userClientService.placeline.setId(this.userId)
    }

    // this.userClientService.list.initListener();
    this.userClientService.marks.initListener();


    const marks$ = this.userClientService.usersMarkers$();


    marks$.subscribe((data) => {
      this.mapService.usersCluster.trace(data, this.mapService.map)
    })

    this.userClientService.marks.data$.filter(data => !!data).pluck('isFirst').filter(data => !!data).subscribe((amrks) => {
      this.mapService.resetBounds()
    });
  }

  resetMap() {
    this.mapService.resetBounds()
  }

}
