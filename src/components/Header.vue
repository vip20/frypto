<template lang="html">
  <div class="window">
    <toolbar type="header" title="Frypto" class="header">
      <ul v-if="!isMacOS">
          <li @click="minimize()" title="Minimize"><span></span></li>
          <li @click="maximize()" title="Maximize"><span></span></li>
          <li @click="close()" title="Close"><span class='titlebarClose'></span></li>
      </ul>
      <toolbar-actions>
        <input type="text" id="path" class="form-control" :value="path" @keyup.enter="changeLocation()" placeholder="Location">


        <!-- <btn><icon icon="home" :text="true"></icon>Filter</btn> -->

        <!-- <btn class="btn-dropdown pull-right">
          <icon icon="megaphone"></icon>
        </btn> -->
      </toolbar-actions>
    </toolbar>

    <div class="window-content">


  <Table/>
    </div>

    <toolbar type="footer">
      <toolbar-actions>
        <!-- <btn>Cancel</btn>
        <btn type="primary" class="pull-right">Save</btn> -->
      </toolbar-actions>
    </toolbar>
  </div>
</template>

<script>
import {
  Toolbar,
  ToolbarActions,
  Button as Btn,
  ButtonGroup,
  Icon
} from "vue-photonkit";
import Table from "@/components/Table.vue";
import { mapMutations, mapState } from "vuex";

const electron = require("electron");
const os = require("os");

let win = electron.remote.getCurrentWindow();
export default {
  data() {
    return {
      isMacOS: false
    };
  },
  mounted() {
    if (os.platform == "darwin") {
      this.isMacOS = true;
    }
  },
  computed: {
    ...mapState({
      path: "location"
    })
  },
  components: { Toolbar, ToolbarActions, Btn, ButtonGroup, Icon, Table },
  methods: {
    ...mapMutations(["CHANGE_LOC", "READ_FOLDER"]),
    changeLocation() {
      this.CHANGE_LOC(this.$refs.pathVal.value);
      this.READ_FOLDER();
    },
    minimize() {
      win.minimize();
    },

    maximize() {
      if (!win.isMaximized()) win.maximize();
      else win.unmaximize();
    },

    close() {
      win.close();
    }
  }
};
</script>

<style lang="scss">
@import "../photon/dist/css/photon.css";
#location {
  width: auto;
  height: 16px;
}
.toolbar {
  background-image: linear-gradient(to bottom, #003994 0%, #164ea3 100%);
}
.toolbar-header .title {
  margin-top: 1px;
  font-weight: 600;
  text-transform: uppercase !important;
  font-size: 13px;
  color: white !important;
}
.header {
  -webkit-app-region: drag;
  input {
    cursor: text;
    -webkit-app-region: no-drag;
    width: 80%;
    height: 18px;
    background: none;
    border: none;
    color: white;
  }
  input#path:focus {
    box-shadow: none;
    border-bottom: 1px solid white;
    border-radius: 0px;
  }
  ul {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: -7px;
    left: 0px;
    padding-left: 0px !important;

    li {
      padding: 0px 9px;
      -webkit-app-region: no-drag;
      display: -webkit-box;

      span {
        width: 10px;
        height: 10px;
        border: 2px solid #7e7e7e;
        border-radius: 10px;
        background: #7e7e7e;
        display: block;
        transition: all 0.4s ease-in-out;
      }

      .titlebarClose {
        background: white;
        border-color: white;
      }

      &:hover {
        span {
          box-shadow: 0px 0px 10px #636363;
        }

        .titlebarClose {
          box-shadow: 0px 0px 10px #cf5657;
        }
      }
    }
  }

  .toolbar-actions {
    -webkit-app-region: initial;
  }
}
</style>
