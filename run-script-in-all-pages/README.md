This contains three versions of an add-on that runs a script in every page the user loads, and the script modifies the page DOM. There's no need for communication between the code that modifies the DOM and the privileged add-on code. The script just add a border to document.body. Each version uses a different color border, just so it's easier to distinguish which is which.

Version 1 is the original, which uses this code snippet from MDN: https://developer.mozilla.org/en-US/Add-ons/Code_snippets/On_page_load. It adds a red border.

Version 2 is a port to e10s, that has a content script which does all the work. It loads the content script into every frame using the global message manager. It adds a blue border.

Version 3 is a port to the Add-on SDK, that should be e10s compatible, but isn't, yet. This is probably the natural way to implement an add-on like this. It adds a green border. 