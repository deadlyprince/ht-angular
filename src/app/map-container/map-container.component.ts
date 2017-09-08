import {Component, Input, OnInit} from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";

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
  constructor(
    private userClientService: HtUsersClientService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
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
  }

}
