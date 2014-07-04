
/*
This code is taken from:
https://developer.mozilla.org/en-US/Add-ons/Code_snippets/On_page_load
*/

var myExtension = {  
    init: function() {  
        // The event can be DOMContentLoaded, pageshow, pagehide, load or unload.  
        if(gBrowser) gBrowser.addEventListener("DOMContentLoaded", this.onPageLoad, false);  
    },  
    onPageLoad: function(aEvent) {  
        var doc = aEvent.originalTarget; // doc is document that triggered the event  
        if (doc.nodeName != "#document") return; // only documents  
        // make whatever modifications you want to doc
        doc.body.style.border = "5px solid blue";
    }  
}  

window.addEventListener("load", function load(event){  
    window.removeEventListener("load", load, false); //remove listener, no longer needed  
    myExtension.init();    
},false);