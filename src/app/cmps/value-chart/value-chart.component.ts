import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { bitcoinService } from 'src/app/services/bitcoin.service';
Chart.register(...registerables);

@Component({
  selector: 'value-chart',
  templateUrl: './value-chart.component.html',
  styleUrls: ['./value-chart.component.scss']
})
export class ValueChartComponent {
  MarketPrice: any = null

  async ngOnInit() {

    this.MarketPrice = await bitcoinService.getMarketPriceHistory()

    var myChart = new Chart("myChart1", {
      type: 'line',
      data: {
        labels: this.getDataLabels(),
        datasets: [{
          label: this.getDataLabel(),
          data: this.getDatasetData(),
          backgroundColor: "#f7931a99",
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          // borderWidth: 1,
          fill: false,
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
    return this.MarketPrice.values.map((value: any) => {
      const date = new Date(value.x * 1000);
      return `${date.getDate() + 1}.${date.getMonth() + 1}`;
    });
  }
  getDatasetData() {
    return this.MarketPrice.values.map((value: any) => value.y);
  }
  getDataLabel() {
    return this.MarketPrice.description;
  }
}
