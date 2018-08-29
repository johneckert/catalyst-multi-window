<template>
 <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card :height="height">
          <heat-map
            @jsc_click="selectLine"
            :dataModel='data'
            title='D3 Heat Map'
            xaxis-label="date"
            yaxis-label="volume"
          ></heat-map>
        </v-card>
      </v-flex>  
    </v-layout>
  </v-container>
</template>
<script>
import { D3HeatMap } from "jscatalyst";
import { mapGetters } from "vuex";

export default {
  name: "HeatChan",
  components: {
    heatMap: D3HeatMap
  },
  computed: {
    ...mapGetters(["data", "height"])
  },
  methods: {
    selectLine(data) {
      console.log(data);
      this.bc.postMessage(data.date);
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
