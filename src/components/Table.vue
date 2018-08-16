
<template lang="html">
<!-- <button  >hi</button> -->
<table class="table-striped">
  <thead>
    <tr>
      <th @click ="readFolder()">Name</th>
      <th @click ="changeLoc(previousLoc)">Kind</th>
      <th>File Size</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for = "file in files" :key="file.hash" @dblclick="file.type == ''? changeLoc(file.id):openFile(file.id)" >
      
      <td>{{file.name}}</td>
      <td>{{file.type}}</td>
      <td>{{file.size}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
const { shell } = require("electron");
import { NavGroup, NavGroupItem, Icon } from "vue-photonkit";
import { mapMutations, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["location", "files", "previousLoc"])
  },
  mounted() {
    this.READ_FOLDER();
    console.log(this.files);
  },
  methods: {
    ...mapMutations(["CHANGE_LOC", "READ_FOLDER"]),
    changeLoc: function(path) {
      this.CHANGE_LOC(path);
      this.READ_FOLDER();
      console.log(this.files);
    },
    openFile(path) {
      shell.openItem(path);
    }
  },
  components: { NavGroup, NavGroupItem, Icon }
};
</script>

<style lang="sass">
@import '../photon/dist/css/photon.css'
</style>
