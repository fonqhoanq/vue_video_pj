<template>
    <Bar :data="chartData" :options="chartOptions" />
  </template>
  
  <script lang="ts">
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  import { Bar } from 'vue-chartjs'
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  export default {
    name: 'App',
    components: {
      Bar
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
      labelText: {
        type: String,
        default: 'Label'
      }
    },
    data() {
      return {
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.labelText,
              backgroundColor: '#f87979',
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
  