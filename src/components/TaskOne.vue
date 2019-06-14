<template>
  <div class="wrap">
    <div class="left-column">
      Исходная таблица:
      <input-number v-model="cols" label="Количество столбцов " :min="1" :max="100" :step="1"/>
      <table>
        <tr>
          <td>n<sub>i</sub></td>
          <td v-for="i in cols" :key="i">
            <input-number v-model="table.n[i - 1]" :min="-99999999999" :max="9999999999" :step="1"/>
          </td>
        </tr>
        <tr>
          <td>p<sub>i</sub></td>
          <td v-for="i in cols" :key="i">
            <input-number v-model="table.p[i - 1]" :min="0" :max="1" :step="0.1"/>
          </td>
        </tr>
      </table>
      <p v-if="!pSumm.eq(1)">Сумма p<sub>i</sub> должна быть равна единице!</p>
      <div v-if="pSumm.eq(1)" class="distribution-container">
        <p>F(x) = &nbsp;</p>
        <table class="distribution__table">
          <tr v-for="(arr, index) in distribution" :key="index">
            <td>{{arr[0]}},</td>
            <td>{{arr[1]}}</td>
          </tr>
        </table>
      </div>
      <values-description v-if="pSumm.eq(1)"></values-description>
      <p v-if="pSumm.eq(1)">M(x) = {{Mx}}</p>
      <p v-if="pSumm.eq(1)">D(x) = {{Dx}}</p>
      <p v-if="pSumm.eq(1)">&sigma;(x) = {{Sigma}}</p>
    </div>
    <div class="right-column">
      <scatter-chart v-if="pSumm.eq(1)" :chart-data="firstGraphData" :options="options">
      </scatter-chart>
      <scatter-chart v-if="pSumm.eq(1)" :chart-data="secondGraphData" :options="options">
      </scatter-chart>
    </div>
  </div>
</template>

<script>
import { Decimal } from 'decimal.js';
import ScatterChart from './ScatterChart';
import InputNumber from './InputNumber.vue';
import ValuesDescription from './TaskOneValuesDescription.vue';

export default {
  name: 'TaskOne',
  components: {
    InputNumber,
    ScatterChart,
    ValuesDescription,
  },
  data() {
    return {
      cols: 5,
      table: {
        n: [1, 2, 3, 4, 5],
        p: [0.1, 0.2, 0.3, 0.3, 0.1],
      },
    };
  },
  computed: {
    p() {
      return i => (this.table.p[i] ? new Decimal(this.table.p[i]) : new Decimal(0));
    },
    n() {
      return i => (this.table.n[i] ? new Decimal(this.table.n[i]) : new Decimal(0));
    },
    Mx() {
      let sum = new Decimal(0);
      for (let i = 0; i < this.cols; i += 1) {
        sum = sum.plus(this.p(i).mul(this.n(i)));
      }
      return sum;
    },
    Dx() {
      let sum = new Decimal(0);
      for (let i = 0; i < this.cols; i += 1) {
        sum = sum.plus(this.p(i).mul(this.n(i).mul(this.n(i))));
      }
      return sum.minus(this.Mx.mul(this.Mx));
    },
    Sigma() {
      return this.Dx.sqrt();
    },
    pSumm() {
      let sum = new Decimal(0);
      for (let i = 0; i < this.cols; i += 1) {
        sum = sum.plus(this.p(i));
        if (this.table.n[i] == null || this.table.p[i] == null) return new Decimal(0);
      }
      return sum;
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      };
    },
    firstGraphData() {
      let data = [];
      for (let i = 0; i < this.cols; i += 1) {
        data.push({
          x: this.n(i),
          y: this.p(i),
        });
      }

      data = data.sort((a, b) => (parseInt(a.x, 10) > parseInt(b.x, 10) ? 1 : -1));

      return {
        datasets: [{
          label: 'Graph',
          borderColor: '#f87979',
          backgroundColor: '#f87979',
          fill: false,
          lineTension: 0,
          showLine: true,
          data,
        }],
      };
    },
    secondGraphData() {
      let data = [];
      for (let i = 0; i < this.cols; i += 1) {
        data.push({
          x: this.n(i),
          y: this.p(i),
        });
      }
      data = data.sort((a, b) => (parseInt(a.x, 10) > parseInt(b.x, 10) ? 1 : -1));
      const array = [{
        label: `Graph${1}`,
        borderColor: '#f87979',
        backgroundColor: '#f87979',
        fill: false,
        lineTension: 0,
        axisXPosition: 0,
        showLine: true,
        data: [{
          x: parseInt(data[0].x, 10) - 2,
          y: 0,
        }, {
          x: data[0].x,
          y: 0,
        }],
      }];
      let sum = new Decimal(0);
      for (let i = 0; i < this.cols; i += 1) {
        sum = sum.plus(this.p(i));
        const data1 = [];
        if (i !== this.cols - 1) {
          data1.push({
            x: data[i].x,
            y: sum,
          }, {
            x: data[i + 1].x,
            y: sum,
          });
        } else {
          data1.push({
            x: data[i].x,
            y: sum,
          }, {
            x: parseInt(data[i].x, 10) + 2,
            y: sum,
          });
        }
        array.push({
          label: `Graph${i + 2}`,
          borderColor: '#f87979',
          backgroundColor: '#f87979',
          fill: false,
          lineTension: 0,
          axisXPosition: 0,
          showLine: true,
          data: data1,
        });
      }
      return { datasets: array };
    },
    distribution() {
      const array = [];
      let sum = new Decimal(0);
      let data = [];
      for (let i = 0; i < this.cols; i += 1) {
        data.push({
          x: this.n(i),
          y: this.p(i),
        });
      }
      data = data.sort((a, b) => (parseInt(a.x, 10) > parseInt(b.x, 10) ? 1 : -1));
      array.push([
        sum,
        `x <= ${data[0].x}`,
      ]);
      for (let i = 0; i < this.cols; i += 1) {
        sum = sum.plus(new Decimal(this.p(i)));
        if (i !== this.cols - 1) {
          array.push([
            sum,
            `${data[i].x} < x <= ${data[i + 1].x}`,
          ]);
        } else {
          array.push([
            sum,
            `${data[i].x} < x`,
          ]);
        }
      }
      return array;
    },
  },
};
</script>

<style>
  table {
    margin-top: 15px;
    border-collapse: collapse;
  }

  td {
    border: 1px solid #aeaeae;
    text-align: center;
    padding: 3px 10px;
  }

  td input {
    width: 50px
  }

  .wrap {

  }

  p {
    text-align: left;
  }

  .left-column {
    float: left;
    margin: 10px;
  }

  .right-column {
    float: left;
    margin: 10px;
  }

  .distribution__table {
    border-left: 1px solid #000000;
  }

  .distribution__table td {
    border: 0;
    text-align: left;
  }

  .distribution-container {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
</style>
