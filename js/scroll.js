var page;


function populate() {
if ( !resultLength) {
  console.log("no results");
  break;
}
while(true) {
let windowBottom = document.documentElement.getBoundingClientRect().bottom;
if (windowBottom > document.documentElement.clientHeight + 100) break;

  console.log("tried");
  var inStr = "&keywords" + encodeURI(getElementById('search'));
  buildSearch(inStr);
}
function(i, p) {
  console.log("tried");
  var inStr = "&keywords" + encodeURI(getElementById('search'));
  inStr += "&paginationInput.pageNumber=" + "i";
  return '<script>' + inStr + '</script' + '>';
}
}

window.addEventListener('scroll', populate);
