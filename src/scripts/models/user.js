import $ from "jQuery"
import Backbone from "backbone"

import config from "../config/config"

const User = Backbone.Model.extend({
  urlRoot: `${config.apiUrl}`,
  initialize: function(){
    console.log("initialize called, this is ", this);
  },

export default User
