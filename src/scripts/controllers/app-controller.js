import $ from "jQuery"
import Backbone from "backbone"
import Router from "../routers/router"
import Vidage from '../vendor/vidage.min'



class AppController {
  constructor(options = {}) {
    this.init()
  }

  init() {
    console.log("init");
    new Router();
    Backbone.history.start();

    new Vidage('#VidageVideo');




  }
}

export default AppController
