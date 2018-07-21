// Live search pull



var timeout = null;
var oldResults = [];
var newResults = [];
var resultLength;
var resultArray = [];
var sortedResults = [];
var currentPage;
var scrollKill = true;
var timeout = null;
var boxCount = 0;
var set = { show:"both", sort:"" };
var query = "";


//    Search typing input timeout filter
function keyUp(str) {
  scrollKill = true
  document.getElementById("results").innerHTML = "";
  document.getElementById("scriptDiv").innerHTML = "";
  boxCount = 0;
  resultArray = [];
  sortedResults = [];
  oldResults = [];
  newResults = [];
  currentPage = 0;

  if ( str.length >2 ){
    clearTimeout(timeout)
    query = "&keywords=" + encodeURI(str);
    timeout = setTimeout( searchManager, 1000 );
  }else {

    document.getElementById("loading").style.display = "none";

}
}

function searchManager() {
  console.log("search executed!");
  document.getElementById("loading").style.display = "block";
  buildSearch(query, true, 1);
  buildSearch(query, false, 1);
}






function callbackActive(root) {
    callback(root, true)
}

function callbackOld(root) {
    callback(root, false)
}



function combineArray(results, isActive) {

}
