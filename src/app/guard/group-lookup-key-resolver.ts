import {ActivatedRoute, ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {IGroup, Page} from "ht-models";
import {HtClientService} from "ht-angular-client";
import {Injectable} from "@angular/core";

@Injectable()
export class GroupLookupKeyResolver implements Resolve<any> {

  constructor(public clientService: HtClientService) {}


  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const id = next.paramMap.get('id');
    const groupKey$ = this.clientService.groups.api.index({lookup_id: id}).map((data: Page<IGroup>) => {
      return data.results.length ? data.results[0].token : "test";
    });

    // return groupKey$.take(1)
    return Observable.of(true).switchMap(() => {
      return groupKey$.take(1)
    })
    // const key$ = this.clientService.groups.item.getListener({id}).map((group: IGroup) => {
    //   // next.data = {token: next.paramMap.get('id')};
    //   console.log(group.token, "group");
    //   return group.token
    // });
    // return key$
  }
}
