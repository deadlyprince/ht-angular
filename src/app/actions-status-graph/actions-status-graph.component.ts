import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Chart from "frappe-charts/dist/frappe-charts.min.esm"
import moment from "moment-mini";
import {untilDestroy} from "../until-destroy";
// import {filter} from "rxjs/operators";


@Component({
  selector: 'ht-actions-status-graph',
  templateUrl: './actions-status-graph.component.html',
  styleUrls: ['./actions-status-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsStatusGraphComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input( ) service;
  data;
  chart;
  noData: boolean = false;
  @ViewChild('chart') charElem;
  constructor() {

  }

  ngOnInit() {
    this.service.data$.pipe(
      untilDestroy(this)
    )
      .subscribe((data) => {
        this.setChart(data);
    })

  }


  ngAfterViewInit() {

  }

  setChart(data) {
    if (data.labels.length <= 1) {
      this.noData = true;
      return false;
    }
    if (this.chart) {
      this.noData = false;
      const labels = data.labels;
      const dataset = data.datasets;
      this.chart.update_values(dataset, labels);
      const type = data.labels.length > 1 ? 'line' : 'bar';
    } else {
      this.chart = new Chart({
        parent: this.charElem.nativeElement, // or a DOM element
        // title: "Action Graph",
        data: data,
        type: 'line', // or 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        is_series: 1,
        colors: ['#7cd6fd', 'red'],
        region_fill: 1,
        // x_axis_mode: 'tick',
        format_tooltip_x: d => {
          // console.log(d, moment(d).format('ddd, MMM Do'));
          return d
          // return moment(d).format('ddd, MMM Do')
        },
        // format_label_x: d => {
        //   console.log("daa");
        //   return d
        // },
        format_tooltip_y: d => d
      });
      // this.chart.show_averages();
    }

  }

  ngOnDestroy() {

  }
}
