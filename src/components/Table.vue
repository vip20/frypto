
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
<Modal v-if="showModal" @close="showModal = false" @submit="action" :isPassword="modalHeader==='encrypt'?(enc.password!='' && enc.password==confirmPassword): dec.password!=''">
    <h1 class="title" slot="header">{{modalHeader}} file</h1>
    <form slot="body" v-if="modalHeader=='encrypt'">
      <div class="form-group">
    <input :type="passwordFieldType" autofocus class="form-control" placeholder="Key" v-model="enc.password">
  </div>
  <div class="form-group">
    <input type="password" class="form-control" v-model="confirmPassword" placeholder="Confirm Key">
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox" v-model="showPassword" @click="switchVisibility"> Show Password
    </label>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox" v-model="enc.fileNameEnc" > Encrypt file name
    </label>
  </div>
      </form>
      <form slot="body" v-if="modalHeader=='decrypt'">
         <div class="form-group">
    <input :type="passwordFieldType" autofocus class="form-control" placeholder="Key" v-model="dec.password">
    <span style="color: #bf0000;">{{errorMsg}}</span>
  </div>
    
    <div class="checkbox">
    <label>
      <input type="checkbox" v-model="showPassword" @click="switchVisibility"> Show Password
    </label>
  </div>

        </form>
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
      modalHeader: "",
      confirmPassword: "",
      enc: { password: "", fileNameEnc: false },
      dec: { password: "" },
      passwordFieldType: "password",
      showPassword: false,
      fileId: "",
      errorMsg: ""
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
    switchVisibility() {
      this.passwordFieldType =
        this.showPassword === false ? "text" : "password";
    },
    onInit() {
      this.passwordFieldType = "password";
      this.showPassword = false;
      this.confirmPassword = "";
      this.errorMsg = "";
      this.enc = { password: "", fileNameEnc: false };
      this.dec = { password: "" };
    },
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
            this.onInit();
            this.showModal = true;
            this.modalHeader = "decrypt";
            this.fileId = id;
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
            this.onInit();
            this.showModal = true;
            this.modalHeader = "encrypt";
            this.fileId = id;
          }
        })
      );
      menu.popup(remote.getCurrentWindow());
    },
    action() {
      if (this.modalHeader == "encrypt") {
        var safe = new Safe(
          this.fileId,
          this.enc.password,
          this.enc.fileNameEnc
        );
        safe.encrypt();
        this.readFolder();
        this.showModal = false;
      } else {
        var safe = new Safe(this.fileId, this.dec.password, true);
        try {
          safe.decrypt();

          this.readFolder();
          this.showModal = false;
        } catch (exception) {
          var e = exception.toString();
          if (e.indexOf("bad decrypt") > 0) {
            this.errorMsg = "Bad Key, Try Again.";
          }
        }
      }
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
.modal-body {
  .form-group,
  .checkbox {
    padding: 0em 1em !important;
    margin: 5px 0px !important;

    .form-control,
    .checkbox {
      width: 21em;
      height: 2em;
    }
  }
  input.form-control {
    border: none;
    border-bottom: 1px solid lightgrey;
    border-radius: 0px;
  }

  input.form-control:focus {
    border: none;
    box-shadow: 0px 1px 0 #3491f3, -3px -3px 0 rgba(109, 179, 253, 0),
      -3px 3px 0 rgba(109, 179, 253, 0), 3px -3px 0 rgba(109, 179, 253, 0);
  }
}
</style>
