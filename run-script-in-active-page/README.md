This demo illustrates using the message manager to add a frame script to the currently selected tab, and sending synchronous messages from the frame script to the main add-on.

It contains two versions of a bootstrapped (restartless) add-on that adds a button to the toolbar using CustomizableUI.jsm. When the user clicks the button the add-on runs some code that modifies the current tab. Some of the code and the icon are taken from [Jorge's "Australis Hello" example](https://github.com/jvillalobos/Australis-Hello-World).

What the code actually does is: find any IMG elements and replace them with silly GIFs randomly chosen from a list hardcoded into the add-on. The silly gifs are taken from the list in the [Whimsy add-on](https://github.com/bwinton/whimsy).

The first version "original" access content directly, so is not multiprocess compatible. The second version "ported-message-manager" loads a frame script into the current browser when the user clicks the button. The frame script finds all the IMG elements, then sends a synchronous message to the main add-on code asking for an array of silly gifs, one for each image element. The main add-on code makes the array and returns it to the frame script. The frame script then replaces the IMG elements with the silly gifs.

Of course, this is a bit contrived: the frame script could fetch the silly gifs itself. But it's an illustration of message-passing using the message manager.
