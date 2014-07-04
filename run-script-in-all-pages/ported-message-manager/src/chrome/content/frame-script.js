addEventListener("DOMContentLoaded", function(event) {
  var doc = event.originalTarget;
  if (doc.nodeName != "#document") return; // only documents 
  doc.body.style.border = "5px solid red";
});

