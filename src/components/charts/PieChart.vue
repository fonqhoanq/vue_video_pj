<template>
  <PieChart :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie as PieChart } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    PieChart
  },
  props: {
    labels: {
      type: Array,
      required: true
    },
    dataList: {
      type: Array,
      required: true
    },
    titleText: {
      type: String,
      default: 'Custom Chart Title'
    }, 
    colors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      data: {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: this.colors,
            data: this.dataList
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
              display: true,
              text: this.titleText,
              padding: {
                  top: 10,
                  bottom: 30
              }
          }
        }
      }
    }
  },
  computed: {
    chartData() {
      return this.data
    },
    chartOptions() {
      return this.options
    }
  },
}
</script>
