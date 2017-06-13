import $ from "jQuery"
import algoliasearch from "algoliasearch"
import algoliasearchHelper from "algoliasearch-helper"
import { innerHTML } from "diffhtml"


import SearchCollection from "../models/search"

import resultTemplate from "../templates/search/result.jade"
import categoryTemplate from "../templates/search/category.jade"


class SearchController {
  constructor(options = {}) {
    this.resultsCollection = new SearchCollection()
    this.categoryCollection = new SearchCollection()
    this.algolia = algoliasearch('EKC0TX7X1G', '31de913bbfcc9f3f00a90ea4d9b5a223');
    this.helper = algoliasearchHelper(this.algolia, 'apps', {
      facets: ['category'],
      hitsPerPage: 20,
    });
    this.$inputfield = $(".search-input");
    this.$hits = $('.search-results');


    this.init()
  }

  init() {
    this.registerEvents()

    this.helper.search();
  }

  async renderResults() {
    console.log("renderResults called, col is ", this.resultsCollection);
    let results = await Promise.all(this.resultsCollection.map(this.compileResult, this))
    innerHTML($(".search-results")[0], results.join(""))
  }

  compileResult(result) {
    return new Promise((resolve)=> {
      resolve(resultTemplate({result:result}))
    })
  }

  async renderCategories() {
    if (!this.categoriesFetched){
      console.log("renderCategories called, col is ", this.categoryCollection);
      let results = await Promise.all(this.categoryCollection.map(this.compileCategory, this))
      results.unshift("<option class='default' selected='selected' disabled='disabled'>Filter By Category</option>")
      innerHTML($(".categories")[0], results.join(""))
      this.categoriesFetched = true
    }
  }

  compileCategory(category) {
    return new Promise((resolve)=> {
      resolve(categoryTemplate({category:category}))
    })
  }

  registerEvents() {
    this.resultsCollection.on("reset", this.renderResults.bind(this))
    this.resultsCollection.on("sort", this.renderResults.bind(this))
    this.categoryCollection.on("reset", this.renderCategories.bind(this))
    this.helper.on("result", (results) => {
      this.resultsCollection.reset(results.hits)
      this.categoryCollection.reset(results.getFacetValues('category'))
    });
    this.$inputfield.keyup((e) => {
      this.helper.setQuery(this.$inputfield.val()).search();
    });

    $("body").on("click", ".clear-filter", (e) => {
      this.helper.removeFacetRefinement("category").search()
      $(".default").attr("selected", "selected")
    })
    $("body").on("click", ".sort-results", (e) => {
      this.resultsCollection.toggleSort()
    })
    $("body").on("change", ".categories", (e) => {
      console.log($( "select option:selected" ).text());
      this.helper.removeFacetRefinement("category")
      this.helper.addFacetRefinement("category", $( "select option:selected" ).text()).search()
    })
  }
}

export default SearchController
