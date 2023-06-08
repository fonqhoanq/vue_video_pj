<template>
  <div>
    <v-row class="mt-6">
      <v-col col="12" sm="3" md="1"></v-col>
      <v-col col="12" sm="3" md="3">
        <pie-chart
          :labels="genderChartLabels"
          :data-list="genderData"
          title-text="Viewer Gender Chart"
          :colors="genderColors"
        ></pie-chart>
      </v-col>
      <v-col col="12" sm="3" md="1"></v-col>
      <v-col col="12" sm="3" md="7">
        <bar-chart
          :labels="ageLabel"
          :data-list="ageData"
          title-text="Viewer Age Chart"
          label-text="Age"
        ></bar-chart>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12" sm="12" md="12">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-3"
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import SingerService from '@/services/SingerService';
import { mapGetters } from 'vuex'

export default {
  name: 'SubscriberDashBoard',
  components: {
      PieChart,
      BarChart
  },
  data: () => ({
    genderChartLabels: ['Male', 'Famale'],
    genderData: [0, 0],
    genderColors: ['rgba(179,181,198,0.4)', 'rgba(255,99,132,0.4)'],
    ageLabel: ['10-15', '16-20', '21-25', '26-30', '31-35', '36-40', '41-45', '46-50',  '51-55', '55+'],
    ageData: [],
    headers: [
      { text: 'Content', value: 'content', align: 'start' },
      { text: 'Viewers', value: 'viewers', align: 'center' },
      { text: 'Male', value: 'male', align: 'center' },
      { text: 'Famale', value: 'famale', align: 'center' }
    ],
    items: [{
      content: 'Total',
      viewers: 0,
      male: 0,
      famale: 0
    }],
  }),
  computed: {
    ...mapGetters(['getCurrentSinger', 'getUrl']),
  },
  methods: {
    async getGenderChart() {
      const genderData = await SingerService.getGenderChart({
        id: this.getCurrentSinger.id,
      }).catch((err) => {
        console.log(err)
      })
      if (!genderData) {
        return
      }
      console.log('genderData')
      console.log(genderData)
      genderData.data.forEach(item => {
        if (item.male !== 0) {
          this.genderData[0] += 1
        } else {
          this.genderData[1] += 1
        }
      });
      this.items[0].viewers = this.genderData[0] + this.genderData[1]
      this.items[0].male = this.genderData[0]
      this.items[0].famale = this.genderData[1]
    },
    async getAgeChart() {
      const ageData = await SingerService.getAgeChart({
        id: this.getCurrentSinger.id,
      }).catch((err) => {
        console.log(err)
      })
      if (!ageData) {
        return
      }
      console.log('ageData')
      console.log(ageData)
      Object.keys(ageData.data).forEach(key => {
        switch (key) {
          case 'from_10_to_15':
            this.ageData[0] = ageData.data[key]
            break;
          case 'from_16_to_20':
            this.ageData[1] = ageData.data[key]
            break;
          case 'from_21_to_25':
            this.ageData[2] = ageData.data[key]
            break;
          case 'from_26_to_30':
            this.ageData[3] = ageData.data[key]
            break;
          case 'from_31_to_35':
            this.ageData[4] = ageData.data[key]
            break;
          case 'from_36_to_40':
            this.ageData[5] = ageData.data[key]
            break;
          case 'from_41_to_45':
            this.ageData[6] = ageData.data[key]
            break;
          case 'from_46_to_50':
            this.ageData[7] = ageData.data[key]
            break;
          case 'from_51_to_55':
            this.ageData[8] = ageData.data[key]
            break;
          case 'from_56':
            this.ageData[9] = ageData.data[key]
            break;
          default:
            break;
        }
      })
      console.log('this.ageData')
      console.log(this.ageData)
    }
  },
  created() {
    this.getGenderChart()
    this.getAgeChart()
  }
}
</script>
