<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card :height="height">
          <ag-grid-vue 
            id="Grid"
            style="width: 100%; height: 100%" 
            class="ag-theme-balham" 
            :columnDefs="gridCols" 
            :rowData="data" 
            :enableSorting="true" 
            :enableFilter="true"
            :gridReady="onGridReady"
            rowSelection="multiple"
            @click.native="removeFilter"
          ></ag-grid-vue>
        </v-card>
      </v-flex>  
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "GridChan",
  components: {
    AgGridVue
  },
  computed: {
    ...mapGetters(["data", "gridCols", "options", "height"])
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
      this.gridApi.sizeColumnsToFit();
    },
    setFilter(label) {
      if (this.gridApi) {
        this.gridApi.setQuickFilter(label);
      }
    },
    removeFilter() {
      if (this.gridApi) {
        this.gridApi.setQuickFilter(null);
      }
    }
  },
  created() {
    this.bc = new BroadcastChannel("data_channel");
    this.bc.onmessage = event => {
      // this.setFilter(event.data);
      console.log("channel", event.data);
    };
  },
  beforeDestroy() {
    this.bc.close();
  }
};
</script>
<style>
</style>
