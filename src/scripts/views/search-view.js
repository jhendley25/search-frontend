import $ from "jQuery"
import Backbone from "backbone"
import { innerHTML } from "diffhtml"

import SearchController from "../controllers/search-controller"

import template from "../templates/home/home.jade"


const SearchView = Backbone.View.extend({
  className: "search-view",
  initialize: function(options = {}) {
    console.log("SearchView initialized, options are ", options);

    this.options = options

    this.render()

    new SearchController(options)
  },

  render: function() {

    this.$el.html(template(this.options))
    innerHTML($(".main")[0], this.$el)

    return this
  }
})
export default SearchView
