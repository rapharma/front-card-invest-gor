import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs/Subscription';
import { InvestmentsService } from '../../services/investment.service';
import { HelperService } from '../../services/helper.service';
import { ShareDataService } from '../../services/share-data.service';

const enum MESSAGES {
  failedChart = 'Failed to load chart',
}

enum MESSAGE {
  failedChart = 'Chart unavailable'
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart = [];
  getSubscription = new Subscription();
  fixedIncomes = [{x: '', y: ''}];
  variableIncomes =  [{x: '', y: ''}];
  datesAux = Array<Date>();
  dates = Array<string>();
  chartMessageError: string;
  loadingMessage: string;
  token: string;

  @ViewChild('mychart') mychart;

  constructor(private service: InvestmentsService,
    private helperService: HelperService
  ) {
      this.loadingMessage = 'Loading chart...';
      this.token = '';
  }

  ngOnInit() {

    setTimeout(() => { this.loadingMessage = ''}, 1000);

    this.initializeChart();

  }

  private initializeChart() {
    enum typeInv {
      title = 'Fixed Income'
    }
    this.getSubscription = this.service.getInvestments().subscribe(
      (res) => {
        this.chartMessageError = '';
        res['investments']
        .map(investment => {
          investment.type === typeInv.title ? this.fixedIncomes.push({
            x: this.helperService.formatDateGet(investment.date),
            y: investment.value
          }) : this.variableIncomes.push({
            x: this.helperService.formatDateGet(investment.date),
            y: investment.value
          });

          this.datesAux.push(new Date(this.helperService.formatDateAuxChart(investment.date)));

        });

        this.datesAux.sort((a: any, b: any) => a - b);

        this.datesAux.map(d => {
          this.dates.push(this.helperService.formatDateChart(d.toLocaleDateString()));
        });

        this.createChart();
      },
      (error) => {
<<<<<<< HEAD
        this.chartMessageError = MESSAGE.failedChart;
=======
        this.chartMessageError = MESSAGES.failedChart;
>>>>>>> 70ed9aab37e16551842f226dbd51edd555694850
      }
    );
  }

  createChart() {
    const canvas = this.mychart.nativeElement;
    const ctx = canvas.getContext('2d');

    const mychart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Fixed Incomes',
            data: this.fixedIncomes.slice(1),
            borderWidth: 6,
            borderColor: 'rgba(0, 255, 0)',
            backgroundColor: 'rgba(0, 255, 0, 0.8)'
          },
          {
            label: 'Variable Incomes',
            data: this.variableIncomes.slice(1),
            borderWidth: 6,
            borderColor: 'rgba(0, 0, 255)',
            backgroundColor: 'rgba(0, 0, 255, 0.8)'
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    });

  }

}
