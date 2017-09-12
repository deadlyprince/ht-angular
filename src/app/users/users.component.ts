import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUserAnalytics, IUserAnalyticsPage} from "ht-models";
// import {anim} from "../../animations/appear";
// import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ht-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: [
  //   entryLeaveTransition('card', {transform: 'translateX(-100px)', height: 0, opacity: 0}, '0.3s')
  // ]
})
export class UsersComponent implements OnInit {
  userCardAction;
  @Input() users: IUserAnalytics[];
  @Input() selectedUserId: string | null;
  @Input() selectedUserDataId: string | null;
  @Input() loadingUserDataId: string | null;
  @Input() loadingUserId: string | null;
  @Input() hasMap: boolean = false;
  @Input() showExtraBtn: boolean = true;
  @Output() onSelectUser: EventEmitter<string | null> = new EventEmitter();
  @Output() onAction: EventEmitter<string | null> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }



  getAction(user) {
    // console.log("action", this.loadingUserDataId, this.loadingUserId);
    const id = user.id;
    if (!this.hasMap) return 'detail';

    if (this.selectedUserId === user.id) {
      return "close"
    } else if (id === this.loadingUserDataId && (!this.selectedUserId || !user.segments) ) {
      return 'loading'
    } else if (this.selectedUserDataId === user.id) {
      return 'detail';
    }  else {
      return "default"
    }
  }

  indexId(index, item) {
    return item.id
  }

}
// export function entryLeaveTransition(name: string, entryStyle: {[key: string]: string | number}, duration: string = '0.4s') {
//   return trigger(name, [
//     transition(':enter', [
//       style(entryStyle),
//       animate(duration + ' ease-out')
//     ]),
//     transition(':leave', [
//       animate(duration + ' ease-in', style(entryStyle))
//     ])
//   ]);
// }
