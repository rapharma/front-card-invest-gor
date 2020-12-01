import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs/Subscription';
import { InvestmentsService } from '../../services/investment.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart = [];
  getSubscription = new Subscription();
  fixedIncomes = new Array<number>();
  variableIncomes = new Array<number>();
  dates = new Array<string>();

  @ViewChild('mychart') mychart;


  constructor(private service: InvestmentsService,
    private helperService: HelperService) { }

  ngOnInit() {

    this.listInvestments();



  }

  private listInvestments() {
    enum typeInv {
      title = 'Fixed Income'
    }
    this.getSubscription = this.service.getInvestments().subscribe(
      (res) => {
        res['investments']
        .map(investments => {
          investments.type === typeInv.title ? this.fixedIncomes.push(investments.value) : this.variableIncomes.push(investments.value);
          this.dates.push(this.helperService.formatDateGet(investments.date));
        });
        console.log('this.fixedIncomes.length', this.fixedIncomes.length)
        console.log('this.variableIncomes.length', this.variableIncomes.length)
        this.createChart();
      },
      (error) => {
        // this.tableMessageError = MESSAGES.failedList;
      }
    );
  }

  createChart() {
    const canvas = this.mychart.nativeElement;
    const ctx = canvas.getContext('2d');

    const label = [50, 100, 150, 200];
    const temp_min = [10, 20, 30, 40];
    const temp_max = [101, 150, 200, 250];

    const weatherDates = [];

    const mychart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Fixed Incomes',
            data: this.fixedIncomes,
            borderWidth: 6,
            borderColor: '#007f00',
            backgroundColor: 'transparent'
          },
          {
            label: 'Variable Incomes',
            data: this.variableIncomes,
            borderWidth: 6,
            borderColor: '#0000FF',
            backgroundColor: 'transparent'
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            fontSize: 20,
            text: 'Relatorio'
          },
          labels: {
            fontStyle: 'bold'
          }
        }
      }
    });

  }

}
