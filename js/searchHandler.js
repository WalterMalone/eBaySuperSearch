// Live search pull


var inStr = "";
var timeout = null;
var oldResults = [];
var newResults = [];
var resultLength;
var totalResults = 0;
var resultArray = [];
var sortedResults = [];
var currentPage;
var scrollKill = true;
var lastStr = "";
var timeout = null;
var boxCount = 0;
var set = { show:"both", sort:"" };
var query = "";



//    Search typing input timeout filter
function keyUp(root) {
  inStr = root.value;
  while ( true ){
    if ( inStr==lastStr ) break;
    document.getElementById("loading").style.display = "none";
    lastStr = inStr;
    clearTimeout(timeout);
    clean();
    if ( inStr.length < 3 ) break;
    query = "&keywords=" + encodeURI(inStr);
    if ( root.onkeyup.arguments["0"].code!="Enter") {
      timeout = setTimeout( searchManager, 1000 );
    } else searchManager();
  }
}


function clean() {
  boxCount = 0;
  resultArray = [];
  sortedResults = [];
  oldResults = [];
  newResults = [];
  currentPage = 0;
  scrollKill = true;
  cActive = 0;
  cSold   = 0;
  cUnsold = 0;
  document.getElementById("results").innerHTML = "";
  document.getElementById("resultCount").innerHTML = "";
  document.getElementById("scriptDiv").innerHTML = "";
  document.getElementById("activeProg").style.width = "0%";
  document.getElementById("soldProg"  ).style.width = "0%";
  document.getElementById("unsoldProg").style.width = "0%";
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
