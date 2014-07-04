/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var images = content.document.getElementsByTagName("img");
var response = sendSyncMessage("request-gifs", images.length);
var gifs = response[0];

for (var i = 0; i < images.length; ++i) {
  images[i].src = gifs[i]; 
}