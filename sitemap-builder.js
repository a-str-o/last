// sitemap-builder.js
require("babel-register")({
    presets: ["es2015","react"]
  })
  const router = require("./sitemap-routes").default
  const Sitemap = require("react-router-sitemap").default
let ids = []
const fs = require('fs')
fs.readFile('placesuid.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  ids=JSON.parse(data)
  console.log(ids)
  const paramsConfig = {
    "/places/:uid": ids
  };
  new Sitemap(router)
    .applyParams(paramsConfig)
       .build("https://agenz.ma")
       .save("./public/sitemap.xml")
      
})
