// chrome script
var globalMM = Cc["@mozilla.org/globalmessagemanager;1"]
  .getService(Ci.nsIMessageListenerManager);

globalMM.loadFrameScript("chrome://modify-all-pages/content/frame-script.js", true);