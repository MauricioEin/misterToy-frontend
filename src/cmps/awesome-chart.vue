<template>
  <h2>Average price for each label:</h2>
  <BarChart v-if="avgData" :chartData="avgData" :options="options" />
  <h2>Percentage of toys in stock:</h2>
  <BarChart v-if="inStockData" :chartData="inStockData" :options="options" />
</template>

<script>
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import statService from '../services/stat.service.js'

Chart.register(...registerables);

export default {
  name: 'Home',
  components: { BarChart },
  data() {
    return {
      avgData: null,
      inStockData: null,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }
  },
  created() {
    statService.getAvgLabelPrice().then(priceMap => {
      this.avgData = {
        labels: Object.keys(priceMap),
        datasets: [{
          data: Object.values(priceMap),
          backgroundColor: ['pink', '#0079AF', '#123E6B','gold', '#97B0C4', 'lightGreen','#A5C8ED']
        }]
      }
      console.log(this.avgData)
      console.log(this.testData)
    })
    statService.getInStockByLabel().then(inStockMap => {
      this.inStockData = {
        labels: Object.keys(inStockMap),
        datasets: [{
          data: Object.values(inStockMap),
          backgroundColor: ['#77CEFF','gold', 'lightGreen','#0079AF', 'pink', '#97B0C4', '#A5C8ED']
        }]
      }

    })
  }

}
</script>