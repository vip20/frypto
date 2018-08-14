<template lang="html">
  <div class="window">
    <toolbar type="header" title="Frypto" class="header">
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


  <Nav/>
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
import Nav from "@/components/Nav.vue";
export default {
  components: { Toolbar, ToolbarActions, Btn, ButtonGroup, Icon, Nav }
};
</script>

<style lang="scss">
@import "../photon/dist/css/photon.css";
.header {
  -webkit-app-region: drag;
  .toolbar-actions {
    -webkit-app-region: initial;
  }
}
</style>