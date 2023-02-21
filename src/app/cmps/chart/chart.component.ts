import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { bitcoinService } from 'src/app/services/bitcoin.service';
Chart.register(...registerables);

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  avgBlockSize: any = null

  async ngOnInit() {

    this.avgBlockSize = await bitcoinService.getAvgBlockSize()

    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: this.getDataLabels(),
        datasets: [{
          label: this.getDataLabel(),
          data: this.getDatasetData(),
          backgroundColor: "#f7931a99",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
          fill: true,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  getDataLabels() {
    return this.avgBlockSize.values.map((value: any) => {
      const date = new Date(value.x * 1000);
      return `${date.getDate() + 1}.${date.getMonth() + 1}`;
    });
  }
  getDatasetData() {
    return this.avgBlockSize.values.map((value: any) => value.y);
  }
  getDataLabel() {
    return this.avgBlockSize.description;
  }
}
