import $ from "jQuery"
import _ from "lodash"
import Backbone from "backbone"

import SearchView from "../views/search-view"


const Router = Backbone.Router.extend({
  routes: {
    '': 'search',
  },
  execute: function(cb, args) {
    cb.apply(this, args)
  },
  search: function(query,category) {
    new SearchView();
  }
})

export default Router
