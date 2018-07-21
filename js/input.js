var showSet = "both";
var sortSet = "hiPrice";


function setShow(root) {
  showSet = root;
  sortResults();
}

function setSort(root) {
  sortSet = root;
  sortResults();
}



function sortResults() {
  switch (showSet) {
    case "both":
      resultArray = newResults.concat(oldResults);
      console.log(resultArray.length+",  "+newResults.length+",  "+oldResults.length);
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
    case "newest":
    resultArray.sort(function(a, b){return new Date(b.startTime) - new Date(a.startTime)});
    break;
    case "oldest":
    resultArray.sort(function(a, b){return new Date(a.startTime) - new Date(b.startTime)});
    break;
    case "hiPrice":
    resultArray.sort(function(a, b){return b.price - a.price});
    break;
    case "loPrice":
    resultArray.sort(function(a, b){return a.price - b.price});
    break;
    case "hot":
    window.alert("'hot' sort not yet implemented")
    break;
    default: break;
  }
}
