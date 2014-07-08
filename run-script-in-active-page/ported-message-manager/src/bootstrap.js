/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource:///modules/CustomizableUI.jsm");

var console =
  Cu.import("resource://gre/modules/devtools/Console.jsm", {}).console;

function install(aData, aReason) {}

function uninstall(aData, aReason) {}

function startup(aData, aReason) {
  Gifinate.init();
}

function shutdown(aData, aReason) {
  Gifinate.uninit();
}

let Gifinate = {
  init : function() {
    let io =
      Cc["@mozilla.org/network/io-service;1"].
        getService(Ci.nsIIOService);

    // the 'style' directive isn't supported in chrome.manifest for bootstrapped
    // extensions, so this is the manual way of doing the same.
    this._ss =
      Cc["@mozilla.org/content/style-sheet-service;1"].
        getService(Ci.nsIStyleSheetService);
    this._uri = io.newURI("chrome://gifinate/skin/toolbar.css", null, null);
    this._ss.loadAndRegisterSheet(this._uri, this._ss.USER_SHEET);

    // create widget and add it to the main toolbar.
    CustomizableUI.createWidget(
      { id : "gifinate-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "Gifinate Button",
        tooltiptext : "Gifinate!",
        onCommand : function(aEvent) {
          Gifinate.replaceImages(aEvent.target.ownerDocument);
        }
      });
  },

  replaceImages : function(xulDocument) {
    var browserMM = xulDocument.defaultView.gBrowser.selectedBrowser.messageManager;
    browserMM.loadFrameScript("chrome://gifinate/content/frame-script.js", false);
    browserMM.addMessageListener("request-gifs", Gifinate.getGifs);
  },

  getGifs : function(message) {
    var gifsToReturn = new Array(message.data);
    for (var i = 0; i < gifsToReturn.length; i++) {
      let gif = Gifinate.gifs[Math.floor(Math.random() * Gifinate.gifs.length)];
      gifsToReturn[i] = gif;
    }
    return gifsToReturn;
  },

  gifs: [
  'http://25.media.tumblr.com/tumblr_ma7rqzY6zQ1qis5xyo1_400.gif',
  'https://lh3.googleusercontent.com/-OUw4Q9scVeA/T88ag2ms7nI/AAAAAAAAGYk/k61JJgULnL0/s320/90.gif',
  'https://lh4.googleusercontent.com/-CRSjITDmb4I/USZTvuI_07I/AAAAAAAAIlU/CLKU1HbMC3c/w497-h373/dsf43.gif',
  'http://i.imgur.com/7Bo2HBb.gif',
  'https://gs1.wac.edgecastcdn.net/8019B6/data.tumblr.com/5dd5ebbd60379914270b43e5e9644465/tumblr_mkme23FRxa1qb5gkjo1_400.gif',
  'http://i.imgur.com/VPFVw.gif',
  'http://i.imgur.com/6xaYo.gif',
  'http://i.imgur.com/N0Qe0.gif',
  'http://i.imgur.com/2hyBM.gif',
  'http://i.imgur.com/yjfDD.gif',
  'http://25.media.tumblr.com/tumblr_lwlcls5ra01qzrlhgo1_r1_500.gif',
  'http://media.tumblr.com/tumblr_lmuonu2zHq1qzs6oc.gif'
  ],

  uninit : function() {
    CustomizableUI.destroyWidget("gifinate-button");

    if (this._ss.sheetRegistered(this._uri, this._ss.USER_SHEET)) {
      this._ss.unregisterSheet(this._uri, this._ss.USER_SHEET);
    }
  }
};
