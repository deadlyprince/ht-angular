import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ht-loading-dots',
  template: `
    <ng-content></ng-content>
    <span [style.fontSize.px]="size || 'inherit'" class="loading-dots"><span> &bull;</span><span> &bull;</span><span> &bull;</span></span>
  `,
  styles: [`
    .loading-dots {
      font-size: inherit;
      margin: auto;
    }
    .loading-dots span {
      -webkit-animation-name: blink;
              animation-name: blink;
      -webkit-animation-duration: 1.4s;
              animation-duration: 1.4s;
      -webkit-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
      -webkit-animation-fill-mode: both;
              animation-fill-mode: both;
    }
    .loading-dots span:nth-child(2) {
      -webkit-animation-delay: .2s;
              animation-delay: .2s;
    }
    .loading-dots span:nth-child(3) {
      -webkit-animation-delay: .4s;
              animation-delay: .4s;
    }
    @-webkit-keyframes blink {
      0% {
        opacity: .2;
      }
      20% {
        opacity: 1;
      }
      100% {
        opacity: .2;
      }
    }
    @keyframes blink {
      0% {
        opacity: .2;
      }
      20% {
        opacity: 1;
      }
      100% {
        opacity: .2;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoadingDotsComponent implements OnInit {
  @Input() show = true;
  @Input() size: number;
  constructor() { }

  ngOnInit() {
  }

}
