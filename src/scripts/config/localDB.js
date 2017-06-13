import localforage from "localforage"

import config from "./config"

import cachebust from "./cachebust"

let expiry = Date.now() + (24*60*60) //24h

function resetDB() {
  localDB.removeItem("print_data")
  localDB.setItem("cache_expiry", expiry)
  localDB.setItem("cachebust_sha", cachebust.sha)
}

let localDB = localforage.createInstance({
    name        : 'search',
    version     : 1.0,
    storeName   : 'search_data',
    description : 'local storage of search data'
});

localDB.getItem("cachebust_sha").then((val) => {
  if(!val || val != cachebust.sha) {
    resetDB()
  }
})
localDB.getItem("cache_expiry").then((val) => {
  if(!!val && val < expiry) {
    let timeLeftInCache = (24-((expiry-val)/60/60/1000)).toFixed(2)

    console.log("cache is valid for the next ", timeLeftInCache, "hours");
  } else {
    resetDB()
  }
})

// console.log("localDB is ", localDB)

export default localDB
