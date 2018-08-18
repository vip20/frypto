import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const fs = require("fs");

export default new Vuex.Store({
  state: {
    location: "/media/vinay/Media & Docs/",
    files: [],
    previousLoc: ""
  },
  getters: {},
  mutations: {
    READ_FOLDER: state => {
      let location = state.location;
      fs.readdir(location, (err, files) => {
        "use strict";
        if (err) throw err;
        if (location !== "/") {
          let tempPath = location.split("/");
          tempPath.splice(tempPath.length - 2, 1);
          state.previousLoc = tempPath.join("/");
        }
        state.files = [];
        for (let file of files) {
          fs.stat(location + file, (err, stats) => {
            let fileObj = {};
            if (err) throw err;

            if (stats.isDirectory()) {
              fileObj = {
                name: file,
                type: "",
                size: "",
                id: `${location}${file}/`
              };
            } else {
              fileObj = {
                name: file,
                type: file.substring(file.lastIndexOf(".") + 1, file.length),
                size: stats.size,
                id: `${location}${file}`
              };
            }
            state.files.push(fileObj);
          });
        }
      });
    },
    CHANGE_LOC: (state, link) => {
      console.log(link);
      state.location = link;
      state.files = [];
    }
  },
  actions: {}
});
