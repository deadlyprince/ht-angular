import {ComponentRef} from "@angular/core/src/linker/component_factory";

export interface IAnalyticsItem {
  component: any,
  className: string,
  tags: string[]
  setData(instance): void,
}
