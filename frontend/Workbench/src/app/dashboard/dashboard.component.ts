// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import {  NgApexchartsModule, ApexChart, ApexAxisChartSeries, ApexTitleSubtitle, ApexXAxis, ApexNonAxisChartSeries,
  ApexFill,
  ApexStroke,
  } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

  interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
  }

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  stroke: ApexStroke;
  colors: string[];
  labels: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgApexchartsModule, CommonModule, FormsModule],
})
export class DashboardComponent implements OnInit {
  public chartOptions: ChartOptions;
  public pieChartOptions: PieChartOptions;
  public todoItems: TodoItem[];

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Productivity",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        type: "line",
        height: 350
      },
      title: {
        text: "Productivity Overview"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };

    this.pieChartOptions = {
      series: [74, 26], // 74% filled, 26% remaining
      chart: {
        type: 'pie',
        height: 350
      },
      fill: {
        type: 'gradient',
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      labels: ['Completed', 'Remaining'],
      colors: ['#68B6BB', '#E0E0E0'] // Custom colors for the segments
    };

    this.todoItems = [
      { id: 1, title: 'Complete Angular tutorial', completed: false },
      { id: 2, title: 'Submit project report', completed: false },
      { id: 3, title: 'Attend team meeting', completed: false },
      { id: 4, title: 'Review codebase', completed: false },
      { id: 5, title: 'Write unit tests', completed: false },
      { id: 6, title: 'Prepare presentation', completed: false },
      { id: 7, title: 'Update documentation', completed: false },
    ];
  }

  ngOnInit(): void {}

  toggleComplete(item: TodoItem) {
    item.completed = !item.completed;
  }
}



