
<template lang="html">
<!-- <button  >hi</button> -->
<table class="table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Size</th>
    </tr>
  </thead>
  <tbody>
    <tr @dblclick ="changeLoc(previousLoc)">
      <td>..</td>
      <td></td>
      <td></td>
    </tr>
    <tr v-for = "file in files" :key="file.id" @dblclick="file.type == ''? changeLoc(file.id):openFile(file.id)" >
      
      <td>{{file.name}}</td>
      <td>{{file.type}}</td>
      <td><template  v-if="file.type!=''">{{file.size | bytes}}</template></td>
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
    },
    openFile(path) {
      shell.openItem(path);
    }
  },
  components: { NavGroup, NavGroupItem, Icon }
};
</script>

<style lang="scss">
@import "../photon/dist/css/photon.css";
table {
  width: 100%;
  table-layout: fixed;
}

thead,
tbody,
tr,
td,
th {
  display: block;
}
tbody tr:active {
  background-image: linear-gradient(to bottom, #003994 0%, #164ea3 100%);
}

tr:after {
  content: " ";
  display: block;
  visibility: hidden;
  clear: both;
}

thead th {
  // height: 30px;

  /*text-align: left;*/
}

tbody {
  height: auto;
  overflow-y: auto;
}

thead {
  /* fallback */
}

tbody td,
thead th {
  float: left;
}
thead {
  th:nth-child(1) {
    max-width: 60%;
    min-width: 60%;
    width: 60%;
  }
  th:nth-child(2) {
    max-width: 20%;
    min-width: 20%;
    width: 20%;
  }
  th:nth-child(3) {
    max-width: 20%;
    min-width: 20%;
    width: 20%;
  }
}
tbody {
  td:nth-child(1) {
    width: 60%;
  }
  td:nth-child(2) {
    width: 20%;
  }
  td:nth-child(3) {
    width: 20%;
  }
}
</style>
