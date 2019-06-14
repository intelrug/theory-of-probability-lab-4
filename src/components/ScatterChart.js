import VueChartJs from 'vue-chartjs';

export default {
  extends: VueChartJs.Scatter,
  mixins: [VueChartJs.mixins.reactiveProp],
  props: ['chart-data', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
