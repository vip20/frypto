<template lang="html">
  <div class="window">
    <toolbar type="header" title="Frypto" class="header">
      <ul>
          <li @click="minimize()" title="Minimize"><span></span></li>
          <li @click="maximize()" title="Maximize"><span></span></li>
          <li @click="close()" title="Close"><span class='titlebarClose'></span></li>
      </ul>
      <toolbar-actions>
        <button-group>
          <btn><icon icon="home"></icon></btn>
          <btn><icon icon="folder"></icon></btn>
          <btn :active="true"><icon icon="cloud"></icon></btn>
          <btn><icon icon="popup"></icon></btn>
          <btn><icon icon="shuffle"></icon></btn>
        </button-group>
                


        <btn><icon icon="home" :text="true"></icon>Filters</btn>

        <btn class="btn-dropdown pull-right">
          <icon icon="megaphone"></icon>
        </btn>
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

const electron = require("electron");

let win = electron.remote.getCurrentWindow();
export default {
  components: { Toolbar, ToolbarActions, Btn, ButtonGroup, Icon, Table },
  methods: {
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
.toolbar-header .title {
  margin-top: 1px;
  font-weight: 600;
  text-transform: uppercase !important;
  font-size: 13px;
  color: white !important;
}
.header {
  -webkit-app-region: drag;
  background-image: linear-gradient(to bottom, #003994 0%, #164ea3 100%);

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