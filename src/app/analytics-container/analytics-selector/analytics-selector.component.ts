import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AnalyticsItemsService} from "../analytics-items.service";

@Component({
  selector: 'ht-analytics-selector',
  templateUrl: './analytics-selector.component.html',
  styleUrls: ['./analytics-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsSelectorComponent implements OnInit {
  @Output() selected = new EventEmitter();
  choosenPreset = [];
  constructor(
    public analyticsItemsService: AnalyticsItemsService
  ) { }

  ngOnInit() {
    this.choosenPreset.push(...this.analyticsItemsService.presets)
  }

  isActive(preset) {
    return this.choosenPreset.includes(preset)
  }

  togglePreset(preset) {
    if (this.isActive(preset)) {
      const index = this.choosenPreset.indexOf(preset);
      this.choosenPreset.splice(index, 1)
    } else {
      this.choosenPreset.push(preset)
    }
  };

  setPreset() {
    this.analyticsItemsService.items$.next(this.choosenPreset.map(preset => {
      return new preset.service(preset.initialConfig)
    }) );
    this.selected.next(true)
  }

}
