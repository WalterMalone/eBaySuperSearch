var firstNum = 30;
var oldCall = false;
var newCall = false;
var oldTotal = 0;
var newTotal = 0;


function callback(root, isActive) {
  let items, totalPages, page;
  if ( isActive ) {
    items       = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    totalPages  = root.findItemsByKeywordsResponse[0].paginationOutput[0].totalPages;
    page        = root.findItemsByKeywordsResponse[0].paginationOutput[0].pageNumber;
    newTotal    = root.findItemsByKeywordsResponse[0].paginationOutput[0].totalEntries[0];
    newCall     = true;
  } else {
    items       = root.findCompletedItemsResponse[0].searchResult[0].item || [];
    totalPages  = root.findCompletedItemsResponse[0].paginationOutput[0].totalPages;
    page        = root.findCompletedItemsResponse[0].paginationOutput[0].pageNumber;
    oldTotal    = root.findCompletedItemsResponse[0].paginationOutput[0].totalEntries[0];
    oldCall     = true;
  }

if ( page!=0 ) {
  let results = [];
  for ( i = 0; i < items.length; i++ ) {
    results[i] = buildObj(items[i]);
  }
  //console.log("Page: "+page+"  , isActive: "+isActive+'  , Total Pages: '+totalPages);

    //console.log("Results: "+results);
    if ( isActive ) {
      newResults = newResults.concat(results);
    } else {
      oldResults = oldResults.concat(results);
    }

      dataManager();
  //  console.log("resultLength: "+resultLength);
      if ( page==1 ) firstLoad();

      sortResults();

      if ( page<totalPages ) {
        page++;
        buildSearch(query, isActive, page);
      }
    } else {
      document.getElementById("results").innerHTML =
        '<h5 style="text-align: center;">No Results for ' + inStr + '</h5>';
      document.getElementById("loading").style.display = "none";
    }

}



function firstLoad() {

if ( newCall && oldCall ) {
    sortResults();
    //console.log("length after firstload: "+resultArray.length);
    let firstArray = [];
    boxCount = 0;
    if ( resultArray.length<firstNum ){
      firstNum = resultArray.length;
      scrollKill = true
    } else scrollKill = false;
    for ( var i=0; i<firstNum; i++ ) {
      firstArray[i] = resultArray[i];
    }
    document.getElementById("results").innerHTML = "";
    boxResults(firstArray);
    currentPage = firstNum;
} else console.log("unready");

  }
