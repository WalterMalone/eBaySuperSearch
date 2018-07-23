var showSet = "both";
var sortSet = "new";


function setShow(root) {
  showSet = root;
  //console.log(root);
  if ( resultArray!="" ) firstLoad();
}

function setSort(root) {
  sortSet = root;
  if ( resultArray!="" ) firstLoad();
}



function sortResults() {
  switch (showSet) {
    case "both":
      resultArray = newResults.concat(oldResults);
      //console.log(resultArray.length+",  "+newResults.length+",  "+oldResults.length);
      break;
    case "active":
      resultArray = newResults;
      break;
    case "ended":
      resultArray = oldResults;
      break;
    default: break;
  }
  switch (sortSet) {
    case "new":
    resultArray.sort(function(a, b){return b.start.getTime() - a.start.getTime()});
    break;
    case "old":
    resultArray.sort(function(a, b){return a.start.getTime() - b.start.getTime()});
    break;
    case "hi":
    resultArray.sort(function(a, b){return b.price - a.price});
    break;
    case "lo":
    resultArray.sort(function(a, b){return a.price - b.price});
    break;
    case "hot":
    window.alert("'hot' sort not yet implemented")
    break;
    default: break;
  }
  console.log("resultArray: "+resultArray.length);
}
