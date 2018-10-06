var progMax;
var cActive;
var cSold  ;
var cUnsold;
var active;
var sold  ;
var unsold;

function dataManager() {
        pushResults();
        math();
        progress();
}

function pushResults() {

    oldTotal = Number(oldTotal);
    newTotal = Number(newTotal);
    totalResults = newTotal + oldTotal;
    resultLength = newResults.length + oldResults.length;
    document.getElementById("resultCount").innerHTML =
      '<h5 style="text-align: center;">Results: ' + resultLength + '  out of  '+totalResults+'</h5>';

}

function math() {
  progMax = totalResults;
  let xActive = newResults.length;
  let xUnsold = oldResults.length;
  let xSold = 0;
  for ( i=0; i<oldResults.length; i++ ) {
    if ( oldResults[i].state=="Sold" ) {
      xUnsold--;
      xSold++;
    }
  }
  active = xActive;
  unsold = xUnsold;
  sold   = xSold;

  wActive = (xActive / progMax) * 100;
  wUnsold = (xUnsold / progMax) * 100;
  wSold   = (xSold   / progMax) * 100;

  console.log("wActive: "+wActive);

}


function progress() {
  var id = setInterval(frame, 10);
  function frame() {
    if ( (cActive+cUnsold+cSold)>= 100) {
      console.log("clear interval!");
      clearInterval(id);
    } else {
      console.log("interval!");
      if ( cActive < wActive ) cActive++;
      if ( cUnsold < wUnsold ) cUnsold++;
      if ( cSold   < wSold   ) cSold++;

      document.getElementById("activeProg").style.width = cActive + '%';
      document.getElementById("soldProg"  ).style.width = cSold   + '%';
      document.getElementById("unsoldProg").style.width = cUnsold + '%';
    }
  }
}
