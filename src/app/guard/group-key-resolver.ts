import {ActivatedRoute, ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {IGroup} from "ht-models";
import {HtClientService} from "ht-angular-client";

export class GroupKeyResolver implements Resolve<string> {
  /**
   * resolve() is the method we have to implement for the Resolve interface.
   * The router will call this method when the users visits the route.
   * We can return Promises, Observables or any other value here.
   * When it's a Promise or Observable, the Angular Router waits for
   * the result and then displays the page (which is what we want).
   */


  resolve(next: ActivatedRouteSnapshot): Observable<string> {
    const id = next.paramMap.get('id');
    console.log(id);

    // const key = this.clientService.groups.item.getListener({id}).map((group: IGroup) => {
    //   // next.data = {token: next.paramMap.get('id')};
    //   return group['token']
    // });
    return Observable.of("das")
  }
}
