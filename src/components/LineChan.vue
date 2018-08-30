<template>
 <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card :height="height">
          <line-chart
            @jsc_click="selectLine"
            :dataModel='lineData'
            title='D3 Line Chart'
            xaxis-label="date"
            yaxis-label="volume"
          ></line-chart>
        </v-card>
      </v-flex>  
    </v-layout>
  </v-container>
</template>
<script>
import { D3LineChart } from "jscatalyst";
import { mapGetters } from "vuex";

export default {
  name: "LineChan",
  components: {
    lineChart: D3LineChart
  },
  data() {
    return {
      name: "Line Chart 1"
    };
  },
  computed: {
    ...mapGetters(["data", "height"]),
    lineData() {
      const parsed = [];
      this.data.forEach(item => {
        let newItem = { date: item.date, value: item.volume };
        parsed.push(newItem);
      });
      return parsed;
    }
  },
  methods: {
    selectLine(data) {
      let parsedDate = this.formatDate(data.date);
      const selectedObj = { date: parsedDate, sender: this.name };
      this.bc.postMessage(selectedObj);
    },
    formatDate(dateObj) {
      let date = new Date(dateObj);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return `${year}-${month}-${day}`;
    }
  },
  created() {
    this.bc = new BroadcastChannel("data_channel");
  },
  beforeDestroy() {
    this.bc.close();
  }
};
</script>
<style>
</style>
