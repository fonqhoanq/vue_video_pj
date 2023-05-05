<template>
  <div class="d-flex">
    <datepicker class="datePicker-box datePicker mr-2" format="yyyy-MM-dd" :value="date" :typeable="true" placeholder="2020-01-01" :language="en" @input="val => date = formatDate(val, 'YYYY-MM-DD')" />
    <select v-model="hour" :disabled="!date" @change="updateValue">
      <option :value="null" />
      <option v-for="(option, i) in AVAILABLE_HOURS" :key="i" :value="option">{{ option }}</option>
    </select>
    &nbsp;:&nbsp;
    <select v-model="minute" :disabled="!date" @change="updateValue">
      <option :value="null" />
      <option v-for="(option, i) in AVAILABLE_MINUTES" :key="i" :value="option">{{ option }}</option>
    </select>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker/src/components/Datepicker.vue'
import { en } from 'vuejs-datepicker/dist/locale'
import dayjs from 'dayjs'
const AVAILABLE_HOURS = Array.from({ length: 24 }, (_, i) => dayjs().startOf('day').add(i, 'hours').format('HH'))
const AVAILABLE_MINUTES = Array.from({ length: 60 }, (_, i) => dayjs().startOf('day').add(i, 'minutes').format('mm'))

export default {
  components: { Datepicker },
  props: {
    modelValue: { type: String, default: '', required: true }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      date: null,
      hour: null,
      minute: null,
      en,
      AVAILABLE_HOURS,
      AVAILABLE_MINUTES
    }
  },
  watch: {
    date () {
      if (!dayjs(this.date).isValid()) this.date = null
      this.updateValue()
    }
  },
  created () {
    console.log(this.modelValue)
    this.date = dayjs(this.modelValue).format('YYYY-MM-DD')
    console.log('date')
    console.log(this.date)
    this.hour = dayjs(this.modelValue).format('HH')
    this.minute = dayjs(this.modelValue).format('mm')
  },
  methods: {
    updateValue () {
      if (!this.date) {
        this.hour = this.minute = null
        this.$emit('update:modelValue', null)
      } else {
        if (!this.hour) this.hour = '00'
        if (!this.minute) this.minute = '00'
        const newDateTime = `${this.date} ${this.hour}:${this.minute}`
        console.log('date')
        console.log(newDateTime)
        this.$emit('update:modelValue', newDateTime)
        this.$emit('update-value', newDateTime)
      }
    },
    formatDate (date, format) {
      dayjs.locale('en')
      return dayjs(date).format(format)
    }
  }
}
</script>
<style lang="scss">
.datePicker-box {
  width: 250px;
}
.datePicker {
  display: inline-block
}
</style>