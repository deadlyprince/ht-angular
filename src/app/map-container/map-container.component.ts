import {Component, Input, OnInit} from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";
import {ApiType} from "ht-js-client";
import {Observable} from "rxjs/Observable";

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
    this.userClientService.mapClass = this.mapService; // todo handle this from ht-angular-client
    this.userClientService.options.listApiType = this.apiType;
    this.userClientService.placeline.initListener();
    this.loading$ = this.userClientService.placeline.loadingObserver.data$()
      .map((data) => !!data && this.showLoading)
      .distinctUntilChanged();

    // const sub = this.userClientService.placeline.data$.subscribe((userData: IUserData) => {
      // if (userData) {
      //   this.mapService.tracePlaceline(userData);
      //   this.mapService.resetBounds()
      // } else {
      //   this.mapService.segmentTrace.trace(null, this.mapService.map)
      // }
    // });
      // .map((data) => !!data)
      // .distinctUntilChanged()
      // .subscribe((hasPlaceline: boolean) => {
      //   // this.userClientService.marks.setFilter((user) => !hasPlaceline);
      //   // this.mapService.resetBounds();
      // });

    // const sub2 = this.userClientService.placeline.idObservable.data$().distinctUntilChanged()
    //   .subscribe((userId) => {
    //     // this.userClientService.marks.setFilter((user) => !userId);
    //     this.mapService.resetBounds();
    //   });

    // let sub2 = this.userClientService.placeline.data$.share()
    //   .map((data) => !!data)
    //   .distinctUntilChanged()
    //   .subscribe((hasPlaceline: boolean) => {
    //   this.userClientService.marks.setFilter((user) => !hasPlaceline);
    //   this.mapService.resetBounds();
    // });

    // let sub2 = this.resetMap$().subscribe(() => {
    //   this.mapService.resetBounds()
    // })


    // this.subs.push(sub, sub2);

    if (this.userId) {
      this.userClientService.placeline.setId(this.userId)
    }

    // this.userClientService.list.initListener();
    this.userClientService.marks.initListener();


    // const marks$ = this.userClientService.usersMarkers$();
    //
    //
    // marks$.subscribe((data) => {
    //   this.mapService.usersCluster.trace(data, this.mapService.map)
    // });
    //
    // this.userClientService.marks.data$.filter(data => !!data).pluck('isFirst').filter(data => !!data).subscribe((amrks) => {
    //   this.mapService.resetBounds()
    // });
  }

  resetMap$() {
    const markerFilter = this.userClientService.marks.dataMap$.data$().distinctUntilChanged();
    return Observable.merge(
      markerFilter
    )
  }

  resetMap() {
    this.mapService.resetBounds()
  }

}
