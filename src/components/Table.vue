
<template lang="html">
<!-- <button  >hi</button> -->
<div>
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
    <tr v-for = "file in orderedFiles" @contextmenu= "openMenu(file)" @click="clickRow(file.id)":class="{highlight:selected == file.id}" :key="file.id" @dblclick="file.type == '' ? changeLoc(file.id):openFile(file.id)" >
      
      <td>{{file.name}}</td>
      <td>{{file.type}}</td>
      <td><template  v-if="file.type!=''">{{file.size | bytes}}</template></td>
    </tr>
  </tbody>
</table>
<Modal v-if="showModal" @close="showModal = false">
    <!--
      you can use custom content here to overwrite
      default content
    -->
    <h1 class="title" slot="header">{{modalHeader}}</h1>
  </Modal>
</div>
</template>

<script>
const { shell } = require("electron");
import { NavGroup, NavGroupItem, Icon } from "vue-photonkit";
import { mapMutations, mapState } from "vuex";
const { remote } = require("electron");
const { Menu, MenuItem } = remote;
import { Safe } from "@/safe/safe.js";
import Modal from "@/components/Modal.vue";
var path = require("path");
import _ from "lodash";

// Build menu one item at a time, unlike

// Prevent default action of right click in chromium. Replace with our menu.
// window.addEventListener(
//   "contextmenu",
//   e => {
//     e.preventDefault();
//     menu.popup(remote.getCurrentWindow());
//   },
//   false
// );
export default {
  data() {
    return {
      selected: undefined,
      showModal: false,
      modalHeader: ""
    };
  },
  computed: {
    ...mapState(["location", "files", "previousLoc"]),

    orderedFiles: function() {
      return _.orderBy(this.files, "name", "asc");
    }
  },
  mounted() {
    this.READ_FOLDER();
    // console.log(this.files);
  },
  methods: {
    ...mapMutations(["CHANGE_LOC", "READ_FOLDER"]),
    changeLoc: function(path) {
      this.CHANGE_LOC(path);
      this.READ_FOLDER();
    },
    readFolder() {
      this.READ_FOLDER();
    },
    clickRow(id) {
      this.selected = id;
    },
    openFile(path) {
      shell.openItem(path);
    },
    openMenu(file) {
      this.clickRow(file.id);
      if (file.type != "") {
        this.menuMethod(file.id);
      }
    },
    decryptMethod(id) {
      const menu = new Menu();
      menu.append(
        new MenuItem({
          label: "Decrpt this file",
          click: () => {
            // var safe = new Safe(id, "1234", true);
            // safe.decrypt();
            // this.readFolder();

            this.showModal = true;
            this.modalHeader = "Decrypt File";
          }
        })
      );
      menu.popup(remote.getCurrentWindow());
    },
    encryptMethod(id) {
      const menu = new Menu();
      menu.append(
        new MenuItem({
          label: "Encrpt this file",
          click: () => {
            // var safe = new Safe(id, "1234", true);
            // safe.encrypt();
            // this.readFolder();
            this.showModal = true;
            this.modalHeader = "Encrypt File";
          }
        })
      );
      menu.popup(remote.getCurrentWindow());
    },
    menuMethod(id) {
      if (path.extname(id) == ".fryp") {
        this.decryptMethod(id);
      } else {
        this.encryptMethod(id);
      }
    }
  },
  components: { NavGroup, NavGroupItem, Icon, Modal }
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
tbody tr:active,
tbody tr.highlight {
  background-image: linear-gradient(to bottom, #003994 0%, #164ea3 100%);
  color: #fff;
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
