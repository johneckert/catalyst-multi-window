<template>
 <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card :height="height">
          <bar-chart
            @jsc_click="selectBar"
            :dataModel="barData"
            title="D3 Bar Chart"
            xaxis-label="date"
            yaxis-label="volume"
          ></bar-chart>
        </v-card>
      </v-flex>  
    </v-layout>
  </v-container>
</template>
<script>
import { D3BarChart } from "jscatalyst";
import { mapGetters } from "vuex";

export default {
  name: "BarChan",
  components: {
    barChart: D3BarChart
  },
  data() {
    return {
      name: "Bar Chart 1"
    };
  },
  computed: {
    ...mapGetters(["data", "height"]),
    barData() {
      const parsed = [];
      this.data.forEach(item => {
        let newItem = { x: item.date, y: item.volume };
        parsed.push(newItem);
      });
      return parsed;
    }
  },
  methods: {
    selectBar(data) {
      const selectedObj = { date: data.x, sender: this.name };
      this.bc.postMessage(selectedObj);
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
