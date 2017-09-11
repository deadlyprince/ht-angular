import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ht-loading-data',
  template: `
    <div [style.fontSize.px]="size || 'inherit'" loading-dots><span>{{displayMessage}}</span></div>
  `,
  styles: [`
    :host {
      color: #798E9B;
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingDataComponent implements OnInit {
  @Input() size: number;
  @Input() message: string = "";
  @Input() customMessage: string;
  constructor() { }

  ngOnInit() {
  }

  get displayMessage() {
    return !this.customMessage ? `${this.message}` : this.customMessage;
  }

}
