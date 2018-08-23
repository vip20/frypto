<template name="modal" lang="html">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

<toolbar type="header" >
    <slot name="header">
              default header
            </slot>
    </toolbar>
          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

<toolbar type="footer">
      <toolbar-actions>
           <slot name="footer">
        <button class="btn btn- btn-default" @click="$emit('close')">Cancel</button>
        <button :disabled="!isPassword" class="btn btn- btn-default pull-right" @click="$emit('submit')">Okay</button>
        </slot>
      </toolbar-actions>
    </toolbar>
        </div>
      </div>
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
export default {
  props: {
    isPassword: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  components: { Toolbar, ToolbarActions, Btn, ButtonGroup, Icon },
  methods: {}
};
</script>
  <style lang="scss">
@import "../photon/dist/css/photon.css";
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  background-image: linear-gradient(to bottom, #003994 0%, #164ea3 100%);
  padding: 3px;
  h3 {
    margin-top: 0;
    font-size: 1em;
    color: white;

    text-align: center;
    text-transform: uppercase;
  }
}

.modal-footer {
  height: 2em;
  padding: 3px;
  background-image: linear-gradient(to bottom, #003994 0%, #164ea3 100%);
}

.modal-body {
  margin: 20px 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.btn:disabled {
  cursor: not-allowed;
}
</style>