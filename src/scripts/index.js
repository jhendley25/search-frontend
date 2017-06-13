import $ from "jQuery";
import AppController from "./controllers/app-controller";

import "babel-polyfill"


$(() => {
  console.log("pageload!");
  new AppController();
})
