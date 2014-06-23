var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
  include: "*",
  contentScriptFile: self.data.url("modify-all-pages.js")
});