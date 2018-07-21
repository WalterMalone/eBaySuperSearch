// Live search pull



var timeout = null;
var oldResults = [];
var oldLength;
var activeResults = [];
var activeLength;
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


function scrollCall() {
console.log("ScrollKill: "+scrollKill);
  if ( scrollKill != true ) {
  var loadNum = 25
          while(true) {
            let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
            if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

          }

          let a = resultArray.length;
          let r = a - currentPage;
          if ( r<=loadNum ) {
          loadNum = r;
          scrollKill = true;
          document.getElementById("loading").style.display = "none;";
          }

          let next = [];
          for ( var i=0; i<loadnum; i++ ) {
            next[i] = resultArray[i]
          }
          console.log("Scrolling loading "+next.length+" results");
          boxResults(next);
        }
}
window.addEventListener('scroll', scrollCall);



function callbackActive(root) {
    callback(root, true)
}

function callbackOld(root) {
    callback(root, false)
}



function combineArray(results, isActive) {

}
