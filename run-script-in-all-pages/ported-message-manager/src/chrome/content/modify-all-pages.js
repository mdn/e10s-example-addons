// chrome script
let globalMM = Cc["@mozilla.org/globalmessagemanager;1"]
  .getService(Ci.nsIMessageListenerManager);

globalMM.loadFrameScript("chrome://modify-all-pages/content/content.js", true);